import axios from 'axios'
import { useState } from 'react'

// Component สำหรับสร้าง task ใหม่
function Create({ setPosts }) {
    // ใช้เก็บสถานะว่า popup เปิดอยู่หรือไม่
    const [isOpen, setIsOpen] = useState(false)
    // ใช้เก็บข้อความ task ที่ผู้ใช้กรอก
    const [content, setContent] = useState('')

    // เช็คว่ามีการพิมพ์ข้อความหรือยัง
    // trim() ใช้ตัดช่องว่างหน้า-หลัง เพื่อกันกรอกแต่ space
    const hasChanges = content.trim() !==''

    // ฟังก์ชันสำหรับบันทึก task ใหม่
    const handleSubmit = async () => {
        await axios.post('/posts', { content }) // ส่งข้อมูลไป backend เพื่อสร้าง task
        const { data } = await axios.get('/posts') // ดึงรายการ posts ใหม่ทั้งหมด
        setPosts(data) // อัปเดต state ของ posts
        setContent('') // ล้างค่า input
        setIsOpen(false) // ปิด popup
    }

    return (
        <>
            {/* ปุ่มสำหรับเปิด popup เพิ่ม task */}
            <button className="task-card-add" onClick={() => setIsOpen(true)}>
                <img
                    src='/images/Add.png'    
                />
            </button>

            {/* แสดง popup เมื่อ isOpen เป็น true */}
            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="popup" onClick={e => e.stopPropagation()}>
                        {/* ส่วนหัวของ popup */}
                        <div className="popup-header">
                            <span className="popup-title">Add Task 📋</span>
                        </div>
                        {/* ส่วน input สำหรับกรอกชื่อ task */}
                        <div className="popup-body">
                            <input
                                className="popup-input"
                                placeholder="Task name"
                                value={content}
                                onChange={e => setContent(e.target.value)} // อัปเดตค่าที่พิมพ์
                                autoFocus // ให้ cursor ไปอยู่ที่ input ทันที
                            />
                        </div>
                         {/* ปุ่มด้านล่าง popup */}
                        <div className="popup-footer">
                            {hasChanges
                                ? (
                                    // ถ้ามีข้อความ ให้แสดงปุ่ม Save
                                    <button className="btn-popup-save" onClick={handleSubmit}>
                                        Save
                                    </button>
                                )
                                : (
                                    // ถ้ายังไม่มีข้อความ ให้แสดงปุ่ม Cancel
                                    <button className="btn-popup-cancel" onClick={() => setIsOpen(false)}>
                                        Cancel
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Create