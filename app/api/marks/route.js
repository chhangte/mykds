import { connectDB } from '@/lib/mongodb';
import Mark from '@/models/Mark';
import { getServerSession } from 'next-auth';

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const classId = searchParams.get('classId');
  const type = searchParams.get('type');
  const marks = await Mark.find({ class: classId, type });
  return Response.json(marks);
}

export async function POST(req) {
  await connectDB();
  const { studentId, classId, type, index, marksObtained } = await req.json();
  const mark = await Mark.findOneAndUpdate(
    { student: studentId, class: classId, type, index },
    { marksObtained },
    { upsert: true, new: true }
  );
  return Response.json(mark);
}