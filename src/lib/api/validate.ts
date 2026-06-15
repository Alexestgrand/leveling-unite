import { PUBLIC_API_URL } from '$env/static/public';
import type { AuthMeResponse, ValidateResponse } from '$lib/types/validate';

const API_URL = PUBLIC_API_URL?.trim() ?? '';

const HEALTH_TIMEOUT_MS = 8000;
const HEALTH_SLOW_MS = 3000;

export type ApiHealthStatus = 'ok' | 'slow' | 'error';
export type AuthMeResult = AuthMeResponse | null | 'error';

export const API_COLD_START_MESSAGE =
	'Le portail peut mettre quelques secondes à s\'ouvrir — réessayez si la connexion échoue.';

export function isApiConfigured(): boolean {
	return API_URL.length > 0;
}

/** Redirect URL for Discord OAuth — must be a full navigation, not fetch (cookie set on callback). */
export function getDiscordLoginUrl(): string {
	return `${API_URL}/auth/discord`;
}

export async function fetchApiHealth(): Promise<ApiHealthStatus> {
	if (!isApiConfigured()) return 'error';

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);
	const startedAt = Date.now();

	try {
		const res = await fetch(`${API_URL}/health`, { signal: controller.signal });
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

export async function fetchAuthMe(): Promise<AuthMeResult> {
	if (!isApiConfigured()) return 'error';

	try {
		const res = await fetch(`${API_URL}/auth/me`, { credentials: 'include' });

		if (res.status === 401) return null;
		if (!res.ok) return 'error';

		return (await res.json()) as AuthMeResponse;
	} catch {
		return 'error';
	}
}

export async function logout(): Promise<void> {
	if (!isApiConfigured()) return;

	try {
		await fetch(`${API_URL}/auth/logout`, {
			method: 'POST',
			credentials: 'include'
		});
	} catch {
		// Best-effort logout; UI resets locally regardless.
	}
}

export async function submitPhrase(phrase: string): Promise<ValidateResponse> {
	if (!isApiConfigured()) {
		return {
			success: false,
			message: 'Service indisponible.',
			code: 'BAD_REQUEST'
		};
	}

	try {
		const res = await fetch(`${API_URL}/validate`, {
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
