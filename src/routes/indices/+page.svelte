<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import CluesGrid from '$lib/components/CluesGrid.svelte';
</script>

<PageShell
	sectionLabel="Indices"
	title="Indices"
	subtitle="Chaque signal officiel, dans l’ordre. Le journal n’annonce que les envois — le détail est ici."
>
	<div data-tour="tour-indices">
		<CluesGrid />
	</div>
</PageShell>
