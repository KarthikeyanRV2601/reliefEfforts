import React, { useEffect,useState} from 'react';
import '../design/css/login.css'
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

const Login =()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const { login } = useAuth()
    const history = useHistory()

    const handleLogin=async(e)=>{
        e.preventDefault();
        console.log({email,password})
         try {
            
            await login(email,password)
            history.push("/")
            window.localStorage.setItem("currentUser",email);
            } 
        catch {
            console.error("Failed to log in")
            }
    }
    
    return(
        <body>
            <form class="box" onSubmit={(e)=>handleLogin(e)}>
                <h1>Login</h1>
                <input type="text" name="" placeholder="Email" 
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
                <input type="password" name="" placeholder="Password"
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                />
                <input type="submit" name="" value="Login"/>
                <a href="/signup" style={{color:"white"}}>singup as a new user</a>
            </form>

            
        </body>
    )
}

export default Login;