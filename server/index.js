const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

// Route ทดสอบว่า API ทำงานอยู่
app.get('/', (req, res) => {
    res.send('API is running...')
})

// เริ่มต้น server และรับฟัง request ที่ PORT ที่กำหนด
app.listen(PORT, () => {
    console.log('Server is running...')
})