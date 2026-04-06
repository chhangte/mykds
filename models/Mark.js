import mongoose from 'mongoose';

const MarkSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  type: { type: String, enum: ['classtest', 'exam'], required: true },
  index: { type: Number, required: true }, // 1, 2, 3 (Test 1, Test 2...)
  maxMarks: { type: Number, default: 100 },
  marksObtained: { type: Number },
  academicYear: { type: String, default: '2024-25' },
}, { timestamps: true });

export default mongoose.models.Mark || mongoose.model('Mark', MarkSchema);