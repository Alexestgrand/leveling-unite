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
		title: 'Bienvenue, chasseur',
		body: 'Quinze mots forment une phrase secrète. Deux camps. Personne ne gagne seul — on cherche ensemble.',
		pose: 'wave'
	},
	{
		id: 'phrase',
		route: '/',
		target: 'tour-phrase',
		title: 'La phrase, case par case',
		body: 'Chaque case = un mot. Clique une case pour ouvrir la quête du Fragmenté qui le porte.',
		pose: 'point'
	},
	{
		id: 'fragmentes',
		route: '/fragmentes',
		target: 'tour-fragmentes',
		title: 'Les énigmes sont ici',
		body: 'Sur Fragmentés, les énigmes sont publiques. Tout le monde peut chercher — Discord et le site disent la même chose.',
		pose: 'point'
	},
	{
		id: 'porteur',
		route: '/fragmentes',
		target: 'tour-porteur',
		title: 'Qui valide ?',
		body: 'Seul le porteur Discord valide son mot (1 essai, 72 h), en MP à l’organisateur. Toi, tu aides à trouver.',
		pose: 'think'
	},
	{
		id: 'indices',
		route: '/indices',
		target: 'tour-indices',
		title: 'Indices ≠ énigmes',
		body: 'La page Indices, ce sont les révélations staff / TikTok. Pas les quêtes des porteurs — celles-là sont sur Fragmentés.',
		pose: 'think'
	},
	{
		id: 'soumettre',
		route: '/soumettre',
		target: 'tour-soumettre',
		title: 'Tester la phrase',
		body: 'Quand tu as reconstitué 15 mots, connecte Discord ici et envoie la phrase. 2 essais par 24 h.',
		pose: 'point'
	},
	{
		id: 'fin',
		route: '/',
		target: 'tour-intro',
		title: 'Tu as compris',
		body: `Le reste se joue sur ${EVENT.discordLabel} : entraide, annonces, validation. Bonne chasse.`,
		pose: 'cheer'
	}
];
