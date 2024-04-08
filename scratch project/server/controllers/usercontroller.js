import bcrypt from 'bcrypt';
import { db, hashPassword } from '../models/models.js'; // Make sure this points to your database configuration file

const userController = {
  // Signup Controller
  signup: async (req, res, next) => {
            const { name, username, password, email } = req.body;
            // console.log(req.body)
            try {
                console.log(hashPassword);

                // Hash the password
                const hashedPassword = await hashPassword(password);

                console.log(hashedPassword);
                
                // Store user in the database
                const insertQuery = 'INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
                const { rows } = await db(insertQuery, [name, username, email, hashedPassword]);
    
                const newUser = rows[0];
                console.log('User created:', newUser); // For debugging, remove or secure log for production

                //save userID and username;
                res.locals.user = newUser.username;
                res.locals.id = newUser.id;
                
                return next();
            } catch (error) {
                console.error('Signup error:', error);
                next({
                    log: 'Error in userController.signup',
                    status: 500,
                    message: { err: 'An error occurred during signup' },
                });
            }
        },
    
        // Login Controller
        login: async (req, res, next) => {
            const { username, password } = req.body;
    
            console.log('username,:', username);
            console.log('dbquery:', db);
            console.log('req.body:', req.body);
            try {
                // Query the database for the user by username
                const query1 = 'SELECT * FROM users WHERE username = $1';
                console.log('query1:', query1)
                const { rows } = await db(query1, [username]);
    
                // If no user is found
                if (rows.length === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }
    
                // User found, check the password
                const user = rows[0];
                const isMatch = await bcrypt.compare(password, user.password);
    
                if (!isMatch) {
                    // Passwords do not match
                    return res.status(400).json({ message: 'Invalid credentials' });
                }
    
                // Successful login
                res.locals.user = user.username; // Optionally store user info in res.locals for subsequent middleware
                res.locals.id = user.id; //stores user ID
                
                return next();
            } catch (error) {
                console.error('Login error:', error);
                next({
                    log: 'Error in userController.login',
                    status: 500,
                    message: { err: 'Error in userController.login' },
                });
            }
        }
    };

    

export default userController;
