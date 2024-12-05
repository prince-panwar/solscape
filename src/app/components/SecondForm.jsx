import React, { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
const SecondSec = () => {
    const [showPopup, setShowPopup] = useState(false); // Popup state
    const [showResultPopup, setShowResultPopup] = useState(false); // Result popup state
    const [depositResult, setDepositResult] = useState(''); // Success or failure result

    const data = [
        { username: 'Sha', amount: '100K', claimed: 'Yes' },
        { username: 'Alex', amount: '200K', claimed: 'No' },
        { username: 'Jordan', amount: '50K', claimed: 'Yes' },
        { username: 'Sha', amount: '100K', claimed: 'Yes' },
        { username: 'Alex', amount: '200K', claimed: 'No' },
        { username: 'Jordan', amount: '50K', claimed: 'Yes' },
        { username: 'Sha', amount: '100K', claimed: 'Yes' },
        { username: 'Alex', amount: '200K', claimed: 'No' },
        { username: 'Jordan', amount: '50K', claimed: 'Yes' },
        { username: 'Sha', amount: '100K', claimed: 'Yes' },
        { username: 'Alex', amount: '200K', claimed: 'No' },
        { username: 'Jordan', amount: '50K', claimed: 'Yes' },
        { username: 'Sha', amount: '100K', claimed: 'Yes' },
        { username: 'Alex', amount: '200K', claimed: 'No' },
        { username: 'Jordan', amount: '50K', claimed: 'Yes' },
    ];

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




    const handleConfirmDeposit = () => {
        setShowPopup(false); // Close confirmation popup
        setDepositResult(Math.random() > 0.5 ? 'Success' : 'Failed'); // Randomly set deposit result
        setShowResultPopup(true); // Show result popup
    };

    const handlePopupClose = () => setShowPopup(false); // Close confirmation popup
    const handleResultPopupClose = () => setShowResultPopup(false); // Close result popup

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
                                placeholder="Enter amount to deposit"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
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
                                    <td>{item.claimed}</td>
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
                        <h2>Do you want to deposit 100 $scape?</h2>
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
        </>
    );
};

export default SecondSec;
