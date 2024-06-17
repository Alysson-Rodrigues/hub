import { NextRequest, NextResponse } from 'next/server';
import database from '@root/infra/database.js';

export async function POST(request: NextRequest) {
  try {
    let { user_agent, platform } = await request.json();
    const result = await database.query({
      text: `INSERT INTO agents (platform, user_agent)
       VALUES ($1, $2)
       RETURNING id`,
      values: [user_agent, platform],
    });
    return NextResponse.json(
      {
        identifier: result.rows[0].id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: 'Deu ruim aqui dentro, calma que vamo corrigir kakakakaka' },
      { status: 500 }
    );
  }
}
