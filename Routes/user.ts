import { Router } from "express"
const router = Router()
import { CreateUser, GetAllUsers, GetUser, EditProfilePicture, EditUserName, LoginUser, Logout } from "../Controllers/userControllers"


router.post('/create-user', CreateUser)
router.post('/create-user', LoginUser)
router.post('/create-user', Logout)
router.post('/create-user', CreateUser)
router.get('/create-user', GetAllUsers)
router.get('/create-user', GetUser)
router.put('/create-user', EditProfilePicture)
router.put('/create-user', EditUserName)
