import React, { useEffect,useState} from 'react';
import '../design/css/dashboard.css';

const dashboard=()=>{
    return(
        <>
           <body className="dashboardBody">
               <div className="navbar">
                   <div className="username">
                        name@gmail.com
                   </div>

                   <button className="signout">
                        sign out
                   </button>
               </div>

                <div className="accountDetails">
                    <div className="totalAmount">
                        10000
                    </div>
                </div>
           </body> 
        </>
    )
}


export default dashboard;