interface KpiCardProps {
  label: string;
  value: string;
  description: string;
  isLoading?: boolean;
}

export function KpiCard({ label, value, description, isLoading = false }: KpiCardProps) {
  if (isLoading) {
    return (
      <div
        aria-hidden
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          padding: '1rem',
          minHeight: 106,
          background: '#f3f4f6',
        }}
      />
    );
  }

  return (
    <article style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem' }}>
      <p style={{ margin: 0, color: '#4b5563' }}>{label}</p>
      <p style={{ margin: '0.5rem 0', fontSize: '1.6rem', fontWeight: 700 }}>{value}</p>
      <p style={{ margin: 0, color: '#6b7280' }}>{description}</p>
    </article>
  );
}
