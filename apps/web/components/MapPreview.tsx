import type { Conflict } from '../lib/homepage/loadHomePageData';
import { Card, CardBody, Skeleton } from './ui';

interface MapPreviewProps {
  conflicts: Conflict[];
  isLoading?: boolean;
}

export function MapPreview({ conflicts, isLoading = false }: MapPreviewProps) {
  return (
    <Card as="section">
      <CardBody>
        <h2 style={{ marginTop: 0 }}>Map preview</h2>
        {isLoading ? (
          <Skeleton style={{ minHeight: 260 }} />
        ) : conflicts.length === 0 ? (
          <p>
            No map features yet. Conflict geometry will render once conflicts and events are
            available.
          </p>
        ) : (
          <>
            <div
              style={{
                border: '1px dashed var(--color-text-muted)',
                borderRadius: 'var(--radius-sm)',
                display: 'grid',
                minHeight: 260,
                placeItems: 'center',
              }}
            >
              <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>Interactive map region</p>
            </div>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 0 }}>
              Tracking {conflicts.length} conflicts in current viewport.
            </p>
          </>
        )}
      </CardBody>
    </Card>
  );
}
