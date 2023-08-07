import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Users } from "../../Models/Users";
import { LoginValidator, RegisterValidator } from "../../Validators/Users/validators";
import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import jwt from 'jsonwebtoken';
import { config as dotenvConfig } from "dotenv";
import path from "path";
import { LinkedList } from "../Services/libraryController";



dotenvConfig();




async function Hello (req: Request, res: Response) {

  const data: number = 1
  const date = "January"
  const newDate = Date.now()

  const { firstName, lastName, email, password } = req?.body
  console.log(firstName)
  const NewUsers = new Users( firstName, lastName,email,password )
  if (RegisterValidator(NewUsers)){
    console.log(RegisterValidator(NewUsers))
  console.log(NewUsers)

  res.json({success: true, NewUsers})
} else {
  res.json({message: "Oops, an error occured!", NewUsers})
}
 
  // const NewUsers = new Users( "firstName", "lastName","email","gender" )
  // const NewUsers = new Users( req.body.firstName, req.body.lastName, req.body.email, req.body.gender)



  // const Male = {
  //   name: "jesus"
  // }

  // if (data === 1) {
  //   // res.json(`data: ${Male}`)
  //   res.json(NewUsers)

 
  
}

// module.exports = Hello



async function List (rreq: Request, res: Response) {

function main() {
  const list = new LinkedList();
  const emptyList = new LinkedList()

  list.add(10);
  list.add(20);
  list.add(30);
  list.add(40);
  list.addNewHead(70)
  list.addNodeAtPosition(100, 2)
  list.addNodeAtPosition(56,12)
  list.traverse()
  emptyList.traverse()
  res.json(list)

  console.log(list)
}


main()



}





export {Hello, List}
