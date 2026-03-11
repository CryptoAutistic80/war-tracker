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
    <>
      <AppHeader
        brand={data.brand}
        navItems={data.navItems}
        searchPlaceholder={data.searchPlaceholder}
      />

      <main id="main-content" className="app-shell stack-lg" tabIndex={-1}>
        <section aria-label="Summary metrics" className="kpi-grid">
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

        <section className="dashboard-layout" aria-label="Conflict dashboard">
          <FilterPanel regions={data.regions} providers={data.providers} currentFilters={filters} />
          <ConflictList
            conflicts={data.conflicts}
            events={data.events}
            isFiltered={data.hasActiveFilters}
          />
        </section>

        <MapPreview conflicts={data.conflicts} />

        <footer className="page-footer" aria-label="Application footer">
          <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
            War Tracker data updates throughout the day.
          </p>
        </footer>
      </main>
    </>
  );
}
