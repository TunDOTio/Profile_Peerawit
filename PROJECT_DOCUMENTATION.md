# 📋 Booking4Room MFU — เอกสารโครงการฉบับละเอียด (Comprehensive Project Documentation)

**ชื่อโครงการ:** Booking4Room MFU — ระบบจองห้องเรียน/ห้องประชุม มหาวิทยาลัยแม่ฟ้าหลวง  
**Production URL:** `https://roombooking.mfu.ac.th`  
**สถาปัตยกรรม:** Client-Server Architecture (Frontend + Backend แยกกันชัดเจน)  
**วันที่จัดทำเอกสาร:** 24 กุมภาพันธ์ 2569 (February 24, 2026)

---

## สารบัญ (Table of Contents)

1. [ภาพรวมโครงการ (Project Overview)](#-1-ภาพรวมโครงการ-project-overview)
2. [เทคโนโลยีที่ใช้ (Tech Stack)](#-2-เทคโนโลยีที่ใช้-tech-stack)
3. [การจัดสไตล์หน้าเว็บ (Styling & Design)](#-3-การจัดสไตล์หน้าเว็บ-styling--design)
4. [ระบบและฟีเจอร์ (Features & Systems)](#-4-ระบบและฟีเจอร์ทั้งหมด-features--systems)
5. [API Endpoints & Integration](#-5-api-endpoints--integration)
6. [ขั้นตอนการยืนยันตัวตน (Authentication Flow)](#-6-ขั้นตอนการยืนยันตัวตน-authentication-flow)
7. [Environment Variables (ตัวแปรสภาพแวดล้อม)](#-7-environment-variables-ตัวแปรสภาพแวดล้อม)
8. [Docker & Deployment (การ Deploy)](#-8-docker--deployment)
9. [รหัสประเภทการใช้ห้อง (Room Use Type Codes)](#-9-รหัสประเภทการใช้ห้อง-room-use-type-codes)
10. [Utility & Test Scripts (สคริปต์เสริม)](#-10-utility--test-scripts-สคริปต์เสริม)
11. [โครงสร้างไฟล์ (File Structure)](#-11-โครงสร้างไฟล์-file-structure)

---

## 🏢 1. ภาพรวมโครงการ (Project Overview)

**Booking4Room MFU** เป็นเว็บแอปพลิเคชันสำหรับ **บุคลากรมหาวิทยาลัยแม่ฟ้าหลวง (MFU)** ใช้ในการ:

- 🔐 **เข้าสู่ระบบ** ผ่านระบบยืนยันตัวตนกลาง MFU SSO (OAuth2 / ADFS)
- 🔍 **ค้นหาห้องว่าง** ตามประเภทห้อง, วันที่, ช่วงเวลา, ความจุ
- 📝 **จองห้อง** พร้อมกรอกข้อมูลรายละเอียดการจอง
- 📜 **ดูประวัติการจอง** และ **ยกเลิกการจอง** ที่ยังอยู่ในสถานะรอดำเนินการ
- 🌐 **สลับภาษา** ไทย/อังกฤษ ได้ตลอดเวลา

### สถาปัตยกรรมระบบ (System Architecture)

```
┌─────────────────────┐        ┌─────────────────────┐        ┌──────────────────────────┐
│                     │  HTTP  │                     │  HTTPS │                          │
│    Frontend (Vue)   │───────▶│  Backend (Express)  │───────▶│  MFU API (Upstream)      │
│    Nginx :80        │  /api/ │  Node.js :3000      │        │  apitest.mfu.ac.th       │
│                     │        │  (API Gateway/Proxy)│        │  /apiroombooking/        │
└─────────────────────┘        └─────────────────────┘        └──────────────────────────┘
         │                              │
         │                              │        ┌──────────────────────────┐
         │                              └───────▶│  MFU SSO (ADFS)         │
         │                                       │  authsso.mfu.ac.th      │
         └──────────────────────────────────────▶│  OAuth2 Authorization   │
                        (Redirect)               └──────────────────────────┘
```

- **Frontend** เป็น Single Page Application (SPA) ที่ build ด้วย Vue 3 + Vite แล้ว serve ด้วย Nginx
- **Backend** เป็น API Gateway / Proxy Server ที่ทำหน้าที่แทรก System Token แล้ว forward request ไปยัง MFU API
- **ไม่มีฐานข้อมูลของตัวเอง** — ข้อมูลทั้งหมด (การจอง, ห้อง, ประวัติ) ถูกจัดเก็บในระบบ API กลางของมหาวิทยาลัย

---

## 🛠 2. เทคโนโลยีที่ใช้ (Tech Stack)

### 🖥️ Frontend (ส่วนหน้าบ้าน)

| หมวดหมู่ | เทคโนโลยี | เวอร์ชัน | หน้าที่ |
|----------|-----------|---------|---------|
| **ภาษาหลัก** | JavaScript, HTML5, CSS3 | — | ภาษาพื้นฐานในการพัฒนา |
| **Framework** | **Vue 3** (Composition API + `<script setup>`) | ^3.5.24 | JavaScript Framework หลักในการสร้าง UI |
| **Build Tool** | **Vite** | ^7.2.4 | เครื่องมือ build และ dev server ที่รวดเร็ว |
| **Routing** | **vue-router** | ^4.6.4 | จัดการเส้นทาง (Navigation) ระหว่างหน้าต่างๆ |
| **HTTP Client** | **Axios** (สำหรับ OAuth callback) + **Fetch API** (สำหรับเรียก API อื่นๆ) | ^1.6.0 | ส่ง HTTP Request ไปยัง Backend |
| **JWT Decoding** | **jwt-decode** | ^4.0.0 | ถอดรหัส JWT Token เพื่อดึงข้อมูลผู้ใช้ |
| **Alerts/Dialogs** | **SweetAlert2** | ^11.26.17 | แสดง Popup แจ้งเตือนและยืนยัน |
| **Vue Plugin** | **@vitejs/plugin-vue** | ^6.0.1 | Plugin สำหรับ Vite เพื่อรองรับไฟล์ `.vue` |
| **Production Server** | **Nginx** (Alpine Docker image) | — | Web Server สำหรับ serve ไฟล์ static ที่ build แล้ว |

### ⚙️ Backend (ส่วนหลังบ้าน)

| หมวดหมู่ | เทคโนโลยี | เวอร์ชัน | หน้าที่ |
|----------|-----------|---------|---------|
| **Runtime** | **Node.js** (18-alpine Docker image) | 18 | สภาพแวดล้อมสำหรับรัน JavaScript ฝั่งเซิร์ฟเวอร์ |
| **ภาษาหลัก** | JavaScript (ES Modules — `"type": "module"`) | — | ภาษาหลักของ Backend |
| **Framework** | **Express.js** | ^4.18.2 | Web Framework สำหรับสร้าง REST API |
| **HTTP Client** | **Axios** | ^1.13.4 | ส่ง Request ไปยัง API ของมหาวิทยาลัย (Upstream) |
| **CORS** | **cors** | ^2.8.5 | จัดการ Cross-Origin Resource Sharing |
| **Body Parser** | **body-parser** | ^1.20.2 | แปลง Request Body เป็น JSON |
| **TLS** | Node.js built-in `https` module | — | เชื่อมต่อ API ที่ใช้ HTTPS (ปิด `rejectUnauthorized`) |

### 🐳 Infrastructure / DevOps

| หมวดหมู่ | เทคโนโลยี | รายละเอียด |
|----------|-----------|-----------|
| **Containerization** | Docker + Docker Compose | จัดการ container ของทั้ง Frontend และ Backend |
| **Frontend Container** | Multi-stage build | Stage 1: Node 22 (build) → Stage 2: Nginx Alpine (serve) |
| **Backend Container** | Node 18-alpine | รันด้วย `node server.js` |
| **Orchestration** | `docker-compose.yml` | 2 services: `backend` (port 3000) + `frontend` (port 80) |

---

## 🎨 3. การจัดสไตล์หน้าเว็บ (Styling & Design)

### 3.1 แนวทางการออกแบบ (Design Approach)

> ⚠️ **ไม่ได้ใช้ CSS Framework ใดๆ** (ไม่มี Tailwind, Bootstrap, Vuetify ฯลฯ)  
> ใช้ **Custom CSS 100%** เขียนเองทั้งหมดในไฟล์ `frontend/src/style.css`

| รายการ | รายละเอียด |
|--------|-----------|
| **Design Language** | **Modern Dark Glassmorphism** — ธีมมืดพร้อมเอฟเฟกต์กระจกฝ้า |
| **Font Family** | **Outfit** จาก Google Fonts (น้ำหนัก 300, 400, 500, 600, 700) |
| **Primary Color** | `#4F46E5` (Indigo — สีน้ำเงินม่วง) |
| **Secondary Color** | `#EC4899` (Pink — สีชมพู) |
| **Background** | Gradient จาก `#0F172A` ไปยัง `#1E293B` (น้ำเงินเข้ม → เทาเข้ม) |
| **Text Colors** | หลัก: `#F1F5F9` (สว่าง), รอง: `#94A3B8` (เทา) |
| **Glass Effect** | พื้นหลังโปร่งใส + blur = ความรู้สึก "กระจกฝ้า" |

### 3.2 CSS Variables (ตัวแปร CSS)

ไฟล์ `frontend/src/style.css` กำหนด CSS Variables ไว้ดังนี้:

```css
:root {
  --font-family: 'Outfit', sans-serif;
  --primary: #4F46E5;           /* สีหลัก — Indigo */
  --secondary: #EC4899;         /* สีรอง — Pink */
  --bg-gradient: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);  /* พื้นหลัง */
  --glass-bg: rgba(255, 255, 255, 0.05);       /* พื้นหลังกระจก */
  --glass-border: rgba(255, 255, 255, 0.1);    /* ขอบกระจก */
  --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);  /* เงาตกกระทบ */
  --text-main: #F1F5F9;        /* สีตัวอักษรหลัก */
  --text-muted: #94A3B8;       /* สีตัวอักษรรอง */
}
```

### 3.3 Animations (เอฟเฟกต์ภาพเคลื่อนไหว)

ระบบมี CSS Keyframe Animations ทั้งหมด 7 ชุด:

| ชื่อ Animation | ใช้ที่ไหน | ลักษณะ |
|---------------|----------|--------|
| `fade` | การเปลี่ยนหน้า (Vue `<transition>`) | Fade-in/out แบบค่อนข้างนุ่มนวล |
| `float` | องค์ประกอบลอย เช่น ไอคอน | ขยับขึ้น-ลงอย่างต่อเนื่อง |
| `cardEnter` | การ์ดห้อง, การ์ดเมนู | เลื่อนขึ้นมาพร้อม fade-in |
| `modalSlideIn` | Modal ต่างๆ (จอง, ค้นหา, ยืนยัน) | เลื่อนจากล่างขึ้นมาพร้อม fade |
| `slideUp` | องค์ประกอบที่ปรากฏใหม่ | เลื่อนขึ้นอย่างรวดเร็ว |
| `spin` | Loading spinner | หมุน 360° ต่อเนื่อง |
| `popIn` | ปุ่มกดหรือไอคอนที่ต้องการเน้น | ขยายตัวขึ้นแล้วกลับสู่ขนาดเดิม |

### 3.4 Vue Transitions

| Transition Name | ใช้กับ | ลักษณะ |
|----------------|--------|--------|
| `fade` | `<router-view>` (การเปลี่ยนหน้า) | opacity 0 → 1 พร้อม translateY |
| `modal-fade` | Modal Components | opacity + scale จาก 0 → 1 |

### 3.5 Responsive Design (การรองรับหน้าจอหลายขนาด)

ระบบรองรับ 6 breakpoints สำหรับหน้าจอต่างๆ:

| Breakpoint | ขนาดหน้าจอ | จำนวนคอลัมน์ Grid | เหมาะกับ |
|------------|-----------|-------------------|---------|
| > 1600px | จอกว้างมาก | 5 คอลัมน์ | Desktop จอใหญ่ |
| ≤ 1600px | Desktop | 4 คอลัมน์ | Desktop ปกติ |
| ≤ 1300px | Desktop เล็ก | 3 คอลัมน์ | Laptop |
| ≤ 900px | Tablet | 2 คอลัมน์ | Tablet แนวนอน |
| ≤ 768px | Tablet เล็ก | 2 คอลัมน์ | Tablet แนวตั้ง |
| ≤ 600px | Mobile | 1 คอลัมน์ | มือถือ |
| ≤ 480px | Mobile เล็ก | 1 คอลัมน์ | มือถือจอเล็ก |

---

## 🧩 4. ระบบและฟีเจอร์ทั้งหมด (Features & Systems)

### 4.1 เส้นทาง (Routes)

กำหนดไว้ใน `frontend/src/router/index.js`:

| Path | Component | Lazy Load | คำอธิบาย |
|------|-----------|-----------|---------|
| `/` | `Login.vue` | ❌ (โหลดทันที) | หน้าเข้าสู่ระบบ (Landing Page) |
| `/auth/callback` | `AuthCallback.vue` | ✅ | หน้ารับ Callback จาก MFU SSO |
| `/select-room` | `selectRoom.vue` | ✅ | หน้าเลือกประเภทห้อง + กรอกเงื่อนไขค้นหา |
| `/classroom-list` | `ClassroomList.vue` | ✅ | หน้าแสดงห้องว่าง + จองห้อง |
| `/history` | `History.vue` | ✅ | หน้าประวัติการจอง + ยกเลิกการจอง |

> 💡 Lazy Loading (`() => import(...)`) ทำให้แต่ละหน้าถูกโหลดเฉพาะเมื่อผู้ใช้เข้าถึงหน้านั้นจริงๆ ช่วยลดขนาดไฟล์ initial bundle

---

### 4.2 ระบบยืนยันตัวตน (Authentication System — MFU SSO / OAuth2 + ADFS)

#### 🔑 Login (`frontend/src/views/Login.vue`)

- แสดงหน้า Landing Page พร้อมปุ่ม "เข้าสู่ระบบด้วยบัญชี MFU"
- เมื่อกดปุ่ม → Redirect ผู้ใช้ไปยัง MFU ADFS SSO:
  ```
  https://authsso.mfu.ac.th/adfs/oauth2/authorize
    ?response_type=code
    &client_id={VITE_CLIENT_ID}
    &redirect_uri={VITE_REDIRECT_URI}
    &scope=openid profile email
  ```
- ใช้ **OAuth2 Authorization Code Flow**

#### 🔗 Auth Callback (`frontend/src/views/AuthCallback.vue`)

- รับ `?code=XXX` จาก URL หลัง SSO redirect กลับมา
- ส่ง `code` ไปที่ Backend: `POST /api/authen/exchange { code }`
- Backend แลก code กับ MFU SSO → ได้ `access_token` + `id_token`
- Frontend **ถอดรหัส JWT** ด้วย `jwt-decode`:
  - ดึง email จาก JWT claims (`unique_name`, `upn`, หรือ `email`)
  - **ตรวจสอบ domain** — ต้องเป็น `@mfu.ac.th` เท่านั้น (บุคลากร MFU เท่านั้น)
- ✅ ถ้าเป็นบุคลากร → เก็บ token ใน `localStorage` → นำทางไปหน้า `/select-room`
- ❌ ถ้าไม่ใช่บุคลากร → แสดงหน้า "ไม่มีสิทธิ์เข้าถึง (Access Denied)" พร้อมปุ่ม Logout

#### 💾 การเก็บ Token

| Key ใน localStorage | ข้อมูล | ใช้ทำอะไร |
|--------------------|--------|----------|
| `access_token` | OAuth2 Access Token | ยืนยันสถานะการ login |
| `id_token` | JWT ID Token | ดึงข้อมูลผู้ใช้ (ชื่อ, email, officerid) และใช้ตอน logout |

#### 🚪 Logout (`frontend/src/components/LogoutButton.vue`)

1. ดึง `id_token` จาก localStorage
2. ลบ `access_token` + `id_token` ออกจาก localStorage
3. Redirect ไปยัง MFU SSO Logout endpoint:
   ```
   https://authsso.mfu.ac.th/adfs/oauth2/logout
     ?id_token_hint={id_token}
     &post_logout_redirect_uri={window.location.origin}
   ```
4. SSO จะตัด Session ของผู้ใช้ออกจากระบบทั้งหมด แล้ว redirect กลับมาหน้า Login

---

### 4.3 ระบบเลือกประเภทห้อง + ค้นหา (Room Type Selection & Search)

**Component:** `frontend/src/views/selectRoom.vue`

#### การ์ดประเภทห้อง 4 แบบ:

| ไอคอน | ประเภทห้อง (TH) | ประเภทห้อง (EN) | คำอธิบาย |
|-------|-----------------|-----------------|---------|
| 📚 | ห้องเรียน | Classroom | ห้องเรียนทั่วไป |
| 🔬 | ห้องปฏิบัติการ | Laboratory | ห้องปฏิบัติการ/แล็บ |
| 🔧 | ห้องอุปกรณ์ | Equipment Room | ห้องเก็บอุปกรณ์ |
| 💼 | ห้องประชุม | Meeting Room | ห้องประชุม |

#### ฟอร์มค้นหา (Search Modal):

เมื่อกดเลือกการ์ดประเภทห้อง → จะแสดง Modal สำหรับกรอกเงื่อนไขค้นหา:

| ฟิลด์ | ประเภท | รายละเอียด |
|-------|--------|-----------|
| **วันที่ (Date)** | Date Picker | เลือกวันที่ต้องการจอง (ไม่น้อยกว่าวันนี้) |
| **เวลาเริ่มต้น (Time From)** | AM/PM 12-hour selector | เลือกเวลาเริ่มต้น (ทุก 15 นาที) |
| **เวลาสิ้นสุด (Time To)** | AM/PM 12-hour selector | เลือกเวลาสิ้นสุด (ต้องมากกว่าเวลาเริ่มต้น) |
| **ความจุขั้นต่ำ (Min Capacity)** | Number Input | จำนวนคนขั้นต่ำที่ต้องการ |

#### ฟีเจอร์พิเศษ:
- 🕐 **Smart Time Defaults**: ถ้าเลือกวันนี้ → เวลาจะถูกตั้งให้เป็นช่วง 15 นาทีถัดไปโดยอัตโนมัติ
- ⛔ **Past Date/Time Validation**: ป้องกันไม่ให้เลือกวันหรือเวลาที่ผ่านมาแล้ว
- ➡️ เมื่อกด "ค้นหา" → นำทางไปหน้า `/classroom-list` พร้อม Query Parameters:
  ```
  /classroom-list?roomdate=YYYY-MM-DD&timefrom=HH:mm&timeto=HH:mm&roomcapacity=N
  ```

---

### 4.4 ระบบแสดงรายการห้อง + จองห้อง (Room Listing & Booking)

**Component:** `frontend/src/views/ClassroomList.vue`

#### การแสดงผลห้อง:
- ดึงข้อมูลห้องว่างผ่าน `api.getEmptyRooms(criteria)` จาก URL Query Params
- แสดงเป็น **Responsive Grid** (สูงสุด 5 คอลัมน์)
- แต่ละการ์ดห้องแสดง:
  - 🖼️ รูปภาพจาก Unsplash (random)
  - 📛 ชื่อห้อง (Room Name)
  - 🏢 อาคาร (Building)
  - 👥 ความจุ (Capacity)

#### ตัวกรอง (Filters):
| ตัวกรอง | ประเภท | หน้าที่ |
|---------|--------|---------|
| **วันที่** | Date Picker | เปลี่ยนวันที่ค้นหา |
| **เวลาเริ่มต้น/สิ้นสุด** | Time Input | เปลี่ยนช่วงเวลาค้นหา |
| **ความจุขั้นต่ำ** | Number Input | กรองตามจำนวนคน |
| **อาคาร** | Dropdown | กรองตามอาคาร (ดึงจากผลลัพธ์ API) |
| **ค้นหาชื่อห้อง** | Text Input | กรองตามชื่อห้อง (client-side) |

> 💡 ทุกตัวกรองมี **Debounce** เพื่อป้องกันการเรียก API ถี่เกินไป

#### Booking Modal (ฟอร์มจองห้อง):

เมื่อกดปุ่ม "จองห้อง" บนการ์ด → จะแสดง Modal ฟอร์ม:

| ฟิลด์ | ที่มาของข้อมูล | คำอธิบาย |
|-------|---------------|---------|
| **เรื่อง/จองเพื่อ (Booking For)** | ผู้ใช้กรอก | ระบุวัตถุประสงค์การจอง |
| **เบอร์โทรศัพท์ (Tel)** | ผู้ใช้กรอก | เบอร์ติดต่อ |
| **ต้องการซอฟต์แวร์ (Software Needed)** | Toggle Switch | เปิด/ปิดการร้องขอซอฟต์แวร์ |
| **รหัสพนักงาน (Officer ID)** | จาก JWT อัตโนมัติ | ดึงจาก `unique_name`/`upn`/`email` → เอาเฉพาะตัวเลข |
| **รหัสหน่วยงาน (Department ID)** | จาก JWT อัตโนมัติ | ดึงจาก JWT claims |
| **จำนวน (Quantity)** | ผู้ใช้กรอก | จำนวนคนที่ต้องการใช้ |

#### Booking Payload (ข้อมูลที่ส่งไป API):

```json
{
  "roomid": "R001",
  "bookingdate": "02/24/2026",
  "usetypecode": "L",
  "timefrom": "0900",
  "timeto": "1200",
  "bookingfor": "สอนวิชา CS101",
  "officerid": "57360003",
  "tel": "0812345678",
  "qty": 40,
  "softwareneeded": "Y",
  "departmentid": "CS"
}
```

- ✅ จองสำเร็จ → แสดง **Success Modal** พร้อมข้อมูลการจอง
- ❌ จองไม่สำเร็จ → แสดงข้อความ Error

---

### 4.5 ระบบประวัติการจอง + ยกเลิก (Booking History & Cancellation)

**Component:** `frontend/src/views/History.vue`

#### การแสดงข้อมูล:
- ดึงประวัติผ่าน `api.getBookingHistory(officerId)` โดย `officerId` มาจาก JWT (เอาเฉพาะตัวเลข)
- แสดงเป็นการ์ดในรูปแบบ Grid เดียวกับหน้า Room Listing

#### Status Badges (ป้ายสถานะ):

| สถานะจาก API | สี | ไอคอน | แสดงเป็น (TH) | แสดงเป็น (EN) |
|-------------|-----|-------|---------------|---------------|
| `Approved` | 🟢 เขียว | ✓ | อนุมัติแล้ว | Approved |
| `Pending` / `รอดำเนินการ` | 🟡 เหลือง | ⏳ | รอดำเนินการ | Pending |
| `Cancelled` / `Not Approved` | 🔴 แดง | ✗ | ยกเลิก/ไม่อนุมัติ | Cancelled/Not Approved |

#### การยกเลิกการจอง:
1. กดปุ่ม "ยกเลิกการจอง" บนการ์ด
2. แสดง **ConfirmModal** ถามยืนยัน (พร้อมไอคอน ⚠️ สีแดง)
3. ยืนยัน → เรียก `api.cancelBooking(guid)` ผ่าน `PUT` method
4. สำเร็จ → refresh ข้อมูลใหม่

---

### 4.6 ระบบสลับภาษา (Internationalization — i18n)

| รายการ | รายละเอียด |
|--------|-----------|
| **ภาษาที่รองรับ** | 🇹🇭 ไทย (TH) และ 🇬🇧 อังกฤษ (EN) |
| **วิธีการ implement** | Vue Composable (`frontend/src/composables/useLanguage.js`) |
| **State Management** | Vue `ref()` + `computed()` |
| **Persistence** | `localStorage` key: `app_lang` |
| **UI Component** | `LanguageSwitcher.vue` — ปุ่ม toggle TH/EN |

#### ตัวอย่างโครงสร้าง Translation:

```javascript
// useLanguage.js
const translations = {
  th: {
    login: { title: 'ระบบจองห้องเรียน', subtitle: '...', loginBtn: '...' },
    selectRoom: { title: 'เลือกประเภทห้อง', ... },
    classroomList: { title: 'ห้องที่ว่าง', ... },
    history: { title: 'ประวัติการจอง', ... },
    // ... ครอบคลุมทุกข้อความใน UI
  },
  en: {
    login: { title: 'Room Booking System', subtitle: '...', loginBtn: '...' },
    selectRoom: { title: 'Select Room Type', ... },
    classroomList: { title: 'Available Rooms', ... },
    history: { title: 'Booking History', ... },
    // ...
  }
}
```

ทุกหน้าใช้ `const { t } = useLanguage()` แล้วเรียก `t.value.login.title` เป็นต้น

---

### 4.7 Reusable Components (คอมโพเนนต์ที่ใช้ซ้ำได้)

| Component | ไฟล์ | หน้าที่ | ใช้ที่ไหน |
|-----------|------|---------|----------|
| **ConfirmModal** | `frontend/src/components/ConfirmModal.vue` | Modal ยืนยันทั่วไป พร้อมไอคอน, หัวข้อ, ข้อความ, ปุ่มยืนยัน/ยกเลิก, loading spinner | History.vue (ยกเลิกจอง) |
| **LanguageSwitcher** | `frontend/src/components/LanguageSwitcher.vue` | ปุ่มสลับภาษา TH ↔ EN | ทุกหน้า (Navbar) |
| **LogoutButton** | `frontend/src/components/LogoutButton.vue` | ปุ่มออกจากระบบ + ตัด SSO Session | ทุกหน้าที่ login แล้ว |
| **HelloWorld** | `frontend/src/components/HelloWorld.vue` | Default Vite template (ไม่ได้ใช้งาน) | ไม่ได้ใช้ |

#### ConfirmModal — รองรับ 3 ประเภท:

| Type | สี | ใช้เมื่อ |
|------|-----|---------|
| `danger` | 🔴 แดง | ยืนยันการลบ/ยกเลิก |
| `success` | 🟢 เขียว | ยืนยันสำเร็จ |
| `primary` | 🔵 น้ำเงิน | ยืนยันทั่วไป |

---

## 📡 5. API Endpoints & Integration

### 5.1 Backend Proxy Endpoints (กำหนดใน `backend/server.js`)

Backend ทำหน้าที่เป็น **API Gateway / Proxy** โดย:
- รับ request จาก Frontend
- แทรก **System Token** (ได้จาก `getSystemToken()`) ลงใน Header
- Forward request ไปยัง MFU API (`https://apitest.mfu.ac.th/apiroombooking/`)
- ส่ง response กลับให้ Frontend

| HTTP Method | Backend Route | Upstream Target (MFU API) | หน้าที่ |
|-------------|--------------|---------------------------|---------|
| **POST** | `/authen/exchange` | `https://authsso.mfu.ac.th/adfs/oauth2/token` | แลก OAuth2 Authorization Code เป็น Access Token + ID Token |
| **GET** | `/roombooking/roombooking/roomscheduleempty` | `{API_HOST}/roombooking/roombooking/roomscheduleempty` | ค้นหาห้องว่าง (ส่งเงื่อนไขผ่าน Headers) |
| **POST** | `/roombooking/roombooking/roombookingins` | `{API_HOST}/roombooking/roombooking/roombookingins` | สร้างรายการจองห้อง |
| **GET** | `/roombooking/roombooking/roombookinghistory` | `{API_HOST}/roombooking/roombooking/roombookinghistory` | ดึงประวัติการจอง (ส่ง officerid ผ่าน Header) |
| **PUT** | `/roombooking/roombooking/cancelroombooking` | `{API_HOST}/roombooking/roombooking/cancelroombooking` | ยกเลิกการจอง (ส่ง `{ roombookingguid }` ใน Body) |

### 5.2 Frontend API Service (กำหนดใน `frontend/src/services/api.js`)

ทุก API call จาก Frontend จะส่งผ่าน prefix `/api/`:

- **Development** (Vite Dev Server): Proxy ไปที่ `http://localhost:3000` (ตัด prefix `/api` ออก)
- **Production** (Nginx): Proxy ไปที่ `http://backend:3000/` (ตัด prefix `/api/` ออก)

| ฟังก์ชัน | HTTP Method | Endpoint | การแปลงข้อมูล | หมายเหตุ |
|----------|------------|----------|---------------|---------|
| `getEmptyRooms(criteria)` | GET | `/api/roombooking/roombooking/roomscheduleempty` | วันที่: `YYYY-MM-DD` → `MM/DD/YYYY`, เวลา: `HH:mm` → `HHMM` | ส่งเงื่อนไขผ่าน **Headers** (ไม่ใช่ Query Params) |
| `bookRoom(bookingData)` | POST | `/api/roombooking/roombooking/roombookingins` | — | ส่ง JSON Body ทุกฟิลด์ |
| `getBookingHistory(officerId)` | GET | `/api/roombooking/roombooking/roombookinghistory` | — | `officerId` = เลขจาก JWT (ตัวเลขเท่านั้น) |
| `cancelBooking(guid)` | PUT | `/api/roombooking/roombooking/cancelroombooking` | — | Body: `{ roombookingguid: guid }` |

### 5.3 External APIs / Services ภายนอก

| บริการ | URL | หน้าที่ |
|--------|-----|---------|
| **MFU SSO — Authorize** | `https://authsso.mfu.ac.th/adfs/oauth2/authorize` | หน้า Login ของ SSO (OAuth2 Authorization) |
| **MFU SSO — Token** | `https://authsso.mfu.ac.th/adfs/oauth2/token` | แลก Authorization Code เป็น Token |
| **MFU SSO — Logout** | `https://authsso.mfu.ac.th/adfs/oauth2/logout` | ตัด Session ออกจาก SSO |
| **MFU Room Booking API** | `https://apitest.mfu.ac.th/apiroombooking/` | API หลักสำหรับจัดการห้อง+การจอง |
| **MFU App Login** | `{API_HOST}/authen/APIAppLogin` | Login ด้วย App Credential ได้ System Token |

### 5.4 การส่งข้อมูลพิเศษ — Headers vs Body

> ⚠️ **จุดสำคัญ:** API ของมหาวิทยาลัยใช้การส่งเงื่อนไขค้นหาผ่าน **HTTP Headers** (ไม่ใช่ Query Params หรือ Body):

```
GET /roombooking/roombooking/roomscheduleempty
Headers:
  Authorization: Bearer {SystemToken}
  roomdate: 02/24/2026
  timefrom: 0900
  timeto: 1200
  roomcapacity: 30
  Language: TH
```

---

## 🔐 6. ขั้นตอนการยืนยันตัวตน (Authentication Flow)

### 6.1 User Authentication (การ Login ของผู้ใช้)

```
┌──────────────┐     ┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   ผู้ใช้       │     │  Login.vue       │     │  MFU SSO (ADFS)  │     │  AuthCallback.vue│
│   (Browser)   │     │  Frontend        │     │  authsso.mfu.ac.th│    │  Frontend        │
└──────┬───────┘     └────────┬────────┘     └────────┬─────────┘     └────────┬────────┘
       │                      │                       │                        │
       │  1. กดปุ่ม Login      │                       │                        │
       │─────────────────────▶│                       │                        │
       │                      │                       │                        │
       │  2. Redirect to SSO  │                       │                        │
       │◀─────────────────────│                       │                        │
       │                      │                       │                        │
       │  3. ผู้ใช้กรอก Username/Password              │                        │
       │─────────────────────────────────────────────▶│                        │
       │                      │                       │                        │
       │  4. Redirect กลับพร้อม ?code=XXX             │                        │
       │◀─────────────────────────────────────────────│                        │
       │                      │                       │                        │
       │  5. เข้าหน้า /auth/callback?code=XXX         │                        │
       │─────────────────────────────────────────────────────────────────────▶│
       │                      │                       │                        │
       │                      │  6. POST /api/authen/exchange { code }        │
       │                      │◀───────────────────────────────────────────────│
       │                      │                       │                        │
       │                      │  ──── Backend ────    │                        │
       │                      │  7. POST /adfs/oauth2/token                   │
       │                      │  { code, client_id, client_secret, ... }      │
       │                      │──────────────────────▶│                        │
       │                      │                       │                        │
       │                      │  8. { access_token, id_token }                │
       │                      │◀──────────────────────│                        │
       │                      │  ──── Backend ────    │                        │
       │                      │                       │                        │
       │                      │  9. Return tokens to Frontend                 │
       │                      │───────────────────────────────────────────────▶│
       │                      │                       │                        │
       │                      │                       │  10. Decode JWT        │
       │                      │                       │  11. Check @mfu.ac.th  │
       │                      │                       │  12. Store in          │
       │                      │                       │      localStorage      │
       │                      │                       │                        │
       │  13. Navigate to /select-room (ถ้าเป็นบุคลากร)                        │
       │◀─────────────────────────────────────────────────────────────────────│
```

### 6.2 System Token (การดึง Token ของระบบ)

Backend ดึง System Token แยกจากผู้ใช้ เพื่อใช้ยืนยันสิทธิ์กับ MFU API:

```
┌─────────────────────┐        ┌──────────────────────────┐
│  Backend (Express)  │        │  MFU API                 │
│  server.js          │        │  apitest.mfu.ac.th       │
└─────────┬───────────┘        └────────────┬─────────────┘
          │                                 │
          │  1. POST /authen/APIAppLogin     │
          │  Body: {                         │
          │    username: base64("RoomBooking"),│
          │    password: base64("...")        │
          │  }                               │
          │────────────────────────────────▶│
          │                                 │
          │  2. { token: "xxx..." }          │
          │◀────────────────────────────────│
          │                                 │
          │  3. Cache token ในหน่วยความจำ     │
          │  4. ใช้ token นี้ใส่ Header       │
          │     ของทุก Request ที่ proxy      │
          │     ไปยัง MFU API                │
          │                                 │
          │  ❗ ถ้าได้ 401 (Token หมดอายุ)     │
          │  → ดึง token ใหม่อัตโนมัติ        │
          │  → retry request เดิมอีกครั้ง     │
```

### 6.3 สรุป Retry Logic

- ทุก endpoint ที่ proxy ไปยัง MFU API มี **Retry Logic**:
  1. ส่ง request พร้อม System Token
  2. ถ้าได้ HTTP 401 (Unauthorized) → เรียก `getSystemToken(true)` เพื่อบังคับดึง token ใหม่
  3. ส่ง request เดิมอีกครั้งพร้อม token ใหม่
  4. ถ้ายังไม่ผ่าน → ส่ง error กลับให้ Frontend

---

## 🔧 7. Environment Variables (ตัวแปรสภาพแวดล้อม)

### 7.1 Backend (`backend/server.js`)

| ตัวแปร | ค่า Default | คำอธิบาย |
|--------|------------|---------|
| `API_HOST` | `https://apitest.mfu.ac.th/apiroombooking/` | URL หลักของ MFU API (Upstream) |
| `OAUTH_TOKEN_URL` | `https://authsso.mfu.ac.th/adfs/oauth2/token` | URL สำหรับแลก OAuth2 code เป็น token |
| `CLIENT_ID` | `c4f25000-ccac-4320-8ccf-2c4cb742f04c` | OAuth2 Client ID |
| `CLIENT_SECRET` | `eM3IqlafXcISqaWpyGV_KfWJm8_HFmyKGZF9hOwr` | OAuth2 Client Secret |
| `REDIRECT_URI` | `https://roombooking.mfu.ac.th/auth/callback` | OAuth2 Redirect URI หลัง login สำเร็จ |

> 💡 สามารถ override ค่าเหล่านี้ได้ผ่านไฟล์ `.env` ที่ root ของ backend (ใช้ใน Docker Compose)

### 7.2 Frontend (Vite Build-time Environment Variables)

| ตัวแปร | ค่า Default | คำอธิบาย |
|--------|------------|---------|
| `VITE_MFU_AUTH_URL` | `https://authsso.mfu.ac.th/adfs/oauth2/authorize` | URL หน้า Login ของ MFU SSO |
| `VITE_CLIENT_ID` | `c4f25000-ccac-4320-8ccf-2c4cb742f04c` | OAuth2 Client ID (ฝั่ง Frontend) |
| `VITE_REDIRECT_URI` | `https://roombooking.mfu.ac.th/auth/callback` | OAuth2 Redirect URI |
| `VITE_SCOPE` | `openid profile email` | OAuth2 Scopes ที่ร้องขอ |

> ⚠️ ตัวแปรเหล่านี้ถูกฝังตอน **build time** ผ่าน Docker ARGs — ไม่สามารถเปลี่ยนหลัง build ได้

### 7.3 Hardcoded Credentials ในซอร์สโค้ด

| รายการ | ค่า (Base64) | ค่าจริง (Decoded) | ตำแหน่ง |
|--------|-------------|------------------|---------|
| App Username | `Um9vbUJvb2tpbmc=` | `RoomBooking` | `backend/server.js` บรรทัด ~33 |
| App Password | `RDBoWjZfNnpydEN3` | (encoded) | `backend/server.js` บรรทัด ~34 |

---

## 🐳 8. Docker & Deployment

### 8.1 Docker Compose (`docker-compose.yml`)

```yaml
services:
  backend:
    build: ./backend
    ports: "3000:3000"
    env_file: .env
    restart: always

  frontend:
    build:
      context: ./frontend
      args:
        VITE_MFU_AUTH_URL: ...
        VITE_CLIENT_ID: ...
        VITE_REDIRECT_URI: ...
        VITE_SCOPE: ...
    ports: "80:80"
    depends_on: backend
    restart: always
```

| Service | Port | Docker Image | หน้าที่ |
|---------|------|-------------|---------|
| `backend` | 3000 | Node 18-alpine | API Gateway / Proxy Server |
| `frontend` | 80 | Nginx Alpine | Serve SPA + Proxy `/api/` to backend |

### 8.2 Frontend Dockerfile (Multi-stage Build)

```
Stage 1: BUILD
├── Base: node:22-alpine
├── Install: npm install
├── Inject: VITE_* env vars ผ่าน ARG
└── Build: npm run build → /app/dist/

Stage 2: PRODUCTION
├── Base: nginx:alpine
├── Copy: /app/dist/ → /usr/share/nginx/html/
├── Copy: nginx.conf → /etc/nginx/conf.d/default.conf
└── Expose: port 80
```

### 8.3 Backend Dockerfile

```
Base: node:18-alpine
├── WORKDIR: /app
├── Install: npm install
├── Copy: source files
├── Expose: port 3000
└── CMD: node server.js
```

### 8.4 Nginx Configuration (`frontend/nginx.conf`)

```nginx
server {
    listen 80;
    server_name roombooking.mfu.ac.th;

    # Serve SPA static files
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;   # ← SPA fallback
    }

    # Proxy API requests to Backend
    location /api/ {
        proxy_pass http://backend:3000/;    # ← Docker internal networking
    }
}
```

| Rule | จัดการ | คำอธิบาย |
|------|--------|---------|
| `location /` | Static files | Serve ไฟล์ที่ build จาก Vue + SPA fallback ไปที่ `index.html` |
| `location /api/` | Proxy | ส่งต่อ request ที่เริ่มด้วย `/api/` ไปที่ backend container port 3000 |

---

## 📦 9. รหัสประเภทการใช้ห้อง (Room Use Type Codes)

ข้อมูลจาก `backend/roomusetyprcode/` (ดึงมาจาก MFU API):

| Code | ไฟล์ JSON | ชื่อภาษาไทย | ชื่อภาษาอังกฤษ | คำอธิบาย |
|------|----------|------------|---------------|---------|
| **A** | `A.json` | กิจกรรมนักศึกษา | Student Activities | จองห้องสำหรับกิจกรรมนักศึกษา |
| **E** | `E.json` | สอบนอกตาราง | Off-schedule Exam | จองห้องสำหรับจัดสอบนอกตาราง |
| **L** | `L.json` | การเรียนการสอน | Teaching & Learning | จองห้องสำหรับการเรียนการสอน (**ค่า default ในระบบ**) |
| **O** | `O.json` | อื่นๆ | Other | จองห้องสำหรับวัตถุประสงค์อื่นๆ |
| **X** | `X.json` | จัดการสอบ | Exam Management | จองห้องสำหรับจัดการสอบ |

> 💡 ในการจอง ระบบจะใช้รหัส `"L"` (การเรียนการสอน) เป็นค่า default ผ่านฟิลด์ `usetypecode`

---

## 🧪 10. Utility & Test Scripts (สคริปต์เสริม)

ไฟล์เหล่านี้อยู่ใน `backend/` ใช้สำหรับการพัฒนาและทดสอบ (ไม่ได้ deploy ใน production):

| ไฟล์ | หน้าที่ | วิธีรัน |
|------|---------|--------|
| `fetch_room_types.js` | ดึงรหัสประเภทการใช้ห้อง (A-Z) จาก MFU API แล้วบันทึกเป็นไฟล์ JSON | `node fetch_room_types.js` |
| `test_history_api.js` | ทดสอบเรียก API ประวัติการจอง ด้วย Officer ID `57360003` | `node test_history_api.js` |
| `probe_auth.js` | ทดสอบหา URL ที่ถูกต้องของ MFU API โดยลอง host หลายตัว | `node probe_auth.js` |
| `probe_result.txt` | ผลลัพธ์จาก `probe_auth.js` — ยืนยันว่า `apitest.mfu.ac.th` คือ host ที่ใช้งานได้ | — (ไฟล์ผลลัพธ์) |
| `temp_server.js` | เวอร์ชันก่อนหน้าของ `server.js` (port 3001, ไม่มี retry logic, ส่ง user token แทน system token) | `node temp_server.js` |

---

## 📁 11. โครงสร้างไฟล์ (File Structure)

```
booking4Roommfu/
│
├── 📄 docker-compose.yml          # Docker Compose สำหรับ orchestrate ทั้ง frontend + backend
├── 📄 PROJECT_DOC.md              # เอกสารโครงการ (เวอร์ชันย่อ)
├── 📄 PROJECT_DOCUMENTATION.md    # เอกสารโครงการฉบับละเอียด (ไฟล์นี้)
├── 📄 README.md                   # README พื้นฐาน
│
├── 📁 backend/                    # ──── Backend (Express.js API Gateway) ────
│   ├── 📄 Dockerfile              # Docker build config สำหรับ Backend
│   ├── 📄 package.json            # Dependencies: express, axios, cors, body-parser
│   ├── 📄 server.js               # ⭐ ไฟล์หลัก — Express server + API proxy + auth
│   ├── 📄 fetch_room_types.js     # สคริปต์ดึงรหัสประเภทห้อง (Utility)
│   ├── 📄 test_history_api.js     # สคริปต์ทดสอบ API ประวัติการจอง (Test)
│   ├── 📄 probe_auth.js           # สคริปต์ค้นหา API host ที่ถูกต้อง (Test)
│   ├── 📄 probe_result.txt        # ผลลัพธ์จาก probe_auth.js
│   ├── 📄 temp_server.js          # เวอร์ชันเก่าของ server.js (Archive)
│   │
│   └── 📁 roomusetyprcode/        # ข้อมูล Room Use Type Codes (JSON)
│       ├── A.json                 # กิจกรรมนักศึกษา
│       ├── E.json                 # สอบนอกตาราง
│       ├── L.json                 # การเรียนการสอน
│       ├── O.json                 # อื่นๆ
│       └── X.json                 # จัดการสอบ
│
└── 📁 frontend/                   # ──── Frontend (Vue 3 SPA) ────
    ├── 📄 Dockerfile              # Docker multi-stage build (Node → Nginx)
    ├── 📄 package.json            # Dependencies: vue, vue-router, axios, jwt-decode, sweetalert2
    ├── 📄 vite.config.js          # Vite config + dev proxy (/api → localhost:3000)
    ├── 📄 index.html              # HTML entry point (Vite injects scripts)
    ├── 📄 nginx.conf              # Nginx config สำหรับ production (SPA + API proxy)
    │
    ├── 📁 public/                 # Static assets (ไม่ถูก process โดย Vite)
    │
    └── 📁 src/                    # ──── Source Code ────
        ├── 📄 App.vue             # Root Component (มี <router-view> + fade transition)
        ├── 📄 main.js             # Entry point (createApp + mount router)
        ├── 📄 style.css           # ⭐ Global CSS (Dark Glassmorphism theme ทั้งหมด)
        │
        ├── 📁 assets/             # Static assets (ถูก process โดย Vite)
        │
        ├── 📁 components/         # ──── Reusable Components ────
        │   ├── 📄 ConfirmModal.vue    # Modal ยืนยัน (danger/success/primary)
        │   ├── 📄 LanguageSwitcher.vue # ปุ่มสลับภาษา TH/EN
        │   ├── 📄 LogoutButton.vue    # ปุ่ม Logout + ตัด SSO session
        │   └── 📄 HelloWorld.vue      # Default template (ไม่ได้ใช้)
        │
        ├── 📁 composables/        # ──── Vue Composables ────
        │   └── 📄 useLanguage.js  # ⭐ ระบบ i18n (TH/EN translations + persistence)
        │
        ├── 📁 router/             # ──── Vue Router ────
        │   └── 📄 index.js        # Route definitions (5 routes + lazy loading)
        │
        ├── 📁 services/           # ──── API Services ────
        │   └── 📄 api.js          # ⭐ API functions (getEmptyRooms, bookRoom, etc.)
        │
        └── 📁 views/              # ──── Page Components (Views) ────
            ├── 📄 Login.vue           # หน้าเข้าสู่ระบบ (SSO redirect)
            ├── 📄 AuthCallback.vue    # หน้ารับ OAuth callback + JWT decode
            ├── 📄 selectRoom.vue      # หน้าเลือกประเภทห้อง + ค้นหา
            ├── 📄 ClassroomList.vue    # หน้าแสดงห้องว่าง + จองห้อง
            └── 📄 History.vue         # หน้าประวัติการจอง + ยกเลิก
```

---

## 📊 สรุปภาพรวม (Summary)

| หมวด | รายละเอียด |
|------|-----------|
| **ภาษา Frontend** | JavaScript, HTML5, CSS3 |
| **Framework Frontend** | Vue 3 (Composition API + `<script setup>`) |
| **Build Tool** | Vite 7.2.4 |
| **ภาษา Backend** | JavaScript (ES Modules) |
| **Framework Backend** | Express.js 4.18.2 |
| **Runtime Backend** | Node.js 18 |
| **Styling** | Custom CSS 100% — Dark Glassmorphism (ไม่ใช้ CSS Framework) |
| **Font** | Outfit (Google Fonts) |
| **Authentication** | OAuth2 Authorization Code Flow ผ่าน MFU SSO (ADFS) |
| **Database** | ไม่มี (ใช้ MFU API เป็น Data Layer) |
| **Deployment** | Docker + Docker Compose (Nginx + Node.js) |
| **ภาษา UI** | ไทย + อังกฤษ (สลับได้) |
| **API Endpoints** | 5 routes (auth exchange, search rooms, book, history, cancel) |
| **จำนวนหน้า** | 5 หน้า (Login, Callback, Select Room, Room List, History) |
| **จำนวน Components** | 4 (ConfirmModal, LanguageSwitcher, LogoutButton, HelloWorld) |

---

> 📝 **หมายเหตุ:** เอกสารนี้ถูกสร้างจากการวิเคราะห์ซอร์สโค้ดทั้งหมดของโปรเจกต์เมื่อวันที่ 24 กุมภาพันธ์ 2569
