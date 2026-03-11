import { AppHeader } from '../components/AppHeader';
import { ConflictList } from '../components/ConflictList';
import { FilterPanel } from '../components/FilterPanel';
import { KpiCard } from '../components/KpiCard';
import { MapPreview } from '../components/MapPreview';

export default function Loading() {
  return (
    <main>
      <AppHeader
        brand="War Tracker"
        navItems={['conflicts', 'events', 'insights']}
        searchPlaceholder="Search conflicts and events"
      />

      <div
        style={{ margin: '0 auto', maxWidth: 1200, padding: '1rem', display: 'grid', gap: '1rem' }}
      >
        <section
          aria-label="Summary metrics"
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          }}
        >
          <KpiCard label="" value="" description="" isLoading />
          <KpiCard label="" value="" description="" isLoading />
          <KpiCard label="" value="" description="" isLoading />
        </section>

        <section
          style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '280px minmax(0, 1fr)' }}
        >
          <FilterPanel regions={[]} isLoading />
          <ConflictList conflicts={[]} events={[]} isLoading />
        </section>

        <MapPreview conflicts={[]} isLoading />
      </div>
    </main>
  );
}
