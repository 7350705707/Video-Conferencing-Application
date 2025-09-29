import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className='landingPageContainer'>
      
      <nav className='navBar'>
        <div className='navHeader'>
          <h2>My Video Call</h2>
        </div>
        <div className='navList'>
            <p onClick={() => navigate(`/meet/${Math.random().toString(36).substring(2, 15)}`)}>Join as Guest</p>
            <p onClick={() => navigate("/auth")}>Register</p>
            <div role='button'>
              <p className='login' onClick={() => navigate("/auth")}>Login</p>
            </div>
        </div>
      </nav>

      <div className='landingMainContainer'>
        <div className='leftContainer'>
          <h1><span style={{color:'orange'}}>Connect</span> with your loved ones</h1>
          <p>Cover distance by <span style={{color:'orange'}}>My Video Call</span></p>
          <div role='button' >
            <Link className='getStarted' to="/auth">Get Started</Link>
          </div>
        </div>
        <div className='rightContainer'>
          <img src="./public/MobileImage.png" alt="" />
        </div>
      </div>
        
    </div>
  )
}

export default LandingPage