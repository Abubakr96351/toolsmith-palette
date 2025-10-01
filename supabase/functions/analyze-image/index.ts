import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'Image data is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analyzing image with Gemini vision model...');

    // Call Lovable AI with Gemini vision model
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `You are an expert AI prompt engineer. Analyze this image in extreme detail and generate a comprehensive text prompt that could be used to recreate this image using AI image generation tools like DALL-E, Midjourney, or Stable Diffusion.

Your prompt should include:
1. Main subject and composition
2. Art style and artistic techniques
3. Lighting and atmosphere
4. Colors and color palette
5. Camera angle and perspective
6. Mood and emotions
7. Any notable details or elements
8. Quality descriptors (e.g., "highly detailed", "8k", "photorealistic")

Provide ONLY the prompt text, nothing else. Make it detailed and specific.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Failed to analyze image' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const prompt = data.choices?.[0]?.message?.content;

    if (!prompt) {
      console.error('No prompt generated from AI response');
      return new Response(
        JSON.stringify({ error: 'Failed to generate prompt from image' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Successfully generated prompt');

    // Extract style, colors, and subjects from the prompt
    const style = extractStyle(prompt);
    const colors = extractColors(prompt);
    const subjects = extractSubjects(prompt);

    return new Response(
      JSON.stringify({
        prompt: prompt.trim(),
        confidence: 0.95, // High confidence since we're using a vision model
        style,
        colors,
        subjects
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-image function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function extractStyle(prompt: string): string {
  const styleKeywords = ['photorealistic', 'painting', 'digital art', 'sketch', 'illustration', 
                         'abstract', 'realistic', 'artistic', 'cartoon', 'anime', '3D render'];
  
  for (const keyword of styleKeywords) {
    if (prompt.toLowerCase().includes(keyword.toLowerCase())) {
      return keyword.charAt(0).toUpperCase() + keyword.slice(1);
    }
  }
  
  return 'Mixed Style';
}

function extractColors(prompt: string): string[] {
  const colorKeywords = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 
                         'black', 'white', 'gray', 'brown', 'gold', 'silver', 'vibrant', 'muted'];
  
  const foundColors: string[] = [];
  for (const color of colorKeywords) {
    if (prompt.toLowerCase().includes(color)) {
      foundColors.push(color.charAt(0).toUpperCase() + color.slice(1));
    }
  }
  
  return foundColors.slice(0, 5);
}

function extractSubjects(prompt: string): string[] {
  const subjects: string[] = [];
  const lines = prompt.split(/[.,;]/);
  
  for (let i = 0; i < Math.min(3, lines.length); i++) {
    const line = lines[i].trim();
    if (line.length > 10 && line.length < 100) {
      subjects.push(line);
    }
  }
  
  return subjects;
}
