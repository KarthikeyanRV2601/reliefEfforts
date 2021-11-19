import React, { useEffect,useState} from 'react';
import '../design/css/login.css'
import states from '../dataset/districtState.json';


const RequestFunds=()=>{
 
    useEffect(() => {
        createDataset();
    }, [])
    
    const ipfsClient = require('ipfs-http-client')
    const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values
    
    const requestTypes=["Medical","Food","Shelter","Education","Unemployment","Water"]
    
    const handleNewRequest=(file)=>{
        if(file)
        {
            
            const readerURL=new window.FileReader();
            readerURL.readAsDataURL(file)
            readerURL.onloadend=()=>{

                
                uploadProof(readerURL.result);
            }
        
        }
    }

    // const getState=(_district)=>{
    //     // console.log(states)
    //     var result=""
    //     states.states.forEach(state => {
    //         if(state.districts.some((district)=>district==_district))
    //         {
    //             result=state.state;
    //             return
    //         }
    //     });
    //     return result;

    // }

    function getRandomItem(arr) {

        const randomIndex = Math.floor(Math.random() * arr.length);
        const item = arr[randomIndex];
        return item;
    }
    const createDataset=()=>{
        // var data={
        //     "userID":"a",
        //     "district":"b",
        //     "state":"c",
        //     "requestType":"d",
        //     "timestamp":"e"}
        
        var dataset={
            data:[]
        };

        for(let i=0;i<1000;++i)
        {
            let state=getRandomItem(states.states);
            let district=getRandomItem(state.districts);
            let type=getRandomItem(requestTypes);
            dataset.data.push(
                {
                    "userID":i,
                    "district":district,
                    "state":state,
                    "requestType":type,
                    "timestamp":i
                }
            )
        }
        var json = JSON.stringify(dataset);
        var fs = require('fs');
        console.log({fs})
        fs.writeFile('dataset.json', json, 'utf8', (res)=>{
            console.log(res);
        });
        
    }

    const uploadProof=async(proofBuffer)=>{
        const result = await ipfs.add(Buffer(proofBuffer))
        let hashedCID=result[0].hash;
        console.log(hashedCID);
        
    }



    return(
        <>
            <h1>Request page</h1>
            <input type="file" name="" id="" 
            onChange={(e)=>{
                handleNewRequest(e.target.files[0])
            }}/>
        </>
    )
}

export default RequestFunds;
