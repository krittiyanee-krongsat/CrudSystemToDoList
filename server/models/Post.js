const mongoose = require('mongoose')

// กำหนดโครงสร้างข้อมูล (Schema) ของโพสต์
const postSchema = mongoose.Schema({
    title: String, // หัวข้อโพสต์ เก็บเป็น String
    content: String, // เนื้อหาโพสต์ เก็บเป็น String
})

// สร้าง Model จาก Schema
// 'Post' คือชื่อ collection ใน MongoDB (mongoose จะแปลงเป็น 'posts' อัตโนมัติ)
const Post = mongoose.model('Post', postSchema)

// export Model เพื่อนำไปใช้ใน controller
module.exports = Post