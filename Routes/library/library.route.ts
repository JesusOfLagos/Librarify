import { Router } from "express";
const LibraryRouter = Router();


LibraryRouter.get('/ping', async (req, res) => {
    console.log('ping')
    res.status(200).json({ message: 'The Library Service Is Live On Librarify!📚' })
    })


export default LibraryRouter;