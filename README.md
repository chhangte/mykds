# my.kidsdenschool

A web-based academic management portal built for Kids Den School, Aizawl, Mizoram. Teachers can record marks and attendance for their classes, and the admin can oversee everything from one place.

---

## What is this?

Managing student records on paper or spreadsheets gets messy fast. This portal gives every teacher their own login where they can see only the classes they teach, record class test marks, exam/term marks, mark attendance, and leave notes for students — all from their phone or laptop.

The admin gets a separate view where they can see all classes, manage teachers and students, and view marks across subjects for any class or student.

---

## Who is it for?

- **Teachers** — to record and update student marks and attendance
- **Admin / Principal** — to oversee all classes, manage users, and view reports
- **Students** — coming in Stage 2

---

## What can it do right now?

**Teacher Portal**
- See only your assigned classes on login
- Record Class Test marks (up to 8 tests per subject)
- Record Term/Exam marks (Term 1, 2, 3)
- Mark attendance — Present, Absent, or Late — with date columns you can add or remove
- Add personal notes for individual students
- Marks are locked by default — click Edit to make changes, then Save
- Every edit is logged with who changed what, when, and by how much

**Admin Portal**
- Add, edit, and delete teacher and admin accounts
- Assign specific classes and subjects to each teacher
- Enroll students with class, section (A/B/C), and roll number
- Create and manage classes — each class has a name, section, and subject
- View marks for any class broken down by subject, with Test 1–5 and Term 1–3 tabs
- Scores are colour coded — green for good, yellow for average, red for needs attention

---

## Tech stack

- **Next.js 15** — frontend and API routes
- **MongoDB Atlas** — database (hosted, free tier works fine)
- **NextAuth v4** — login and session management with JWT
- **Mongoose** — database models
- **Deployed on Vercel**

No UI libraries. Everything is built with plain React and inline styles to keep things simple and fast.

---

## Project structure

```
app/
├── page.jsx                  ← Landing page
├── login/                    ← Login page
├── admin/                    ← Admin dashboard and sub-pages
│   ├── users/                ← Manage teachers and admins
│   ├── students/             ← Manage student enrolment
│   ├── classes/              ← Manage class subjects and sections
│   └── class-view/           ← View marks by class
├── teacher/                  ← Teacher dashboard
│   └── class/[classId]/      ← Class page with tabs
└── api/                      ← All backend API routes

components/
├── Navbar.jsx
├── MarksTable.jsx            ← Handles marks display, edit mode, and history
├── AttendanceTable.jsx
├── Spinner.jsx
├── PageLoader.jsx
└── SkeletonRow.jsx

models/
├── User.js
├── Class.js
├── Student.js
├── Mark.js
├── MarksLog.js
└── Attendance.js

lib/
├── mongodb.js                ← Database connection
└── auth.js                   ← NextAuth config
```

---

## Getting started locally

You'll need Node.js and a MongoDB Atlas account (free tier is fine).

**1. Clone the repo**
```bash
git clone https://github.com/yourusername/mykds.git
cd mykds
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Create a `.env.local` file in the root:
```
MONGODB_URI=mongodb+srv://youruser:yourpassword@cluster.mongodb.net/kidsdenschool
NEXTAUTH_SECRET=any_random_string_here
NEXTAUTH_URL=http://localhost:3000
```

**4. Seed the database**
```bash
node --experimental-vm-modules scripts/seed.js
```

This creates a default admin account and a couple of test teachers.

**5. Run the dev server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in.

---

## Default login credentials (after seeding)

| Role | Username | Password |
|---|---|---|
| Admin | `admin` | `school123` |
| Teacher | `teacher1` | `school123` |

Change these after first login.

---

## Deploying to Vercel

1. Push the repo to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add the three environment variables in **Settings → Environment Variables**:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (set this to your Vercel URL, e.g. `https://mykds.vercel.app`)
4. On MongoDB Atlas, go to **Network Access** and allow connections from anywhere (`0.0.0.0/0`)
5. Deploy — it should just work

---

## Setting up the school data

Once logged in as admin, do it in this order:

1. **Manage Classes** → Create classes (e.g. Class VIII, Section A, English)
2. **Manage Users** → Add teachers and assign them to classes
3. **Manage Students** → Enroll students with their class, section, and roll number
4. Teachers can now log in and see their assigned classes

---

## What's coming next (Stage 2)

- Student portal — students log in and view their own marks and attendance
- PDF report generation for individual students
- Parent notifications
- Academic year switching

---

## A note on this project

This was built specifically for Kids Den School to replace their existing paper-based record keeping. The goal was to keep it simple enough that any teacher can use it on their phone without any training — no complex dashboards, no unnecessary features, just what's needed to get the job done.

---

Built with ❤️ for Kids Den School, Aizawl · Est. 2011
