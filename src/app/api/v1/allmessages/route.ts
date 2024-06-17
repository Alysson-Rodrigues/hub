import { NextRequest, NextResponse } from 'next/server';
import database from '@root/infra/database.js';

export async function GET(request: NextRequest) {
  const result = await database.query(
    `SELECT id, title, type, description, created_at 
     FROM messages
     ORDER BY created_at DESC`
  );
  return NextResponse.json(result.rows);
}
