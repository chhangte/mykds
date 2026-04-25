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
    
    // Comment out imports
    content = content.replace(/import { getServerSession } from 'next-auth\/next';/g, "// import { getServerSession } from 'next-auth/next';");
    content = content.replace(/import { authOptions } from '@\/lib\/auth';/g, "// import { authOptions } from '@/lib/auth';");

    fs.writeFileSync(filePath, content);
    console.log(`Cleaned imports in ${f}`);
  }
});
