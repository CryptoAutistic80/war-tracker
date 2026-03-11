import { Card, CardBody, Skeleton } from './ui';

interface KpiCardProps {
  label: string;
  value: string;
  description: string;
  isLoading?: boolean;
}

export function KpiCard({ label, value, description, isLoading = false }: KpiCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardBody>
          <Skeleton style={{ minHeight: 106 }} />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card as="article">
      <CardBody>
        <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>{label}</p>
        <p
          style={{
            fontSize: 'var(--font-size-600)',
            fontWeight: 700,
            lineHeight: 'var(--line-height-tight)',
            margin: 'var(--space-2) 0',
          }}
        >
          {value}
        </p>
        <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>{description}</p>
      </CardBody>
    </Card>
  );
}
