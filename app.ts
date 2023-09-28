console.log('Hello World')

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import UserRouter from './Routes/users/user.route'
import GlobalRouter from './Routes/index.route'
import LibraryRouter from './Routes/library/library.route'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api/v1/', GlobalRouter)
app.use('/api/v1/users', UserRouter)
app.use('/api/v1/library', LibraryRouter)

app.use((req: any, res: any) => {
  res.status(404).json({ message: 'You arrived at Librarify, But with the wrong request!😒' });
});



app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} ${req.ip}`)
  next()
  })




app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
  })











