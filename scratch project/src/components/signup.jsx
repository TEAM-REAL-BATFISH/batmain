import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const signup = async (e) => {
    e.perventDefault()
    const {username, email, password, confirmPassword} = data;
    try {
      const {data} = await axios.post('/signup', {
        username, email, password, confirmPassword
      })
      if (password !== confirmPassword) {
        toast.error('Password not match, try again')
      }
      else if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Signup Successful. Welcome!')
        navigate('/home')
      }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input type='text' placeholder='Name...' value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
        <label>Email</label>
        <input type='email' placeholder='Email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
        <label>Password</label>
        <input type='password' placeholder='Password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
        <label>Confirm Password</label>
        <input type='text' placeholder='Confirm Password...' value={data.confirmPassword} onChange={(e) => setData({...data, confirmPassword: e.target.value})}/>
        <button type='submit' className="submit-btn">Submit</button>
      </form>
    </div>
  )
}
