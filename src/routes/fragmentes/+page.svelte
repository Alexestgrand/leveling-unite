<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import FragmentsBoard from '$lib/components/FragmentsBoard.svelte';
</script>

<PageShell
	sectionLabel="Fragmentés"
	title="Fragmentés"
	subtitle="Quêtes en cours : un porteur Discord, une énigme publique, un essai. Les indices méta validés apparaissent ici — pas sur la page Indices."
>
	<FragmentsBoard />
</PageShell>
