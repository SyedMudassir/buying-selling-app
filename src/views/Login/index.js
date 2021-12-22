import React from 'react'
import { useState } from "react";
import { signIn } from '../../Config/firebase'
import { useHistory } from "react-router-dom";

function SignIn() {
  const [getEmail , setEmail] = useState()
  const [password , setPassword] = useState()
  const history = useHistory()
  const signInCall = () =>{
      signIn(getEmail,password).then(
          response => history.push('/Dashboard')
      ).catch(
        e => alert(e.message)
      )
  }  
return(
    <div className="form">
        <h2>Sign In</h2>
        <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input 
    type="email" 
    className="form-control" 
    id="exampleInputEmail1" 
    aria-describedby="emailHelp" 
    placeholder="Enter email"
    onChange={e=>setEmail(e.target.value)}
    />
     </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input 
    type="password" 
    className="form-control" 
    id="exampleInputPassword1" 
    placeholder="Password"
    onChange={e=>setPassword(e.target.value)}
    />
  </div>
  
  <button type="submit" onClick={signInCall} className="btn btn-primary">Sign In</button>
  <p className="my-2">Not a Member <strong onClick={() => history.push('/Signup')}>Sign Up</strong></p>
    </div>
)
}

export default SignIn