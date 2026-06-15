<script lang="ts">
	interface Props {
		eyebrow: string;
		title: string;
		description: string;
		href?: string;
		linkLabel?: string;
		centered?: boolean;
	}

	let {
		eyebrow,
		title,
		description,
		href,
		linkLabel = 'En savoir plus',
		centered = true
	}: Props = $props();
</script>

<header class="section-intro" class:section-intro--centered={centered}>
	<p class="section-eyebrow">
		<span class="section-eyebrow__dot" aria-hidden="true"></span>
		{eyebrow}
	</p>
	<h2 class="section-title">{title}</h2>
	<p class="section-intro__desc">{description}</p>
	{#if href}
		<a {href} class="section-intro__link">
			{linkLabel}
			<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
			</svg>
		</a>
	{/if}
</header>
