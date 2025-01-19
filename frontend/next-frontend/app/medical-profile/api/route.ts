import { makePrediction } from '@/app/medical-profile/api/predictionService';

export async function POST(request: Request) {
  try {
    // Parse the incoming request body as JSON
    const formData = await request.json();

    // Make the prediction using the form data
    const prediction = await makePrediction(formData);

    // Return the prediction result as JSON
    return new Response(JSON.stringify({ prediction }), { status: 200 });

  } catch (error) {
    // Log the error
    console.error('Error in API route:', error);

    // Return error details if something goes wrong
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500 }
    );
  }
}
