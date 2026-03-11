'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

import { ErrorState } from '../../../components/ErrorState';

const SUPPORT_URL = process.env.NEXT_PUBLIC_SUPPORT_URL;

export default function ConflictDetailError({
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
      title="This conflict report is unavailable"
      message="We couldn't load the conflict details right now. Try again, or return to the dashboard to open another report."
      errorId={error.digest}
      onRetry={reset}
      dashboardHref="/"
      supportHref={SUPPORT_URL}
    />
  );
}
