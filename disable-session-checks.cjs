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
    
    // Comment out getServerSession and session check
    content = content.replace(/const session = await getServerSession\(authOptions\);/g, "// const session = await getServerSession(authOptions);");
    content = content.replace(/if \(!session.*\) {/g, "if (false) {");
    content = content.replace(/if \(session\?\.user.*\) {/g, "if (false) {");
    content = content.replace(/if \(session\?\.user.*\)/g, "if (false)");
    content = content.replace(/if \(!session\?\.user.*\)/g, "if (false)");

    fs.writeFileSync(filePath, content);
    console.log(`Disabled session check in ${f}`);
  }
});
