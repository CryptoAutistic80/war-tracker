import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildConflictFeedResponse,
  buildConflictMapResponse,
  buildEventDetailsResponse,
} from '../lib/api/responseBuilders';
import {
  applyPublicVisibilityFilter,
  applyPublicVisibilityFilters,
} from '../lib/api/publicVisibility';

const NOW = new Date('2026-01-02T10:00:00.000Z');

test('applyPublicVisibilityFilters removes suppressed moderation records', () => {
  const filtered = applyPublicVisibilityFilters(
    [
      { id: 'keep', moderationStatus: 'approved' },
      { id: 'drop', moderationStatus: 'suppressed' },
    ],
    NOW,
  );

  assert.deepEqual(
    filtered.map((entry) => entry.id),
    ['keep'],
  );
});

test('applyPublicVisibilityFilters removes delayed records', () => {
  const filtered = applyPublicVisibilityFilters(
    [
      { id: 'visible', publicDelayUntil: '2026-01-02T09:00:00.000Z' },
      { id: 'hidden', publicDelayUntil: '2026-01-02T12:00:00.000Z' },
    ],
    NOW,
  );

  assert.deepEqual(
    filtered.map((entry) => entry.id),
    ['visible'],
  );
});

test('precise_hidden data is downgraded to coarse location output', () => {
  const [filtered] = applyPublicVisibilityFilters(
    [
      {
        id: 'event-1',
        precisionLevel: 'precise_hidden',
        coordinates: { lat: 12, lng: 34 },
        coarseCoordinates: { lat: 11, lng: 33 },
        geometry: { type: 'Point', coordinates: [34, 12] },
        locationText: 'Exact street address',
        coarseLocationText: 'District level',
      },
    ],
    NOW,
  );

  assert.ok(filtered);
  assert.deepEqual(filtered.coordinates, { lat: 11, lng: 33 });
  assert.equal(filtered.geometry, null);
  assert.equal(filtered.locationText, 'District level');
});

test('single-record filter returns null when hidden from public', () => {
  const filtered = applyPublicVisibilityFilter(
    {
      id: 'event-2',
      moderationStatus: 'suppressed',
    },
    NOW,
  );

  assert.equal(filtered, null);
});

test('conflict feed route builder enforces shared public visibility rules', () => {
  const response = buildConflictFeedResponse(
    [
      {
        id: 'suppressed',
        conflictSlug: 'alpha',
        summary: 'hidden',
        moderationStatus: 'suppressed',
      },
      {
        id: 'hidden-precision',
        conflictSlug: 'alpha',
        summary: 'shown as coarse',
        precisionLevel: 'precise_hidden',
        coordinates: { lat: 1, lng: 2 },
        coarseLocationText: 'Province only',
      },
    ],
    NOW,
  );

  assert.equal(response.length, 1);
  assert.equal(response[0]?.id, 'hidden-precision');
  assert.equal(response[0]?.coordinates, null);
  assert.equal(response[0]?.locationText, 'Province only');
});

test('conflict map route builder enforces public-delay filtering', () => {
  const response = buildConflictMapResponse(
    [
      {
        id: 'future',
        conflictSlug: 'beta',
        publicDelayUntil: '2026-01-02T11:00:00.000Z',
      },
      {
        id: 'current',
        conflictSlug: 'beta',
      },
    ],
    NOW,
  );

  assert.deepEqual(
    response.map((feature) => feature.id),
    ['current'],
  );
});

test('event details route builder returns null for hidden event and coarse output for visible event', () => {
  const hidden = buildEventDetailsResponse(
    { id: 'hidden-event', moderationStatus: 'suppressed' },
    NOW,
  );

  const visible = buildEventDetailsResponse(
    {
      id: 'visible-event',
      precisionLevel: 'precise_hidden',
      regionName: 'Northern Region',
      coordinates: { lat: 20, lng: 30 },
      geometry: { type: 'Point' },
    },
    NOW,
  );

  assert.equal(hidden, null);
  assert.equal(visible?.coordinates, null);
  assert.equal(visible?.locationText, 'Northern Region');
  assert.equal(visible?.geometry, null);
});
