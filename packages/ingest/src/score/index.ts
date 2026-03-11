export const scoreModelVersion = '2026-03-11.1';

export interface ScoreDecision {
  score: number;
  reasons: string[];
  heuristicInputs: Record<string, unknown>;
  version: string;
}

export const createScoreDecision = (input: {
  score: number;
  reasons?: string[];
  heuristicInputs?: Record<string, unknown>;
}): ScoreDecision => ({
  score: input.score,
  reasons: input.reasons ?? [],
  heuristicInputs: input.heuristicInputs ?? {},
  version: scoreModelVersion,
});
