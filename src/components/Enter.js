import React from 'react';
import '.././CSS/Enter.css';
import { ethers } from "ethers";
import Web3 from "web3";


import { useNotification } from "web3uikit";

const Enter = ({ provider, Contract }) => {
  const [players, setPlayers] = React.useState();
  const [fund, setFund] = React.useState();
  const [winner, setWinner] = React.useState();
  const [fee, setFee] = React.useState();
  const web3 = new Web3(provider);

  React.useEffect(() => {

    // ---------Logic for showing details on webpage

    const fetchNoOfPlayers = async () => {
      if (Contract) {
        const noOfPlayers = await Contract.getNoofPlayers();
        const bal = await Contract.getBalance();
        const Winner = await Contract.getRecentWinner();
        const Fee = await Contract.getEntranceFee();

        setPlayers(noOfPlayers.toString());
        setFund(web3.utils.fromWei(bal.toString(), "ether"));

        // Just modidfying the address so that it looks nicer

        const prefix = Winner.toString().substring(0, 5);
        const suffix = Winner.toString().substring(Winner.toString().length - 4);
        setWinner(`${prefix}....${suffix}`);
        setFee(web3.utils.fromWei(Fee.toString(), "ether"));
      } else {
        setPlayers("0");
        setFund("Error");
        setWinner("Error");
        setFee("Error")
      }
    };

    fetchNoOfPlayers();
  }, [Contract]);


  // ---------------Enter lottery function logic---------------------
  const handleClick = async () => {
    try {
      const enteredValue = window.prompt("Enter amount in ETH"); // Prompt the user to enter the amount in ETH
      
      if (enteredValue && window.ethereum) {
       
        const valueInWei = web3.utils.toWei(enteredValue.toString(), "ether");
       
        const transaction = await Contract.enterLottery({ value: valueInWei });

        await transaction.wait(3);
        handleNewNotification("success", "You have succesfully entered into the Lottery✔✅", "Transaction Successful");
        const noOfPlayers = await Contract.getNoofPlayers();
        const bal = await Contract.getBalance();

        setPlayers(noOfPlayers.toString());
        setFund(web3.utils.fromWei(bal.toString(), "ether"));
      }
    } catch (error) {
      
      if (typeof(error.revert) != 'undefined') {
        handleNewNotification("error", error.revert.args[0], "Transaction Failed💀💀");
      }
    }
  };


  const dispatch = useNotification();

  const handleNewNotification = (type, msg, title) => {
    dispatch({
      type,
      message: msg,
      title: title,
      dismissAfter: 3000,
      dismissAfter: 60000,
      position: "topR",
    });
  };

  return (
    <>
      <div className="centered-container">
        <h1 className="heading">Players # {players}</h1>
      </div>

      <div className="centered-container">
        <div className="card">
          <h1><span className="entry-fee">{`Entry Fee: `}</span>
          <span className='fee'>{`${fee} SepETH`}</span></h1>
          <h1>
            <span className='fund1'>{`Fund: `}</span>
          <span className='fund2'>{`${fund=="0."? (0):(fund)} SepETH`}</span>
          </h1>
          <button className="button" onClick={handleClick}>
            Enter Lottery
          </button>
        </div>
      </div>
      <h1 className='last'>{`LastWinner: ${winner}🎈🎈`}</h1>
    </>
  );
};

export default Enter;
