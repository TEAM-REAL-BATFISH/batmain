import express from 'express';
import path from 'path';
import cors from 'cors';
import userController from './controllers/userController.js'

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

const currentDir = new URL('.', import.meta.url).pathname;

app.use(express.static(path.resolve(currentDir, '../index.html')));

// this is home page v
app.get('/', (req, res) => { 
    //   return res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
    res.send('Yahooooo Bat fish')
    });
    
app.post('/signup', userController.signup, (req, res) => {
    // console.log(res.locals.user.username)
    res.status(201).json({ message: 'User successfully created' });
})

app.post('/login', userController.login, (req, res) => {
    res.json({ message: `Login successful: ${res.locals.user}`}); 
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

