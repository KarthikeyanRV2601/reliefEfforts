import React, { useEffect,useState} from 'react';
import './App.css';
import { readString } from 'react-papaparse';
import dataset from './dataset/fund_data.csv';
// import User from '../abis/User.json';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './routes/login';
import Signup from './routes/signup';
import RequestFunds from './routes/requestFunds';
import Dashboard from './routes/dashboard';
import { AuthProvider } from "./contexts/AuthContext"
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './routes/ForgotPassword';
import NewRequest from './routes/newRequest';
import RequestVisalize from './routes/requestVisualize';
import IPFSUpload from './routes/ipfsUpload';



//Declare IPFS

// const  = require('read-excel-file/node');
var App=()=>{
  

  const [datasetArray,setdataArray]=useState([]);
  const [uniqueDonors,setDonors]=useState([]);
  useEffect(() => {
    readString(dataset, papaConfig);
  }, [])
  
  useEffect(() => {
    let uniqueDonors=[];
    if(datasetArray!=[])
    {
      datasetArray.forEach(async (data)=>{
        // let response=await makeTransaction(data[1],data[2],data[3]);
        if(data[1])
        uniqueDonors.push(data[1])
      })
    }
    // console.log(uniqueDonors);
    setDonors(uniqueDonors)
  }, [datasetArray])
  
  
  const papaConfig = {
      complete: (results, file) => {
        setdataArray(results.data.slice(1))
      },
      download: true,
      error: (error, file) => {
        console.log('Error while parsing:', error, file);
      },
    };



  

  return(
    <>
        <Router>
          <AuthProvider>
            <Switch>
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path="/signup" component={Signup}/>
                  <Route exact path='/upload-dataset' component={IPFSUpload}/>
                  <Route exact path="/forgot-password" component={ForgotPassword}/>
                  <Route exact path="/new-request" component={NewRequest}/>
                  <Route exact path="/request-funds" component={RequestFunds}/>
                  <Route exact path="/request-insights" component={RequestVisalize}/>
            </Switch>
          </AuthProvider>
        </Router>
    
</>
  )
}
export default App;