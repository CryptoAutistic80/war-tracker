import { z } from 'zod';

const bearerTokenPrefix = /^Bearer\s+.+$/;

export const internalJobAuthorizationHeaderSchema = z
  .string()
  .regex(bearerTokenPrefix, 'Authorization header must use Bearer token format');

export const internalJobAllowlistHeaderSchema = z
  .string()
  .trim()
  .min(1, 'X-Internal-Job-Name header is required when allowlist is enabled');

export const internalJobRequestSchema = z.object({
  runId: z.string().trim().min(1).max(128).optional(),
  dryRun: z.boolean().optional().default(false),
  limit: z.number().int().min(1).max(10_000).optional().default(100),
});

export const internalJobErrorDetailSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
});

export const internalJobStatusCountersSchema = z.object({
  received: z.number().int().nonnegative(),
  processed: z.number().int().nonnegative(),
  failed: z.number().int().nonnegative(),
  skipped: z.number().int().nonnegative(),
});

export const internalJobResponseSchema = z.object({
  ok: z.boolean(),
  runId: z.string(),
  status: z.enum(['accepted', 'completed', 'rejected', 'failed']),
  counters: internalJobStatusCountersSchema,
  error: internalJobErrorDetailSchema.nullable(),
});

export type InternalJobRequest = z.infer<typeof internalJobRequestSchema>;
export type InternalJobResponse = z.infer<typeof internalJobResponseSchema>;
export type InternalJobStatusCounters = z.infer<typeof internalJobStatusCountersSchema>;
export type InternalJobErrorDetail = z.infer<typeof internalJobErrorDetailSchema>;
