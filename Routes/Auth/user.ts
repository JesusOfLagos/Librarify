import { Router } from "express"
const router = Router()
// import { CreateUser, GetAllUsers, GetUser, EditProfilePicture, EditUserName, LoginUser, Logout, ResetPassword, ForgotPassword } from "../../Controllers/Auth/userControllers"

import { Hello, List } from '../../Controllers/Auth/userControllers'


router.post('/create-user', Hello)
router.post('/create-list', List)
// router.post('/create-user', Logout)
// router.post('/create-user', CreateUser)
// router.get('/create-user', GetAllUsers)
// router.get('/create-user', GetUser)
// router.put('/create-user', EditProfilePicture)
// router.put('/create-user', EditUserName)
// router.put('/create-user', ResetPassword)
// router.put('/create-user', ForgotPassword)

module.exports = router