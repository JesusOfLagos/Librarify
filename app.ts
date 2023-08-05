

// Import modules
import session from 'express-session';
import express, { Application, Request, Response } from 'express';
import { connect } from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
// import bodyParser from 'body-parser';
// const session = require('express-session');
// const cors = require('cors');
const bodyParser = require('body-parser');
import passport from 'passport';
import socketio, { Server as SocketIOServer, Socket } from 'socket.io';

import env from 'dotenv';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();


// ... Rest of the code ...
const UserRoutes = require('./Routes/Auth/user')


// Import routes
// import UserRoutes from './Routes/users';
// import MessagesRoutes from './Routes/messages';

// Create express app
const app: Application = express();
const server: http.Server = http.createServer(app);
// const io: SocketIOServer = socketio(server);
const io: SocketIOServer = new SocketIOServer(server);


// Middleware
app.use(express.json());
// app.use(morgan('dev'));
app.use(cors({ origin: 'https://localhost:5000', credentials: true }));
app.use(
  session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/', UserRoutes);
// app.use('/', MessagesRoutes);

// Connect to the database
// Import dotenv config


// ... Other imports and middleware ...

// Connect to the database
async function connectToDB() {
    try {
      const mongoURI = process.env.MONGO_URI ?? '';
      await connect(mongoURI, {});
      console.log('DB Connection was successful');
    } catch (err) {
      console.error('Oops!, an error occurred!', err);
    }
  }
  

// Call the connectToDB function
connectToDB();


// Port
const port: number = Number(process.env.PORT) || 8090;



// Socket.IO connection handling
io.on('connection', (socket: Socket) => {
    console.log('A user connected');
  
    // ... (rest of your socket.io code)
  });
  
  // Listener
  server.listen(port, () => {
    // if (err) {
    //   console.log(err);
    // }
    console.log(`Server Is Running on Port ${port}`);
  });


