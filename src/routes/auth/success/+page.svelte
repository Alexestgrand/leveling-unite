<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { reveal } from '$lib/actions/reveal';
	import { fetchAuthMe, isApiConfigured } from '$lib/api/validate';

	type AuthStatus = 'checking' | 'ok' | 'pending' | 'failed';

	let status = $state<AuthStatus>('checking');

	async function waitForSession(maxAttempts = 6): Promise<boolean> {
		if (!isApiConfigured()) return false;

		for (let attempt = 0; attempt < maxAttempts; attempt++) {
			const me = await fetchAuthMe();
			if (me === 'error') break;
			if (me?.authenticated) return true;
			await new Promise((resolve) => setTimeout(resolve, 350));
		}
		return false;
	}

	onMount(() => {
		let cancelled = false;
		let retryTimer: ReturnType<typeof setTimeout> | undefined;

		(async () => {
			const ok = await waitForSession();
			if (cancelled) return;

			if (ok) {
				status = 'ok';
				goto('/soumettre');
				return;
			}

			status = 'failed';
			retryTimer = setTimeout(async () => {
				if (cancelled) return;
				status = 'checking';
				const retryOk = await waitForSession(4);
				if (cancelled) return;
				if (retryOk) {
					status = 'ok';
					goto('/soumettre');
				} else {
					status = 'pending';
				}
			}, 1800);
		})();

		return () => {
			cancelled = true;
			if (retryTimer) clearTimeout(retryTimer);
		};
	});
</script>

<div class="page-container py-16 sm:py-24">
	<div class="surface-card hud-panel clip-corners glow-border glow-neon mx-auto max-w-lg p-8 text-center" use:reveal>
		<p class="section-eyebrow justify-center">
			<span class="section-eyebrow__dot" aria-hidden="true"></span>
			Authentification
		</p>
		<h1 class="mt-4 font-display text-2xl font-bold text-leveling-blue-light sm:text-3xl">
			Connexion réussie
		</h1>

		{#if status === 'checking'}
			<p class="mt-4 text-sm leading-relaxed text-zinc-400">Synchronisation de la session…</p>
		{:else if status === 'ok'}
			<p class="mt-4 text-sm leading-relaxed text-zinc-400">Ouverture du portail de soumission…</p>
		{:else if status === 'pending'}
			<p class="mt-4 text-sm leading-relaxed text-amber-300/90" role="alert">
				La session met plus de temps que prévu à s'initialiser. Utilisez le bouton ci-dessous — si le
				problème persiste, réessayez dans quelques secondes ou changez de navigateur.
			</p>
		{:else}
			<p class="mt-4 text-sm leading-relaxed text-red-300/90" role="alert">
				Impossible de confirmer la session pour le moment. Réessayez depuis la page de soumission.
			</p>
		{/if}

		<a href="/soumettre" class="btn-pill btn-pill--primary mt-8 inline-flex">Aller à la soumission</a>
	</div>
</div>
