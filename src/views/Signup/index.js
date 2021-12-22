import React from 'react'
import { useState } from "react";
import { signUp, pushUserData, uploadFiles } from '../../Config/firebase'
import { useHistory } from 'react-router-dom'

function SignUp() {
  const [name, setName] = useState('')
  const [getEmail, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validPassword, setValidPassword] = useState()
  const profileImage = []
  const [profileImageurl, setProfilImageUrl] = useState([])
  const history = useHistory()
  const signUpCall = () => {
    signUp(getEmail, password).then(
      response => pushUserData({ name, getEmail, profileImageurl }).then(response => { alert(`This ${getEmail} is Registered`) }
      )
    ).catch(
      e => alert(e.message)
    )
    resetStates()
  }
  const resetStates = () => {
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setValidPassword(false)
  }
  const passwordChecker = () => {
    { password === confirmPassword && setValidPassword(true) }
  }
  const pushImages = (e) => {
    profileImage.push(e.target.files)
    uploadFiles(profileImage).then(url => {
      setProfilImageUrl(url)
    })
    console.log(profileImageurl)
  }
  return (
    <div className="form">
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="exampleInputName">Your Name</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputName"
          placeholder="Enter Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={getEmail}
          onChange={e => setEmail(e.target.value)}
        />
        <small
          id="emailHelp"
          className="form-text text-muted">
          We'll never share your email with anyone else.
    </small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword2">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword2"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          onBlur={() => passwordChecker()}
          id={validPassword === true ? "valid" : 'unvalid'}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputimg">Profile Image</label>
        <input
          type="file"
          className="form-control"
          id="exampleInputimg"
          multiple
          onChange={e => pushImages(e)}
        />
      </div>
      <button type="submit" onClick={signUpCall} className="btn btn-primary">Sign Up</button>
      <p className="my-2">Already a Member <strong onClick={() => history.push('/')}>Sign In</strong></p>
    </div>
  )
}

export default SignUp