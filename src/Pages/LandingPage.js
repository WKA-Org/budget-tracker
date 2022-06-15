import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue, push, remove, set, child, update, get} from 'firebase/database';
import { auth, firebase } from "../firebase";
import { useState } from 'react';
import { async } from "@firebase/util";
import { useEffect } from "react";

function LandingPage() {
  const [logInEmail, setLogInEmail] = useState('')
  const [logInPassword, setLogInPassword ] = useState('')

  const navigate = useNavigate()
  // const [firebaseTest, setFirebaseTest] = useState('')
  // const [expenses, setExpenses] = useState("")

  // const [expenseData, setExpenseData] = useState({})

  const [currentUser, setCurrentUser] = useState({})

  const handleEmailChange = function(e) {
    setLogInEmail(e.target.value)
  }
  const handlePasswordChange = function(e) {
    setLogInPassword(e.target.value)
  }

  const handleDummyClick = async function(){
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        "dummyuser@email.com", 
        "dummy123"
        )
        navigate("/HomePage")
    } catch(error){
        console.log(error)
    }
  }

  const login = async function() {
    console.log(logInEmail, "INSIDE LOGIN")
    console.log(logInPassword, "INSIDE LOGIN")
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        logInEmail, 
        logInPassword
        )
        navigate("/HomePage")
    } catch(error){
        console.log(error)
    }
  }
  
  const logOut = async function(){
    setLogInEmail("")
    setLogInPassword("")
    await signOut(auth)
  }
    
    useEffect(function(){
      onAuthStateChanged(auth, (current) => {
        setCurrentUser(current)
      })
    },[login, logOut])

    // const handleData = function(e){
    //   setFirebaseTest(e.target.value)
    // }

    // const handleExpense = function(e){
    //   setExpenses(e.target.value)
    // }
   
    // const handleFirebase = function(){
    // const newDate = new Date();
  
    //   const database = getDatabase(firebase);
    //   const dbRef = ref(database, `${expenses}/`)
    //   push(ref(database, `${expenses}/`), {
       
    //     date: newDate,
    //     subCategory1: 'Clothing',
    //     price1: firebaseTest,
    //     comments1: "user input(t-shirt)"

    //   })
    //  get(dbRef).then(res => setExpenseData(res.val()))
    // }
    // console.log(expenseData)
    // Object.keys(expenseData).forEach(key => {

    //     console.log(expenseData[key].price1)

    // })

  return (
    <>
      <p>Already have an account?</p>
      <input
        onChange={handleEmailChange}
        type="text"
        placeholder="email"
        value={logInEmail}
      />
      <input
        onChange={handlePasswordChange}
        type="text"
        placeholder="password"
        value={logInPassword}
      />
      <button onClick={login}>Log In</button>
      <p>{currentUser?.email}</p>
      <button onClick={logOut}>Log Out</button>
      <Link to='/SignUpPage'>
        <button>Get Started</button>
      </Link>
      <button onClick={handleDummyClick}>Dummy Account</button>

      {/* Use this for adding an expense */}
      
      {/* <input onChange={handleData} type="text" placeholder="firebase"/>
      <button onClick={handleFirebase}>FIREBASE</button> */}
      {/* {
        currentUser &&
        <form onChange={handleExpense} action="">
          <input type="radio" name="expense" value={`${currentUser.uid}/expenses/utilities`}/>
          <input type="radio" name="expense" value={`${currentUser.uid}/expenses/shopping`}/>
          <input type="radio" name="expense" value={`${currentUser.uid}/expenses/groceries`}/>
          <input type="radio" name="expense" value={`${currentUser.uid}/expenses/diningOut`}/>
          <input type="radio" name="expense" value={`${currentUser.uid}/expenses/personalCare`}/>
          <input type="radio" name="expense" value={`${currentUser.uid}/expenses/monthlyRecurring`}/>
        </form>
      } */}
    </>
  );
}

export default LandingPage;
