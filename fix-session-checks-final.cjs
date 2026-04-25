const fs = require('fs');
const path = require('path');

const files = [
  'app/api/teacher/classteacher-view/route.js',
  'app/api/teacher/classteacher-students/route.js',
  'app/api/teacher/classes/route.js',
  'app/api/teacher/class-report/route.js',
  'app/api/marks/route.js',
  'app/api/admin/login-history/route.js',
  'app/api/auth/login-history/route.js'
];

files.forEach(f => {
  const filePath = path.join(process.cwd(), f);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Restore session checks properly
    if (f.includes('admin/login-history')) {
      content = content.replace(/if \(false\)/g, "if (session?.user?.role !== 'admin')");
    } else if (f.includes('auth/login-history')) {
      content = content.replace(/if \(false\)/g, "if (!session?.user?.id)");
    } else if (f.includes('teacher/')) {
      content = content.replace(/if \(false\)/g, "if (!session?.user?.id)");
    } else if (f.includes('marks/')) {
       // marks/route.js has multiple PUT/POST
       content = content.replace(/if \(false\)/g, "if (!session)");
    }

    fs.writeFileSync(filePath, content);
    console.log(`Fixed session checks in ${f}`);
  }
});
