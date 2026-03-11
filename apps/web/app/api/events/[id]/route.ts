import { NextResponse } from 'next/server';

import { applyPublicVisibilityFilter } from '../../../../lib/api/publicVisibility';

export interface EventDetails {
  id: string;
  moderationStatus?: string | null;
  publicDelayUntil?: string | Date | null;
  precisionLevel?: 'precise' | 'coarse' | 'precise_hidden' | null;
  coordinates?: { lat: number; lng: number } | null;
  coarseCoordinates?: { lat: number; lng: number } | null;
  geometry?: unknown;
  locationText?: string | null;
  coarseLocationText?: string | null;
  regionName?: string | null;
}

export function buildEventDetailsResponse(
  event: EventDetails,
  now = new Date(),
): EventDetails | null {
  return applyPublicVisibilityFilter(event, now);
}

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
