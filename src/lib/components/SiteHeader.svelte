<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { EVENT, PHASES, CURRENT_PHASE_INDEX, CADRAN_CREUX, EVENT_STATUS } from '$lib/data/mock';
	import { fetchEventStatus } from '$lib/api/validate';
	import type { EventStatus } from '$lib/types/validate';
	import { getHeaderNav } from '$lib/utils/nav';
	import { tour } from '$lib/tour/tour.svelte';

	let menuOpen = $state(false);
	let eventStatus = $state<EventStatus | null>(null);

	const headerNav = $derived(getHeaderNav(Date.now(), eventStatus));

	const currentPhase = CADRAN_CREUX.resolved
		? null
		: CURRENT_PHASE_INDEX >= 0
			? PHASES[CURRENT_PHASE_INDEX]
			: null;
	const phaseLabel = CADRAN_CREUX.resolved ? EVENT_STATUS.waveLabel : (currentPhase?.name ?? 'À venir');

	function isActive(href: string, pathname: string): boolean {
		return href === '/' ? pathname === '/' : pathname.startsWith(href);
	}

	function closeMenu() {
		menuOpen = false;
	}

	async function openGuide() {
		closeMenu();
		if ($page.url.pathname !== '/') {
			await goto('/');
		}
		tour.start();
	}

	onMount(() => {
		fetchEventStatus().then((status) => {
			eventStatus = status;
		});
	});
</script>

<header class="site-header">
	<div class="site-header__inner">
		<a href="/" class="site-header__brand" onclick={closeMenu}>
			<span class="site-header__logo" aria-hidden="true">L</span>
			<span class="site-header__brand-text">
				<span class="site-header__brand-title">{EVENT.title}</span>
				<span class="site-header__brand-sub">{EVENT.subtitle}</span>
			</span>
		</a>

		<nav class="site-header__nav" aria-label="Navigation principale">
			{#each headerNav as link}
				<a
					href={link.href}
					class="site-header__link"
					class:site-header__link--active={isActive(link.href, $page.url.pathname)}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="site-header__actions">
			<button
				type="button"
				class="site-header__guide"
				onclick={openGuide}
				title="Comment ça marche ?"
			>
				Guide
			</button>

			<span class="site-header__phase" title={phaseLabel}>
				<span class="site-header__phase-dot" aria-hidden="true"></span>
				<span class="hidden sm:inline">{phaseLabel}</span>
				<span class="sm:hidden">{CADRAN_CREUX.resolved ? 'Fin' : currentPhase ? `P${CURRENT_PHASE_INDEX + 1}` : '—'}</span>
			</span>

			<button
				type="button"
				class="site-header__menu-btn"
				aria-expanded={menuOpen}
				aria-controls="mobile-nav"
				aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
				onclick={() => (menuOpen = !menuOpen)}
			>
				<svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					{#if menuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
					{/if}
				</svg>
			</button>
		</div>
	</div>

	{#if menuOpen}
		<nav id="mobile-nav" class="site-header__mobile" aria-label="Navigation mobile">
			<button type="button" class="site-header__mobile-link site-header__mobile-guide" onclick={openGuide}>
				Comment ça marche ?
			</button>
			{#each headerNav as link}
				<a
					href={link.href}
					class="site-header__mobile-link"
					class:site-header__link--active={isActive(link.href, $page.url.pathname)}
					onclick={closeMenu}
				>
					{link.label}
				</a>
			{/each}
		</nav>
	{/if}
</header>
