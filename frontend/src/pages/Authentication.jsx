import React from 'react'
import { AuthContext } from '../contexts/AuthContext';
import {status} from "http-status";

import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {

    const navigate = useNavigate();

    const [userData, setUserData] = React.useState({
        username: '',   
        fullname: '',
        password: '',
    });

    const [error, setError] = React.useState('');
    const [messages, setMessages] = React.useState('');

    const [open, setOpen] = React.useState(false);

    const [isLogin, setIsLogin] = React.useState(true);

    const {username, password, fullname} = userData;  


    const {handleRegister, handleLogin} = React.useContext(AuthContext);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUserData((prevData) =>{
            return {
                ...prevData,
                [name]: value
            }
        });
    }


    const handleAuth = async (e) => {
        e.preventDefault();
            if(isLogin){
                // Handle login
            try {
                const result = await handleLogin(username, password);
                if (result?.status === status.OK) {
                    // console.log(result);
                    setUserData(result?.data);
                    localStorage.setItem('token', result?.data?.token);
                    setMessages(result.data?.message || "Login successful");
                    setOpen(true);
                    setUserData({
                        username: '',
                        fullname: '',
                        password: '',
                    });
                    navigate('/home');
                }
            } catch (err) {
                // console.log("Login exception:", err);
                setError(err?.response?.data?.error || "Login failed. Please try again.");
                setOpen(true);
            }
            } else {
                // Handle signup
                try{
                         const result = await handleRegister(fullname, username, password);
            
                setMessages(result?.data?.message || result.error);
                setOpen(true);
                setUserData({
                        username: '',
                        fullname: '',
                        password: '',
                    });
                } catch (err) {
                    // console.log("Signup exception:", err);
                    setError(err?.response?.data?.error || "Signup failed. Please try again.");
                    setOpen(true);
                }
               
            }
      
    }


  return (
    <div className='authenticationPage'>
        <div className='authenticationContent'>
            <div className='authenticationHeading'>
            {isLogin ? <h1>Login</h1> : <h1>Sign Up</h1>}
            <p>This is where users can log in or sign up.</p>
        </div>
        <form className='authenticationForm'>

             <div className='inputContainer'>
            <label className='inputLabel' htmlFor='username'>Enter your Name</label>
            <input type="text" placeholder="Name" id="username" name="username" value={username} onChange={handleChange} autoComplete="username" />
            </div>

           
            {!isLogin && (
                 <div className='inputContainer'>
                <label className='inputLabel' htmlFor='fullname'>Enter your Full Name</label>
            <input type="text" placeholder="Full Name" id="fullname" name="fullname" value={fullname} onChange={handleChange} autoComplete="name" />
            </div>
            )}

            <div className='inputContainer'>
                <label className='inputLabel' htmlFor='password'>Enter your Password</label>
                <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={handleChange} autoComplete={isLogin ? "current-password" : "new-password"} />
            </div>
           
            <button onClick={handleAuth}>{isLogin ? 'Log In' : 'Sign Up'}</button>

            { isLogin ? (
                <p className='toggleText'>Don't have an account? <span className='toggleLink' onClick={() => setIsLogin(false)}>Sign Up</span></p>
            ) : (
                <p className='toggleText'>Already have an account? <span className='toggleLink' onClick={() => setIsLogin(true)}>Log In</span></p>
            )} 
        </form>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
            message={error || messages}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
        </div>
        
    </div>
  )
}

export default Authentication