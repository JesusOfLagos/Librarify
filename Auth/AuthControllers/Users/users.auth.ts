// import { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import multer from "multer";
// import cloudinary from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import Users from "../../Models/Users";
// import { LoginValidator, RegisterValidator } from "../../../Validators/Users/validators";
// // import jwt from "jsonwebtoken";
// import { config as dotenvConfig } from "dotenv";
// import path from "path";


// dotenvConfig();

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// // Set up multer storage with Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "Librarify-Profile-Pictures",
//     allowed_formats: ["jpg", "jpeg", "png"],
//     transformation: [{ width: 150, height: 150, crop: "thumb", gravity: "face" }],
//   },
// });

// const upload = multer({ storage: storage });

// // Create A User
// async function CreateUser(req: Request, res: Response) {
//   console.log(req.body);
//   const { errors, isValid } = RegisterValidator(req.body);

//   if (!req.file) {
//     return res.status(400).json({ message: "Please provide a valid image file" });
//   }

//   const imageUrl = req.file.path
//   const result = await cloudinary.uploader.upload(imageUrl, { folder: "Profile-Pictures" });

//   if (!isValid) {
//     res.json({ success: false, errors });
//   } else {
//     const { firstName, lastName, email, password } = req.body;
//     const registerUser = new Users({
//       firstName,
//       lastName,
//       userName: `${firstName} ${lastName}`,
//       email,
//       password,
//       profilePicture: result.secure_url,
//       createdAt: new Date(),
//     });

//     await bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(password, salt, (hashErr, hash) => {
//         if (err || hashErr) {
//           res.json({ message: "Error Occurred While Hashing", success: false });
//           return;
//         }

//         registerUser.password = hash;
//         registerUser.save().then(() => {
//           res.json({ message: "User Created Successfully", success: true });
//         });
//       });
//     });
//   }
// }

// // Login A User
// async function LoginUser(req: Request, res: Response) {
//   const { errors, isValid } = LoginValidator(req.body);

//   if (!isValid) {
//     res.json({ success: false, errors });
//   } else {
//     Users.findOne({ email: req.body.email }).then((user) => {
//       if (!user) {
//         res.json({ message: "Email not found", success: false });
//       } else {
//         bcrypt.compare(req.body.password, user.password).then((success) => {
//           if (!success) {
//             res.json({ message: "Invalid Password", success: false });
//           } else {
//             req.session.user = user;
//             req.session.loggedIn = true;

//             // Set session cookie in the response
//             res.cookie("session_id", req.sessionID, {
//               httpOnly: true,
//               secure: false, // Set to true in production when using HTTPS
//               maxAge: 24 * 60 * 60 * 1000, // Session duration in milliseconds (e.g., 24 hours)
//             });
//             res.json({
//               user,
//               session: req.session,
//               success: true,
//             });
//           }
//         });
//       }
//     });
//   }
// }

// // logout A User
// async function Logout(req: Request, res: Response) {
//   // Destroy the session to log out the user
//   await req.session.destroy((err) => {
//     if (err) {
//       console.error("Error destroying session:", err);
//     } else {
//       res.send("User logged out successfully.");
//     }
//   });
// }

interface Calendar {
  date: Date,
  type: string
}


class Deeds implements Calendar {
  date: Date;
  type: string;
  breakPoint: 0
}

class Dawn extends Deeds {

}



import express from 'express';
import { SchemaTimestampsConfig } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { resolve } from 'dns/promises';
import { authenticate, authorize } from 'passport';
import { Interface } from 'readline';

// Interface.getEventListeners((), 'Date')

const authRouter = express.Router();

const user: { [key: string]: { username: string, password: string, resetPassword: string } } = {};

authRouter.post('/register', (req, res) => {
  const { email, password, resetPassword } = req.body;
  user.find
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).json({ message: 'Error hashing password' });
    } else {
      user[email] = { email, password: hash };
      res.status(200).json({ message: 'User registered successfully' });
    }
  });
});

authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = user[email];

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
    const refreshToken = jwt.sign({ username }, 'refresh-secret-key', { expiresIn: '7d' });

    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;

    res.status(200).json({ message: 'Login successful', accessToken, refreshToken });
  });
});



// Add to authRoutes
authRouter.post('/send-verification-email', (req, res) => {
  const { username } = req.body;
  // Generate and send verification email to the user's email
  // You might use a library like Nodemailer to send emails
  res.status(200).json({ message: 'Verification email sent' });
});



// Add to authRoutes
authRouter.post('/send-otp', (req, res) => {
  const { username } = req.body;
  // Generate and send OTP to the user's email or phone
  res.status(200).json({ message: 'OTP sent' });
});

authRouter.post('/verify-otp', (req, res) => {
  const { username, otp } = req.body;
  // Compare user-provided OTP with the generated OTP

  const otpMatches = (otp === user.otp)
  if (otpMatches) {
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(401).json({ message: 'Invalid OTP' });
  }
});


// Add to authRoutes
authRouter.post('/reset-password', (req, res) => {
  const { username, newPassword } = req.body;
  // Reset user's password
  res.status(200).json({ message: 'Password reset successfully' });
});


// Add to authRoutes
authRouter.post('/forgot-password', (req, res) => {
  const { username } = req.body;
  // Generate a reset token and send it to the user's email
  res.status(200).json({ message: 'Reset token sent' });
});

authRouter.post('/verify-reset-token', (req, res) => {
  const { username, resetToken } = req.body;
  // Verify the validity of the reset token
  const resetTokenIsValid = (resetToken === user.resetToken)
  if (resetTokenIsValid) {
    res.status(200).json({ message: 'Reset token verified successfully' });
  } else {
    res.status(401).json({ message: 'Invalid reset token' });
  }
});

authRouter.head

AuthenticatorAssertionResponse


const packageName = require('packageName');


export { authRouter };
