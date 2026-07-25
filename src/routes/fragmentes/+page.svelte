<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import FragmentsBoard from '$lib/components/FragmentsBoard.svelte';
</script>

<PageShell
	sectionLabel="Fragmentés"
	title="Fragmentés"
	subtitle="Porteurs Discord, énigmes publiques et statut de chaque fragment. Toute la communauté peut aider — seul le porteur fait valider le mot, en un seul essai."
>
	<FragmentsBoard />
</PageShell>
