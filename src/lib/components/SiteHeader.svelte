<script lang="ts">
	import { page } from '$app/stores';
	import { EVENT, HEADER_NAV, PHASES, CURRENT_PHASE_INDEX } from '$lib/data/mock';

	let menuOpen = $state(false);

	const currentPhase = PHASES[CURRENT_PHASE_INDEX];

	function isActive(href: string, pathname: string): boolean {
		return href === '/' ? pathname === '/' : pathname.startsWith(href);
	}

	function closeMenu() {
		menuOpen = false;
	}
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
			{#each HEADER_NAV as link}
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
			<span class="site-header__phase" title={currentPhase.name}>
				<span class="site-header__phase-dot" aria-hidden="true"></span>
				<span class="hidden sm:inline">{currentPhase.name}</span>
				<span class="sm:hidden">P{CURRENT_PHASE_INDEX + 1}</span>
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
			{#each HEADER_NAV as link}
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
