import { Card, CardBody, Skeleton } from '../../../components/ui';

export default function ConflictDetailLoading() {
  return (
    <main id="main-content" className="app-shell stack-lg" tabIndex={-1} aria-busy="true">
      <Card as="section" aria-label="Loading conflict detail header">
        <CardBody className="stack-lg">
          <Skeleton style={{ height: '1rem', width: '9rem' }} />
          <Skeleton style={{ height: '2rem', width: '65%' }} />
          <Skeleton style={{ height: '1rem', width: '85%' }} />
        </CardBody>
      </Card>

      <section className="dashboard-layout" aria-label="Loading conflict detail content">
        <Card>
          <CardBody className="stack-lg">
            <Skeleton style={{ height: '1.25rem', width: '70%' }} />
            <Skeleton style={{ height: '8rem' }} />
          </CardBody>
        </Card>
        <Card>
          <CardBody className="stack-lg">
            <Skeleton style={{ height: '1.25rem', width: '50%' }} />
            <Skeleton style={{ height: '8rem' }} />
          </CardBody>
        </Card>
      </section>
    </main>
  );
}
