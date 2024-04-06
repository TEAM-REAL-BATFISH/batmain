import express from 'express';
import path from 'path';
import cors from 'cors';
import userController from './controllers/userController.js'
import cookieController from './controllers/cookieController.js'
import cookieParser from 'cookie-parser';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const currentDir = new URL('.', import.meta.url).pathname;

app.use(express.static(path.resolve(currentDir, '../index.html')));

// this is home page v
app.get('/', (req, res) => { 
    //   return res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
    res.send('Yahooooo Bat fish')
    });
    
app.post('/signup', userController.signup, cookieController.setCookie, (req, res) => {
    // console.log(res.locals.user.username)
    res.status(201).json({ message: 'User successfully created' });
})

app.post('/login', userController.login, cookieController.setCookie, (req, res) => {
    res.status(200).json({ message: `Login successful: ${res.locals.user}`}); 
})



app.use('/logout', cookieController.deleteCookie, (req, res) => {
    res.redirect('/');
})

// they have a /profile on front end that renders bell and whistles
app.post('/profile', (req, res) => {
    res.send('Profile wooooo!');
})

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
    });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

export default app;

