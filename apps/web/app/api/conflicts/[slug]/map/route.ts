import { NextResponse } from 'next/server';

import { applyPublicVisibilityFilters } from '../../../../../lib/api/publicVisibility';

export interface ConflictMapFeature {
  id: string;
  conflictSlug: string;
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

export function buildConflictMapResponse(
  features: readonly ConflictMapFeature[],
  now = new Date(),
): ConflictMapFeature[] {
  return applyPublicVisibilityFilters(features, now);
}

export async function GET() {
  const features: ConflictMapFeature[] = [];
  return NextResponse.json({ features: buildConflictMapResponse(features) });
}
