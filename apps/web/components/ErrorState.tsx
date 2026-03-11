import Link from 'next/link';

import { Button, Card, CardBody } from './ui';

interface ErrorStateProps {
  title: string;
  message: string;
  errorId?: string;
  onRetry?: () => void;
  dashboardHref?: string;
  supportHref?: string;
}

export function ErrorState({
  title,
  message,
  errorId,
  onRetry,
  dashboardHref,
  supportHref,
}: ErrorStateProps) {
  return (
    <main id="main-content" className="error-shell" tabIndex={-1} aria-labelledby="error-title">
      <Card as="section" className="error-card" role="alert" aria-live="assertive">
        <CardBody className="error-card__body">
          <p className="error-eyebrow">War Tracker</p>
          <h1 id="error-title" className="error-title">
            {title}
          </h1>
          <p className="error-message">{message}</p>
          {errorId ? (
            <p className="error-reference" aria-label={`Error reference ID ${errorId}`}>
              Reference ID: <code>{errorId}</code>
            </p>
          ) : null}

          <div className="error-actions">
            {onRetry ? (
              <Button onClick={onRetry} type="button">
                Try again
              </Button>
            ) : null}

            {dashboardHref ? (
              <Link href={dashboardHref} className="ui-button ui-button--secondary">
                Go to dashboard
              </Link>
            ) : null}

            {supportHref ? (
              <a href={supportHref} className="error-support-link">
                Contact support
              </a>
            ) : null}
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
