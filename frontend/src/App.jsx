import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Authentication from './pages/Authentication'
import { AuthProvider } from './contexts/AuthContext'
import VideoMeet from './pages/VideoMeet'
import HomeComponent from './pages/Home'
import History from './pages/History'

function App() {


  return (
    <div className="App">
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/home' element={<HomeComponent />} />
        <Route path='/history' element={<History />} />
        <Route path='/auth' element={<Authentication />} />
        <Route path="/:url" element={<VideoMeet />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      </AuthProvider>
    </Router>
    </div>
  )
}

export default App
