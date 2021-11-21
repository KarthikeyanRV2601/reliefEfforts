import React, { useEffect,useState} from 'react';
import '../design/css/dashboard.css';

const Dashboard=()=>{
    useEffect(() => {
        let _user=window.localStorage.getItem("currentUser");
        setCurrentUser(_user);
    }, [])
    const [currentUser,setCurrentUser]=useState();
    

    return(
        <>
           <body className="dashboardBody">
               <div className="navbar">
                   <div className="username">
                        {currentUser}
                   </div>

                   <button className="signout">
                        sign out
                   </button>
               </div>
            
               
           </body> 
        </>
    )
}


export default Dashboard;