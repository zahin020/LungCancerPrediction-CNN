export interface FormData {
  YELLOW_FINGERS: number;
  ANXIETY: number;
  PEER_PRESSURE: number;
  CHRONIC_DISEASE: number;
  FATIGUE: number;
  ALLERGY: number;
  WHEEZING: number;
  ALCOHOL_CONSUMING: number;
  COUGHING: number;
  SWALLOWING_DIFFICULTY: number;
  CHEST_PAIN: number;
  ANXYELFIN: number;
}
// api/predictionService.ts

export async function makePrediction(formData: FormData) {
  // Dynamically determine the host (localhost or IP) of the frontend
  const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

  // Construct the backend API URL using the dynamically detected host
  const apiUrl = `http://${host}:5002`;

  const response = await fetch(`${apiUrl}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.prediction; // Assuming your backend returns { prediction: 'result' }
}

