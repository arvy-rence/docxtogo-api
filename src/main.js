import express from "express"
import cors from "cors"
import {requestRoutes} from "./Requests/requests.routes.js";

// app routes

const app = express()

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 8092, () => {
  console.log(`Server is running on port ${process.env.PORT || 8092}`)
})

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/request', requestRoutes)
