import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Create the form data to send to the Flask backend
    const backendFormData = new FormData();
    backendFormData.append('file', file);

    // Forward the request to the Flask backend
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: backendFormData,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response from the Flask backend');
    }

    const data = await response.json();

    // Return the Flask response data to the frontend
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
