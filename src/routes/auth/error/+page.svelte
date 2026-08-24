<script lang="ts">
	import { page } from '$app/stores';
	import { reveal } from '$lib/actions/reveal';
	import { getDiscordLoginUrl } from '$lib/api/validate';

	const ERROR_MESSAGES: Record<string, string> = {
		ACCOUNT_TOO_YOUNG:
			'Ce compte Discord a moins de 5 jours. C’est une règle anti-bot : seuls les comptes plus anciens peuvent se connecter.',
		OAUTH_DENIED:
			'Autorisation Discord refusée. Si l’app n’est pas publique, seuls les testeurs Discord peuvent se connecter.',
		INVALID_STATE: 'Session OAuth invalide ou expirée. Relancez la connexion depuis le début.',
		OAUTH_FAILED: 'La connexion Discord a échoué. Réessayez depuis Chrome ou Firefox (pas le navigateur intégré Discord).',
		DISCORD_RATE_LIMITED:
			'Discord limite temporairement les connexions (surcharge côté serveur). Attendez 1–2 minutes puis réessayez.'
	};

	const code = $derived($page.url.searchParams.get('code') ?? '');
	const message = $derived(ERROR_MESSAGES[code] ?? 'La connexion a échoué. Réessayez.');

	function retryLogin() {
		window.location.href = getDiscordLoginUrl();
	}
</script>

<div class="page-container py-16 sm:py-24">
	<div
		class="surface-card hud-panel clip-corners border-red-500/30 mx-auto max-w-lg p-8 text-center"
		use:reveal
		role="alert"
	>
		<p class="section-eyebrow justify-center">
			<span class="section-eyebrow__dot" aria-hidden="true"></span>
			Authentification
		</p>
		<h1 class="mt-4 font-display text-2xl font-bold text-red-300 sm:text-3xl">Connexion impossible</h1>
		<p class="mt-4 text-sm leading-relaxed text-zinc-400">{message}</p>
		{#if code}
			<p class="mt-3 font-mono text-xs text-zinc-500">code : {code}</p>
		{/if}
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<button type="button" class="btn-pill btn-pill--primary" onclick={retryLogin}>Réessayer Discord</button>
			<a href="/soumettre" class="btn-pill">Page soumettre</a>
		</div>
	</div>
</div>
