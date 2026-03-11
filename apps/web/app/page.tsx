import { AppHeader } from '../components/AppHeader';
import { ConflictList } from '../components/ConflictList';
import { FilterPanel } from '../components/FilterPanel';
import { KpiCard } from '../components/KpiCard';
import { MapPreview } from '../components/MapPreview';
import { loadHomePageData } from '../lib/homepage/loadHomePageData';

export default async function HomePage() {
  const data = await loadHomePageData();

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

        <section
          style={{
            display: 'grid',
            gap: 'var(--space-4)',
            gridTemplateColumns: '280px minmax(0, 1fr)',
          }}
        >
          <FilterPanel regions={data.regions} />
          <ConflictList conflicts={data.conflicts} events={data.events} />
        </section>

        <MapPreview conflicts={data.conflicts} />
      </div>
    </main>
  );
}
