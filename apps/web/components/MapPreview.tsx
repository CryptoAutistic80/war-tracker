import type { Conflict } from '../lib/homepage/loadHomePageData';

interface MapPreviewProps {
  conflicts: Conflict[];
  isLoading?: boolean;
}

export function MapPreview({ conflicts, isLoading = false }: MapPreviewProps) {
  return (
    <section style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem' }}>
      <h2 style={{ marginTop: 0 }}>Map preview</h2>
      {isLoading ? (
        <div aria-hidden style={{ borderRadius: 6, minHeight: 260, background: '#f3f4f6' }} />
      ) : conflicts.length === 0 ? (
        <p>
          No map features yet. Conflict geometry will render once conflicts and events are
          available.
        </p>
      ) : (
        <>
          <div
            style={{
              border: '1px dashed #9ca3af',
              borderRadius: 6,
              minHeight: 260,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <p style={{ margin: 0, color: '#4b5563' }}>Interactive map region</p>
          </div>
          <p style={{ marginBottom: 0, color: '#6b7280' }}>
            Tracking {conflicts.length} conflicts in current viewport.
          </p>
        </>
      )}
    </section>
  );
}
