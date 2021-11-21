import React, { useEffect,useState} from 'react';
import '../design/css/dashboard.css';
import fundsData from '../dataset/fundDataset.json'
import '../design/css/requestdataset.css'
const Dashboard=()=>{
    useEffect(() => {
        // let _user=window.localStorage.getItem("currentUser");
        // setCurrentUser(_user);
        getUniqueDonors(fundsData.data)
        setFundsData(fundsData.data)
        // getUniqueDonors()
    }, [])

    const getUniqueDonors=(_data)=>{
        // console.log(_data)
        let dataList=[];
        let dictionary={};
        _data.forEach((data)=>{
            if(!(data.DonorName in dictionary))
            {
                // console.log(data.DonorName)
                dataList.push(data.DonorName)
            }
            dictionary[data.DonorName]=1;
        })
        // console.log({dataList})
        setUniqueDonors(dataList)
    }
    useEffect(()=>{
        console.log({usertoDisplay})
    },[usertoDisplay])
    
    const [funds,setFundsData]=useState([]);
    const [uniqueDonors,setUniqueDonors]=useState([]);
    const [usertoDisplay,setUsertoDisplay]=useState('');


    return(
        <>


           <body className="dashboardBody">
            <div className="navbar">
                <select
                 onChange={(e)=>setUsertoDisplay(e.target.value)}
                 >
                    {
                        uniqueDonors && uniqueDonors.map((record,key)=>
                        
                            <option 
                            value={record}
                            id={key}
                           
                            >{record}</option>
                        )
                    }
                </select>

            </div>
            <table>
  
            <thead>
                <th>Donated amount in rupees</th>
                <th>Date of donation</th>
            </thead>
            
            <tbody>
                {
                funds && funds.map((record,key)=>
                    {
                        if(record.DonorName==usertoDisplay)
                        {
                            return(
                                <tr id={key}>
                                    
                                    <td data-label="amount">{record.AmountDonated}</td>
                                    <td data-label="timeStamp">{record.Timestamp}</td>
                                    
                                </tr>
                            )
                        }
                    }
                )
                }
                
                
                
            </tbody>
        
        </table>
           </body> 
        </>
    )
}


export default Dashboard;