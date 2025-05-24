// doktor-na-dohled/src/app/api/chat/route.ts
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

// Inicializace OpenAI klienta s API klíčem z prostředí
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge'; // Doporučeno pro Vercel AI SDK

export async function POST(req: Request) {
  try {
    // Tělo požadavku nyní obsahuje { messages: Message[] }
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      // Toto je chyba serveru, neměla by se dostat k uživateli, pokud je server správně nakonfigurován
      console.error('Chybí OPENAI_API_KEY v proměnných prostředí.');
      return new Response(JSON.stringify({ error: 'Konfigurace serveru je neúplná.' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Chybí zprávy v požadavku nebo jsou v nesprávném formátu.' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: messages, // Předáváme celou historii konverzace
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);

  } catch (error) {
    console.error('Chyba v API route /api/chat s OpenAI:', error);
    let errorMessage = 'Interní chyba serveru při komunikaci s AI.';
    if (error instanceof Error) {
        // Nevracíme přímo error.message, může obsahovat citlivé informace
        // Logujeme ji na serveru
        if (error.message.includes('authentication') || error.message.includes('API key')) {
            errorMessage = "Problém s autentizací k AI službě.";
        }
    }
    return new Response(JSON.stringify({ error: errorMessage }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
