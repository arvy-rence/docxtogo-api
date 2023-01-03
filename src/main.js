import express from "express"
import cors from "cors"
import {requestRoutes} from "./Requests/requests.routes.js";
import {sectionRoutes} from "./Sections/sections.routes.js";
import {studentRoutes} from "./Students/students.routes.js";

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
app.use('/api/section', sectionRoutes)
app.use('/api/student', studentRoutes)