<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import { REWARDS } from '$lib/data/mock';

	const accentStyles = [
		'border-leveling-blue/40 glow-neon',
		'border-zinc-600/40',
		'border-amber-500/30'
	];
</script>

<PageShell
	title="Récompenses"
	subtitle="Deux camps s'affrontent, mais l'expérience collective reste au centre. Voici ce qui est en jeu selon l'issue de l'événement."
>
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
		{#each REWARDS as reward, index (reward.id)}
			<div class="content-block border {accentStyles[index]}">
				<h3>{reward.title}</h3>
				<ul class="mt-4">
					{#each reward.items as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<div class="content-block">
		<h3>Ce que Leveling: Unite récompense</h3>
		<p>
			Contrairement à un événement classique, Leveling: Unite ne récompense ni le niveau, ni la
			rapidité, ni la performance individuelle. Il récompense la coopération, l'intelligence
			collective, la créativité, l'engagement et la curiosité.
		</p>
		<p class="mt-4 italic text-leveling-blue-light/80">
			« Tu étais là pendant Leveling: Unite ? Quand tout le serveur s'est transformé en gigantesque
			enquête ? »
		</p>
	</div>
</PageShell>
