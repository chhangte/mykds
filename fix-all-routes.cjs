const fs = require('fs');
const path = require('path');

const files = [
  'app/api/teacher/classteacher-view/route.js',
  'app/api/teacher/classteacher-students/route.js',
  'app/api/teacher/classes/route.js',
  'app/api/teacher/class-report/route.js',
  'app/api/marks/route.js'
];

files.forEach(f => {
  const filePath = path.join(process.cwd(), f);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add import if missing
    if (!content.includes('next/cache')) {
      content = "import { unstable_noStore as noStore } from 'next/cache';\n" + content;
    }
    
    // Add noStore() call at the start of GET/POST/PUT functions
    content = content.replace(/export async function (GET|POST|PUT|PATCH|DELETE)\(req.*\) {/g, (match) => {
      return match + "\n  noStore();";
    });
    
    // Also handle functions without arguments or different spacing
    content = content.replace(/export async function (GET|POST|PUT|PATCH|DELETE)\(\) {/g, (match) => {
      return match + "\n  noStore();";
    });

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${f}`);
  }
});
