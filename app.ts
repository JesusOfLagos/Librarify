
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(express.json())

const UserRoutes = require("./Routes/Auth/user")
app.use('/users', UserRoutes)




 
 





