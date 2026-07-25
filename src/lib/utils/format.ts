export function formatAnnouncementDate(isoDate: string): string {
	return new Intl.DateTimeFormat('fr-FR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}).format(new Date(isoDate));
}

/** Relatif court (ex. « il y a 2 h », « hier ») — pour timeline / indices. */
export function formatRelativeDate(isoDate: string, now = new Date()): string {
	const date = new Date(isoDate);
	const diffMs = date.getTime() - now.getTime();
	const diffSec = Math.round(diffMs / 1000);
	const absSec = Math.abs(diffSec);

	const rtf = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' });

	if (absSec < 60) return rtf.format(Math.round(diffSec), 'second');
	const diffMin = Math.round(diffSec / 60);
	if (Math.abs(diffMin) < 60) return rtf.format(diffMin, 'minute');
	const diffHour = Math.round(diffSec / 3600);
	if (Math.abs(diffHour) < 24) return rtf.format(diffHour, 'hour');
	const diffDay = Math.round(diffSec / 86400);
	if (Math.abs(diffDay) < 30) return rtf.format(diffDay, 'day');
	return formatAnnouncementDate(isoDate);
}

export function formatViews(views: number): string {
	return new Intl.NumberFormat('fr-FR').format(views);
}

export function milestonePercent(views: number, goal: number): number {
	return Math.min((views / goal) * 100, 100);
}
