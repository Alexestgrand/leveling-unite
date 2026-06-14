<script lang="ts">
	const bubbles = [
		{ top: '5%', left: '10%', size: 280, duration: '9s', delay: '0s', opacity: 0.5 },
		{ top: '15%', right: '5%', size: 360, duration: '11s', delay: '-2s', opacity: 0.4 },
		{ top: '45%', left: '-5%', size: 420, duration: '10s', delay: '-4s', opacity: 0.35 },
		{ top: '60%', right: '15%', size: 300, duration: '8s', delay: '-1s', opacity: 0.45 },
		{ top: '75%', left: '20%', size: 240, duration: '12s', delay: '-3s', opacity: 0.3 },
		{ top: '30%', left: '50%', size: 500, duration: '14s', delay: '-5s', opacity: 0.25 },
		{ top: '85%', right: '30%', size: 200, duration: '7s', delay: '-2.5s', opacity: 0.4 }
	];

	const rings = [
		{ top: '20%', left: '25%', size: 180, duration: '5s', delay: '0s' },
		{ top: '50%', right: '20%', size: 220, duration: '6s', delay: '-2s' },
		{ top: '70%', left: '60%', size: 160, duration: '4.5s', delay: '-1s' },
		{ top: '35%', left: '70%', size: 140, duration: '5.5s', delay: '-3s' }
	];
</script>

<div class="pointer-events-none fixed inset-0 overflow-hidden max-sm:scale-[0.85] max-sm:origin-top" aria-hidden="true">
	<div class="absolute inset-0 bg-zinc-950"></div>

	<div
		class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,153,255,0.15),transparent_55%)]"
	></div>
	<div
		class="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(0,119,204,0.1),transparent_45%)]"
	></div>
	<div
		class="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_90%,rgba(0,212,255,0.08),transparent_40%)]"
	></div>

	{#each bubbles as bubble}
		<div
			class="bubble"
			style="
				top: {bubble.top};
				{bubble.left ? `left: ${bubble.left};` : ''}
				{bubble.right ? `right: ${bubble.right};` : ''}
				width: {bubble.size}px;
				height: {bubble.size}px;
				--duration: {bubble.duration};
				--delay: {bubble.delay};
				--opacity: {bubble.opacity};
			"
		></div>
	{/each}

	{#each rings as ring}
		<div
			class="bubble-ring"
			style="
				top: {ring.top};
				left: {ring.left};
				width: {ring.size}px;
				height: {ring.size}px;
				--duration: {ring.duration};
				--delay: {ring.delay};
			"
		></div>
	{/each}
</div>
