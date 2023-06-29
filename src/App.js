import logo from './logo.svg';
import "./CSS/App.css";
import { NotificationProvider} from "web3uikit";
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from "./data.json";
import Nav from "./components/Nav";
import { MoralisProvider } from 'react-moralis';
import Enter from "./components/Enter";

function App() {

  const [provider, setProvider] = React.useState(null);
  const [signer, setSigner] = React.useState(null);
  const [contract, setContract] = React.useState(null);
  const[network, setNetwork]= React.useState(null);


  // connecting to wallet logic-----
  
  React.useEffect(() => {
    const initialize = async () => {
      
      if (window.ethereum && window.ethereum.isMetaMask && window.ethereum.isConnected() ) {
        const Provider = new ethers.BrowserProvider(window.ethereum);
        const Signer = await Provider.getSigner();
        const Contract = new ethers.Contract(abi.contractAddress, abi.abi, Signer);
        setProvider(Provider);
        setSigner(Signer);
        setContract(Contract);
        
        const Network = await Provider.getNetwork();
        setNetwork(Network.name);
       
      }
    }
    initialize();
  
  }, [provider]);
  

 
  return (
    <div className='all'>
     
      
      <MoralisProvider initializeOnMount={false}>
         <Nav  Signer={signer} provider={provider}  />
      </MoralisProvider>
      <NotificationProvider>
        <Enter provider={provider} Contract={contract}/ >
      </NotificationProvider>
      
    </div>
  );
}

export default App;
