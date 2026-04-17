import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Constants for PDF generation
const FULL_MARKS = {
  exam: 100, // Default full marks for exam
  classtest: 20 // Default full marks for class test (adjust if needed)
};
const PASS_MARKS = {
  exam: 40,
  classtest: 8
};

function drawStudentReportCard(doc, student, subjects, classInfo, testLabel, testType, startY = 15) {
  const { className, section, academicYear } = classInfo;
  const isExam = testType === 'exam';
  const fullMarks = isExam ? FULL_MARKS.exam : FULL_MARKS.classtest;
  const passMarks = isExam ? PASS_MARKS.exam : PASS_MARKS.classtest;

  // --- Background Watermark ---
  doc.setTextColor(247, 238, 226); // Light beige/yellowish color
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);

  const watermarkText = 'KIDS DEN SCHOOL  ';
  const textWidth = doc.getTextWidth(watermarkText);
  const repeatedText = watermarkText.repeat(15);

  for (let i = 0; i < 40; i++) {
    const offsetX = (i % 2 === 0) ? 0 : -(textWidth / 2);
    doc.text(repeatedText, offsetX, i * 8);
  }
  doc.setTextColor(0, 0, 0); // reset color
  // -------------------------

  let y = startY;

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('KIDS DEN SCHOOL', 105, y, { align: 'center' });
  y += 6;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Aizawl, Mizoram', 105, y, { align: 'center' });
  y += 6;

  doc.setTextColor(0, 102, 204); // Blue color for URL
  doc.text('www.kidsdenschool.in', 105, y, { align: 'center' });
  const urlWidth = doc.getTextWidth('www.kidsdenschool.in');
  doc.setLineWidth(0.3);
  doc.setDrawColor(0, 102, 204);
  doc.line(105 - urlWidth / 2, y + 1, 105 + urlWidth / 2, y + 1);
  doc.setTextColor(0, 0, 0); // reset color
  y += 10;

  doc.setFontSize(14);
  let examStr = `${testLabel.toUpperCase()}`;
  if (isExam && !examStr.includes('EXAMINATION')) examStr += ' EXAMINATION';
  examStr += ` ${academicYear || new Date().getFullYear()}`;
  doc.text(examStr, 105, y, { align: 'center' });
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('STATEMENT OF MARKS', 105, y, { align: 'center' });
  y += 12;

  // Student Info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  const startX = 20;
  const colonX = 60;
  const valueX = 75;

  const infoLines = [
    { label: 'Name', value: student.name },
    { label: 'Roll No', value: student.rollNo },
    { label: 'Class & Section', value: `${className} '${section}'` },
    { label: 'Father\'s Name', value: student.fatherName || '__________________' },
    { label: 'Mother\'s Name', value: student.motherName || '__________________' },
  ];

  infoLines.forEach(line => {
    doc.text(line.label, startX, y);
    doc.text(':', colonX, y);
    doc.text(line.value, valueX, y);
    y += 7;
  });

  y += 3;

  // Table Data setup
  const tableHead = [['Subject', 'Full Marks', 'Pass Marks', 'Marks Obtained']];
  const tableBody = [];
  let totalObtained = 0;
  let totalFull = 0;
  let hasFailed = false;

  subjects.forEach(subject => {
    const score = student.marks[subject];
    const isPresent = score !== null && score !== undefined;
    const scoreVal = isPresent ? score : '-';

    tableBody.push([
      subject,
      fullMarks.toString(),
      passMarks.toString(),
      scoreVal.toString()
    ]);

    totalFull += fullMarks;
    if (isPresent) {
      totalObtained += score;
      if (score < passMarks) hasFailed = true;
    } else {
      hasFailed = true; // Absent typically means fail or NA for that subject
    }
  });

  // Render Table
  autoTable(doc, {
    startY: y,
    head: tableHead,
    body: tableBody,
    theme: 'grid',
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineColor: [150, 150, 150],
      lineWidth: 0.2,
      font: 'helvetica',
      fontStyle: 'bold',
      fontSize: 12,
      halign: 'center'
    },
    bodyStyles: {
      textColor: [0, 0, 0],
      lineColor: [150, 150, 150],
      lineWidth: 0.2,
      font: 'helvetica',
      fontSize: 12,
      halign: 'center'
    },
    columnStyles: {
      0: { halign: 'left' } // Subject names aligned left
    },
    margin: { left: startX, right: startX }
  });

  y = doc.lastAutoTable.finalY + 12;

  // Summary sections below table
  const percentage = totalFull > 0 ? ((totalObtained / totalFull) * 100).toFixed(1) : 0;

  const summaryLines = [
    { label: 'Attendance', value: '___ / ___' }, // Placeholder for attendance
    { label: 'Total Marks Obtained', value: `${totalObtained} / ${totalFull}` },
    { label: 'Percentage', value: `${percentage}%`, bold: true },
    { label: 'Result', value: hasFailed ? 'Failed' : 'Passed', bold: true },
    { label: 'Date of publication', value: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) }
  ];

  doc.setFontSize(12);
  summaryLines.forEach(line => {
    if (line.bold) doc.setFont('helvetica', 'bold');
    else doc.setFont('helvetica', 'normal');

    doc.text(line.label, startX, y);
    doc.text(':', colonX, y);
    doc.text(line.value, valueX, y);
    y += 8;
  });

  // Signatures
  y += 25;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  doc.text('Ruth Vanlalthakimi Hmar', 45, y - 5, { align: 'center' });
  doc.text(classInfo.classTeacherName || '', 105, y - 5, { align: 'center' });

  doc.text('Principal', 45, y, { align: 'center' });
  doc.text('Class Teacher', 105, y, { align: 'center' });
  doc.text('Parent Signature', 165, y, { align: 'center' });
}

export function generateReportCardPDF(student, classInfo, subjects, testLabel, testType) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  drawStudentReportCard(doc, student, subjects, classInfo, testLabel, testType);
  doc.save(`${student.rollNo}_${student.name.replace(/ /g, '_')}_${testLabel.replace(/ /g, '_')}.pdf`);
}

export function generateMergedReportCardsPDF(students, classInfo, subjects, testLabel, testType) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  students.forEach((student, index) => {
    if (index > 0) {
      doc.addPage();
    }
    drawStudentReportCard(doc, student, subjects, classInfo, testLabel, testType);
  });

  doc.save(`${classInfo.className}_Sec${classInfo.section}_${testLabel.replace(/ /g, '_')}_All_Students.pdf`);
}

function drawCumulativeReportCard(doc, student, subjects, classInfo, startY = 15) {
  const { className, section, academicYear } = classInfo;

  // --- Background Watermark ---
  doc.setTextColor(247, 238, 226); // Light beige/yellowish color
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  
  const watermarkText = 'KIDS DEN SCHOOL  ';
  const textWidth = doc.getTextWidth(watermarkText);
  const repeatedText = watermarkText.repeat(15);
  
  for (let i = 0; i < 40; i++) {
    const offsetX = (i % 2 === 0) ? 0 : -(textWidth / 2);
    doc.text(repeatedText, offsetX, i * 8);
  }
  doc.setTextColor(0, 0, 0); // reset color
  // -------------------------

  let y = startY;

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('ETHEREAL INTERNATIONAL SCHOOL', 105, y, { align: 'center' });
  y += 6;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Aizawl, Mizoram', 105, y, { align: 'center' });
  y += 6;

  doc.setTextColor(0, 102, 204); // Blue color for URL
  doc.text('www.eis.ac.in', 105, y, { align: 'center' });
  const urlWidth = doc.getTextWidth('www.eis.ac.in');
  doc.setLineWidth(0.3);
  doc.setDrawColor(0, 102, 204);
  doc.line(105 - urlWidth / 2, y + 1, 105 + urlWidth / 2, y + 1);
  doc.setTextColor(0, 0, 0); // reset color
  y += 10;

  doc.setFontSize(14);
  doc.text(`EXAMINATIONS ${academicYear || new Date().getFullYear()}`, 105, y, { align: 'center' });
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('STATEMENT OF MARKS', 105, y, { align: 'center' });
  y += 12;

  // Student Info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  const startX = 20;
  const colonX = 60;
  const valueX = 75;

  const infoLines = [
    { label: 'Name', value: student.name },
    { label: 'Roll No.', value: student.rollNo },
    { label: 'Class & Section', value: `${className} '${section}'` },
    { label: 'Father\'s Name', value: student.fatherName || '__________________' }, 
    { label: 'Mother\'s Name', value: student.motherName || '__________________' }, 
  ];

  infoLines.forEach(line => {
    doc.text(line.label, startX, y);
    doc.text(':', colonX, y);
    doc.text(line.value, valueX, y);
    y += 7;
  });

  y += 5;

  // Table Setup
  const getSubjectFullMarks = (subject) => ['Information Technology', 'General Knowledge', 'Moral Values'].includes(subject) ? 50 : 100;
  const getSubjectPassMarks = (subject) => getSubjectFullMarks(subject) === 100 ? 40 : 20;
  
  let totalFullMarks = 0;
  let totalTerm1 = 0;
  let totalTerm2 = 0;
  let totalTerm3 = 0;
  
  const tableBody = [];
  
  subjects.forEach(subject => {
     let fM = getSubjectFullMarks(subject);
     let pM = getSubjectPassMarks(subject);
     totalFullMarks += fM;
     
     const scores = student.marks[subject] || {};
     const t1 = scores[1] !== null && scores[1] !== undefined ? scores[1] : '-';
     const t2 = scores[2] !== null && scores[2] !== undefined ? scores[2] : '-';
     const t3 = scores[3] !== null && scores[3] !== undefined ? scores[3] : '-';
     
     if(t1 !== '-') totalTerm1 += t1;
     if(t2 !== '-') totalTerm2 += t2;
     if(t3 !== '-') totalTerm3 += t3;
     
     tableBody.push([
       subject,
       fM.toString(),
       pM.toString(),
       t1.toString(),
       t2.toString(),
       t3.toString()
     ]);
  });
  
  const tableFoot = [[
     'TOTAL',
     totalFullMarks.toString(),
     '', // blank for pass marks total
     totalTerm1.toString(),
     totalTerm2.toString(),
     totalTerm3.toString()
  ]];

  autoTable(doc, {
    startY: y,
    head: [
      [ 
        { content: 'Subjects', rowSpan: 2, styles: { halign: 'center', valign: 'middle' } }, 
        { content: 'Full\nMarks', rowSpan: 2, styles: { halign: 'center', valign: 'middle' } }, 
        { content: 'Pass\nMarks', rowSpan: 2, styles: { halign: 'center', valign: 'middle' } }, 
        { content: 'Marks Obtained', colSpan: 3, styles: { halign: 'center' } } 
      ],
      [ 'Term 1', 'Term 2', 'Term 3' ]
    ],
    body: tableBody,
    foot: tableFoot,
    theme: 'grid',
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineColor: [150, 150, 150],
      lineWidth: 0.2,
      font: 'helvetica',
      fontStyle: 'bold',
      fontSize: 10,
      halign: 'center'
    },
    bodyStyles: {
      textColor: [0, 0, 0],
      lineColor: [150, 150, 150],
      lineWidth: 0.2,
      font: 'helvetica',
      fontSize: 11,
      halign: 'center'
    },
    footStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineColor: [150, 150, 150],
      lineWidth: 0.2,
      font: 'helvetica',
      fontStyle: 'bold',
      fontSize: 11,
      halign: 'center'
    },
    columnStyles: {
      0: { halign: 'left' } 
    },
    margin: { left: startX, right: startX }
  });

  y = doc.lastAutoTable.finalY + 15;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Attendance', startX, y);
  doc.text(':', colonX, y);
  doc.text('___ / ___', valueX, y); 
  
  y += 12;
  
  doc.text('Date of publication', startX, y);
  doc.text(':', colonX, y);
  doc.text(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), valueX, y);

  y += 25;
  
  doc.text('Ruth Vanlalthakimi Hmar', 45, y - 5, { align: 'center' });
  doc.text(classInfo.classTeacherName || '', 105, y - 5, { align: 'center' });
  
  doc.text('Principal', 45, y, { align: 'center' });
  doc.text('Class Teacher', 105, y, { align: 'center' });
  doc.text('Parent Signature', 165, y, { align: 'center' });
}

export function generateCumulativeReportCardPDF(student, classInfo, subjects) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  drawCumulativeReportCard(doc, student, subjects, classInfo);
  doc.save(`${student.rollNo}_${student.name.replace(/ /g, '_')}_Final_Cumulative.pdf`);
}

export function generateCumulativeMergedReportCardsPDF(students, classInfo, subjects) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  let first = true;
  students.forEach((student) => {
    if (!first) {
      doc.addPage();
    }
    first = false;
    drawCumulativeReportCard(doc, student, subjects, classInfo);
  });

  doc.save(`${classInfo.className}_Sec${classInfo.section}_Final_Cumulative_All_Students.pdf`);
}
