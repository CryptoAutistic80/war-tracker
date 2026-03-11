import Link from 'next/link';

import { AppHeader } from '../components/AppHeader';
import { ConflictList } from '../components/ConflictList';
import { FilterPanel } from '../components/FilterPanel';
import { KpiCard } from '../components/KpiCard';
import { MapPreview } from '../components/MapPreview';
import { Button, Card, CardBody } from '../components/ui';
import { parseConflictFiltersFromSearchParams } from '../lib/api/filterRequests';
import { loadHomePageData } from '../lib/homepage/loadHomePageData';

interface HomePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseConflictFiltersFromSearchParams(resolvedSearchParams);
  const data = await loadHomePageData(filters);

  return (
    <main>
      <AppHeader
        brand={data.brand}
        navItems={data.navItems}
        searchPlaceholder={data.searchPlaceholder}
      />

      <div className="app-shell stack-lg">
        <section
          aria-label="Summary metrics"
          style={{
            display: 'grid',
            gap: 'var(--space-4)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          }}
        >
          {data.kpis.map((kpi) => (
            <KpiCard
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              description={kpi.description}
            />
          ))}
        </section>

        <Card as="section" aria-live="polite">
          <CardBody
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 'var(--space-3)',
              flexWrap: 'wrap',
            }}
          >
            <strong>
              {data.conflicts.length} conflicts shown
              {data.isPartialResult ? ` (filtered from ${data.totalConflicts})` : ''}
            </strong>
            {data.hasActiveFilters ? (
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Button variant="secondary" type="button">
                  Reset filters
                </Button>
              </Link>
            ) : null}
          </CardBody>
        </Card>

        <section
          style={{
            display: 'grid',
            gap: 'var(--space-4)',
            gridTemplateColumns: '280px minmax(0, 1fr)',
          }}
        >
          <FilterPanel regions={data.regions} providers={data.providers} />
          <ConflictList
            conflicts={data.conflicts}
            events={data.events}
            isFiltered={data.hasActiveFilters}
          />
        </section>

        <MapPreview conflicts={data.conflicts} />
      </div>
    </main>
  );
}
