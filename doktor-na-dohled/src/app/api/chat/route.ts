// doktor-na-dohled/src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userMessage = body.message;

    if (!userMessage) {
      return NextResponse.json({ error: 'Chybí zpráva v požadavku' }, { status: 400 });
    }

    // Simulace odpovědi AI
    const aiReply = `AI odpoví později na: "${userMessage}"`;

    return NextResponse.json({ reply: aiReply });

  } catch (error) {
    console.error('Chyba v API route /api/chat:', error);
    // V produkci by zde mohlo být detailnější logování nebo error tracking
    return NextResponse.json({ error: 'Interní chyba serveru' }, { status: 500 });
  }
}
