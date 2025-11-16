import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// GET - Retrieve token from httpOnly cookie
export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('access_token')?.value;
    const tokenType = cookieStore.get('token_type')?.value || 'Bearer';
    
    if (!token) {
      return NextResponse.json({ token: null }, { status: 200 });
    }
    
    return NextResponse.json({ token, tokenType }, { status: 200 });
  } catch (error) {
    console.error('Failed to retrieve token:', error);
    return NextResponse.json({ error: 'Failed to retrieve token' }, { status: 500 });
  }
}

// POST - Set token in httpOnly cookie
export async function POST(request: NextRequest) {
  try {
    const { token, tokenType = 'Bearer' } = await request.json();
    
    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }
    
    const response = NextResponse.json({ success: true }, { status: 200 });
    
    // Set httpOnly cookies with security flags
    response.cookies.set('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });
    
    response.cookies.set('token_type', tokenType, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });
    
    return response;
  } catch (error) {
    console.error('Failed to set token:', error);
    return NextResponse.json({ error: 'Failed to set token' }, { status: 500 });
  }
}

// DELETE - Clear token cookies
export async function DELETE(request: NextRequest) {
  try {
    const response = NextResponse.json({ success: true }, { status: 200 });
    
    // Clear cookies by setting them to expire
    response.cookies.set('access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/'
    });
    
    response.cookies.set('token_type', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/'
    });
    
    return response;
  } catch (error) {
    console.error('Failed to clear token:', error);
    return NextResponse.json({ error: 'Failed to clear token' }, { status: 500 });
  }
}