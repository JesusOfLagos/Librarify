import { Request, Response } from "express";
import bcrypt from "bcrypt";
import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Users from "../Models/Users";
import { LoginValidator, RegisterValidator } from "../Validators/userValidators";
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
            // const payload = {
            //     id: user._id,
            //     name: user.firstName
            // }
            // jwt.sign(
            //     payload,
            //     process.env.APP_SECRET, {expiresIn: 2155926},
            //     (err, token) => {
            //         res.json({
            //             user,
            //             token: `Bearer Token: ` + token,
            //             success: true
            //         })
            //     }
            // )
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


// Get All Users
async function GetUser(req: Request, res: Response<Users[]>) {
    try {
      console.log(req.params._id);
      const user = await Users.findById(req.params._id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found", success: false });
      }
  
      res.json({ user, success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }



// Get A User By Id
async function GetAllUsers(req: Request, res: Response) {
  try {
    console.log(req.params._id);
    const user = await Users.findById(req.params._id);

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.json({ user, success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function EditUserName(req: Request, res: Response) {
  const { newUserName } = req.body;

  const newValues = { $set: { userName: newUserName } };
  try {
    const user = await Users.findOneAndUpdate({ _id: req.params._id }, newValues, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    await user.save();
    res.json({ user, success: true, message: "Edited User Profile Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Can't Update User Profile", success: false, error: error.message });
  }
}

async function EditProfilePicture(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({ message: "Please provide a valid image file" });
  }

  const imageUrl = req.file.path;
  const result = await cloudinary.uploader.upload(imageUrl, { folder: "Profile-Pictures" });

  try {
    // Find the user by ID and update their profile picture
    console.log(req.params._id);
    const user = await Users.findByIdAndUpdate(req.params._id, { profilePicture: result.secure_url }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      // user.save();
      const newImage = result.secure_url;
      res.json({ imageUrl: newImage, message: "Successfully updated profile picture" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error updating profile picture" });
  }
}

export { CreateUser, LoginUser, GetUser, Logout, EditUserName, EditProfilePicture };
