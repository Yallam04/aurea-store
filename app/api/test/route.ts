import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const result = await sql`SELECT version()`;
    return NextResponse.json({ message: "Database connected successfully!", version: result[0].version });
  } catch (error) {
    return NextResponse.json({ error: "Failed to connect to Neon" }, { status: 500 });
  }
}