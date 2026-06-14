export type AnnouncementTag = 'URGENT' | 'INDICE' | 'RÈGLE';

export interface Announcement {
	id: string;
	date: string;
	tag: AnnouncementTag;
	content: string;
}

export interface Milestone {
	views: number;
	label: string;
	description: string;
}

export interface Clue {
	id: string;
	label: string;
	content: string;
	unlocked: boolean;
}

export interface NavLink {
	href: string;
	title: string;
	description: string;
	icon: string;
}

export interface Phase {
	id: string;
	name: string;
	share: string;
	description: string;
}

export interface RewardOutcome {
	id: string;
	title: string;
	items: string[];
}

export const EVENT = {
	title: 'LEVELING: UNITE',
	subtitle: 'The Fragments',
	tagline: 'Aucun joueur ne peut gagner seul. Toute la communauté doit collaborer.',
	endDate: new Date('2026-06-29T23:59:00+02:00'),
	endDateLabel: '29 juin 2026',
	duration: '3 semaines'
};

export const NAV_LINKS: NavLink[] = [
	{
		href: '/regles',
		title: 'Règles',
		description: 'Fair-play, confidentialité des fragments et cadre de l’événement.',
		icon: '§'
	},
	{
		href: '/indices',
		title: 'Indices',
		description: 'Fragments débloqués par la communauté. Les verrouillés restent scellés.',
		icon: '◈'
	},
	{
		href: '/objectif-tiktok',
		title: 'Objectif TikTok',
		description: 'Suivez la progression collective et les paliers de vues à débloquer.',
		icon: '▲'
	},
	{
		href: '/deroule',
		title: 'Déroulé',
		description: 'Les 4 phases de l’événement, de l’Éveil à la Résolution.',
		icon: '◉'
	},
	{
		href: '/recompenses',
		title: 'Récompenses',
		description: 'Victoire des Membres, du Staff ou échec total — ce qui est en jeu.',
		icon: '★'
	},
	{
		href: '/concept',
		title: 'Concept & Rôles',
		description: 'Fragmentés, Enquêteurs, les deux camps et la phrase secrète.',
		icon: '⬡'
	}
];

export const ANNOUNCEMENTS: Announcement[] = [
	{
		id: '1',
		date: '2026-06-14T18:00:00+02:00',
		tag: 'RÈGLE',
		content:
			"L'événement Leveling: Unite – The Fragments est officiellement lancé. Consultez les règles avant de participer."
	},
	{
		id: '2',
		date: '2026-06-15T12:00:00+02:00',
		tag: 'INDICE',
		content:
			'Phase 1 — L’Éveil : 25 % des fragments sont distribués. Les premières hypothèses émergent sur le serveur.'
	},
	{
		id: '3',
		date: '2026-06-16T09:30:00+02:00',
		tag: 'URGENT',
		content:
			'Attention : de fausses pistes circulent. Ne partagez jamais de captures des messages privés contenant des fragments.'
	}
];

export const TIKTOK_TRACKER = {
	currentViews: 125_000,
	goal: 500_000,
	hashtags: ['#Levelingfitnessapp', '#LevelingUnite'],
	milestones: [
		{
			views: 10_000,
			label: 'Lettre révélée',
			description: 'Révélation d’une lettre de la phrase secrète.'
		},
		{
			views: 50_000,
			label: 'Indice global',
			description: 'Un indice global supplémentaire est débloqué pour toute la communauté.'
		},
		{
			views: 100_000,
			label: 'Catégorie confirmée',
			description: 'Confirmation de la catégorie d’un mot de la phrase.'
		},
		{
			views: 250_000,
			label: 'Fausse piste retirée',
			description: 'Suppression d’une fausse piste majeure.'
		},
		{
			views: 500_000,
			label: 'Indice décisif',
			description: 'Indice décisif accordé au camp des Membres.'
		}
	] satisfies Milestone[]
};

export const CLUES: Clue[] = [
	{
		id: 'clue-1',
		label: 'Fragment Alpha',
		content: 'Le premier fragment mentionne une porte scellée sous la lumière bleue.',
		unlocked: true
	},
	{
		id: 'clue-2',
		label: 'Fragment Beta',
		content: 'Les chasseurs doivent compter les ombres avant la rupture du sceau.',
		unlocked: true
	},
	{
		id: 'clue-3',
		label: 'Fragment Gamma',
		content: 'Un signal faible pulse à chaque palier TikTok atteint.',
		unlocked: false
	},
	{
		id: 'clue-4',
		label: 'Fragment Delta',
		content: 'La vérité se cache derrière le cinquième palier.',
		unlocked: false
	},
	{
		id: 'clue-5',
		label: 'Fragment Epsilon',
		content: 'L’indice final ne sera révélé qu’à l’apogée de l’événement.',
		unlocked: false
	},
	{
		id: 'clue-6',
		label: 'Fragment Zeta',
		content: 'Unissez vos forces. Seul le collectif peut briser le voile.',
		unlocked: false
	}
];

export const RULES = [
	'Interdiction de partager des captures d’écran des messages privés contenant les fragments.',
	'Respect du fair-play et du règlement général du serveur.',
	'Discussions et théories encouragées dans les salons dédiés.',
	'Les décisions finales concernant l’événement reviennent à l’organisateur.'
];

export const PARTICIPATION_CRITERIA = [
	'Ancienneté minimale : 15 jours sur le serveur.',
	'Absence de multi-comptes.',
	'Respect du règlement général.',
	'Sélection aléatoire parmi les profils éligibles pour le rôle de Fragmenté.',
	'Des remplaçants secrets seront également désignés.'
];

export const INACTIVITY_RULES = [
	'Inactivité de 48 heures sans réponse aux sollicitations.',
	'Blocage manifeste de la progression de l’événement.',
	'Le fragment sera redistribué à un remplaçant pour ne pas ralentir le camp.'
];

export const SANCTIONS = [
	{
		title: 'Triche d’un Membre',
		items: [
			'Exclusion immédiate de l’événement.',
			'Remplacement par un remplaçant.',
			'Retrait d’une récompense du lot des Membres (priorité : un Hunter Pass).'
		]
	},
	{
		title: 'Triche d’un membre du Staff',
		items: [
			'Exclusion immédiate.',
			'Remplacement.',
			'Réduction de 100 € de l’enveloppe communautaire prévue.'
		]
	}
];

export const PHASES: Phase[] = [
	{
		id: 'phase-1',
		name: 'Phase 1 — L’Éveil',
		share: '25 %',
		description:
			'Les premiers fragments sont distribués. Les hypothèses apparaissent et les participants commencent à se regrouper.'
	},
	{
		id: 'phase-2',
		name: 'Phase 2 — L’Accélération',
		share: '25 %',
		description:
			'De nouveaux fragments arrivent. Les fausses pistes se multiplient et les théories évoluent rapidement.'
	},
	{
		id: 'phase-3',
		name: 'Phase 3 — Le Chaos',
		share: '25 %',
		description:
			'Encore 25 % révélés. Les camps voient émerger une solution cohérente. Les salons d’enquête s’embrasent.'
	},
	{
		id: 'phase-4',
		name: 'Phase 4 — La Résolution',
		share: '25 %',
		description:
			'Les derniers fragments sont distribués. Le compte à rebours final est lancé. Le premier camp à reconstituer la phrase gagne.'
	}
];

export const REWARDS: RewardOutcome[] = [
	{
		id: 'members-win',
		title: 'Victoire des Membres',
		items: [
			'10 abonnements Discord Nitro (1 mois).',
			'10 Hunter Pass (1 mois).',
			'Récompenses distribuées aux participants les plus impliqués.'
		]
	},
	{
		id: 'staff-win',
		title: 'Victoire du Staff',
		items: [
			'L’enveloppe récompenses (950 € / 5 Nitro boosts) est réinvestie dans la communauté.',
			'Financement de futurs événements et nouvelles récompenses.',
			'Projets liés à Leveling.'
		]
	},
	{
		id: 'total-failure',
		title: 'Échec total',
		items: [
			'50 € ajoutés à la cagnotte communautaire.',
			'2 Nitro distribués par tirage au sort.',
			'L’expérience collective reste le véritable enjeu.'
		]
	}
];

export const FINAL_REVEAL = [
	'Un salon secret sera débloqué à la résolution de l’énigme.',
	'Message exclusif du créateur de Leveling.',
	'Modalités de récupération des récompenses.',
	'Annonce surprise ou teaser.',
	'Rôle Discord exclusif lié à cette édition.'
];

export const ROLES = [
	{
		title: 'Les Fragmentés',
		description:
			'Participants sélectionnés recevant des informations confidentielles : mots, fragments et indices. Ils constituent le cœur de l’enquête.',
		items: ['Mots et fragments confidentiels', 'Cœur de l’enquête', 'Sélection aléatoire parmi éligibles']
	},
	{
		title: 'Les Enquêteurs',
		description:
			'Tous les autres membres du serveur. Même sans fragment, ils influencent directement le résultat final.',
		items: [
			'Élaborer des théories',
			'Relier les indices',
			'Participer aux salons dédiés',
			'Contribuer aux objectifs TikTok'
		]
	}
];

export const CAMPS = [
	{
		name: 'Les Membres',
		description: 'Communauté active du serveur. Objectif : reconstituer la phrase secrète en premier.'
	},
	{
		name: 'Le Staff',
		description:
			'Équipe de modération et d’administration. L’objectif reste une expérience collective, pas la domination du staff.'
	}
];
