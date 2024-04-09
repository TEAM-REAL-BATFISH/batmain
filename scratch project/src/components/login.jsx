import {useEffect, useState} from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const login = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const { data } = await axios.post('/login', {
                email,
                password
            });
            if (data.error){
                toast.error(data.error)
            } else {
                setData({})
                navigate('/mainpage')
            }
        } catch (error) {
            if (error.response && error.response.status === 404){
                toast.error('Email not found');
                console.error('Email not found error', error.response.data.error)
            } else if (error.response && error.response.status === 400) {
                toast.error('Password does not match');
                console.error('Password does not match error', error.response.data.error)
            } else {
                console.log(error)
            }
        }
    
    }

    const navSignUp = () => {
        navigate('/signup');
    };

    useEffect(() => {
        const video = document.querySelector('.login-container video');
        video.playbackRate = 0.70; 
      }, []); // Empty dependency array ensures the effect runs only once after the component mounts
    
    return (
        <div>
        <div className="login-container">
            <video autoPlay muted loop>
                <source src='/src/assets/Gokart stock footage.mp4' type='video/mp4'></source>
            </video>
            <h1>Event <span>List</span>ener</h1>
            <form className="login-form" onSubmit={login}>
                <label htmlFor="email">Email</label>
                <input value={data.email} onChange={(e) => setData({...data, email: e.target.value})} type="email" placeholder="youremail@mail.com" id="email" name="email"/>
                <label htmlFor="password">Password</label>
                <input value={data.password} onChange={(e) => setData({...data, password: e.target.value})} type="password" placeholder="*******" id="password" name="password"/>
                <button type="submit">Log In</button>
            </form>
            <button onClick={navSignUp}>Don't have an account? Register here.</button>
        </div> 
        <div>
        <footer className='footer-login'>Copyright © [2024] BatFish Inc. All rights reserved.</footer>
        </div>
        </div>
    )
}