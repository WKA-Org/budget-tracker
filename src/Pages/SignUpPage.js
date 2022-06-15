import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from "../firebase";
import { useState } from 'react';
import { Link } from "react-router-dom";

const SignUpPage = function(){
  const [createEmail, setCreateEmail] = useState('')
  const [createPassword, setCreatePassword ] = useState('')

  const handleEmailRegisterChange = function(e) {
    setCreateEmail(e.target.value)
  }
  const handlePasswordRegisterChange = function(e) {
    setCreatePassword(e.target.value)
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
        user: user.user.email,
      })
    } catch(error){
      console.log(error.code)
    }
  }

  return (
    <>
      <Link to="/">
        <button>go Back</button>
      </Link>
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
    </>
  );
}

export default SignUpPage;