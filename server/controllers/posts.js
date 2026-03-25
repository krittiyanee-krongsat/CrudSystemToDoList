const Post = require('../models/Post')

// ดึงโพสต์ทั้งหมดจากฐานข้อมูล
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find() // ค้นหาโพสต์ทั้งหมดใน collection
        res.status(200).json(posts) // ส่งข้อมูลกลับพร้อม status 200 (OK)
    } catch (error) {
        res.status(404).json({ message: error.message }) // ส่ง error กลับถ้าดึงข้อมูลไม่สำเร็จ
    }
}

const createPost = async (req, res) => {
    const post = req.body // รับข้อมูลโพสต์จาก request body
    const newPost = new Post(post) // สร้าง instance ของ Post model
    try {
        await newPost.save() // บันทึกโพสต์ลงฐานข้อมูล
        res.status(201).json(newPost) // ส่งโพสต์ที่สร้างกลับพร้อม status 201 (Created)
    } catch (error) {
        res.status(409).json({ message: error.message }) // ส่ง error กลับถ้าบันทึกไม่สำเร็จ status 409 (Conflict)
    }
}

// อัปเดตโพสต์ตาม id ที่รับมาจาก URL parameter
const updatePost = async (req, res) => {
    const { id } = req.params // ดึง id โพสต์จาก URL เช่น /posts/:id
    const { title, content } = req.body // ดึงข้อมูลที่ต้องการอัปเดตจาก request body
    try {
        const updatePost = await Post.findByIdAndUpdate(
            id, // ค้นหาโพสต์จาก id
            { title, content}, // ข้อมูลที่ต้องการอัปเดต
            { new: true } // ให้ return ข้อมูลหลังอัปเดต (ไม่ใช่ข้อมูลเก่า)
        )
        res.status(200).json(updatePost) // ส่งโพสต์ที่อัปเดตแล้วกลับ
    } catch(error) {
        res.status(404).json({ message: 'Post not found'}) // ส่ง error ถ้าไม่พบโพสต์
    }
}

// ลบโพสต์ตาม id ที่รับมาจาก URL parameter
const deletePost = async (req, res) => {
    const { id } = req.params // ดึง id โพสต์จาก URL เช่น /posts/:id
    try {
        await Post.findByIdAndDelete(id) // ค้นหาและลบโพสต์จากฐานข้อมูล
        res.status(200).json({ message: 'Post deleted successfully'}) // ส่งข้อความยืนยันการลบ
    } catch(error) {
        res.status(404).json({ message: 'Post not found'}) // ส่ง error ถ้าไม่พบโพสต์
    }
}

// export ฟังก์ชันทั้งหมดเพื่อนำไปใช้ใน router
module.exports = { getPosts, createPost, updatePost, deletePost }