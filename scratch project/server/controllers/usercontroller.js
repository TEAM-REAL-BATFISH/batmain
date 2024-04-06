import bcrypt from 'bcrypt';
import { db, hashPassword } from '../models/models.js'; // Make sure this points to your database configuration file

const userController = {
  // Signup Controller
  signup: async (req, res, next) => {
            const { username, password, email } = req.body;

            try {
                // Hash the password
                const hashedPassword = hashPassword(password);
                
                // Store user in the database
                const insertQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
                const { rows } = await db.query(insertQuery, [username, email, hashedPassword]);
    
                const newUser = rows[0];
                console.log('User created:', newUser); // For debugging, remove or secure log for production
                
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
    
            try {
                // Query the database for the user by username
                const query = 'SELECT * FROM users WHERE username = $1';
                const { rows } = await db.query(query, [username]);
    
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
                res.status(200).json({ message: 'Login successful' });
                next();
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
