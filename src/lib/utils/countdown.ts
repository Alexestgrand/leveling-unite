export interface TimeRemaining {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	expired: boolean;
}

export function getTimeRemaining(targetDate: Date): TimeRemaining {
	const diff = targetDate.getTime() - Date.now();

	if (diff <= 0) {
		return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
	}

	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((diff / (1000 * 60)) % 60);
	const seconds = Math.floor((diff / 1000) % 60);

	return { days, hours, minutes, seconds, expired: false };
}

export function padTime(value: number): string {
	return value.toString().padStart(2, '0');
}

export type SubmissionPhase = 'upcoming' | 'open' | 'closed';

/** Fenêtre de soumission : upcoming (avant ouverture), open, closed (après deadline). */
export function getSubmissionPhase(openDate: Date, deadline: Date, now = Date.now()): SubmissionPhase {
	if (now < openDate.getTime()) return 'upcoming';
	if (now >= deadline.getTime()) return 'closed';
	return 'open';
}

export function getSubmissionCountdownTarget(
	openDate: Date,
	deadline: Date,
	now = Date.now()
): Date {
	return getSubmissionPhase(openDate, deadline, now) === 'upcoming' ? openDate : deadline;
}
