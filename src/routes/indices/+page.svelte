<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import CluesGrid from '$lib/components/CluesGrid.svelte';
</script>

<PageShell
	sectionLabel="Fragments"
	title="Indices"
	subtitle="Les fragments débloqués par la progression collective. Les cartes verrouillées restent scellées jusqu'au prochain palier."
>
	<CluesGrid />
</PageShell>
