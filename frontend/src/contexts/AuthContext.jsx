import React, { createContext, useContext } from 'react';
import axios from 'axios';
import httpStatus from 'http-status';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});
    const client = axios.create({
      baseURL: `http://localhost:8000/api/v1/users`,
    })

    export const AuthProvider = ({ children }) => {
        const authContext = useContext(AuthContext);
        const [userData, setUserData] = React.useState(authContext);
        const handleRegister = async(name,username,email, password,confirmPassword) => {
            try {
                let Request = await client.post('/register', {
                   name: name,
                   username: username,
                   email: email,
                   password: password,
                   confirmPassword: confirmPassword
                })
                if(Request.status === httpStatus.CREATED){
                    return Request.data.message;
                }
            }catch (error) {
                throw error;
        }
    }
    const handleLogin = async (email, password) => {
        try{
            let Request = await client.post('/login', {
                email: email,
                password: password
            })
            if(Request.status === httpStatus.OK){
                localStorage.setItem('token', Request.data.token);
                router("/home");

            }
        }catch (error) {
            throw error;
        }
    }
     const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
        } catch
         (err) {
            throw err;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }
        const router = useNavigate();

        const data = {
            userData, setUserData,addToUserHistory,getHistoryOfUser,handleRegister,handleLogin
        }
    
  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
}
