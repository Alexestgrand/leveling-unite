<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import FragmentsBoard from '$lib/components/FragmentsBoard.svelte';
</script>

<PageShell
	sectionLabel="Fragmentés"
	title="Fragmentés"
	subtitle="Quêtes en cours : un porteur Discord, une énigme publique, un essai."
	contextLine="Les énigmes sont ici. Toi tu cherches. Le Fragmenté envoie le mot."
>
	<FragmentsBoard />
</PageShell>
