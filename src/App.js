import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [microserviceOneStatus, setMicroserviceOneStatus] = useState('unknown');
  const [microserviceTwoStatus, setMicroserviceTwoStatus] = useState('unknown');
  const [msoneDB, setMsoneDB] = useState('unknown');
  const [mstwoDB, setMstwoDB] = useState('unknown');


  const microserviceOneCheck = async () => {
    try {
      const response = await axios.get('/ms-1/health');
      setMicroserviceOneStatus(response.data.status);
    } catch (error) {
      console.log(error);
      setMicroserviceOneStatus('down');
    }
  }

  const microserviceTwoCheck = async () => {
    try {
      const response = await axios.get('/ms-2/health');
      setMicroserviceTwoStatus(response.data.status);
    } catch (error) {
      console.log(error);
      setMicroserviceTwoStatus('down');
    }
  }

  const microserviceOneCheckDB = async () => {
    try {
      const response = await axios.get('/ms-1/db/health');
      setMsoneDB(response.data.status);
    } catch (error) {
      console.log(error);
      setMsoneDB('down');
    }
  }

  const microserviceTwoCheckDB = async () => {
    try {
      const response = await axios.get('/ms-2/db/health');
      setMstwoDB(response.data.status);
    } catch (error) {
      console.log(error);
      setMstwoDB('down');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='ms'>
          <button onClick={microserviceOneCheck}>Check MS1 Status</button>
          <p>Microservice One Status: </p><span>{microserviceOneStatus}</span>
        </div>
        <div className='ms'>
          <button onClick={microserviceOneCheckDB}>Check MS1 DB connection</button>
          <p>Microservice One Database connection: </p><span>{msoneDB}</span>
        </div>
        <div className='ms'>
          <button onClick={microserviceTwoCheck}>Check MS2 Status</button>
          <p>Microservice Two Status: </p><span>{microserviceTwoStatus}</span>
        </div>
        <div className='ms'>
          <button onClick={microserviceTwoCheckDB}>Check MS2 DB connection</button>
          <p>Microservice Two Database connection: </p><span>{mstwoDB}</span>
        </div>
      </header>
    </div>
  );
}

export default App;
