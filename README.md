ขั้นตอนการติดตั้ง

- git clone git_remote_url
- npm install

- สร้างไฟล์ env
  - NEXT_PUBLIC_API_URL = http://localhost:8000/api/v1
  - NEXT_PUBLIC_JWT_SECRET =
- npm run dev

Application Architecture

- app: โฟลเดอร์สำหรับการจัดการเส้นทาง (routing) ภายในแอปพลิเคชัน โดยประกอบด้วย:

  - (auth): อาจใช้สำหรับการจัดการหน้าเกี่ยวกับการยืนยันตัวตน (authentication)
  - (board): ส่วนที่อาจเกี่ยวข้องกับการแสดงเนื้อหาแบบบอร์ดหรือพื้นที่หลักของแอป - blogs: โฟลเดอร์ที่จัดการเกี่ยวกับหน้าและการแสดงบล็อก เช่น: - [slug]: ไฟล์สำหรับแสดงหน้าบล็อกเฉพาะโดยใช้ dynamic route
    page.tsx, layout.tsx: สำหรับจัดการการแสดงผลและเลย์เอาต์ของหน้า

- components: โฟลเดอร์สำหรับคอมโพเนนต์ UI แยกเป็นส่วนย่อย เช่น:

  - elements: คอมโพเนนต์ย่อยที่ใช้ซ้ำได้ เช่น Blog.tsx, Comment.tsx, CreateBlog.tsx
  - คอมโพเนนต์หลักอื่นๆ เช่น Header.tsx, Sidebar.tsx, Search.tsx

- lib: โฟลเดอร์สำหรับ utility ฟังก์ชันและ custom hooks ต่างๆ ที่ช่วยในการประมวลผล เช่น base64.ts, useMount.ts, และ utils.ts เพื่อการจัดการข้อมูลทั่วไปในแอป

- public: โฟลเดอร์ที่เก็บไฟล์สาธารณะ เช่น รูปภาพและไอคอน ที่ใช้แสดงในแอปพลิเคชัน

- fonts: โฟลเดอร์สำหรับฟอนต์ที่ใช้ในแอปเพื่อแสดงผลตัวอักษรให้สวยงาม

Library ที่ใช้

- Tailwind css ไว้ใช้สำหรับการตกแต่ง Website
- react-feather ไว้ใช้สำหรับดึง Icon component มาใช้งาน
- shadcn/ui ไว้ใช้สำหรับเป็น ui component มาใช้งาน
- axios ไว้ใช้สำหรับในการทำ Http request เพื่อติดต่อกับ api

รบกวน feedback ให้ที่ pangza2544@gmail.com ด้วยนะครับ ขอบคุณครับ
