interface FilterPanelProps {
  regions: string[];
  isLoading?: boolean;
}

export function FilterPanel({ regions, isLoading = false }: FilterPanelProps) {
  return (
    <aside style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem' }}>
      <h2 style={{ marginTop: 0 }}>Filters</h2>
      {isLoading ? (
        <div aria-hidden style={{ background: '#f3f4f6', minHeight: 120, borderRadius: 6 }} />
      ) : regions.length === 0 ? (
        <p>No conflict regions available yet.</p>
      ) : (
        <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
          {regions.map((region) => (
            <li key={region}>{region}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}
