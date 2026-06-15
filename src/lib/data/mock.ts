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
	icon: 'rules' | 'clues' | 'tiktok' | 'schedule' | 'rewards' | 'concept';
	featured?: boolean;
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
	duration: '3 semaines',
	discordLabel: 'Serveur Discord Leveling'
};

/** Index 0-based de la phase en cours */
export const CURRENT_PHASE_INDEX = 1;

export const HEADER_NAV = [
	{ href: '/regles', label: 'Règles' },
	{ href: '/indices', label: 'Indices' },
	{ href: '/objectif-tiktok', label: 'TikTok' },
	{ href: '/deroule', label: 'Déroulé' },
	{ href: '/recompenses', label: 'Récompenses' },
	{ href: '/soumettre', label: 'Soumettre' }
] as const;

/** Critères affichés sur la page de soumission (connexion Discord). */
export const SUBMIT_CRITERIA = [
	'Compte Discord créé depuis au moins 5 jours.',
	'Maximum 2 soumissions par 24 heures.',
	'Chaque essai compte, quelle que soit la réponse.'
] as const;

export const EXPECTED_PHRASE_WORDS = 15;
export const MAX_SUBMIT_ATTEMPTS = 2;
export const RATE_LIMIT_WINDOW_HOURS = 24;

export const PARTICIPATION_STEPS = [
	{
		step: '01',
		title: 'Rejoignez le serveur',
		description: 'Intégrez la communauté Discord Leveling et consultez les salons dédiés à l’événement.'
	},
	{
		step: '02',
		title: 'Lisez les règles',
		description: 'Comprenez l’entraide collective, la confidentialité des fragments et le cadre de l’enquête.'
	},
	{
		step: '03',
		title: 'Contribuez à l’enquête',
		description: 'Partagez vos hypothèses, aidez les objectifs TikTok et suivez les transmissions du staff.'
	}
] as const;

export const NAV_LINKS: NavLink[] = [
	{
		href: '/regles',
		title: 'Règles',
		description: 'Fair-play, confidentialité des fragments et cadre de l’événement.',
		icon: 'rules'
	},
	{
		href: '/indices',
		title: 'Indices',
		description: 'Fragments débloqués par la communauté. Les verrouillés restent scellés.',
		icon: 'clues',
		featured: true
	},
	{
		href: '/objectif-tiktok',
		title: 'Objectif TikTok',
		description: 'Suivez la progression collective et les paliers de vues à débloquer.',
		icon: 'tiktok'
	},
	{
		href: '/deroule',
		title: 'Déroulé',
		description: 'Les 4 phases de l’événement, de l’Éveil à la Résolution.',
		icon: 'schedule'
	},
	{
		href: '/recompenses',
		title: 'Récompenses',
		description: 'Victoire des Membres, du Staff ou échec total — ce qui est en jeu.',
		icon: 'rewards'
	},
	{
		href: '/concept',
		title: 'Concept & Rôles',
		description: 'Fragmentés, Enquêteurs, les deux camps et la phrase secrète.',
		icon: 'concept'
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

export const COLLABORATION_RULES = [
	'L’événement est une enquête collective : personne ne possède assez d’informations pour résoudre l’énigme seul.',
	'Chaque participant contribue à l’avancement de son camp — Fragmentés comme Enquêteurs.',
	'Les Enquêteurs partagent leurs hypothèses, recoupent les indices publics et s’entraident dans les salons dédiés.',
	'Les Fragmentés restent actifs et joignables : ils participent aux échanges, orientent l’enquête et répondent aux sollicitations de leur camp.',
	'Poser des questions, proposer des pistes et construire sur les idées des autres est encouragé — c’est le cœur de l’événement.'
];

export const CONFIDENTIALITY_RULES = [
	'Les mots et fragments reçus en message privé restent confidentiels : pas de copier-coller, pas de citation mot pour mot, pas de capture d’écran partagée.',
	'Un Fragmenté peut aider sans trahir son fragment : confirmer ou infirmer une piste, donner un indice indirect, reformuler sans révéler le mot exact.',
	'Confidentialité et entraide ne s’opposent pas — la règle protège l’équité du jeu pendant que la communauté avance ensemble.'
];

export const RULES = [
	'Respect du fair-play, de l’entraide et du règlement général du serveur.',
	'Les décisions finales concernant l’événement reviennent à l’organisateur.'
];

export const PARTICIPATION_CRITERIA = [
	'Compte Discord créé depuis au moins 5 jours (vérifié automatiquement à la connexion).',
	'Absence de multi-comptes.',
	'Sélection aléatoire parmi les profils éligibles pour le rôle de Fragmenté.',
	'Engagement actif attendu : participer aux échanges du camp et répondre aux sollicitations sous 24 heures.',
	'Des remplaçants secrets seront désignés pour garantir la continuité de l’enquête.'
];

export const INACTIVITY_RULES = [
	'Absence de réponse pendant 24 heures aux sollicitations du staff ou des participants de son camp.',
	'Blocage manifeste de la progression collective (refus répété de participer aux échanges).',
	'Le fragment est redistribué à un remplaçant afin de ne pas pénaliser le reste du camp.'
];

export const CHEATING_CASES = [
	{
		title: 'Fuite de fragments',
		description:
			'Partager en public (salons, DM, réseaux sociaux) un mot, fragment ou indice reçu en message privé, ou publier une capture d’écran de ces messages.'
	},
	{
		title: 'Multi-comptes et usurpation',
		description:
			'Utiliser plusieurs comptes pour obtenir plusieurs rôles Fragmenté, se faire passer pour un autre participant ou manipuler la sélection des remplaçants.'
	},
	{
		title: 'Collusion inter-camps',
		description:
			'Transmettre volontairement des informations à l’autre camp (Membres ↔ Staff) ou coordonner une triche entre participants pour fausser l’enquête.'
	},
	{
		title: 'Exploitation et contournement',
		description:
			'Utiliser des bots, scripts, fuites externes ou toute méthode visant à obtenir la phrase secrète sans jouer le jeu collectif prévu par l’événement.'
	},
	{
		title: 'Obstruction volontaire',
		description:
			'Diffuser de fausses informations en connaissance de cause, saboter les échanges du camp ou ignorer délibérément les sollicitations pour freiner la progression collective.'
	}
];

export const SANCTIONS = [
	{
		title: 'Triche d’un Membre',
		items: [
			'Exclusion immédiate et définitive de l’événement.',
			'Remplacement par un remplaçant désigné à l’avance.',
			'Retrait d’une récompense du lot des Membres (priorité : un Hunter Pass).',
			'En cas de fuite majeure, le staff peut annuler les indices compromis et rééquilibrer la partie.'
		]
	},
	{
		title: 'Triche d’un membre du Staff',
		items: [
			'Exclusion immédiate de l’événement et retrait des responsabilités liées à la partie.',
			'Remplacement par un autre membre du staff.',
			'Réduction de 100 € de l’enveloppe communautaire prévue en cas de victoire du Staff.',
			'Le staff ne peut ni recevoir de fragment ni influencer directement la résolution de l’énigme.'
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
			'10 récompenses au total : 5 Nitro (1 mois) + 5 Hunter Pass (1 mois).',
			'5 Nitro attribués aux participants les plus impliqués (engagement, contributions utiles à l’enquête).',
			'5 Nitro distribués via giveaway parmi les participants éligibles.',
			'5 Hunter Pass attribués aux participants les plus impliqués.',
			'5 Hunter Pass distribués via giveaway parmi les participants éligibles.',
			'Seuls les membres ayant participé activement à l’événement sont éligibles aux tirages.'
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
