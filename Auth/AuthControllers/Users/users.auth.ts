import { Request, Response } from "express";
import bcrypt from "bcrypt";
import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Users from "../../Models/Users";
import { LoginValidator, RegisterValidator } from "../../../Validators/Users/validators";
// import jwt from "jsonwebtoken";
import { config as dotenvConfig } from "dotenv";
import path from "path";


dotenvConfig();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Set up multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Librarify-Profile-Pictures",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 150, height: 150, crop: "thumb", gravity: "face" }],
  },
});

const upload = multer({ storage: storage });

// Create A User
async function CreateUser(req: Request, res: Response) {
  console.log(req.body);
  const { errors, isValid } = RegisterValidator(req.body);

  if (!req.file) {
    return res.status(400).json({ message: "Please provide a valid image file" });
  }

  const imageUrl = req.file.path
  const result = await cloudinary.uploader.upload(imageUrl, { folder: "Profile-Pictures" });

  if (!isValid) {
    res.json({ success: false, errors });
  } else {
    const { firstName, lastName, email, password } = req.body;
    const registerUser = new Users({
      firstName,
      lastName,
      userName: `${firstName} ${lastName}`,
      email,
      password,
      profilePicture: result.secure_url,
      createdAt: new Date(),
    });

    await bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (hashErr, hash) => {
        if (err || hashErr) {
          res.json({ message: "Error Occurred While Hashing", success: false });
          return;
        }

        registerUser.password = hash;
        registerUser.save().then(() => {
          res.json({ message: "User Created Successfully", success: true });
        });
      });
    });
  }
}

// Login A User
async function LoginUser(req: Request, res: Response) {
  const { errors, isValid } = LoginValidator(req.body);

  if (!isValid) {
    res.json({ success: false, errors });
  } else {
    Users.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        res.json({ message: "Email not found", success: false });
      } else {
        bcrypt.compare(req.body.password, user.password).then((success) => {
          if (!success) {
            res.json({ message: "Invalid Password", success: false });
          } else {
            req.session.user = user;
            req.session.loggedIn = true;

            // Set session cookie in the response
            res.cookie("session_id", req.sessionID, {
              httpOnly: true,
              secure: false, // Set to true in production when using HTTPS
              maxAge: 24 * 60 * 60 * 1000, // Session duration in milliseconds (e.g., 24 hours)
            });
            res.json({
              user,
              session: req.session,
              success: true,
            });
          }
        });
      }
    });
  }
}

// logout A User
async function Logout(req: Request, res: Response) {
  // Destroy the session to log out the user
  await req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      res.send("User logged out successfully.");
    }
  });
}
