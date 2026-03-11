'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

import { ErrorState } from '../components/ErrorState';

const SUPPORT_URL = process.env.NEXT_PUBLIC_SUPPORT_URL;

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <ErrorState
          title="We hit an unexpected issue"
          message="War Tracker ran into a problem while loading this experience. Please try again, or return to the dashboard."
          errorId={error.digest}
          onRetry={reset}
          dashboardHref="/"
          supportHref={SUPPORT_URL}
        />
      </body>
    </html>
  );
}
