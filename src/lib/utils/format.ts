export function formatAnnouncementDate(isoDate: string): string {
	return new Intl.DateTimeFormat('fr-FR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}).format(new Date(isoDate));
}

export function formatViews(views: number): string {
	return new Intl.NumberFormat('fr-FR').format(views);
}

export function milestonePercent(views: number, goal: number): number {
	return Math.min((views / goal) * 100, 100);
}
