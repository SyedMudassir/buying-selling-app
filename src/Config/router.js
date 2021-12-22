import React from 'react'
import Dashoboard from '../views/Dashboard'
import Login from "../views/Login"
import Signup from '../views/Signup'
import {BrowserRouter as Router,
Switch,
Route,
Redirect
} from 'react-router-dom'
import PostAdd from '../views/PostAdd'
import Details from "../views/Details";
export default function Navigation({user}) {
 return(
     <Router>
         <div>
             <Switch>
                 <Route path='/' exact>
                   {authCheck (!user , <Login/> , "/Dashboard")}
                 </Route>
                 <Route path='/Signup'>
                 {authCheck (!user , <Signup/> , "/Dashboard")}
                 </Route>
                 <Route path='/Dashboard' exact>
                 {authCheck (user , <Dashoboard/>)}
                 </Route>
                 <Route path='/PostAdd'>
                 {authCheck (user , <PostAdd/>)}
                 </Route>
                 <Route path='/Dashboard/Details/:adid' exact>
                 {authCheck (user , <Details/>)}
                 </Route>
             </Switch>
         </div>
     </Router>
 )   
}
function authCheck(user,comp,path='/') {
   return user ? comp : <Redirect to={path}/>
}