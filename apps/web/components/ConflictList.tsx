import type { Conflict, Event } from '../lib/homepage/loadHomePageData';

interface ConflictListProps {
  conflicts: Conflict[];
  events: Event[];
  isLoading?: boolean;
}

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(
    new Date(isoDate),
  );
}

export function ConflictList({ conflicts, events, isLoading = false }: ConflictListProps) {
  if (isLoading) {
    return (
      <div
        aria-hidden
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          minHeight: 230,
          background: '#f3f4f6',
        }}
      />
    );
  }

  if (conflicts.length === 0) {
    return (
      <section style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem' }}>
        <h2 style={{ marginTop: 0 }}>Conflicts</h2>
        <p>No conflicts available. Ingested conflicts will appear here.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Conflicts</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th align="left">Conflict</th>
            <th align="left">Region</th>
            <th align="left">Status</th>
            <th align="left">Events</th>
            <th align="left">Updated</th>
          </tr>
        </thead>
        <tbody>
          {conflicts.map((conflict) => {
            const eventCount = events.filter(
              (event) => event.conflictSlug === conflict.slug,
            ).length;

            return (
              <tr key={conflict.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                <td style={{ padding: '0.5rem 0' }}>{conflict.name}</td>
                <td>{conflict.region}</td>
                <td style={{ textTransform: 'capitalize' }}>{conflict.status}</td>
                <td>{eventCount}</td>
                <td>{formatDate(conflict.updatedAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
