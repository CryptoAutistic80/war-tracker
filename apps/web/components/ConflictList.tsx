import type { Conflict, Event } from '../lib/homepage/loadHomePageData';
import {
  Badge,
  Card,
  CardBody,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Tabs,
  Tab,
} from './ui';

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

function statusTone(status: string): 'success' | 'warning' | 'danger' {
  if (status === 'active') {
    return 'danger';
  }
  if (status === 'escalating') {
    return 'warning';
  }
  return 'success';
}

export function ConflictList({ conflicts, events, isLoading = false }: ConflictListProps) {
  if (isLoading) {
    return (
      <Card>
        <CardBody>
          <Skeleton style={{ minHeight: 230 }} />
        </CardBody>
      </Card>
    );
  }

  if (conflicts.length === 0) {
    return (
      <Card as="section">
        <CardBody>
          <h2 style={{ marginTop: 0 }}>Conflicts</h2>
          <p>No conflicts available. Ingested conflicts will appear here.</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card as="section">
      <CardBody>
        <h2 style={{ marginTop: 0 }}>Conflicts</h2>
        <Tabs style={{ marginBottom: 'var(--space-3)' }}>
          <Tab isActive type="button">
            All
          </Tab>
          <Tab type="button">Active</Tab>
          <Tab type="button">Watchlist</Tab>
        </Tabs>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Conflict</TableHeaderCell>
              <TableHeaderCell>Region</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Events</TableHeaderCell>
              <TableHeaderCell>Updated</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conflicts.map((conflict) => {
              const eventCount = events.filter(
                (event) => event.conflictSlug === conflict.slug,
              ).length;

              return (
                <TableRow key={conflict.id}>
                  <TableCell>{conflict.name}</TableCell>
                  <TableCell>{conflict.region}</TableCell>
                  <TableCell>
                    <Badge tone={statusTone(conflict.status)}>{conflict.status}</Badge>
                  </TableCell>
                  <TableCell>{eventCount}</TableCell>
                  <TableCell>{formatDate(conflict.updatedAt)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
