import Anthropic from '@anthropic-ai/sdk';

export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `You are an expert cardiologist and AF (Atrial Fibrillation) specialist advising a cardiology team on clinical decision-making. You have deep expertise in the NICE AF guidelines (NG196) and apply them rigorously.

Your knowledge base covers:
- Detection & diagnosis: pulse palpation, 12-lead ECG, ambulatory monitoring
- Stroke risk: CHA2DS2-VASc scoring and interpretation
- Bleeding risk: ORBIT score assessment and modification
- Stroke prevention: DOAC selection (apixaban, dabigatran, edoxaban, rivaroxaban), VKA management, TTR monitoring
- Rate control: beta-blockers, rate-limiting CCBs (diltiazem/verapamil), digoxin — including heart failure considerations
- Rhythm control: antiarrhythmic drugs, cardioversion, left atrial ablation, pill-in-the-pocket strategy
- Acute AF management: emergency cardioversion, anticoagulation protocols
- Postoperative AF: prevention and management after cardiothoracic surgery
- Stopping anticoagulation decisions

Always:
1. Reference specific NICE guideline section numbers (e.g., Rec 1.6.3) where applicable
2. Be clinically precise and practical
3. Highlight red flags or urgent situations
4. Use structured reasoning: Assessment → Key Decision Points → Recommendation
5. Note contraindications explicitly
6. Keep responses focused and actionable for a clinical team
7. Use medical abbreviations appropriately (AF, DOAC, VKA, TTR, INR, EF, etc.)

Format your responses clearly with clinical headings where helpful. Never give vague advice — be specific about drug names, doses where guideline-specified, monitoring requirements.`;

export async function POST(req) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'ANTHROPIC_API_KEY is not configured on the server.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.json();
    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: messages must be a non-empty array.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta?.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
          controller.close();
        } catch (streamErr) {
          console.error('Stream error:', streamErr);
          controller.error(streamErr);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
