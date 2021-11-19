import React, { useEffect,useState} from 'react';
import Web3 from 'web3';
import './App.css';
import { readString } from 'react-papaparse';
import dataset from './dataset/fund_data_CSV.csv';
// import User from '../abis/User.json';
import Transaction from './abis/Transaction.json';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './routes/login';
import Signup from './routes/signup';
import RequestFunds from './routes/requestFunds';
import dashboard from './routes/dashboard';
import DistrictRequest from './routes/districtRequest';





//Declare IPFS
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

// const  = require('read-excel-file/node');
var App=()=>{
  

  var [account,setAccount]=useState();
  // const [UserInstance,setUserInstance]=useState();
  const [TransactionContractIntance,setTransactionContractIntance]=useState();
  const [datasetArray,setdataArray]=useState([]);
  // var [userCount,setuserCount]=useState(0);

  useEffect(() => {
    // loadWeb3();
    // loadBlockchainData();
    // simulateTransactions();
  }, [])
  
  useEffect(() => {
    if(datasetArray!=[] && account && TransactionContractIntance)
    {
      datasetArray.forEach(async (data)=>{
        // let response=await makeTransaction(data[1],data[2],data[3]);
        
      })
    }
  }, [datasetArray,account,TransactionContractIntance])
  
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
      const networkData =Transaction.networks[networkId];
      // console.log({networkData})
      if(networkData){
      const _TransactionInstance=new web3.eth.Contract(Transaction.abi,networkData.address)
      setTransactionContractIntance(_TransactionInstance);
      // console.log({UserInstance})
      
      // console.log({UserInstance,count})
    }
      else{
        window.alert('the contract has not been deployed yet');
      }
    }

  async function makeTransaction(senderName,amount,timeStamp){
    var ethers = require('ethers');  
    var crypto = require('crypto');
    var id = crypto.randomBytes(32).toString('hex');
    var privateKey = "0x"+id;
    var wallet = new ethers.Wallet(privateKey);

    let response=await TransactionContractIntance.methods.addNewTransactionEntry(senderName,timeStamp,wallet.address,amount).send({from:account})
    .on('transactionHash',async (hash)=>{
      console.log(hash);
    });

    
  }
  const papaConfig = {
      complete: (results, file) => {
        setdataArray(results.data.slice(1,2))
      },
      download: true,
      error: (error, file) => {
        console.log('Error while parsing:', error, file);
      },
    };



  async function simulateTransactions(){
    readString(dataset, papaConfig);
    
  }


  return(
    <>
        <Router>
          <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/requestFunds" component={RequestFunds}/>
                <Route exact path="/dashboard" component={dashboard}/>
                <Route exact path="/districtrequest" component={DistrictRequest}/>
          </Switch>
        </Router>
    
</>
  )
}
export default App;