<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let layerEl: HTMLDivElement | undefined;

	function onScroll() {
		if (!layerEl) return;
		const y = window.scrollY;
		layerEl.style.setProperty('--scroll', `${y * 0.08}px`);
	}

	onMount(() => {
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
	});

	onDestroy(() => {
		window.removeEventListener('scroll', onScroll);
	});
</script>

<div
	bind:this={layerEl}
	class="ambient pointer-events-none fixed inset-0 z-[1] overflow-hidden"
	style="--scroll: 0px"
	aria-hidden="true"
>
	<div class="ambient__base"></div>
	<div class="ambient__mesh"></div>
	<div class="ambient__orb ambient__orb--1"></div>
	<div class="ambient__orb ambient__orb--2"></div>
	<div class="ambient__orb ambient__orb--3"></div>
	<div class="ambient__beam"></div>
</div>
