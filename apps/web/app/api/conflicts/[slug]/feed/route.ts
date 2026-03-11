import { NextResponse } from 'next/server';

import {
  buildConflictFeedResponse,
  type ConflictFeedEvent,
} from '../../../../../lib/api/responseBuilders';

export async function GET() {
  const events: ConflictFeedEvent[] = [];
  return NextResponse.json({ events: buildConflictFeedResponse(events) });
}
