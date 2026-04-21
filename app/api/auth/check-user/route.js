import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  try {
    const { username } = await req.json();
    
    if (!username) {
      return NextResponse.json({ exists: false, error: 'Username is required' }, { status: 400 });
    }

    await connectDB();
    
    // Find the user by username, ignoring case/trimming extra spaces just in case
    const user = await User.findOne({ username: username.trim() }).select('username name role');

    if (!user) {
      return NextResponse.json({ exists: false });
    }

    return NextResponse.json({ 
      exists: true, 
      user: { 
        name: user.name, 
        username: user.username, 
        role: user.role 
      } 
    });
  } catch (err) {
    console.error('Error checking user:', err);
    return NextResponse.json({ exists: false, error: 'Internal server error' }, { status: 500 });
  }
}
