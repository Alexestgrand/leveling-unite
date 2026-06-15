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

export interface PublicIndex {
	id: string;
	date: string;
	source: 'annonce' | 'tiktok';
	title: string;
	content: string;
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

export interface NamedReward {
	role: string;
	nitro: number;
	hunterPass: number;
	description: string;
}

export const EVENT = {
	title: 'LEVELING: UNITE',
	subtitle: 'The Fragments',
	tagline: 'Aucun joueur ne peut gagner seul. Toute la communauté doit collaborer.',
	endDate: new Date('2026-06-29T23:59:00+02:00'),
	endDateLabel: '29 juin 2026',
	duration: '20 jours (4 vagues de 5 fragments)',
	discordLabel: 'Serveur Discord Leveling'
};

export const ENIGMA_SUMMARY = {
	phraseWords: 15,
	fragmentsPerWave: 5,
	waveDurationDays: 5,
	waveCount: 4,
	submitAttempts: 2,
	submitWindowHours: 24
} as const;

/** Index 0-based de la vague en cours (-1 = pas encore commencé) */
export const CURRENT_PHASE_INDEX = -1;

export const HEADER_NAV = [
	{ href: '/regles', label: 'Règles' },
	{ href: '/indices', label: 'Indices' },
	{ href: '/objectif-tiktok', label: 'TikTok' },
	{ href: '/deroule', label: 'Déroulé' },
	{ href: '/recompenses', label: 'Récompenses' },
	{ href: '/soumettre', label: 'Soumettre' }
] as const;

export const SUBMIT_CRITERIA = [
	'Compte Discord créé depuis au moins 5 jours.',
	'Maximum 2 soumissions par 24 heures.',
	'La phrase doit contenir exactement 15 mots.',
	'Chaque essai compte, quelle que soit la réponse.',
	'La première soumission valide pour un camp détermine la victoire (horodatage automatique).'
] as const;

export const EXPECTED_PHRASE_WORDS = 15;
export const MAX_SUBMIT_ATTEMPTS = 2;
export const RATE_LIMIT_WINDOW_HOURS = 24;
export const PARTICIPATION_STEPS = [
	{
		step: '01',
		title: 'Rejoignez le serveur',
		description:
			'Intégrez la communauté Discord Leveling, lisez #bienvenue-unite et le journal épinglé pour rattraper l’enquête.'
	},
	{
		step: '02',
		title: 'Suivez les indices',
		description:
			'Consultez les transmissions officielles sur Discord et sur cette page. Les Fragmentés relaient des pistes à leur camp.'
	},
	{
		step: '03',
		title: 'Testez une phrase',
		description:
			'Quand votre camp pense avoir la solution, essayez la phrase complète sur ce site (2 essais par 24 h).'
	}
] as const;

export const NAV_LINKS: NavLink[] = [
	{
		href: '/regles',
		title: 'Règles',
		description: 'Fair-play, Fragmentés, votes, fuites et cadre de l’événement.',
		icon: 'rules'
	},
	{
		href: '/indices',
		title: 'Indices',
		description: 'Indices publiés via les annonces officielles et les paliers TikTok.',
		icon: 'clues',
		featured: true
	},
	{
		href: '/objectif-tiktok',
		title: 'Objectif TikTok',
		description: 'Les vues communautaires débloquent des aides pour l’enquête.',
		icon: 'tiktok'
	},
	{
		href: '/deroule',
		title: 'Déroulé',
		description: 'Les 4 vagues de l’événement — 5 fragments tous les 5 jours.',
		icon: 'schedule'
	},
	{
		href: '/recompenses',
		title: 'Récompenses',
		description: 'Victoire Membres ou Staff — finder, votes et giveaways.',
		icon: 'rewards'
	},
	{
		href: '/concept',
		title: 'Concept & Rôles',
		description: 'L’énigme, les Fragmentés, les camps et l’organisateur neutre.',
		icon: 'concept'
	}
];

export const ANNOUNCEMENTS: Announcement[] = [];

export const TIKTOK_TRACKER = {
	currentViews: 0,
	goal: 500_000,
	hashtags: ['#Levelingfitnessapp', '#LevelingUnite'],
	milestones: [
		{
			views: 10_000,
			label: 'Lettre révélée',
			description: 'Révélation d’une lettre utile à la phrase secrète.'
		},
		{
			views: 50_000,
			label: 'Indice global',
			description: 'Un indice global supplémentaire pour la communauté.'
		},
		{
			views: 100_000,
			label: 'Catégorie confirmée',
			description: 'Confirmation de la catégorie d’un mot de la phrase.'
		},
		{
			views: 250_000,
			label: 'Piste écartée',
			description: 'Une piste communautaire est officiellement écartée par le staff.'
		},
		{
			views: 500_000,
			label: 'Indice décisif',
			description: 'Indice décisif pour aider le camp des Membres.'
		}
	] satisfies Milestone[]
};

/** Indices publiés officiellement (annonces + paliers TikTok atteints). */
export const PUBLIC_INDICES: PublicIndex[] = [];

export const CONCEPT_INTRO = [
	'Une phrase secrète de 15 mots est au cœur de l’enquête. Personne ne peut la reconstituer seul : il faut coopérer, théoriser et recouper les indices.',
	'Tous les 5 jours, 5 Fragmentés sont désignés par camp. Chacun reçoit une énigme en message privé et relaie des pistes indirectes à son camp.',
	'Les Fragmentés sont connus du camp (lore du portail), mais ne publient jamais le mot en clair : ils relaient des indices indirects dans les salons d’enquête.',
	'Les Enquêteurs — tout le reste du camp — théorisent, mettent à jour le journal collectif, alimentent TikTok et soumettent la phrase finale sur ce site.',
	'Deux camps s’affrontent : la Communauté Leveling et le Staff Leveling (modération/administration Discord). L’organisateur est neutre et ne joue dans aucun camp.'
];

export const ORGANIZER_ROLE = {
	title: 'L’organisateur',
	description:
		'L’organisateur conçoit l’énigme, désigne les Fragmentés, valide les solutions en MP et anime l’événement. Il ne participe à aucun camp et tranche en cas de litige.',
	items: [
		'Ne joue ni avec les Membres ni avec le Staff',
		'Désigne les candidats aux votes (Top Fragmenté / Top Enquêteur)',
		'Gère les remplacements et les fuites',
		'Décision finale sur l’événement'
	]
};

export const COLLABORATION_RULES = [
	'L’événement est une enquête collective : personne ne possède assez d’informations pour résoudre la phrase seul.',
	'Chaque participant fait avancer son camp — Fragmentés comme Enquêteurs.',
	'Les Enquêteurs partagent leurs hypothèses, recoupent les indices publics et s’entraident dans les salons d’enquête.',
	'Les Fragmentés restent joignables et relaient des indices meta sans révéler le mot exact.',
	'Le journal épinglé (#journal-unite) permet à toute personne arrivant en cours d’événement de comprendre l’état de l’enquête en quelques minutes.'
];

export const CONFIDENTIALITY_RULES = [
	'Les énigmes et mots reçus en message privé restent confidentiels : pas de copier-coller, pas de citation mot pour mot, pas de capture d’écran partagée.',
	'Un Fragmenté aide son camp avec des indices indirects : type de mot, longueur, position probable, confirmation ou infirmation d’une théorie.',
	'L’identité des Fragmentés de la vague est publique ; le contenu de leur fragment ne l’est pas.',
	'En cas de fuite, le fragment est marqué compromis et un indice de remplacement est publié — le camp n’est pas exclu pour une seule erreur.'
];

export const RULES = [
	'Deux camps : Communauté Leveling vs Staff Leveling. L’organisateur est neutre.',
	'Victoire : première phrase de 15 mots validée sur le site par un membre du camp gagnant.',
	'Respect du fair-play, de l’entraide et du règlement général du serveur.',
	'Les décisions finales concernant l’événement reviennent à l’organisateur.'
];

export const PARTICIPATION_CRITERIA = [
	'Compte Discord créé depuis au moins 15 jours pour être éligible au rôle de Fragmenté.',
	'Compte Discord créé depuis au moins 5 jours pour soumettre la phrase sur le site.',
	'Absence de multi-comptes.',
	'Tirage parmi les profils éligibles : 5 Fragmentés par vague, 5 jours par vague.',
	'Une personne peut être Fragmenté au maximum 2 vagues sur l’événement.',
	'Des remplaçants secrets sont désignés par l’organisateur en cas d’inactivité.'
];

export const INACTIVITY_RULES = [
	'Absence de réponse pendant 24 heures aux sollicitations de l’organisateur ou du camp.',
	'Refus répété de relayer des indices indirects après validation de l’énigme.',
	'Le Fragmenté est remplacé par un remplaçant pour les énigmes restantes de la vague.'
];

export const SUBMISSION_RULES = [
	'La soumission se fait uniquement sur ce site (/soumettre), après connexion Discord.',
	'La phrase doit contenir exactement 15 mots, séparés par des espaces.',
	'2 tentatives maximum par 24 heures et par compte.',
	'Le premier compte du camp gagnant à obtenir une validation réussie est le Finder officiel.',
	'Seule la phrase exacte de 15 mots permet de valider la victoire du camp.'
];

export const VOTE_RULES = [
	'En cas de victoire des Membres, deux votes collectifs désignent les meilleurs contributeurs.',
	'Top Fragmenté : l’organisateur propose une shortlist de candidats ; le camp vote pour en désigner un. Récompense : 2 Nitro + 1 Hunter Pass.',
	'Top Enquêteur : même procédure. Récompense : 1 Nitro + 1 Hunter Pass.',
	'L’organisateur choisit qui figure sur chaque shortlist en fonction de la contribution réelle à l’enquête.',
	'Le Finder (première phrase valide) reçoit automatiquement 2 Nitro + 1 Hunter Pass, indépendamment des votes.',
	'Une même personne peut cumuler Finder et un titre voté si elle remplit les critères.'
];

export const CHEATING_CASES = [
	{
		title: 'Fuite de fragments',
		description:
			'Publier en public un mot exact, une capture de MP ou une citation mot pour mot d’une énigme Fragmenté.'
	},
	{
		title: 'Multi-comptes et usurpation',
		description:
			'Utiliser plusieurs comptes pour obtenir plusieurs rôles Fragmenté ou soumettre la phrase en dehors des règles.'
	},
	{
		title: 'Collusion inter-camps',
		description:
			'Transmettre volontairement des informations à l’autre camp (Communauté ↔ Staff) pour fausser la course.'
	},
	{
		title: 'Exploitation et contournement',
		description:
			'Bots, scripts, brute force sur le site ou toute méthode visant à contourner les 2 essais / 24 h.'
	},
	{
		title: 'Obstruction volontaire',
		description:
			'Harcèlement d’un Fragmenté, fausses informations majeures en connaissance de cause ou sabotage des salons d’enquête.'
	}
];

export const SANCTIONS = [
	{
		title: 'Fuites et triche — Membre',
		items: [
			'Suppression du message et avertissement (fuite légère).',
			'Exclusion de l’événement et inéligibilité aux récompenses (fuite grave).',
			'Fragment compromis : indice de remplacement publié, le mot fuité est invalidé.',
			'Remplacement du Fragmenté si nécessaire.'
		]
	},
	{
		title: 'Fuites et triche — Staff joueur',
		items: [
			'Exclusion immédiate de la partie et retrait du rôle d’enquêteur staff.',
			'Le staff qui rédige ou connaît les énigmes ne participe pas à la résolution.',
			'En cas de victoire Staff malgré tout, les 5 Nitro staff sont attribués uniquement aux participants actifs fair-play.'
		]
	}
];

export const PHASES: Phase[] = [
	{
		id: 'wave-1',
		name: 'Vague 1 — L’Éveil',
		share: '5 fragments',
		description:
			'5 Fragmentés désignés. 5 énigmes distribuées en MP. Les premières théories et le journal collectif sont lancés.'
	},
	{
		id: 'wave-2',
		name: 'Vague 2 — L’Accélération',
		share: '5 fragments',
		description:
			'5 nouveaux Fragmentés. Les théories se multiplient — le camp recoupe les indices publics et le journal.'
	},
	{
		id: 'wave-3',
		name: 'Vague 3 — Le Chaos',
		share: '5 fragments',
		description:
			'5 nouveaux Fragmentés. Les salons s’embrasent. TikTok peut débloquer des aides décisives.'
	},
	{
		id: 'wave-4',
		name: 'Vague 4 — La Résolution',
		share: '5 fragments',
		description:
			'Derniers Fragmentés, sprint final. Course à la soumission sur le site.'
	}
];

export const MEMBERS_REWARD_TOTAL = { nitro: 10, hunterPass: 20 } as const;

export const MEMBERS_REWARD_NAMED: NamedReward[] = [
	{
		role: 'Finder',
		nitro: 2,
		hunterPass: 1,
		description: 'Première phrase de 15 mots validée sur le site (horodatage API).'
	},
	{
		role: 'Top Fragmenté',
		nitro: 2,
		hunterPass: 1,
		description: 'Élu par vote du camp parmi la shortlist proposée par l’organisateur.'
	},
	{
		role: 'Top Enquêteur',
		nitro: 1,
		hunterPass: 1,
		description: 'Élu par vote du camp parmi la shortlist proposée par l’organisateur.'
	}
];

export const MEMBERS_REWARD_GIVEAWAY = { nitro: 5, hunterPass: 17 } as const;

export const REWARDS: RewardOutcome[] = [
	{
		id: 'members-win',
		title: 'Victoire de la Communauté',
		items: [
			'20 Hunter Pass (1 mois) + 10 Nitro (1 mois) au total.',
			'Finder (1re phrase valide) : 2 Nitro + 1 Hunter Pass.',
			'Top Fragmenté (vote collectif) : 2 Nitro + 1 Hunter Pass.',
			'Top Enquêteur (vote collectif) : 1 Nitro + 1 Hunter Pass.',
			'Giveaway parmi les participants actifs : 5 Nitro + 17 Hunter Pass restants.',
			'L’organisateur propose les candidats aux votes ; le camp tranche.'
		]
	},
	{
		id: 'staff-win',
		title: 'Victoire du Staff Leveling',
		items: [
			'950 € reversés à Leveling (futurs événements, projets communautaires).',
			'5 Nitro (1 mois) distribués parmi les membres du staff ayant participé activement à l’enquête.',
			'La communauté ne reçoit pas le lot Membres, mais l’événement finance la suite de Leveling.'
		]
	},
	{
		id: 'total-failure',
		title: 'Échec total',
		items: [
			'Aucun camp n’a validé la phrase avant la date limite.',
			'50 € ajoutés à la cagnotte communautaire Leveling.',
			'2 Nitro distribués par tirage au sort parmi les participants actifs.',
			'La phrase est révélée officiellement pour clôturer l’histoire.'
		]
	}
];

export const FINAL_REVEAL = [
	'Un salon secret Discord débloqué à la résolution.',
	'Message exclusif du créateur de Leveling.',
	'Modalités de récupération des récompenses.',
	'Rôle Discord exclusif lié à l’édition The Fragments.'
];

export const ROLES = [
	{
		title: 'Les Fragmentés',
		description:
			'5 joueurs par vague, désignés publiquement. Ils reçoivent une énigme en MP ; la solution est un fragment. Ils relaient des indices indirects à leur camp sans publier le mot exact.',
		items: [
			'Identité publique, fragment confidentiel',
			'Rotation chaque vague (5 jours)',
			'Max 2 vagues par personne sur l’événement',
			'Éligibles au vote Top Fragmenté si les Membres gagnent'
		]
	},
	{
		title: 'Les Enquêteurs',
		description:
			'Tous les autres membres du camp. Ils assemblent les fragments, alimentent le journal, contribuent à TikTok et peuvent soumettre la phrase finale.',
		items: [
			'Théories et recoupements dans #enquete',
			'Lecture du journal pour les arrivants',
			'Soumission sur /soumettre (2 essais / 24 h)',
			'Éligibles au vote Top Enquêteur si les Membres gagnent'
		]
	}
];

export const CAMPS = [
	{
		name: 'Communauté Leveling',
		description:
			'Tous les membres du serveur Discord. Objectif : reconstituer la phrase de 15 mots et la soumettre en premier sur le site.'
	},
	{
		name: 'Staff Leveling',
		description:
			'Équipe de modération et d’administration du serveur. Même énigme, salon séparé. L’organisateur ne fait pas partie de ce camp.'
	}
];
