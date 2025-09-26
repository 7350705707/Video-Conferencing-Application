import React from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import style from '../styles/Home.module.css'
import  IconButton  from '@mui/material/IconButton';
import RestoreIcon from '@mui/icons-material/Restore';
import { Button, TextField } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const HomeComponent = () => {
    const { addHistoryOfUser } = useContext(AuthContext);

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = React.useState("");

    let handleJoinVideoCall = async() => {
        await addHistoryOfUser(meetingCode);
        navigate(`/${meetingCode}`);
    }


  return (
   <>
    <div className={style.navbar}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <h2 style={{margin: '0', color: 'black'}}>Apna Video Call</h2>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <IconButton onClick={() => navigate('/history')} color='primary' aria-label="History" component="span">
                    <RestoreIcon />
                    <p>History</p>
                </IconButton>

                <Button onClick={() => {
                    localStorage.removeItem('token');
                    navigate('/auth');
                }} variant='outlined' color='error'>Logout</Button>
            </div>

           
    </div>
     <div className={style.meetContainer}>
                <div className={style.leftPanel}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', alignItems: 'center'}}>
                        <h2>Providing Quality Video call just like Quality Education</h2>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <TextField value={meetingCode} onChange={(e) => setMeetingCode(e.target.value)} label="Enter Meeting Code" variant="outlined" />
                            <Button onClick={handleJoinVideoCall} variant='contained' color='primary'>Join</Button>

                        </div>
                    </div>
                </div>
                <div className={style.rightPanel}>
                    <img  src="/undraw_calling_ieh0.svg" alt="video call" />
                </div>
            </div>
   </>
  )
}

export default withAuth(HomeComponent);