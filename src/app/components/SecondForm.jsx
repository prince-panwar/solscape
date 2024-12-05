import React, { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useUserContext } from '../../../context/userContext';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
const SecondSec = () => {
    const [showPopup, setShowPopup] = useState(false); // Popup state
    const [showResultPopup, setShowResultPopup] = useState(false); // Result popup state
    const [showFailedPopup, setShowFailedPopup] = useState(false); // Result popup state
    const [depositResult, setDepositResult] = useState(''); // Success or failure result
    const [depositAmount, setDepositAmount] = useState(0); // Deposit amount
    const {publicKey} = useWallet();
    const {username,id} = useUserContext();
    
    const [data, setData] = useState([]); // Deposit data

    const getDeposits = async () => {
        try {
          const response = await axios.get("/api/getDeposit"); // Replace with your correct API endpoint
          setData(response.data); // Set fetched data to the state
          console.log("Deposits fetched:", response.data);
        } catch (error) {
          console.error("Error fetching deposits:", error.response ? error.response.data : error.message);
        }
      };
    
      
      useEffect(() => {
        const interval = setInterval(() => {
          getDeposits(); // Fetch deposits every second
        }, 10000);
    },[])
    

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
      
          // Prepare request body
          const body = {
            username,
            amount: parseFloat(depositAmount),
            address: publicKey.toString(),
            id: id.toString(), // Convert BigInt to string
          };
      
          console.log("Sending request:", body);
      
          // API request
          const res = await axios.post('/api/deposit', body);
      
          console.log("Deposit successful:", res.data);
          setDepositResult("Success");
          setShowPopup(false);
          setShowResultPopup(true);
        } catch (err) {
          console.error(
            "Error making deposit:",
            err.response ? err.response.data : err.message
          );
          setDepositResult("Failed");
          setShowPopup(false);
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
                            <h2>1000$ scape</h2>
                        </div>
                        <div className="i-cont b-2">
                            <h1>Total Deposited</h1>
                            <h2>0$ scape</h2>
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
                                    const value = e.target.value;
                                
                                    // Validate that the input is a number (or empty for clearing)
                                    if (!isNaN(value) && /^[0-9]*$/.test(value)) {
                                      setDepositAmount(value); // Update the state if it's a valid number
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
                            <div className="p-btn yes" onClick={handleConfirmDeposit}>
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
