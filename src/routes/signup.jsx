import React, { useEffect,useState} from 'react';
import '../design/css/signup.css';
const Signup =()=>{
    const [userData,setUserData]=useState(
        {
            fullname:"",
            username:"",
            email:"",
            mobile:"",
            password:"",
            cnfPassword:""
        }
    )
    
    const handleChange=(e)=>{
        let data=userData;
        data[e.target.id]=e.target.value
        setUserData(data)
        // console.log(userData)
    }
    
    return(
        <body>
            <div class="login-wrap">
                <div class="login-html">
                <div class="login-form">
                    <center><h1>SignUp</h1></center>
                    <div class="group">
                        <label for="fullname" class="label">Full Name</label>
                        <input id="fullname" type="text" class="input"
                        onChange={(e)=>{
                            handleChange(e)
                        }}
                        />
                    </div>
                    <div class="group">
                        <label for="username" class="label">Username</label>
                        <input id="username" type="text" class="input"
                        onChange={(e)=>{
                            handleChange(e)
                        }}
                        />
                    </div>
                    <div class="group">
                        <label for="email" class="label">Email Address</label>
                        <input id="email" type="text" class="input"
                        onChange={(e)=>{
                            handleChange(e)
                        }}
                        />
                    </div>
                    <div class="group">
                        <label for="mobile" class="label">Mobile Number</label>
                        <input id="mobile" type="text" class="input"
                        onChange={(e)=>{
                            handleChange(e)
                        }}
                        />
                    </div>
                    <div class="group">
                        <label for="password" class="label">Password</label>
                        <input id="password" type="password" class="input" data-type="password"
                        onChange={(e)=>{
                            handleChange(e)
                        }}
                        />
                    </div>
                    <div class="group">
                        <label for="cnfPassword" class="label">Repeat Password</label>
                        <input id="cnfPassword" type="password" class="input" data-type="password"
                        onChange={(e)=>{
                            handleChange(e)
                        }}
                        />
                    </div>
                    
                    <div class="group">
                        <input type="submit" class="button" value="Sign Up"/>
                    </div>
                    <div class="hr"></div>
                    <div class="foot-lnk">
                        
                        <a href="/login">Already a Member?</a>
                    </div>
                </div>
                </div>
            </div>
        </body>
    )
}

export default Signup;