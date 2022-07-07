import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// Routes
import books from './routes/books.js'
import authors from './routes/authors.js'
import user from './routes/user.js'
// Dotenv to Use .env files
dotenv.config();
// Intializing App 
const app = express();
// Cors to make to request to different Domain
app.use(cors());
// Convert responses ot JSON
app.use(express.json());
// Checking If App is Working or Not
app.get('/', (req, res) => { res.send('App is Running') });
// Routes
app.use('/books', books);
app.use('/authors', authors);
app.use('/user', user);
// Port
const PORT = process.env.PORT;
// DB Connection String
const CONNECTION_URL = process.env.CONNECTION_URL;
// Connecting to database
mongoose.connect(CONNECTION_URL)
    .then(() => { app.listen(PORT, () => { console.log(`Server is Listening on Port: ${PORT}`) }) })
    .catch((error) => { console.log(error) });

