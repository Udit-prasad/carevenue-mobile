import { UserProfile } from '../types';

export interface AIResponse {
  severity: 'low' | 'medium' | 'high';
  action: string;
  nearestResource: string;
  triggerEmergency: boolean;
}

export async function analyzeSymptoms(
  input: string,
  userProfile: UserProfile,
  venueContext: string
): Promise<AIResponse> {
  // Use Groq API Key
  const API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;

  if (!API_KEY) {
    return {
      severity: 'medium',
      action: `You inputted: "${input}". (Missing EXPO_PUBLIC_GROQ_API_KEY in .env file).`,
      nearestResource: 'Main First-Aid Desk',
      triggerEmergency: false
    };
  }

  try {
    const systemPrompt = `
      You are CareVenueAI Buddy, a real-time medical assistant located physically in ${venueContext}.
      User UserProfile: ${JSON.stringify(userProfile)}.
      
      Provide real-time medication advice if they asked about medicines, or symptom evaluation.
      You MUST respond ONLY in valid JSON format matching this EXACT structure, with NO markdown blocks and NO explanations:
      {
        "severity": "low" | "medium" | "high",
        "action": "(A detailed response directly answering their input regarding medications, triage, or advice)",
        "nearestResource": "(A suggested location locally in the venue they should go to, e.g. 'nearest water cooler')",
        "triggerEmergency": boolean
      }
    `;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // Lightning fast open-source model
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: input }
        ],
        response_format: { type: "json_object" }, // Forces strict JSON output
        temperature: 0.1
      })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || "Groq Cloud Reject");
    }

    const text = data.choices[0].message.content;
    
    // Safely parse JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return JSON.parse(text.trim());
  } catch (error: any) {
    console.warn("Groq AI Engine Fault:", error.message || error);
    return {
      severity: 'high',
      action: `Network/API Issue (${error.message}). If this is an emergency, press SOS immediately.`,
      nearestResource: 'Unknown',
      triggerEmergency: false
    };
  }
}
