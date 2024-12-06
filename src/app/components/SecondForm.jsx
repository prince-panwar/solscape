import React, { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useUserContext } from '../../../context/userContext';
import { useConnection,useWallet } from '@solana/wallet-adapter-react';
import {
    PublicKey,
    Transaction,
  } from "@solana/web3.js";
  import {
    getAssociatedTokenAddress,
    createTransferInstruction,
    getAccount,
  } from "@solana/spl-token";
import axios from 'axios';
const SecondSec = () => {
    const { connection } = useConnection();
    const [showPopup, setShowPopup] = useState(false); // Popup state
    const [showResultPopup, setShowResultPopup] = useState(false); // Result popup state
    const [showFailedPopup, setShowFailedPopup] = useState(false); // Result popup state
    const [depositResult, setDepositResult] = useState(''); // Success or failure result
    const [depositAmount, setDepositAmount] = useState(0); // Deposit amount
    const [totalDeposit, setTotalDeposit] = useState(0); // Total deposited amount
    const { publicKey, sendTransaction } = useWallet();
    const [showProcessingPopup, setShowProcessingPopup] = useState(false);
    const [userBalance , setUserBalance] = useState(0);
    const {username,id} = useUserContext();
    const [data, setData] = useState([]); // Deposit data
    const TOKEN_MINT_ADDRESS = "GykqHYHrB6STA6FzFNVX23xTqtXLd2hrKbaRSqJk2DaB";
    const RECIPIENT_ADDRESS = "2Xr97rSXucKqxxBo9GMrY6Av8W4no1sWibUEmUkBhZ2x"; 









    const getDeposits = async () => {
        try {
          const response = await axios.get("/api/getDeposit"); // Replace with your correct API endpoint
          setData(response.data); // Set fetched data to the state
          
        } catch (error) {
          console.error("Error fetching deposits:", error.response ? error.response.data : error.message);
        }
      };
    
      
      useEffect(() => {
        if (!publicKey) {
          // Wallet not connected, do nothing
          return;
        }
      
        // Wallet connected, fetch data
        getDeposits();
        fetchSenderTokenBalance();
        fetchTotalDeposited();
      
        // Set an interval to fetch data every 10 seconds
        const interval = setInterval(() => {
          getDeposits();
          fetchSenderTokenBalance();
          fetchTotalDeposited();
        }, 10000);
      
        // Cleanup the interval when the component is unmounted or wallet disconnects
        return () => clearInterval(interval);
      }, [publicKey]); 
      
      const fetchSenderTokenBalance = async () => {
        try {
          if (!publicKey) {
            throw new Error("Wallet not connected");
          }
      
          // Parse the token mint address
          const tokenMint = new PublicKey(TOKEN_MINT_ADDRESS);
      
          // Get the sender's associated token account
          const senderTokenAccount = await getAssociatedTokenAddress(tokenMint, publicKey);
      
          // Fetch account details
          const tokenAccount = await getAccount(connection, senderTokenAccount);
      
          // Return the balance (amount is in smallest unit of the token)
          const balance = tokenAccount.amount; // Balance is a BigInt
          const decimals = 9; // Replace with the actual decimals of your token
         const readableBalance = Number(balance) / 10 ** decimals;
         setUserBalance(readableBalance);
         console.log(`Token balance: ${balance}`);
          return balance;
        } catch (error) {
          console.error("Failed to fetch token balance:", error);
          throw error;
        }
      };
      const fetchTotalDeposited = async () => {
        try {
          if (!publicKey) {
            throw new Error("Wallet not connected");
          }
      
          // Parse the token mint address
          const tokenMint = new PublicKey(TOKEN_MINT_ADDRESS);
          const recipientPublicKey = new PublicKey(RECIPIENT_ADDRESS);
          // Get the sender's associated token account
          const reciverTokenAccount = await getAssociatedTokenAddress(tokenMint, recipientPublicKey);
      
          // Fetch account details
          const tokenAccount = await getAccount(connection, reciverTokenAccount);
      
          // Return the balance (amount is in smallest unit of the token)
          const balance = tokenAccount.amount; // Balance is a BigInt
          const decimals = 9; // Replace with the actual decimals of your token
         const readableBalance = Number(balance) / 10 ** decimals;
         setTotalDeposit(readableBalance);
         console.log(`Token balance: ${balance}`);
          return balance;
        } catch (error) {
          console.error("Failed to fetch token balance:", error);
          throw error;
        }
      };

    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches; // Check if it's a mobile screen

        if (showPopup || showResultPopup) {
            document.body.style.overflow = 'hidden';
            // Apply padding-right only if it's not a mobile screen
            if (!isMobile) {
                document.body.style.paddingRight = '10px';
            }
        } else {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
        };
    }, [showPopup, showResultPopup]);


    const handleDepositClick = () => {
        const mobileQuery = window.matchMedia("(max-width: 768px)"); // Media query for mobile screens
        const scrollPosition = mobileQuery.matches ? 200 : 200; // Check if it's mobile, then set scroll position accordingly

        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth', // Smooth scrolling
        });

        setShowPopup(true); // Show confirmation popup
    };

    const handletokenTransfer = async () => {
        if (!publicKey) {
          alert("Please connect your wallet first!");
          return;
        }
        console.log("Public Key:", publicKey.toString());
        setShowProcessingPopup(true);
        try {
          // Parse inputs
          const recipientPubkey = new PublicKey(RECIPIENT_ADDRESS);
          const tokenMint = new PublicKey(TOKEN_MINT_ADDRESS);
          const lamports = Math.floor(Number(depositAmount) * 10 ** 9); // Adjust based on decimals
          console.log("Recipient Address:", recipientPubkey.toString());
      
          // Get the sender's associated token account
          const senderTokenAccount = await getAssociatedTokenAddress(tokenMint, publicKey);
          console.log("Sender Token Account:", senderTokenAccount.toString());
      
          // Get the recipient's associated token account
          const recipientTokenAccount = await getAssociatedTokenAddress(tokenMint, recipientPubkey);
      
          // Create the transfer instruction
          const transferInstruction = createTransferInstruction(
            senderTokenAccount, // Sender's token account
            recipientTokenAccount, // Recipient's token account
            publicKey, // Owner of the sender's token account
            lamports // Amount to transfer (in smallest unit of the token)
          );
      
          // Create the transaction
          const transaction = new Transaction().add(transferInstruction);
      
          // Get the latest blockhash for the transaction
          const { blockhash } = await connection.getLatestBlockhash();
          transaction.recentBlockhash = blockhash;
          transaction.feePayer = publicKey;
      
          // Sign and send the transaction
          const signature = await sendTransaction(transaction, connection);
          console.log("Transaction Signature:", signature);
      
          const latestBlockHash = await connection.getLatestBlockhash();

            await connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: signature,
            },"finalized"
        );
        await handleConfirmDeposit();
        } catch (error) {
          console.error("Transaction failed:", error);
          setDepositResult("Failed");
          setShowPopup(false);
          setShowProcessingPopup(false);
          setShowFailedPopup(true);
        }
      };
      
      


   const handleConfirmDeposit = async () => {
    try {
      // Validate inputs
      if (!username || !depositAmount || !publicKey || !id) {
        console.error("Missing required inputs for deposit");
        setDepositResult("Failed");
        setShowPopup(false);
        setShowFailedPopup(true);
        return;
      }
  
      // Prepare request body for database update
      const body = {
        username,
        amount: parseFloat(depositAmount),
        address: publicKey.toString(),
        id: id.toString(), // Convert BigInt to string
      };
  
      // After successful transfer, update the database
      console.log("Sending deposit request to API:", body);
      const res = await axios.post('/api/deposit', body);
  
      console.log("Deposit successful:", res.data);
      setDepositResult("Success");
      setShowPopup(false);
      setShowProcessingPopup(false);
      setShowResultPopup(true);
    } catch (err) {
      console.error(
        "Error during deposit process:",
        err.response ? err.response.data : err.message
      );
      setDepositResult("Failed");
      setShowPopup(false);
      setShowProcessingPopup(false);
      setShowFailedPopup(true);
    }
  };
  
      
    
    

    const handlePopupClose = () => setShowPopup(false); // Close confirmation popup
    const handleResultPopupClose = () => {setShowResultPopup(false); setShowFailedPopup(false)}; // Close result popup

    return (
        <>
            <div className="flex-cont">
                {/* Your existing structure */}
                <div className="form-1 f">
                    <div className="input-cont">
                        <div className="input first solbtn">
                           
                            <div className="inner-cont">
                                <img src="./assets/images/Sol.png" alt="" />
                                <h1>Solana</h1>
                            </div>
                        </div>
                        
                            <WalletMultiButton/>
                        
                    </div>
                    <div className="balance-cont">
                        <div className="i-cont b-1">
                            <h1>Balance</h1>
                            <h2>{`${(userBalance).toString().slice(0,13)}$ scape`}</h2>

                        </div>
                        <div className="i-cont b-2">
                            <h1>Total Deposited</h1>
                            <h2>{`${(totalDeposit).toString().slice(0,13)}$ scape`}</h2>
                        </div>
                    </div>
                    <div className="f-cont">
                        <div className="input-box">
                            <input
                                type="text"
                                value={depositAmount}
                                placeholder="Enter amount to deposit"
                                onChange={(e) => {
                                    // Extract the input value
                                    let value = e.target.value;

                                    // Validate that the input is a number (or empty for clearing)
                                    if (!isNaN(value) && /^[0-9]*$/.test(value)) {
                                      // If the value is "0", replace it with the new input
                                      if (depositAmount === "0") {
                                        value = value.replace(/^0+/, ""); // Remove leading zeros
                                      }
                                      setDepositAmount(value); 
                                    }
                                  }}
                                inputMode="numeric" // Optimizes keyboard for mobile devices
                            />
                        </div>

                        <div className="btn" onClick={handleDepositClick}>
                            <img src="./assets/images/Button.png" alt="" />
                            <button>Deposit</button>
                        </div>
                        <div className="btn btn-2 disable">
                            <img src="./assets/images/Button.png" alt="" />
                            <button className="wikiBtn">Wiki Tutorial </button><span><img src="./assets/images/Wiki.png" alt="" /></span>
                        </div>
                    </div>
                </div>
                <div className="form-1 s">
                    <table className="table">
                        <thead className="fixed">
                            <tr className="grid head">
                                <th>User name</th>
                                <th>Amount</th>
                                <th>Claimed</th>
                            </tr>
                        </thead>
                        <div className="tbody">
                            {data.map((item, index) => (
                                <tr className="grid" key={index}>
                                    <td>{item.username}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.claim?"Yes":"No"}</td>
                                </tr>
                            ))}
                        </div>
                    </table>
                </div>
            </div>

            {/* Confirmation Popup */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>`Do you want to deposit ${depositAmount} $scape?`</h2>
                        <div className="popBtn-cont">
                            <div className="p-btn yes" onClick={handletokenTransfer}>
                                <img src="./assets/images/Button.png" alt="" />
                                <button className='confirm'>Yes</button>
                            </div>
                            <div className="p-btn no" onClick={handlePopupClose}>
                                <img src="./assets/images/Button.png" alt="" />
                                <button className='cancel'>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Processing Popup */}
            {showProcessingPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Transaction is Processing...</h2>
                        <div className="loader-container">
                            <div className="spinner"></div>
                        </div>
                    </div>
                </div>
            )}


            {/* Result Popup */}
            {showResultPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Congrats!! <br /> Successfully deposited</h2>
                        <div className="p-btn" onClick={handleResultPopupClose}>
                            <img src="./assets/images/Button.png" alt="" />
                            <button>OK</button>
                        </div>
                    </div>
                </div>
            )}
            {showFailedPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Error!! <br /> Deposit Failed</h2>
                        <div className="p-btn" onClick={handleResultPopupClose}>
                            <img src="./assets/images/Button.png" alt="" />
                            <button>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SecondSec;
