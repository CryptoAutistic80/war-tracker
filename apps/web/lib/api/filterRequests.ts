export const ALL_FILTER_VALUE = 'all';

export type ConflictSeverity = 'low' | 'medium' | 'high';
export type ConflictImpact = 'local' | 'regional' | 'global';

export interface ConflictFilters {
  region?: string;
  severity?: ConflictSeverity;
  impact?: ConflictImpact;
  provider?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface ConflictListRequest {
  endpoint: '/api/conflicts';
  query: string;
  url: string;
  filters: ConflictFilters;
}

function isValidDate(value: string | undefined): value is string {
  if (!value) {
    return false;
  }

  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime());
}

export function sanitizeConflictFilters(filters: ConflictFilters): ConflictFilters {
  return {
    region: filters.region && filters.region !== ALL_FILTER_VALUE ? filters.region : undefined,
    severity: filters.severity ? filters.severity : undefined,
    impact: filters.impact ? filters.impact : undefined,
    provider:
      filters.provider && filters.provider !== ALL_FILTER_VALUE ? filters.provider : undefined,
    dateFrom: isValidDate(filters.dateFrom) ? filters.dateFrom : undefined,
    dateTo: isValidDate(filters.dateTo) ? filters.dateTo : undefined,
  };
}

export function buildConflictFilterQuery(filters: ConflictFilters): string {
  const sanitized = sanitizeConflictFilters(filters);
  const params = new URLSearchParams();

  if (sanitized.region) params.set('region', sanitized.region);
  if (sanitized.severity) params.set('severity', sanitized.severity);
  if (sanitized.impact) params.set('impact', sanitized.impact);
  if (sanitized.provider) params.set('provider', sanitized.provider);
  if (sanitized.dateFrom) params.set('dateFrom', sanitized.dateFrom);
  if (sanitized.dateTo) params.set('dateTo', sanitized.dateTo);

  return params.toString();
}

export function buildConflictListRequest(filters: ConflictFilters): ConflictListRequest {
  const query = buildConflictFilterQuery(filters);
  return {
    endpoint: '/api/conflicts',
    query,
    url: query ? `/api/conflicts?${query}` : '/api/conflicts',
    filters: sanitizeConflictFilters(filters),
  };
}

export function parseConflictFiltersFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): ConflictFilters {
  const read = (key: string) => {
    const value = searchParams[key];
    if (Array.isArray(value)) {
      return value[0];
    }
    return value;
  };

  return sanitizeConflictFilters({
    region: read('region'),
    severity: read('severity') as ConflictSeverity | undefined,
    impact: read('impact') as ConflictImpact | undefined,
    provider: read('provider'),
    dateFrom: read('dateFrom'),
    dateTo: read('dateTo'),
  });
}

export function hasActiveFilters(filters: ConflictFilters): boolean {
  return Object.values(sanitizeConflictFilters(filters)).some(Boolean);
}
