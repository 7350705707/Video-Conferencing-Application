import { createContext, useContext, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";




export const AuthContext = createContext({});
    

// Set the base URL for axios requests
const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});



export const AuthProvider = ({children}) => {

    const authContext = useContext(AuthContext);
    const [userData, setUserData] = useState(authContext);

  


    const handleRegister = async (fullname, username, password) => {
   
            const response = await client.post('/users/register', {name: fullname, username, password});
            return response;
     
    };



    const handleLogin = async (username, password) => {
     
            const response = await client.post('/users/login', {username, password});
            return response;
       
    };

    const router = useNavigate();

    const getHistoryOfUser = async () => {
        try {
            const response = await client.get('/users/get_all_activity', { params: { token: localStorage.getItem('token') } });
            return response.data.meetings;
        } catch (error) {
            console.error("Error fetching user history:", error);
            return [];
        }
    };


    const addHistoryOfUser = async (meetingId) => {
        try {
            const response = await client.post('/users/add_to_activity', { token: localStorage.getItem('token'), meetingId });
            return response.data;
        } catch (error) {
            console.error("Error adding to user history:", error);
            return null;
        }
    };

  const data = {
       userData,
       setUserData,
       addHistoryOfUser,
       handleLogin,
       handleRegister,
       getHistoryOfUser
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};
