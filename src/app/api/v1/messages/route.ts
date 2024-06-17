import { NextRequest, NextResponse } from 'next/server';
import database from '@root/infra/database.js';

export async function GET(request: NextRequest) {
  const result = await database.query(
    `SELECT id, title, type, description, created_at 
     FROM messages
     ORDER BY created_at DESC
     LIMIT 50`
  );
  return NextResponse.json(result.rows);
}

export async function POST(request: NextRequest) {
  try {
    let { title, type, description, agent_id } = await request.json();
    title = title?.trim().replace(/\s+/g, ' ');
    description = description?.trim().replace(/\s+/g, ' ');
    if (
      !String(agent_id).match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/
      )
    ) {
      return NextResponse.json(
        {
          error: 'Identificador inválido, tente novamente',
        },
        { status: 409 }
      );
    }
    const agent = await database.query({
      text: `SELECT COUNT(*) FROM agents WHERE id = $1`,
      values: [agent_id],
    });
    if (Number(agent.rows[0].count) === 0) {
      return NextResponse.json(
        {
          error:
            'Identificador comprometido,recarregue a página e tente novamente',
        },
        { status: 409 }
      );
    }
    const messages = await database.query({
      text: `SELECT COUNT(*) FROM messages
             WHERE agent_id = $1 AND created_at > NOW() - INTERVAL '8 hours'`,
      values: [agent_id],
    });
    if (Number(messages.rows[0].count) >= 4) {
      return NextResponse.json(
        {
          error:
            'Calma calabreso, tá com pressa? Já deu né, amanhã tu manda mais!',
        },
        { status: 429 }
      );
    }
    if (Number(type) !== 1 && Number(type) !== 5 && !title) {
      return NextResponse.json(
        { error: 'Denúncias, fofocas e outros precisam de um título.' },
        { status: 400 }
      );
    }
    if (title && title.length > 100) {
      return NextResponse.json(
        {
          error:
            'Calma calabreso, pensa um pouqinho mais e resume isso aí pra gente... (Até 100 caracteres para o título)',
        },
        { status: 400 }
      );
    }
    if (description.length > 255) {
      return NextResponse.json(
        {
          error:
            'Calma calabreso, pensa um pouqinho mais e resume isso aí pra gente... (Até 255 caracteres)',
        },
        { status: 400 }
      );
    }
    if (!title && !description) {
      return NextResponse.json(
        {
          error:
            'Gostamos do seu silêncio, mas mande somente quando decidir digitar alguma coisa :)',
        },
        { status: 400 }
      );
    }
    const result = await database.query({
      text: `INSERT INTO messages (title, type, description, agent_id)
       VALUES ($1, $2, $3, $4)
       RETURNING title, type, description`,
      values: [title, parseInt(type), description, agent_id],
    });
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: 'Deu ruim aqui dentro, calma que vamo corrigir kakakakaka' },
      { status: 500 }
    );
  }
}
