'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

import { ErrorState } from '../components/ErrorState';

const SUPPORT_URL = process.env.NEXT_PUBLIC_SUPPORT_URL;

export default function HomeRouteError({
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
    <ErrorState
      title="We couldn't load your dashboard"
      message="Conflict summaries and metrics are temporarily unavailable. Try again to refresh the data."
      errorId={error.digest}
      onRetry={reset}
      dashboardHref="/"
      supportHref={SUPPORT_URL}
    />
  );
}
