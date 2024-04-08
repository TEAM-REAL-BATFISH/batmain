import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast'
import Login from './components/login';
import SignUp from './components/signup';
import Home from './components/home';
import MainPage from './components/mainpage'

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:5173';

function App() {
  return (
    <>
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={ <Login /> }/>
          <Route path='/mainpage' element={ <MainPage /> }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

{/* <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p> */}

      //   <p className="read-the-docs">
      //   Click on the Vite and React logos to learn more
      // </p>