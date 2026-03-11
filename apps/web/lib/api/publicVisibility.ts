export type PrecisionLevel = 'precise' | 'coarse' | 'precise_hidden';

export interface PublicVisibilityRecord {
  moderationStatus?: string | null;
  publicDelayUntil?: string | Date | null;
  precisionLevel?: PrecisionLevel | string | null;
  coordinates?: { lat: number; lng: number } | null;
  coarseCoordinates?: { lat: number; lng: number } | null;
  geometry?: unknown;
  locationText?: string | null;
  coarseLocationText?: string | null;
  regionName?: string | null;
}

function asDate(value: string | Date | null | undefined): Date | null {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function isSuppressedRecord(record: PublicVisibilityRecord): boolean {
  return record.moderationStatus === 'suppressed';
}

export function isPubliclyDelayed(record: PublicVisibilityRecord, now: Date): boolean {
  const delayUntil = asDate(record.publicDelayUntil);
  return delayUntil !== null && delayUntil.getTime() > now.getTime();
}

export function applyPrecisionVisibility<T extends PublicVisibilityRecord>(record: T): T {
  if (record.precisionLevel !== 'precise_hidden') {
    return record;
  }

  const fallbackLocationText =
    record.coarseLocationText ?? record.regionName ?? record.locationText ?? null;

  return {
    ...record,
    coordinates: record.coarseCoordinates ?? null,
    geometry: null,
    locationText: fallbackLocationText,
  };
}

export function applyPublicVisibilityFilters<T extends PublicVisibilityRecord>(
  records: readonly T[],
  now = new Date(),
): T[] {
  return records
    .filter((record) => !isSuppressedRecord(record))
    .filter((record) => !isPubliclyDelayed(record, now))
    .map((record) => applyPrecisionVisibility(record));
}

export function applyPublicVisibilityFilter<T extends PublicVisibilityRecord>(
  record: T,
  now = new Date(),
): T | null {
  if (isSuppressedRecord(record) || isPubliclyDelayed(record, now)) {
    return null;
  }

  return applyPrecisionVisibility(record);
}
