import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
    try {
      const {data} = await axios.post('/signup', {
        name, username, email, password
      })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Signup Successful. Welcome!')
        navigate('/login')
      }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className='container'>
      <iframe
      title="Background Video"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/qdMh-1Mqqes?start=0&amp;end=17"
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
      ></iframe>
      <h1>Event Listener</h1>  
      <form onSubmit={signup} className='signup'>
        <label>Name</label>
        <input type='text' placeholder='Name...' value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
        <label>UserName</label>
        <input type='text' placeholder='User Name...' value={data.username} onChange={(e) => setData({...data, username: e.target.value})}/>
        <label>Email</label>
        <input type='email' placeholder='Email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
        <label>Password</label>
        <input type='password' placeholder='Password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
        <label>Confirm Password</label>
        <input type='password' placeholder='Confirm Password...' value={data.confirmPassword} onChange={(e) => setData({...data, confirmPassword: e.target.value})}/>
        <button type='submit' className="submit-btn">Submit</button>
      </form>
      <footer>"Copyright © [2024] BatFish Inc. All rights reserved."</footer>
    </div>
  )
}
