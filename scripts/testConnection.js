import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB connected successfully!');
  await mongoose.disconnect();
} catch (err) {
  console.error('❌ Connection failed:', err.message);
}