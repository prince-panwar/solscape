"use client";
import React, { useState } from 'react';
import { useUserContext } from '../../../context/userContext';

const Form = () => {
    const { verifyUser } = useUserContext();
    const [user, setUser] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the page reload
        verifyUser(user);   // Call verifyUser with the entered username
    };

    return (
        <>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input 
                            type="text" 
                            value={user} 
                            onChange={(e) => setUser(e.target.value)} 
                            placeholder="Enter username to verify" 
                        />
                    </div>
                    <div className="description">
                        <p>!! Case sensitive, !! Use _ for space bar
                        (Example: YouR UsErname = YouR_UsErname)</p>
                    </div>
                    
                    <div className="btn">
                        <img src="./assets/images/Button.png" alt="" />
                        <button type="submit">Enter</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Form;
