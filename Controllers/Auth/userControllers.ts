import { Request, Response } from "express";
import bcrypt from "bcrypt";
const Users = require("../../Models/Users")
import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import jwt from 'jsonwebtoken';
import { config as dotenvConfig } from "dotenv";
import path from "path";
// import { LoginValidator, RegisterValidator } from "../../Validators/Users/validators"



dotenvConfig();




async function Hello (req: Request, res: Response) {
  res.json("Hello World")
}

// module.exports = Hello


export {Hello}