type RevealOptions = {
	delay?: number;
	y?: number;
	scale?: number;
};

export function reveal(
	node: HTMLElement,
	options: RevealOptions = {}
): { destroy: () => void } {
	const { delay = 0, y = 20, scale = 0.97 } = options;

	node.style.opacity = '0';
	node.style.transform = `translateY(${y}px) scale(${scale})`;
	node.style.transition = `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			if (entries.some((entry) => entry.isIntersecting)) {
				node.style.opacity = '1';
				node.style.transform = 'translateY(0) scale(1)';
				observer.disconnect();
			}
		},
		{ threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
