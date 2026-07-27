/** Synthèse Web Audio — drone menaçant + rire sinistre (sans fichier externe). */

let sharedCtx: AudioContext | null = null;

function getCtx(): AudioContext {
	if (!sharedCtx) {
		sharedCtx = new AudioContext();
	}
	return sharedCtx;
}

function noiseBuffer(ctx: AudioContext, durationSec: number): AudioBuffer {
	const length = Math.floor(ctx.sampleRate * durationSec);
	const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < length; i++) {
		data[i] = Math.random() * 2 - 1;
	}
	return buffer;
}

/** Drone grave + dissonance. */
function playDrone(ctx: AudioContext, when: number, duration = 2.4) {
	const master = ctx.createGain();
	master.gain.setValueAtTime(0, when);
	master.gain.linearRampToValueAtTime(0.22, when + 0.35);
	master.gain.exponentialRampToValueAtTime(0.001, when + duration);
	master.connect(ctx.destination);

	for (const freq of [55, 82.5, 110, 116.5]) {
		const osc = ctx.createOscillator();
		osc.type = 'sawtooth';
		osc.frequency.setValueAtTime(freq, when);
		const g = ctx.createGain();
		g.gain.value = freq < 70 ? 0.35 : 0.12;
		const filter = ctx.createBiquadFilter();
		filter.type = 'lowpass';
		filter.frequency.value = 420;
		osc.connect(filter);
		filter.connect(g);
		g.connect(master);
		osc.start(when);
		osc.stop(when + duration);
	}
}

/** Rire sinistre stylisé (rafales de bruit + pitch wobble). */
function playLaugh(ctx: AudioContext, when: number) {
	const bursts = [
		{ t: 0.15, len: 0.18, pitch: 180 },
		{ t: 0.38, len: 0.22, pitch: 210 },
		{ t: 0.65, len: 0.28, pitch: 160 },
		{ t: 1.05, len: 0.35, pitch: 240 },
		{ t: 1.5, len: 0.45, pitch: 140 }
	];

	for (const burst of bursts) {
		const start = when + burst.t;
		const src = ctx.createBufferSource();
		src.buffer = noiseBuffer(ctx, burst.len + 0.05);

		const band = ctx.createBiquadFilter();
		band.type = 'bandpass';
		band.Q.value = 4;
		band.frequency.setValueAtTime(burst.pitch, start);
		band.frequency.exponentialRampToValueAtTime(burst.pitch * 1.6, start + burst.len * 0.4);
		band.frequency.exponentialRampToValueAtTime(burst.pitch * 0.7, start + burst.len);

		const g = ctx.createGain();
		g.gain.setValueAtTime(0.0001, start);
		g.gain.exponentialRampToValueAtTime(0.28, start + 0.03);
		g.gain.exponentialRampToValueAtTime(0.0001, start + burst.len);

		const osc = ctx.createOscillator();
		osc.type = 'triangle';
		osc.frequency.setValueAtTime(burst.pitch * 0.55, start);
		osc.frequency.linearRampToValueAtTime(burst.pitch * 0.9, start + burst.len * 0.3);
		osc.frequency.linearRampToValueAtTime(burst.pitch * 0.4, start + burst.len);
		const og = ctx.createGain();
		og.gain.setValueAtTime(0.0001, start);
		og.gain.exponentialRampToValueAtTime(0.08, start + 0.04);
		og.gain.exponentialRampToValueAtTime(0.0001, start + burst.len);

		src.connect(band);
		band.connect(g);
		g.connect(ctx.destination);
		osc.connect(og);
		og.connect(ctx.destination);

		src.start(start);
		src.stop(start + burst.len + 0.02);
		osc.start(start);
		osc.stop(start + burst.len + 0.02);
	}
}

/** Stinger aigu final. */
function playStinger(ctx: AudioContext, when: number) {
	const osc = ctx.createOscillator();
	osc.type = 'square';
	osc.frequency.setValueAtTime(880, when);
	osc.frequency.exponentialRampToValueAtTime(55, when + 0.9);

	const g = ctx.createGain();
	g.gain.setValueAtTime(0.0001, when);
	g.gain.exponentialRampToValueAtTime(0.12, when + 0.02);
	g.gain.exponentialRampToValueAtTime(0.0001, when + 0.95);

	osc.connect(g);
	g.connect(ctx.destination);
	osc.start(when);
	osc.stop(when + 1);
}

let playing = false;

/** Joue la séquence complète (drone + rire + stinger). */
export async function playOmenSound(): Promise<void> {
	if (typeof window === 'undefined') return;
	if (playing) return;

	try {
		const ctx = getCtx();
		if (ctx.state === 'suspended') {
			await ctx.resume();
		}

		playing = true;
		const t0 = ctx.currentTime + 0.02;
		playDrone(ctx, t0, 2.8);
		playLaugh(ctx, t0 + 0.35);
		playStinger(ctx, t0 + 2.1);

		window.setTimeout(() => {
			playing = false;
		}, 3200);
	} catch {
		playing = false;
	}
}
