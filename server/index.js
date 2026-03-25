const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

// นำเข้า router สำหรับจัดการ route ของโพสต์
const postRoutes = require('./routes/posts')

// ตั้งค่า DNS server เพื่อแก้ปัญหาการเชื่อมต่อ MongoDB ในบางสภาพแวดล้อม
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config()
const MONGO_URI = process.env.MONGO_URI

app.use(express.json())
app.use(cors())

//Routes
app.use('/posts', postRoutes)

//เชื่อมต่อฐานข้อมูล
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connecting to database successfully...'))
    .catch(error => console.log(error.message))

// Route ทดสอบว่า API ทำงานอยู่
app.get('/', (req, res) => {
    res.send('API is running...')
})

// Route ทดสอบการตอบสนองของ server
app.get('/api/test', (req, res) => {
    res.send('Hello from the server!')
})

// เริ่มต้น server และรับฟัง request ที่ PORT ที่กำหนด
app.listen(PORT, () => {
    console.log('Server is running...')
})