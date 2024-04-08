import React, { useEffect } from 'react'
import { Link } from "react-router-dom"


export default function Home() {
  useEffect(() => {
    const video = document.querySelector('.landingPage-container video');
    video.playbackRate = 0.80; 
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  return (
    
    <div className='landingPage-container'>
      
    <video autoPlay muted loop>
      <source src='/src/assets/friends at bar background stock free video.mp4' type='video/mp4'></source>
    </video>
    <div className="text-background-box">
      <p className='landingpage-header'>Event <span className="text-color-change">List</span>ener</p>
      <p className='landingpage-header-descriptions'>Unlock the gateway to effortless event attendance with our seamless platform, granting you instant access to a myriad of captivating experiences, all conveniently at your fingertips.</p>
    </div>
      <nav className="landing-page-tabs">
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </nav> 
      <footer className='landing-page-footer'>Copyright © [2024] BatFish Inc. All rights reserved.</footer>
    </div>
  )
}
