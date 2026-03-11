import { NextResponse } from 'next/server';

import { buildEventDetailsResponse, type EventDetails } from '../../../../lib/api/responseBuilders';

export async function GET() {
  const event: EventDetails | null = null;

  if (!event) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const visibleEvent = buildEventDetailsResponse(event);
  if (!visibleEvent) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ event: visibleEvent });
}
