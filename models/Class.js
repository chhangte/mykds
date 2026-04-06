import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true },  // e.g. "Class V"
  subject: { type: String, required: true }, // e.g. "English"
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  academicYear: { type: String, default: '2024-25' },
}, { timestamps: true });

export default mongoose.models.Class || mongoose.model('Class', ClassSchema);