import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'

export default function SignUp() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const signup = async (e) => {
    e.preventDefault()
    const {name, username, email, password, confirmPassword} = data;
    if (confirmPassword !== password) {
        toast.error('Password not match, try again')
      }
    console.log('hello');
    try {
      const {data} = await axios.post('/signup', {
        name, username, email, password
      })

      console.log(data);

      if (data.status === 400){
        toast.error('Username or email already exists');
      }

    //   if (name === null || username === null || email === null || password === null) {
    //     toast.error('Need fill in the input feilds')
    //   }
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Signup Successful. Welcome!')
        navigate('/login')
      }
    } catch (error) {
      if (error.response && error.response.status === 400){
        toast.error('Email/Username already in use');
        console.error('Email/Username error', error.response.data.error)
      } else {
        console.log(error)
      }

    }
  }

  useEffect(() => {
    const video = document.querySelector('.container video');
    video.playbackRate = 0.70; 
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  return (
    <div className='container'>
      <video autoPlay muted loop>
        <source src='/src/assets/EDC Las Vegas Video.mp4' type='video/mp4' />
      </video>
      <h1>Event <span className='text-color-change'>List</span>ener</h1>
      <div className='signup-text-background-box'>
        <form onSubmit={signup} className='signup'>
          <label>Name</label>
          <input type='text' placeholder='   Full Name' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
          <label>UserName</label>
          <input type='text' placeholder='   Username' value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
          <label>Email</label>
          <input type='email' placeholder='   Email Address' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
          <label>Password</label>
          <input type='password' placeholder='   Password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
          <label>Confirm Password</label>
          <input type='password' placeholder='   Confirm Password' value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />
          <button type='submit' className="submit-btn">Submit</button>
        </form>
      </div>
      <footer>"Copyright © [2024] BatFish Inc. All rights reserved."</footer>
    </div>
  );
}
