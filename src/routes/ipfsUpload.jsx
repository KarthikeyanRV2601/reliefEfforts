import React, { useEffect,useState} from 'react';
import RequestDataset from '../abis/RequestDataset.json'
import Web3 from 'web3';
import '../design/css/requestdataset.css'
const IPFSUpload=()=>{
    const [file,setFile]=useState();
    const ipfsClient = require('ipfs-http-client');
    const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values
    const [RequestDatasetContractInstance,setRequestDatasetContractInstance]=useState();
    const [account,setAccount]=useState();
    const [lastupdate,setlastupdate]=useState();
    const [dataSetHash,setDatasetHash]=useState();
    const [history,setHistory]=useState([]);

    useEffect(() => {
    loadWeb3();
    loadBlockchainData();
    
    }, [])
    
    useEffect(() => {
        
        if(RequestDatasetContractInstance)
        {
            getRecentHashandTime();
            getHistory();
        }
    }, [RequestDatasetContractInstance])
    
    

    useEffect(() => {
        if(file)
        {
            const readerURL=new window.FileReader();
            readerURL.readAsDataURL(file)
            readerURL.onloadend=()=>{
                uploadDataset(readerURL.result);
            }
        }
    }, [file])
  
    useEffect(() => {
        console.log({history})
    }, [history])

    function makeHash(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

    async function loadWeb3() {
         
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
        }

    async function loadBlockchainData() {
      const web3 = window.web3;
      const accounts=await web3.eth.getAccounts();
      setAccount(accounts[0])
      console.log(accounts)
      const balanceInstance=await web3.eth.getBalance(accounts[0])
      console.log({balanceInstance})
      const networkId="5777";
      var networkData =RequestDataset.networks[networkId];
      if(networkData){
      const _requestDatasetInstance=new web3.eth.Contract(RequestDataset.abi,networkData.address)
      setRequestDatasetContractInstance(_requestDatasetInstance);
      }
      
      else{
        window.alert('the contract has not been deployed yet');
      }
    }
    
    const updateDataset=async (hash)=>{
        let date=new Date().toString();
        try {
            let response=await RequestDatasetContractInstance.methods.updateDataset(hash,date).send({from:account})
            .on('transactionHash',async (txnhash)=>{
                // console.log({txnhash});
                let updatedTime=await getDatasetLastUpdatedTime();
                // console.log({updatedTime});
                let hash=await getDatasetHash();
                // console.log({hash})
                setlastupdate(updatedTime);
                setDatasetHash(hash);

                getHistory();
            });
            // console.log(response)
        } catch (error) {
            console.log({error})
        }
           

    }

    const getRecentHashandTime=async ()=>{
        let updatedTime=await getDatasetLastUpdatedTime();
        // console.log({updatedTime});
        let hash=await getDatasetHash();
        // console.log({hash})
        setlastupdate(updatedTime);
        setDatasetHash(hash);
    }
    
    const getDatasetLastUpdatedTime=async ()=>{
        let response=await RequestDatasetContractInstance.methods.getLastUpdateTime().call({from:account})
        // console.log({response})
        return response;
    }

    const getDatasetHash=async ()=>{
        let response=await RequestDatasetContractInstance.methods.getDatasetHash().call({from:account})
        // console.log({response})
        return response;
    }

    const uploadDataset=async(file)=>{
        const buffer=Buffer(file);
        try{
            var datasethash=makeHash(16);
            updateDataset(datasethash);
            // const result = await ipfs.add(buffer)
            // let hashedCID=result[0].hash;
            // console.log(hashedCID)
        }
        catch(e){
            console.log(e)
        }
    }


    
    const getHistory=async()=>{
        const count=await RequestDatasetContractInstance.methods.updateIter().call();
        console.log({count})
        var list=[]
        for(let i=count;i>=0;--i)
        {
            const record=await RequestDatasetContractInstance.methods.history(i).call();
            list.push(record)
            
        }
        setHistory(list);
        
    }

    return(
        <>
            

            <label for="fileupload">Upload dataset</label>
            <input type="file" className="file"
                id="fileupload"
                onChange={e=>
                    setFile(e.target.files[0])}
            />
            

            <label htmlFor="updatedTime" style={{color:"blue"}}>Last updated time</label>
            <div id="updatedTime" >{lastupdate}</div>
            
            <label htmlFor="updatedTime" style={{color:"blue"}}>IPFS dataset hash</label>
            <div id="updatedTime">{dataSetHash}</div>


            <table>
  
        <thead>
            <th>Updated time</th>
            <th>Dataset version hash</th>
        </thead>
        
        <tbody>
            {
               history && history.map((record,key)=>
               <tr id={key}>
                    <td data-label="updateTime">{record.IPFSHash}</td>
                    <td data-label="datasetHash">{record.lastUpdated}</td>
                </tr>
               )
            }
            
            
            
        </tbody>
        
        </table>

        </>
    )
}

export default IPFSUpload;
