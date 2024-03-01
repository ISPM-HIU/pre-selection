import { Response, Request } from "express"
import express from "express"
import cors from "cors"
import userRoute from './routes/users'
import validtationRoute from './routes/validation'
import publicationRoute from './routes/publications'
import likesRoute from './routes/likes'
import commentsRoute from './routes/comments'
import notificationsRoute from './routes/notifications'
import validationMaterial from "./routes/validationMaterial"
import fs from 'fs';
import path from 'path';

// Define the directory to store the uploaded images
const uploadDir = path.join(__dirname, 'uploads');

// Create the directory if it does not exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const app = express()

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.get('/',(req:Request, res:Response) => {
  res.send('Hello from Dev tools templates API')
})

app.use('/api/users', userRoute)
app.use('/api/publications', publicationRoute)
app.use('/api/likes', likesRoute)
app.use('/api/comments', commentsRoute)
app.use('/api/notifications', notificationsRoute)

// Validation API
app.use("/api/validation",validtationRoute)
app.use("/api/validationMaterial", validationMaterial)

app.listen(9090, () => console.log("Api listen on port 9090"))
