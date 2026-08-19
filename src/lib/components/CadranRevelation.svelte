<script lang="ts">
	import { CADRAN_CREUX } from '$lib/data/mock';
</script>

<article id="cadran-revelation" class="cadran-revelation surface-card hud-panel clip-corners">
	<header class="cadran-revelation__head">
		<p class="cadran-revelation__eyebrow">⏳ {CADRAN_CREUX.title} — RÉVÉLATION</p>
		<p class="cadran-revelation__date">Publié · {CADRAN_CREUX.resolvedLabel}</p>
	</header>

	<blockquote class="cadran-revelation__verses">
		{#each CADRAN_CREUX.verses as verse}
			<p><em>{verse}</em></p>
		{/each}
	</blockquote>

	<p class="cadran-revelation__divider" aria-hidden="true">⸻</p>

	{#each CADRAN_CREUX.sections as section (section.id)}
		<section class="cadran-revelation__section" id="cadran-{section.id}">
			<h2>{section.title}</h2>
			{#each section.paragraphs as p}
				<p>{p}</p>
			{/each}
			{#if section.code}
				<pre class="cadran-revelation__code"><code>{section.code}</code></pre>
			{/if}
			{#if section.emphasis}
				<p class="cadran-revelation__answer">{section.emphasis}</p>
			{/if}
		</section>
		<p class="cadran-revelation__divider" aria-hidden="true">⸻</p>
	{/each}

	<footer class="cadran-revelation__foot">
		<p class="cadran-revelation__epigraph">{CADRAN_CREUX.epigraph}</p>
		<p class="cadran-revelation__system">
			Le Système parle aux joueurs — pas de l’énigme. Vous avez cherché une horloge ; la réponse était
			<strong>{CADRAN_CREUX.answer}</strong>.
		</p>
	</footer>
</article>
