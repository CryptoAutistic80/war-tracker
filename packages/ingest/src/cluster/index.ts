export const clusterModelVersion = '2026-03-11.1';

export interface ClusterDecision {
  clusterKey: string;
  heuristicInputs: Record<string, unknown>;
  version: string;
}

export const createClusterDecision = (input: {
  clusterKey: string;
  heuristicInputs?: Record<string, unknown>;
}): ClusterDecision => ({
  clusterKey: input.clusterKey,
  heuristicInputs: input.heuristicInputs ?? {},
  version: clusterModelVersion,
});
