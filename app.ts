
// Import modules
import session from 'express-session';
import express, { Application, Request, Response } from 'express';
import { connect } from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import UserRoutes from './Routes/Auth/user';
import passport from 'passport';
import socketio, { Server as SocketIOServer, Socket } from 'socket.io';
import env from 'dotenv';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
// Import routes
console.log(process.env.MONGO_URI)
// Create express app
const app: Application = express();
// const server: http.Server = http.createServer(app);
// const io: SocketIOServer = new SocketIOServer(server);


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
// app.use('/', BookRoutes);


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

// Port
const port = process.env.PORT || 8000;

  
  // Listener

  app.listen(port, () => {
    console.log(`Server Is Running on Port ${port}`);
  });

  connectToDB();

