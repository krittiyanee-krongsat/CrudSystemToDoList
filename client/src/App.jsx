import { useState ,useEffect } from 'react'
import './App.css'

function App() {
  // state เก็บรายการโพสต์ทั้งหมดที่ดึงมาจาก API
  const [posts, setPosts] = useState([])
  // state เก็บโพสต์ที่กำลังถูกแก้ไข (null = โหมดสร้างโพสต์ใหม่)
  const [currentPost, setCurrentPost] = useState(null)

  // ดึงข้อมูลโพสต์ทั้งหมดจาก API ตอนที่คอมโพเนนต์โหลดครั้งแรก
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const{ data } = await axios.get('/posts')
        setPosts(data) // บันทึกข้อมูลโพสต์ลงใน state
      } catch(error) {
        console.error("Error fetching posts:", error) // แสดง error ถ้าดึงข้อมูลไม่สำเร็จ
      }
    }
    fetchPosts()
  }, []) // [] = ทำงานแค่ครั้งเดียวตอน mount

  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

export default App
