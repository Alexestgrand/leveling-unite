import { CADRAN_CREUX, EVENT_OUTCOME } from '$lib/data/mock';
import type { EventStatus } from '$lib/types/validate';
import { getSubmissionPhase } from '$lib/utils/countdown';

/** Deadline locale ou victoire staff (mock.ts). */
export function isEventFinishedLocally(now = Date.now()): boolean {
	if (EVENT_OUTCOME.forceFinished || EVENT_OUTCOME.winnerCamp) return true;
	if (!CADRAN_CREUX.resolved) return false;
	return getSubmissionPhase(CADRAN_CREUX.submitOpenDate, CADRAN_CREUX.submitDeadline, now) === 'closed';
}

export function isSubmissionClosedLocally(now = Date.now()): boolean {
	return isEventFinishedLocally(now);
}

export function isEventFinished(
	status: EventStatus | null | undefined,
	now = Date.now()
): boolean {
	if (isEventFinishedLocally(now)) return true;
	if (status && !status.submission_open) return true;
	return false;
}

export function isFeedbackOpen(
	status: EventStatus | null | undefined,
	now = Date.now()
): boolean {
	if (status?.feedback_open) return true;
	return isEventFinishedLocally(now);
}

export function getWinnerLabel(): string | null {
	if (EVENT_OUTCOME.winnerLabel) return EVENT_OUTCOME.winnerLabel;
	if (EVENT_OUTCOME.winnerCamp === 'communaute') return 'Communauté';
	if (EVENT_OUTCOME.winnerCamp === 'staff') return 'Staff';
	return null;
}
