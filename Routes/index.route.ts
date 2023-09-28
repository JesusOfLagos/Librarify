import { Router } from "express";
const GlobalRouter = Router();

GlobalRouter.get('/ping', (req, res) => {
    res.status(200).json({ message: 'Welcome to Librarify!📚' })
})



export default GlobalRouter;