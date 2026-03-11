import {
  buildConflictListRequest,
  type ConflictFilters,
  hasActiveFilters,
  type ConflictImpact,
  type ConflictSeverity,
} from '../api/filterRequests';

export interface Conflict {
  id: string;
  slug: string;
  name: string;
  region: string;
  status: 'monitoring' | 'escalating' | 'contained';
  updatedAt: string;
  severity: ConflictSeverity;
  impact: ConflictImpact;
  provider: string;
}

export interface Event {
  id: string;
  conflictSlug: string;
  summary: string;
  occurredAt: string;
}

export interface HomePageData {
  brand: string;
  navItems: string[];
  searchPlaceholder: string;
  kpis: {
    label: string;
    value: string;
    description: string;
  }[];
  conflicts: Conflict[];
  events: Event[];
  regions: string[];
  providers: string[];
  totalConflicts: number;
  hasActiveFilters: boolean;
  isPartialResult: boolean;
}

const seededConflicts: Conflict[] = [
  {
    id: 'conf-ukr',
    slug: 'ukraine',
    name: 'Ukraine',
    region: 'Europe',
    status: 'escalating',
    updatedAt: '2026-03-10T08:45:00.000Z',
    severity: 'high',
    impact: 'global',
    provider: 'UN OCHA',
  },
  {
    id: 'conf-sdn',
    slug: 'sudan',
    name: 'Sudan',
    region: 'Africa',
    status: 'monitoring',
    updatedAt: '2026-03-10T07:20:00.000Z',
    severity: 'medium',
    impact: 'regional',
    provider: 'ACLED',
  },
  {
    id: 'conf-mmr',
    slug: 'myanmar',
    name: 'Myanmar',
    region: 'Asia',
    status: 'contained',
    updatedAt: '2026-03-08T14:12:00.000Z',
    severity: 'low',
    impact: 'local',
    provider: 'ReliefWeb',
  },
];

const seededEvents: Event[] = [
  {
    id: 'evt-1001',
    conflictSlug: 'ukraine',
    summary: 'Drone strike reported near Dnipro industrial district.',
    occurredAt: '2026-03-10T08:10:00.000Z',
  },
  {
    id: 'evt-1002',
    conflictSlug: 'ukraine',
    summary: 'Rail corridor disruption after overnight shelling.',
    occurredAt: '2026-03-10T06:00:00.000Z',
  },
  {
    id: 'evt-1003',
    conflictSlug: 'sudan',
    summary: 'Displacement increase reported in El Fasher district.',
    occurredAt: '2026-03-09T23:30:00.000Z',
  },
];

function applyConflictFilters(conflicts: Conflict[], filters: ConflictFilters): Conflict[] {
  return conflicts.filter((conflict) => {
    if (filters.region && conflict.region !== filters.region) {
      return false;
    }
    if (filters.severity && conflict.severity !== filters.severity) {
      return false;
    }
    if (filters.impact && conflict.impact !== filters.impact) {
      return false;
    }
    if (filters.provider && conflict.provider !== filters.provider) {
      return false;
    }

    const updatedAtMs = new Date(conflict.updatedAt).getTime();

    if (filters.dateFrom && updatedAtMs < new Date(filters.dateFrom).getTime()) {
      return false;
    }

    if (filters.dateTo) {
      const inclusiveEnd = new Date(filters.dateTo);
      inclusiveEnd.setHours(23, 59, 59, 999);
      if (updatedAtMs > inclusiveEnd.getTime()) {
        return false;
      }
    }

    return true;
  });
}

export async function loadHomePageData(filters: ConflictFilters = {}): Promise<HomePageData> {
  const request = buildConflictListRequest(filters);
  const conflicts = applyConflictFilters(seededConflicts, request.filters);
  const events = seededEvents.filter((event) =>
    conflicts.some((conflict) => conflict.slug === event.conflictSlug),
  );
  const regions = [...new Set(seededConflicts.map((conflict) => conflict.region))];
  const providers = [...new Set(seededConflicts.map((conflict) => conflict.provider))];

  return {
    brand: 'War Tracker',
    navItems: ['conflicts', 'events', 'insights'],
    searchPlaceholder: 'Search conflicts and events',
    kpis: [
      {
        label: 'Active conflicts',
        value: String(conflicts.length),
        description: `Conflicts currently shown for request ${request.url}.`,
      },
      {
        label: 'Events (24h)',
        value: String(events.length),
        description: 'Published events visible in the last 24 hours.',
      },
      {
        label: 'Regions covered',
        value: String(regions.length),
        description: 'Unique world regions with ongoing conflict monitoring.',
      },
    ],
    conflicts,
    events,
    regions,
    providers,
    totalConflicts: seededConflicts.length,
    hasActiveFilters: hasActiveFilters(request.filters),
    isPartialResult: conflicts.length > 0 && conflicts.length < seededConflicts.length,
  };
}
