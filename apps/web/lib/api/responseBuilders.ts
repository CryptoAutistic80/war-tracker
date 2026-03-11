import { applyPublicVisibilityFilter, applyPublicVisibilityFilters } from './publicVisibility';

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

export function buildConflictFeedResponse(
  events: readonly ConflictFeedEvent[],
  now = new Date(),
): ConflictFeedEvent[] {
  return applyPublicVisibilityFilters(events, now);
}

export function buildConflictMapResponse(
  features: readonly ConflictMapFeature[],
  now = new Date(),
): ConflictMapFeature[] {
  return applyPublicVisibilityFilters(features, now);
}

export function buildEventDetailsResponse(
  event: EventDetails,
  now = new Date(),
): EventDetails | null {
  return applyPublicVisibilityFilter(event, now);
}
