import { NextResponse } from 'next/server';

import { applyPublicVisibilityFilters } from '../../../../../lib/api/publicVisibility';

export interface ConflictFeedEvent {
  id: string;
  conflictSlug: string;
  summary: string;
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

export function buildConflictFeedResponse(
  events: readonly ConflictFeedEvent[],
  now = new Date(),
): ConflictFeedEvent[] {
  return applyPublicVisibilityFilters(events, now);
}

export async function GET() {
  const events: ConflictFeedEvent[] = [];
  return NextResponse.json({ events: buildConflictFeedResponse(events) });
}
