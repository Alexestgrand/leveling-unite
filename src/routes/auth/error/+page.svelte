<script lang="ts">
	import { page } from '$app/stores';
	import { reveal } from '$lib/actions/reveal';

	const ERROR_MESSAGES: Record<string, string> = {
		ACCOUNT_TOO_YOUNG: 'Votre compte Discord doit avoir au moins 5 jours.',
		OAUTH_DENIED: 'Autorisation Discord refusée.',
		INVALID_STATE: 'Session OAuth invalide. Réessayez.',
		OAUTH_FAILED: 'La connexion Discord a échoué. Réessayez.'
	};

	const code = $derived($page.url.searchParams.get('code') ?? '');
	const message = $derived(ERROR_MESSAGES[code] ?? 'La connexion a échoué. Réessayez.');
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
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<a href="/" class="btn-pill btn-pill--primary">Retour à l'accueil</a>
			<a href="/regles" class="btn-pill">Lire les règles</a>
		</div>
	</div>
</div>
