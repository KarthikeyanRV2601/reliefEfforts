import React, { useEffect,useState} from 'react';
import '../design/css/login.css'

const Login =()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    
    const handleLogin=(e)=>{
        e.preventDefault();
        console.log({email,password})
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
            </form>
        </body>
    )
}

export default Login;