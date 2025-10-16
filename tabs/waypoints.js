const COMMUNITY_SOURCE = 'community';
const DEFAULT_EVENT_NAME = 'communityWaypoint:created';
const DEFAULT_ENDPOINT = '/api/admin/waypoints/review-request';

/**
 * Sends a review notification for a community sourced waypoint to the admin review endpoint.
 * @param {object} waypoint - The waypoint data submitted by a community member.
 * @param {object} [options]
 * @param {string} [options.endpoint] - API endpoint that triggers the admin email.
 * @param {typeof fetch} [options.fetchImpl] - Custom fetch implementation (useful for tests).
 * @returns {Promise<Response>} Resolves when the notification request completes successfully.
 */
export async function sendWaypointReviewEmail(waypoint, options = {}) {
  const {
    endpoint = DEFAULT_ENDPOINT,
    fetchImpl = typeof fetch !== 'undefined' ? fetch : undefined,
  } = options;

  if (!waypoint || typeof waypoint !== 'object') {
    throw new Error('waypoint data is required to notify admins.');
  }

  if (!fetchImpl) {
    throw new Error('A fetch implementation must be provided to send notifications.');
  }

  const payload = {
    waypoint,
    meta: {
      requestedAt: new Date().toISOString(),
      source: waypoint.source ?? COMMUNITY_SOURCE,
    },
  };

  const response = await fetchImpl(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(`Failed to send waypoint review email: ${response.status} ${message}`);
  }

  return response;
}

/**
 * Registers a listener that automatically sends review notifications when a community waypoint is created.
 *
 * @param {object} [options]
 * @param {EventTarget} [options.eventTarget] - The event target emitting community waypoint events.
 * @param {string} [options.eventName] - Name of the custom event that signals a community waypoint submission.
 * @param {string} [options.endpoint] - API endpoint that triggers the admin email.
 * @param {typeof fetch} [options.fetchImpl] - Custom fetch implementation (useful for dependency injection/testing).
 * @returns {() => void} A function that removes the listener.
 */
export function registerCommunityWaypointReviewNotifier({
  eventTarget = typeof document !== 'undefined' ? document : undefined,
  eventName = DEFAULT_EVENT_NAME,
  endpoint = DEFAULT_ENDPOINT,
  fetchImpl = typeof fetch !== 'undefined' ? fetch : undefined,
} = {}) {
  if (!eventTarget || typeof eventTarget.addEventListener !== 'function') {
    console.warn('Community waypoint review notifier could not attach because no valid event target was provided.');
    return () => {};
  }

  const handler = async (event) => {
    const detail = event?.detail ?? {};
    const waypoint = detail.waypoint ?? detail;
    const isCommunityWaypoint = detail.isCommunity ?? waypoint?.source === COMMUNITY_SOURCE;

    if (!isCommunityWaypoint || !waypoint) {
      return;
    }

    try {
      await sendWaypointReviewEmail(waypoint, { endpoint, fetchImpl });
    } catch (error) {
      console.error('Failed to notify admins about the community waypoint submission.', error);
    }
  };

  eventTarget.addEventListener(eventName, handler);
  return () => eventTarget.removeEventListener(eventName, handler);
}

/**
 * Convenience helper to emit a community waypoint event when programmatic dispatching is preferred.
 *
 * @param {object} waypoint - The waypoint data submitted by a community member.
 * @param {object} [options]
 * @param {EventTarget} [options.eventTarget] - Where the event should be dispatched.
 * @param {string} [options.eventName] - Custom event name to use when dispatching.
 */
export function dispatchCommunityWaypointCreated(waypoint, {
  eventTarget = typeof document !== 'undefined' ? document : undefined,
  eventName = DEFAULT_EVENT_NAME,
} = {}) {
  if (!eventTarget || typeof eventTarget.dispatchEvent !== 'function') {
    throw new Error('Cannot dispatch community waypoint event without a valid event target.');
  }

  const event = new CustomEvent(eventName, {
    detail: {
      waypoint,
      isCommunity: true,
    },
    bubbles: true,
  });

  eventTarget.dispatchEvent(event);
}

// Automatically register the notifier in browser contexts so UI submissions are handled out of the box.
if (typeof window !== 'undefined') {
  registerCommunityWaypointReviewNotifier();
}
