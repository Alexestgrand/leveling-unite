<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import CluesGrid from '$lib/components/CluesGrid.svelte';
</script>

<PageShell
	sectionLabel="Indices"
	title="Indices"
	subtitle="Chaque signal officiel, dans l'ordre."
	contextLine="Indices staff et TikTok. Pas les énigmes des Fragmentés."
>
	<div data-tour="tour-indices">
		<CluesGrid />
	</div>
</PageShell>
