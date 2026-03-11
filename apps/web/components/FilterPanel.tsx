import Link from 'next/link';
import type { ConflictFilters } from '../lib/api/filterRequests';
import { ALL_FILTER_VALUE } from '../lib/api/filterRequests';
import { Button, Card, CardBody, Input, Select, Skeleton } from './ui';

interface FilterPanelProps {
  regions: string[];
  providers: string[];
  currentFilters?: ConflictFilters;
  isLoading?: boolean;
}

function labelStyle() {
  return {
    display: 'grid',
    gap: 'var(--space-2)',
  } as const;
}

export function FilterPanel({
  regions,
  providers,
  currentFilters,
  isLoading = false,
}: FilterPanelProps) {
  return (
    <Card as="aside">
      <CardBody>
        <h2 style={{ marginTop: 0 }}>Filters</h2>
        {isLoading ? (
          <Skeleton style={{ minHeight: 220 }} />
        ) : regions.length === 0 ? (
          <p>No conflict regions available yet.</p>
        ) : (
          <form method="get" className="stack-md" aria-label="Conflict filters">
            <label style={labelStyle()}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-200)' }}>
                Region
              </span>
              <Select name="region" defaultValue={currentFilters?.region ?? ALL_FILTER_VALUE}>
                <option value={ALL_FILTER_VALUE}>All regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </Select>
            </label>

            <label style={labelStyle()}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-200)' }}>
                Date from
              </span>
              <Input type="date" name="dateFrom" defaultValue={currentFilters?.dateFrom ?? ''} />
            </label>

            <label style={labelStyle()}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-200)' }}>
                Date to
              </span>
              <Input type="date" name="dateTo" defaultValue={currentFilters?.dateTo ?? ''} />
            </label>

            <label style={labelStyle()}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-200)' }}>
                Severity
              </span>
              <Select name="severity" defaultValue={currentFilters?.severity ?? ALL_FILTER_VALUE}>
                <option value={ALL_FILTER_VALUE}>All severities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </label>

            <label style={labelStyle()}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-200)' }}>
                Impact
              </span>
              <Select name="impact" defaultValue={currentFilters?.impact ?? ALL_FILTER_VALUE}>
                <option value={ALL_FILTER_VALUE}>All impacts</option>
                <option value="local">Local</option>
                <option value="regional">Regional</option>
                <option value="global">Global</option>
              </Select>
            </label>

            <label style={labelStyle()}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-200)' }}>
                Source / Provider
              </span>
              <Select name="provider" defaultValue={currentFilters?.provider ?? ALL_FILTER_VALUE}>
                <option value={ALL_FILTER_VALUE}>All providers</option>
                {providers.map((provider) => (
                  <option key={provider} value={provider}>
                    {provider}
                  </option>
                ))}
              </Select>
            </label>

            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <Button type="submit">Apply filters</Button>
              <Link href="/" aria-label="Reset all filters">
                Reset
              </Link>
            </div>
          </form>
        )}
      </CardBody>
    </Card>
  );
}
