import { NextResponse } from 'next/server';

import {
  buildConflictMapResponse,
  type ConflictMapFeature,
} from '../../../../../lib/api/responseBuilders';

export async function GET() {
  const features: ConflictMapFeature[] = [];
  return NextResponse.json({ features: buildConflictMapResponse(features) });
}
