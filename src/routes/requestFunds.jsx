import React, { useEffect,useState} from 'react';
import '../design/css/login.css'



const requestFunds=()=>{
    const ipfsClient = require('ipfs-http-client')
    const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

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

export default requestFunds;
