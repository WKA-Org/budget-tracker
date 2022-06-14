import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue, push, remove, set, child, update} from 'firebase/database';
import { auth, firebase } from "../firebase";
import { useState } from 'react';
import { async } from "@firebase/util";
import { useEffect } from "react";

function LandingPage() {
  const [logInEmail, setLogInEmail] = useState('')
  const [logInPassword, setLogInPassword ] = useState('')
  const [createEmail, setCreateEmail] = useState('')
  const [createPassword, setCreatePassword ] = useState('')

  const [firebaseTest, setFirebaseTest] = useState('')

  const [currentUser, setCurrentUser] = useState({})

  // const database = getDatabase(firebase);
  // const dbRef = ref(database);

  // console.log(currentUser)
  
  const handleEmailChange = function(e) {
    setLogInEmail(e.target.value)
  }
  const handlePasswordChange = function(e) {
    setLogInPassword(e.target.value)
  }
  const handleEmailRegisterChange = function(e) {
    setCreateEmail(e.target.value)
  }
  const handlePasswordRegisterChange = function(e) {
    setCreatePassword(e.target.value)
  }
  const handleDummyClick = function(){
    setLogInEmail("dummyuser@email.com")
    setLogInPassword("dummy123")
    login()
  }
  
  const login = async function() {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        logInEmail, 
        logInPassword
        )
        
      } catch(error){
        console.log(error)
      }
    }
  
    const create = async function() {
      try {
        const user = await createUserWithEmailAndPassword(
        auth,
        createEmail, 
        createPassword
        )
        const db = getDatabase();
        set(ref(db, user.user.uid), {
          user: user.user.email
        })
      } catch(error){
        console.log(error)
      }
    }
    const logOut = async function(){
      await signOut(auth)
    }
    
    useEffect(function(){
      onAuthStateChanged(auth, (current) => {
        setCurrentUser(current)
      })
    },[login, logOut])

    // useEffect(() => {

    // const database = getDatabase(firebase);
    // const dbRef = ref(database);
    //   console.log(dbRef)
    //   onValue(dbRef, (response) => {
    //     // console.log(response)
    //       const newState = [];
    //       const data = response.val();
    //       // console.log(data)
    //       for (let propertyName in data) {
    //           newState.push(
    //               {
    //                   key: propertyName,
    //                   name: data[propertyName]
    //               }
    //           );
    //       }
    //       console.log(newState)
    //   });
    // }, []);

    const handleData = function(e){
      setFirebaseTest(e.target.value)
    }
   
    const handleFirebase = function(){
      const database = getDatabase();
      // const newKey =  push(ref(database, currentUser.uid)).key
      set(ref(database, `${currentUser.uid}/` + "NEW"), {
       
          value: "Newwofinewoin"
       
      })
      // console.log(newKey)

    }
    
  return (
    <>
      <p>Already have an account?</p>
      <input
        onChange={handleEmailChange}
        type="text"
        placeholder="email"
      />
      <input
        onChange={handlePasswordChange}
        type="text"
        placeholder="password"
      />
      <button onClick={login}>Log In</button>
      <input
        onChange={handleEmailRegisterChange}
        type="text"
        placeholder="email"
      />
      <input
        onChange={handlePasswordRegisterChange}
        type="text"
        placeholder="password"
      />
      <button onClick={create}>Create user</button>
      <p>{currentUser?.email}</p>
      <button onClick={logOut}>Log Out</button>
      <Link to='/SignUpPage'>
        <button>Get Started</button>
      </Link>
      <button onClick={handleDummyClick}>Dummy Account</button>
      <input onChange={handleData} type="text" placeholder="firebase"/>
      <button onClick={handleFirebase}>FIREBASE</button>
    </>
  );
}

export default LandingPage;
