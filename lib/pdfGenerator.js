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

  let y = startY;

  // Header
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.text('KIDS DEN SCHOOL, AIZAWL', 105, y, { align: 'center' });
  y += 8;

  doc.setFont('times', 'normal');
  doc.setFontSize(11);
  const examName = `${testLabel.toUpperCase()} ${isExam ? 'EXAMINATION' : ''} ${academicYear || new Date().getFullYear()}`;
  doc.text(examName, 105, y, { align: 'center' });
  y += 6;

  doc.setFont('times', 'bold');
  doc.text('STATEMENT OF MARKS', 105, y, { align: 'center' });
  y += 12;

  // Student Info
  doc.setFont('times', 'normal');
  doc.setFontSize(11);
  const startX = 20;
  const colonX = 60;
  const valueX = 65;

  const infoLines = [
    { label: 'Name', value: student.name },
    { label: 'Roll No', value: student.rollNo },
    { label: 'Class & Section', value: `${className} '${section}'` },
    { label: 'Father\'s Name', value: '__________________' }, // Placeholder if not in DB
    { label: 'Mother\'s Name', value: '__________________' }, // Placeholder if not in DB
  ];

  infoLines.forEach(line => {
    doc.text(line.label, startX, y);
    doc.text(':', colonX, y);
    doc.text(line.value, valueX, y);
    y += 6;
  });

  y += 2;

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
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
      font: 'times',
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
      font: 'times',
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
    { label: 'Improvement Index*', value: '-', bold: true },
    { label: 'Result', value: hasFailed ? 'Failed' : 'Passed', bold: true }
  ];

  summaryLines.forEach(line => {
    if (line.bold) doc.setFont('times', 'bold');
    else doc.setFont('times', 'normal');
    
    doc.text(line.label, startX, y);
    doc.text(':', colonX, y);
    doc.text(line.value, valueX, y);
    y += 8;
  });

  // Footnotes
  y += 2;
  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  const footnoteText = "*Improvement index is the difference between latest examination percentage and the previous examination percentage. It is the main factor on how we measure our students. -ve index shows decline, 0 means no improvement or decline, and +ve index shows improvement.";
  const splitFootnote = doc.splitTextToSize(footnoteText, 170);
  doc.text(splitFootnote, startX, y);
  
  y += splitFootnote.length * 4 + 6;
  doc.setFontSize(11);
  
  const formattedDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  doc.text('Date of result publication', startX, y);
  doc.text(':', colonX, y);
  doc.text(formattedDate, valueX, y);

  // Signatures
  y += 25;
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
