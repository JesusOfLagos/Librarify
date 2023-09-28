import { Router } from "express";
const UserRouter = Router();


UserRouter.get('/ping', async (req, res) => {
    res.status(200).json({ message: 'The User Service Is Live On Librarify!📚' })
    })


export default UserRouter;