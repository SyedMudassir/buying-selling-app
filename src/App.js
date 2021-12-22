import './App.css'; 
import Router from "./Config/router";
import {useState,useEffect} from 'react'
import {auth,logOut} from './Config/firebase'
function App() { 
const [user,setUser] = useState()
const [loading,setLoading] = useState(true)

useEffect(()=>{
  auth.onAuthStateChanged(function (user) {
    setUser(user)
    setLoading(false)
  })
},[])
return( 
<div className="App">
  {loading?<p>Loading...</p>: <Router user={user}/>}
</div> 
)}; 
export default App; 