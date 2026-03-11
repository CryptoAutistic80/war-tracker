'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type FormEvent, useMemo, useTransition } from 'react';

import { ALL_FILTER_VALUE } from '../lib/api/filterRequests';
import { Button, Card, CardBody, Input, Select, Skeleton } from './ui';

interface FilterPanelProps {
  regions: string[];
  providers: string[];
  isLoading?: boolean;
}

function labelStyle() {
  return {
    display: 'grid',
    gap: 'var(--space-2)',
  } as const;
}

export function FilterPanel({ regions, providers, isLoading = false }: FilterPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const values = useMemo(
    () => ({
      region: searchParams.get('region') ?? ALL_FILTER_VALUE,
      severity: searchParams.get('severity') ?? ALL_FILTER_VALUE,
      impact: searchParams.get('impact') ?? ALL_FILTER_VALUE,
      provider: searchParams.get('provider') ?? ALL_FILTER_VALUE,
      dateFrom: searchParams.get('dateFrom') ?? '',
      dateTo: searchParams.get('dateTo') ?? '',
    }),
    [searchParams],
  );

  const updateQuery = (next: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === ALL_FILTER_VALUE) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const query = params.toString();
    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    updateQuery({
      region: String(formData.get('region') ?? ''),
      severity: String(formData.get('severity') ?? ''),
      impact: String(formData.get('impact') ?? ''),
      provider: String(formData.get('provider') ?? ''),
      dateFrom: String(formData.get('dateFrom') ?? ''),
      dateTo: String(formData.get('dateTo') ?? ''),
    });
  };

  const onReset = () => {
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  };

  return (
    <Card as="aside">
      <CardBody>
        <h2 style={{ marginTop: 0 }}>Filters</h2>
        {isLoading ? (
          <Skeleton style={{ minHeight: 220 }} />
        ) : regions.length === 0 ? (
          <p>No conflict regions available yet.</p>
        ) : (
          <form onSubmit={onSubmit} className="stack-md" aria-busy={isPending}>
            <label style={labelStyle()}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-200)' }}>
                Region
              </span>
              <Select name="region" defaultValue={values.region} aria-label="Region filter">
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
              <Input type="date" name="dateFrom" defaultValue={values.dateFrom} />
            </label>

            <label style={labelStyle()}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-200)' }}>
                Date to
              </span>
              <Input type="date" name="dateTo" defaultValue={values.dateTo} />
            </label>

            <label style={labelStyle()}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-200)' }}>
                Severity
              </span>
              <Select name="severity" defaultValue={values.severity} aria-label="Severity filter">
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
              <Select name="impact" defaultValue={values.impact} aria-label="Impact filter">
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
              <Select name="provider" defaultValue={values.provider} aria-label="Provider filter">
                <option value={ALL_FILTER_VALUE}>All providers</option>
                {providers.map((provider) => (
                  <option key={provider} value={provider}>
                    {provider}
                  </option>
                ))}
              </Select>
            </label>

            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Applying…' : 'Apply filters'}
              </Button>
              <Button type="button" variant="secondary" onClick={onReset} disabled={isPending}>
                Reset
              </Button>
            </div>
          </form>
        )}
      </CardBody>
    </Card>
  );
}
