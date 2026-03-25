import { useState ,useEffect } from 'react'
import './App.css'
import axios from 'axios'

//Components
import Task from './components/Task'
import Create from './components/Create'

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
    <div className='flex flex-col items-center mt-24'>
      {/* แสดงรูป gif ด้านบนของ task card */}
      <img
        src='/gif/Coffee.gif'
        className='flex flex-col items-center pb-2.5'
      />
        {/* กล่องหลักของ task card */}
        <div className='task-card'>
          {/* ส่วน header ของ card */}
          <div className='task-card-header'>
            <span className='task-card-title'>Task📋</span>
            {/* Component สำหรับเพิ่ม task */}
            <Create
              currentPost={currentPost}
              posts={posts}
              setPosts={setPosts}
              setCurrentPosts={setCurrentPost}
            />
          </div>
            {/* Component สำหรับแสดงรายการ task */}
            <Task
              currentPost={currentPost}
              posts={posts}
              setPosts={setPosts}
              setCurrentPosts={setCurrentPost}
            />
          </div>
    </div>
  )
}

export default App
