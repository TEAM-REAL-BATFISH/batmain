//import necessary libraries
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//import routers
import eventsRouter from './routers/eventRouter.js'

//import controllers
import userController from './controllers/userController.js'
import cookieController from './controllers/cookieController.js'

// set initial parameters
const PORT = 3000;
const app = express();
const currentDir = new URL('.', import.meta.url).pathname;

// configure middleware for express
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(cookieParser());

// set routes
app.use(express.static(path.resolve(currentDir, '../index.html')));
app.use('/editEvent', eventsRouter);


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

// invalid request route
app.use('*', (req,res) => {
    res.status(404).send('Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    res.status(errorObj.status).json(errorObj.message);
    return next();
    });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

export default app;

// if user is logged in, they should not have access to log in or sign up page

