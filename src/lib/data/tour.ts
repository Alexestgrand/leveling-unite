import { EVENT } from '$lib/data/mock';

export interface TourStep {
	id: string;
	/** Route SvelteKit où se trouve la cible. */
	route: string;
	/** Valeur de `data-tour` sur l'élément à highlighter. */
	target: string;
	title: string;
	body: string;
	pose: 'wave' | 'point' | 'think' | 'cheer';
}

export const TOUR_STORAGE_DONE = 'leveling-unite-tour-v1-done';
export const TOUR_STORAGE_PROMPTED = 'leveling-unite-tour-v1-prompted';

export const TOUR_STEPS: TourStep[] = [
	{
		id: 'intro',
		route: '/',
		target: 'tour-intro',
		title: 'Bienvenue',
		body: '15 mots secrets. Deux camps. On cherche ensemble sur le site et Discord.',
		pose: 'wave'
	},
	{
		id: 'phrase',
		route: '/',
		target: 'tour-phrase',
		title: 'La phrase',
		body: 'Chaque case = un mot. Clique pour voir l\'énigme du Fragmenté.',
		pose: 'point'
	},
	{
		id: 'cadran',
		route: '/fragmentes',
		target: 'tour-cadran',
		title: 'Le Cadran Creux',
		body: 'Vague 4 : une seule énigme. Un mot. Tous les mots manquants à la clé.',
		pose: 'point'
	},
	{
		id: 'fragmentes',
		route: '/fragmentes',
		target: 'tour-fragmentes',
		title: 'Les porteurs',
		body: 'Les Fragmentés de cette vague n’ont pas d’énigme individuelle. Tous peuvent soumettre le mot du Cadran.',
		pose: 'think'
	},
	{
		id: 'porteur',
		route: '/fragmentes',
		target: 'tour-porteur',
		title: 'Qui envoie le mot ?',
		body: 'N’importe quel Fragmenté, toutes vagues confondues, peut envoyer le mot à Hakai. Un essai par camp.',
		pose: 'think'
	},
	{
		id: 'indices',
		route: '/indices',
		target: 'tour-indices',
		title: 'Indices ≠ énigmes',
		body: 'Ici : signaux staff et TikTok. Les quêtes des Fragmentés sont ailleurs.',
		pose: 'think'
	},
	{
		id: 'soumettre',
		route: '/soumettre',
		target: 'tour-soumettre',
		title: 'Envoyer la phrase',
		body: '15 mots, 2 essais par 24 h. Connecte Discord et envoie la phrase complète.',
		pose: 'point'
	},
	{
		id: 'fin',
		route: '/',
		target: 'tour-intro',
		title: 'C\'est parti',
		body: `Le reste se joue sur ${EVENT.discordLabel}. Bonne chasse.`,
		pose: 'cheer'
	}
];
