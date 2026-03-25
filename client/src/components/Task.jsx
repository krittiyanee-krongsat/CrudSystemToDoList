import { useState } from 'react'
import axios from 'axios'

function Task({ posts, setPosts }) {
    // เก็บข้อมูลโพสต์ที่กำลังถูกแก้ไข
    const [editingPost, setEditingPost] = useState(null)

    // เก็บค่าข้อความที่ผู้ใช้แก้ไขใน input
    const [editContent, setEditContent] = useState('')

    // ตรวจสอบว่าข้อความมีการเปลี่ยนแปลงจากเดิมหรือไม่
    const hasChanges = editingPost && editContent != editingPost.content

    // สลับสถานะ done / not done ของ task
    const handleToggle = (id) => {
        setPosts(prev => prev.map(p => p._id === id? { ...p, done: !p.done } : p))
    }

    // ลบ task ตาม id
    const handleDelete = async (id) => {
        await axios.delete(`/posts/${id}`) // ส่งคำขอลบไปที่ backend
        const { data } = await axios.get('/posts') // ดึงข้อมูลใหม่หลังลบเสร็จ
        setPosts(data) // อัปเดต state posts
        setEditingPost(null) // ปิด popup
    }

    // บันทึกข้อความ task ที่แก้ไข
    const handleSave = async () => {
        await axios.patch(`/posts/${editingPost._id}`, { content: editContent }) // อัปเดต content
        const { data } = await axios.get('/posts') // ดึงข้อมูลล่าสุด
        setPosts(data) // อัปเดต state posts
        setEditingPost(null) // ปิด popup
    }

    return (
        <div>
            {/* ส่วนแสดงรายการ task ทั้งหมด */}
            <div className="task-card-body">
                {posts.map(post => (
                    <div key={post._id} className="task-item">
                        <div className="task-item-left">
                            {/* วงกลมสำหรับกดเปลี่ยนสถานะ done */}
                            <div 
                                className={`task-radio ${post.done ? "done" : ""}`} 
                                onClick={() => handleToggle(post._id)}
                            />
                            {/* ข้อความของ task */}
                            <span className={`task-label ${post.done ? "done" : ""}`}>{post.content}</span>
                        </div>
                        {/* ปุ่มแก้ไข task */}
                        <button
                            className="task-edit-btn"
                            onClick={() => { setEditingPost(post); setEditContent(post.content) }}
                        >
                            <img src={'/images/Edit.png'} />
                        </button>
                    </div>
                ))}
            </div>
            
            {/* Popup สำหรับแก้ไข task */}
            {editingPost && (
                <div className="modal-overlay" onClick={() => setEditingPost(null)}>
                    {/* stopPropagation เพื่อไม่ให้ popup ปิดตอนคลิกด้านใน */}
                    <div className="popup" onClick={e => e.stopPropagation()}>
                        <div className="popup-header">
                            <span className="popup-title">Edit Task 📋</span>
                        </div>
                        <div className="popup-body">
                            {/* input สำหรับแก้ไขข้อความ task */}
                            <input
                                className="popup-input"
                                value={editContent}
                                onChange={e => setEditContent(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <div className="popup-footer">
                            {/* ถ้ามีการแก้ไขข้อความ จะแสดงปุ่ม Save
                                ถ้ายังไม่แก้ไข จะแสดงปุ่ม Cancel */}
                            {hasChanges
                                ? <button className="btn-popup-save" onClick={handleSave}>Save</button>
                                : <button className="btn-popup-cancel" onClick={() => setEditingPost(null)}>Cancel</button>
                            }
                                {/* ปุ่มลบ task */}
                               <button className="btn-popup-delete" onClick={() => handleDelete(editingPost._id)}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Task