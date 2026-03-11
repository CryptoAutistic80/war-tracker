import { Card, CardBody, Select, Skeleton } from './ui';

interface FilterPanelProps {
  regions: string[];
  isLoading?: boolean;
}

export function FilterPanel({ regions, isLoading = false }: FilterPanelProps) {
  return (
    <Card as="aside">
      <CardBody>
        <h2 style={{ marginTop: 0 }}>Filters</h2>
        {isLoading ? (
          <Skeleton style={{ minHeight: 120 }} />
        ) : regions.length === 0 ? (
          <p>No conflict regions available yet.</p>
        ) : (
          <label style={{ display: 'grid', gap: 'var(--space-2)' }}>
            <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-200)' }}>
              Region
            </span>
            <Select defaultValue="all" aria-label="Region filter">
              <option value="all">All regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </Select>
          </label>
        )}
      </CardBody>
    </Card>
  );
}
