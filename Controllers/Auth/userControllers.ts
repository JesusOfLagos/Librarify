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

  const data: number = 1
  const date = "January"

  if (data === 1) {
    res.json(`data: ${data + date}`)
  } else {
    res.json("Error, no data!")
  }
 
  
}

// module.exports = Hello


export {Hello}
