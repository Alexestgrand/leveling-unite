import { PUBLIC_API_URL } from '$env/static/public';
import type { AuthMeResponse, SubmissionStats, ValidateResponse } from '$lib/types/validate';

const HEALTH_TIMEOUT_MS = 8000;
const HEALTH_SLOW_MS = 3000;
const STATS_TIMEOUT_MS = 5000;

export type ApiHealthStatus = 'ok' | 'slow' | 'error';
export type AuthMeResult = AuthMeResponse | null | 'error';

export const API_COLD_START_MESSAGE =
	'Le portail peut mettre quelques secondes à s\'ouvrir — réessayez si la connexion échoue.';

function normalizeApiUrl(raw: string): string {
	return raw.trim().replace(/\/$/, '');
}

/**
 * Same-origin `/api` (Vercel rewrite or Vite proxy) keeps the session cookie first-party
 * and avoids Discord OAuth redirect loops caused by third-party cookie blocking.
 */
export function resolveApiUrl(): string {
	const configured = normalizeApiUrl(PUBLIC_API_URL ?? '');
	if (configured === '/api') return '/api';

	if (typeof window === 'undefined') {
		return configured || '/api';
	}

	if (!configured) return '/api';

	try {
		const apiOrigin = new URL(configured, window.location.origin).origin;
		if (apiOrigin !== window.location.origin) return '/api';
	} catch {
		return configured;
	}

	return configured;
}

export function isApiConfigured(): boolean {
	return resolveApiUrl().length > 0;
}

/** Redirect URL for Discord OAuth — must be a full navigation, not fetch (cookie set on callback). */
export function getDiscordLoginUrl(): string {
	return `${resolveApiUrl()}/auth/discord`;
}

export async function fetchApiHealth(): Promise<ApiHealthStatus> {
	const apiUrl = resolveApiUrl();
	if (!isApiConfigured()) return 'error';

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);
	const startedAt = Date.now();

	try {
		const res = await fetch(`${apiUrl}/health`, { signal: controller.signal });
		const elapsed = Date.now() - startedAt;

		if (!res.ok) return 'error';
		if (elapsed > HEALTH_SLOW_MS) return 'slow';
		return 'ok';
	} catch {
		if (Date.now() - startedAt >= HEALTH_SLOW_MS) return 'slow';
		return 'error';
	} finally {
		clearTimeout(timeoutId);
	}
}

export async function fetchSubmissionStats(): Promise<SubmissionStats | null> {
	const apiUrl = resolveApiUrl();
	if (!isApiConfigured()) return null;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), STATS_TIMEOUT_MS);

	try {
		const res = await fetch(`${apiUrl}/stats`, { signal: controller.signal });
		if (!res.ok) return null;
		const data = (await res.json()) as SubmissionStats;
		return {
			total_attempts: Number(data.total_attempts) || 0,
			unique_testers: Number(data.unique_testers) || 0
		};
	} catch {
		return null;
	} finally {
		clearTimeout(timeoutId);
	}
}

export async function fetchAuthMe(): Promise<AuthMeResult> {
	const apiUrl = resolveApiUrl();
	if (!isApiConfigured()) return 'error';

	try {
		const res = await fetch(`${apiUrl}/auth/me`, { credentials: 'include' });

		if (res.status === 401) return null;
		if (!res.ok) return 'error';

		return (await res.json()) as AuthMeResponse;
	} catch {
		return 'error';
	}
}

export async function logout(): Promise<void> {
	const apiUrl = resolveApiUrl();
	if (!isApiConfigured()) return;

	try {
		await fetch(`${apiUrl}/auth/logout`, {
			method: 'POST',
			credentials: 'include'
		});
	} catch {
		// Best-effort logout; UI resets locally regardless.
	}
}

export async function submitPhrase(phrase: string): Promise<ValidateResponse> {
	const apiUrl = resolveApiUrl();
	if (!isApiConfigured()) {
		return {
			success: false,
			message: 'Service indisponible.',
			code: 'BAD_REQUEST'
		};
	}

	try {
		const res = await fetch(`${apiUrl}/validate`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ phrase })
		});

		return (await res.json()) as ValidateResponse;
	} catch {
		return {
			success: false,
			message: 'Impossible de contacter le serveur. Réessayez plus tard.',
			code: 'BAD_REQUEST'
		};
	}
}
