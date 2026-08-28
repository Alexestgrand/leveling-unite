import { HEADER_NAV } from '$lib/data/mock';
import type { EventStatus } from '$lib/types/validate';
import { isEventFinished } from '$lib/utils/event-status';

export function getHeaderNav(
	now = Date.now(),
	status: EventStatus | null | undefined = null
): readonly { href: string; label: string }[] {
	if (!isEventFinished(status, now)) return HEADER_NAV;
	return HEADER_NAV.map((link) =>
		link.href === '/soumettre' ? { href: '/avis', label: 'Avis' } : link
	);
}
