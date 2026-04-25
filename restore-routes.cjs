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
    
    // Restore getServerSession and session check
    content = content.replace(/\/\/ const session = await getServerSession\(authOptions\);/g, "const session = await getServerSession(authOptions);");
    content = content.replace(/if \(false\) {/g, (match) => {
      // This is risky, but I'll try to be specific
      if (content.includes('Unauthorized')) return "if (!session?.user?.id) {";
      if (content.includes('Forbidden')) return "if (session?.user?.role !== 'admin') {";
      return match;
    });
    
    // Restore imports
    content = content.replace(/\/\/ import { getServerSession } from 'next-auth\/next';/g, "import { getServerSession } from 'next-auth/next';");
    content = content.replace(/\/\/ import { authOptions } from '@\/lib\/auth';/g, "import { authOptions } from '@/lib/auth';");
    
    // Remove noStore() calls
    content = content.replace(/\n  noStore\(\);/g, "");
    content = content.replace(/import { unstable_noStore as noStore } from 'next\/cache';\n/g, "");

    fs.writeFileSync(filePath, content);
    console.log(`Restored ${f}`);
  }
});
