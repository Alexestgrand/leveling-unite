<script lang="ts">
	import { onMount } from 'svelte';
	import { SOLO_LEVELING_FACTS } from '$lib/data/mock';

	interface Props {
		title?: string;
	}

	let { title = 'Ouverture du portail…' }: Props = $props();

	let factIndex = $state(0);

	onMount(() => {
		let index = Math.floor(Math.random() * SOLO_LEVELING_FACTS.length);
		factIndex = index;
		const intervalId = setInterval(() => {
			index = (index + 1) % SOLO_LEVELING_FACTS.length;
			factIndex = index;
		}, 4500);
		return () => clearInterval(intervalId);
	});
</script>

<div class="portal-loading surface-card hud-panel clip-corners p-8 sm:p-10" role="status" aria-live="polite">
	<div class="portal-loading__visual" aria-hidden="true">
		<span class="portal-loading__ring"></span>
		<span class="portal-loading__core"></span>
	</div>

	<p class="portal-loading__title">{title}</p>

	<div class="portal-loading__fact-wrap">
		{#key factIndex}
			<p class="portal-loading__fact">
				<span class="portal-loading__fact-label">Le saviez-vous ?</span>
				{SOLO_LEVELING_FACTS[factIndex]}
			</p>
		{/key}
	</div>
</div>
