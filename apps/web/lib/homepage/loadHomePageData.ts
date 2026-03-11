export interface Conflict {
  id: string;
  slug: string;
  name: string;
  region: string;
  status: 'monitoring' | 'escalating' | 'contained';
  updatedAt: string;
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
}

const seededConflicts: Conflict[] = [
  {
    id: 'conf-ukr',
    slug: 'ukraine',
    name: 'Ukraine',
    region: 'Europe',
    status: 'escalating',
    updatedAt: '2026-03-10T08:45:00.000Z',
  },
  {
    id: 'conf-sdn',
    slug: 'sudan',
    name: 'Sudan',
    region: 'Africa',
    status: 'monitoring',
    updatedAt: '2026-03-10T07:20:00.000Z',
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

export async function loadHomePageData(): Promise<HomePageData> {
  const conflicts = seededConflicts;
  const events = seededEvents;
  const regions = [...new Set(conflicts.map((conflict) => conflict.region))];

  return {
    brand: 'War Tracker',
    navItems: ['conflicts', 'events', 'insights'],
    searchPlaceholder: 'Search conflicts and events',
    kpis: [
      {
        label: 'Active conflicts',
        value: String(conflicts.length),
        description: 'Conflicts currently tracked in the monitoring queue.',
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
  };
}
