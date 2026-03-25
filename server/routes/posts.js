const express = require('express')

// นำเข้าฟังก์ชัน controller สำหรับจัดการโพสต์แต่ละประเภท
const { 
    getPosts, // ดึงโพสต์ทั้งหมด
    createPost, // สร้างโพสต์ใหม่
    updatePost, // อัปเดตโพสต์
    deletePost  // ลบโพสต์
} = require('../controllers/posts')

const router = express.Router()

// GET /posts → ดึงโพสต์ทั้งหมด
router.get('/', getPosts)
// POST /posts → สร้างโพสต์ใหม่
router.post('/', createPost)
// PATCH  /posts/:id → อัปเดตโพสต์ตาม id
router.patch('/:id', updatePost)
// DELETE /posts/:id → ลบโพสต์ตาม id
router.delete('/:id', deletePost)

// export router เพื่อนำไปใช้ใน server หลัก
module.exports = router