<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		open?: boolean;
		children: Snippet;
	}

	let { title, open = false, children }: Props = $props();
	let expanded = $state(false);

	$effect(() => {
		expanded = open;
	});
</script>

<div class="accordion__item" class:accordion__item--open={expanded}>
	<button
		type="button"
		class="accordion__trigger"
		aria-expanded={expanded}
		onclick={() => (expanded = !expanded)}
	>
		<span class="accordion__title">{title}</span>
		<svg
			class="accordion__chevron"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
		</svg>
	</button>
	{#if expanded}
		<div class="accordion__panel">
			{@render children()}
		</div>
	{/if}
</div>
