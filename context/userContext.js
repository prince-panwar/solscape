'use client'
import React, { createContext, useContext, useState } from 'react';
import axios from "axios";

// Create the context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  
  const [username, setUsername] = useState('');
  // Initialize id as a string to store BigInt
  const [id, setId] = useState('');

  const verifyUser = async (username) => {
    try {
      console.log("Verifying username:", username);
     
  
      // Fetch user verification from API
      const res = await axios.get("/api/userVerification", {
        params: { username },
      });
      const data = res.data; // Axios automatically parses the JSON response
      console.log("User verification data:", data);
  
      if (data.length > 0) {
        // Assuming the ID is returned as a string from your API
        setId(BigInt(data[0].id));
        setUsername(username);
        console.log("User exists with ID:", BigInt(data[0].id));
      } else {
        console.log("User not found. Adding new user...");
  
        // Add new user if not found
        const response = await axios.post("/api/addUser", {
          username,
        });
        const newUser = response.data; // Axios automatically parses the JSON response
        console.log("New user created:", newUser);
  
        // Set the ID of the newly created user
        setId(BigInt(newUser.id));
        setUsername(username);
        console.log("New user ID:", BigInt(newUser.id));
      }
    } catch (error) {
      console.error("Error in verifyUser:", error);
      throw error; // Optionally re-throw to handle errors at a higher level
    }
  };
  

  return (
    <UserContext.Provider value={{ username, id, verifyUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the context
export const useUserContext = () => useContext(UserContext);