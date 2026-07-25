import { TOUR_STORAGE_DONE, TOUR_STORAGE_PROMPTED, TOUR_STEPS } from '$lib/data/tour';

function readFlag(key: string): boolean {
	if (typeof localStorage === 'undefined') return false;
	try {
		return localStorage.getItem(key) === '1';
	} catch {
		return false;
	}
}

function writeFlag(key: string, value: boolean) {
	if (typeof localStorage === 'undefined') return;
	try {
		if (value) localStorage.setItem(key, '1');
		else localStorage.removeItem(key);
	} catch {
		// ignore quota / private mode
	}
}

class TourController {
	open = $state(false);
	stepIndex = $state(0);
	promptVisible = $state(false);
	ready = $state(false);

	get step() {
		return TOUR_STEPS[this.stepIndex] ?? TOUR_STEPS[0];
	}

	get total() {
		return TOUR_STEPS.length;
	}

	get isLast() {
		return this.stepIndex >= TOUR_STEPS.length - 1;
	}

	get isFirst() {
		return this.stepIndex <= 0;
	}

	initPrompt() {
		this.ready = true;
		if (readFlag(TOUR_STORAGE_DONE) || readFlag(TOUR_STORAGE_PROMPTED)) return;
		window.setTimeout(() => {
			if (!this.open && !readFlag(TOUR_STORAGE_DONE)) {
				this.promptVisible = true;
				writeFlag(TOUR_STORAGE_PROMPTED, true);
			}
		}, 1800);
	}

	start(fromStep = 0) {
		this.promptVisible = false;
		this.stepIndex = Math.max(0, Math.min(fromStep, TOUR_STEPS.length - 1));
		this.open = true;
	}

	next() {
		if (this.isLast) {
			this.complete();
			return;
		}
		this.stepIndex += 1;
	}

	prev() {
		if (this.isFirst) return;
		this.stepIndex -= 1;
	}

	skip() {
		this.open = false;
		this.promptVisible = false;
	}

	complete() {
		writeFlag(TOUR_STORAGE_DONE, true);
		this.open = false;
		this.promptVisible = false;
	}

	dismissPrompt() {
		this.promptVisible = false;
		writeFlag(TOUR_STORAGE_PROMPTED, true);
	}
}

export const tour = new TourController();
