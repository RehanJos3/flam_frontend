import { NextResponse } from 'next/server';
import { generateBatch } from '../../../lib/dataGenerator';

export const runtime = 'nodejs';

export async function GET() {
	const now = Date.now();
	const data = generateBatch(now, 100, 100);
	return NextResponse.json({ data });
}



