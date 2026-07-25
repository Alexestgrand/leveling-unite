export type AnnouncementTag = 'URGENT' | 'INDICE' | 'RÈGLE';

export interface Announcement {
	id: string;
	date: string;
	tag: AnnouncementTag;
	content: string;
}

export type MilestoneKind = 'aide' | 'rattrapage';

export interface Milestone {
	views: number;
	label: string;
	description: string;
	/** Rang de la porte (gamification) — E, D, C, B, A, S… */
	rank: string;
	kind: MilestoneKind;
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
	icon: 'rules' | 'clues' | 'tiktok' | 'schedule' | 'rewards' | 'concept' | 'fragments';
	featured?: boolean;
}

export type FragmentCamp = 'communaute' | 'staff';
export type FragmentStatus = 'upcoming' | 'open' | 'validated' | 'lost';

/** Quête / fragment publié sur le site (mode hybride). */
export interface FragmentQuest {
	id: string;
	wave: number;
	/** Position du mot dans la phrase (1–15), ou null si non communiquée. */
	wordSlot: number | null;
	/** Pseudo Discord public du porteur (sans @). */
	discordUsername: string;
	camp: FragmentCamp;
	status: FragmentStatus;
	/** Énigme publique — tout le monde peut aider à résoudre. */
	enigma: string;
	/** Indice meta après validation MJ (jamais le mot en clair). */
	metaHint?: string;
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
	tagline: 'Quinze mots. Deux camps. Personne ne gagne seul.',
	/** Ouverture officielle — samedi 25 juillet 2026 à 12h (heure de Paris). */
	startDate: new Date('2026-07-25T12:00:00+02:00'),
	startDateLabel: '25 juillet 2026 · 12h',
	/** Fin = ouverture + 20 jours (4 vagues de 5 jours). */
	endDate: new Date('2026-08-14T12:00:00+02:00'),
	endDateLabel: '14 août 2026 · 12h',
	duration: '20 jours (4 vagues de 5 fragments)',
	discordLabel: 'Serveur Discord Leveling',
	discordUrl: 'https://discord.gg/kNnVZWhfCe'
};

export const ENIGMA_SUMMARY = {
	phraseWords: 15,
	fragmentsPerWave: 5,
	waveDurationDays: 5,
	waveCount: 4,
	submitAttempts: 2,
	submitWindowHours: 24,
	/** Essais de validation par Fragmenté (définitif). */
	fragmentAttempts: 1,
	/** Confirmations requises par d'autres Fragmentés du camp avant l'envoi. */
	fragmentConfirmations: 2,
	/** Délai pour valider son mot avant qu'il soit perdu. */
	fragmentDeadlineHours: 72
} as const;

/** Index 0-based de la vague en cours (-1 = pas encore commencé) */
export const CURRENT_PHASE_INDEX = 0;

export const HEADER_NAV = [
	{ href: '/regles', label: 'Règles' },
	{ href: '/fragmentes', label: 'Fragmentés' },
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
			'L’enquête vit sur le Discord Leveling. Le journal épinglé raconte ce que vous avez manqué.'
	},
	{
		step: '02',
		title: 'Aidez les Fragmentés',
		description:
			'Leurs énigmes sont publiques. Tout le monde cherche — eux seuls valident, en un essai.'
	},
	{
		step: '03',
		title: 'Testez la phrase',
		description:
			'Quinze mots, deux essais par 24 h. Le premier camp qui valide remporte tout.'
	}
] as const;

export const NAV_LINKS: NavLink[] = [
	{
		href: '/regles',
		title: 'Règles',
		description: 'Le cadre, les camps, les sanctions.',
		icon: 'rules'
	},
	{
		href: '/fragmentes',
		title: 'Fragmentés',
		description: 'Les porteurs, leurs énigmes, leur statut.',
		icon: 'fragments',
		featured: true
	},
	{
		href: '/indices',
		title: 'Indices',
		description: 'Tout ce qui a été révélé. Rien d’autre.',
		icon: 'clues'
	},
	{
		href: '/objectif-tiktok',
		title: 'Objectif TikTok',
		description: 'Les vues débloquent des révélations.',
		icon: 'tiktok'
	},
	{
		href: '/deroule',
		title: 'Déroulé',
		description: 'Quatre vagues, vingt jours.',
		icon: 'schedule'
	},
	{
		href: '/recompenses',
		title: 'Récompenses',
		description: 'Ce que chaque issue rapporte.',
		icon: 'rewards'
	},
	{
		href: '/concept',
		title: 'Concept & Rôles',
		description: 'La phrase, les rôles, les camps.',
		icon: 'concept'
	}
];

/**
 * Fragments publiés sur le site (source de vérité MJ).
 * Ajoute / modifie ici puis commit + push pour publier.
 *
 * Exemple :
 * {
 *   id: 'w1-m1',
 *   wave: 1,
 *   wordSlot: 3,
 *   discordUsername: 'PseudoDiscord',
 *   camp: 'communaute',
 *   status: 'open',
 *   enigma: 'Texte de l’énigme…'
 * }
 */
export const FRAGMENTS: FragmentQuest[] = [
	{
		id: 'w1-m1',
		wave: 1,
		wordSlot: 1,
		discordUsername: 'chikara2ndlocky45',
		camp: 'communaute',
		status: 'open',
		enigma: `L'ANCRE

PUHUEQE
UEAXQE
EQGXE
RMUNXQE

Tout a glissé du même nombre de crans. Combien ? La réponse n'est pas ici.

Elle est sur le serveur. Un salon porte un nom : celui où l'enquête garde sa mémoire, celui qui existe pour que personne ne soit laissé en arrière. Compte ses lettres, tirets exclus.

Ce nombre est ta clé.

Date limite : 28/07 à 12h00.`
	},
	{
		id: 'w1-m2',
		wave: 1,
		wordSlot: 2,
		discordUsername: 'pourfendeur8',
		camp: 'communaute',
		status: 'open',
		enigma: `LE SABLIER

Ce qui suit a été versé dans un seul flux, une lettre à la fois, à tour de rôle. Tout s'écoule ensemble.

TCNE OEOU UUUX SXS.

Prends une lettre sur quatre, et tu tiendras le premier fil. Recommence un cran plus loin pour le suivant.

Le point marque une fin.

Date limite : 28/07 à 12h00.`
	},
	{
		id: 'w1-m3',
		wave: 1,
		wordSlot: 3,
		discordUsername: 'asterion_45',
		camp: 'staff',
		status: 'open',
		enigma: `LE CERCLE

BGTSNMR
UPNCPOT
EGFQPU
SOLRQV

Tout a glissé — mais pas d'autant. Chaque ligne avance d'un pas de plus que celle qui la précède.

Le premier pas t'est donné par le jour où cette énigme a été publiée. Ensuite, tourne.

Date limite : 28/07 à 12h00.`
	},
	{
		id: 'w1-m4',
		wave: 1,
		wordSlot: 4,
		discordUsername: 'mabimzaa',
		camp: 'communaute',
		status: 'open',
		enigma: `L'ANCRE

AD
OMD
YMUE
PAZO

Tout a glissé du même nombre de crans. Combien ? La réponse n'est pas ici.

Elle est sur le serveur. Un salon porte un nom : celui où l'enquête garde sa mémoire, celui qui existe pour que personne ne soit laissé en arrière. Compte ses lettres, tirets exclus.

Ce nombre est ta clé.

Date limite : 28/07 à 12h00.`
	},
	{
		id: 'w1-m5',
		wave: 1,
		wordSlot: 5,
		discordUsername: 'zero6777_',
		camp: 'communaute',
		status: 'open',
		enigma: `LE SABLIER

Ce qui suit a été versé dans un seul flux, une lettre à la fois, à tour de rôle. Tout s'écoule ensemble.

CNLU EOEN TTUE TRR. EE..

Prends une lettre sur quatre, et tu tiendras le premier fil. Recommence un cran plus loin pour le suivant.

Le point marque une fin.

Date limite : 28/07 à 12h00.`
	}
];

export const FRAGMENT_MODE_INTRO = [
	'Les porteurs et leurs énigmes sont publics. Tout le monde peut chercher.',
	'Seul le Fragmenté désigné fait valider son mot — en MP à @so_hakai, l’organisateur. Un essai, définitif, confirmé par 2 autres Fragmentés de son camp.',
	'72 heures par mot. Raté ou expiré : le mot est perdu, et seul un palier TikTok le fera réapparaître — pour les deux camps.'
] as const;

export const ANNOUNCEMENTS: Announcement[] = [];

export const TIKTOK_TRACKER = {
	currentViews: 0,
	goal: 500_000,
	hashtags: ['#Levelingfitnessapp', '#LevelingUnite'],
	milestones: [
		{
			views: 10_000,
			label: 'Lettre révélée',
			description: 'Une lettre utile à la phrase secrète est révélée.',
			rank: 'E',
			kind: 'aide'
		},
		{
			views: 50_000,
			label: 'Indice global',
			description: 'Un indice global supplémentaire pour la communauté.',
			rank: 'D',
			kind: 'aide'
		},
		{
			views: 100_000,
			label: 'Catégorie confirmée',
			description: 'La catégorie d’un mot de la phrase est confirmée.',
			rank: 'C',
			kind: 'aide'
		},
		{
			views: 250_000,
			label: 'Piste écartée',
			description: 'Une piste communautaire est officiellement écartée.',
			rank: 'B',
			kind: 'aide'
		},
		{
			views: 500_000,
			label: 'Indice décisif',
			description: 'Un indice décisif pour le camp des Membres.',
			rank: 'A',
			kind: 'aide'
		}
	] satisfies Milestone[]
};

/** Chaque mot perdu ajoute une porte de rattrapage à +250k vues au-dessus du dernier palier. */
export const LOST_WORD_MILESTONE_STEP = 250_000;

const LOST_WORD_RANKS = ['S', 'SS', 'SSS'] as const;

/** Portes de rattrapage générées depuis les fragments perdus (status 'lost'). */
export function getLostWordMilestones(): Milestone[] {
	const lastBase = TIKTOK_TRACKER.milestones[TIKTOK_TRACKER.milestones.length - 1].views;

	return FRAGMENTS.filter((f) => f.status === 'lost')
		.sort((a, b) => (a.wordSlot ?? 99) - (b.wordSlot ?? 99))
		.map((fragment, index) => ({
			views: lastBase + (index + 1) * LOST_WORD_MILESTONE_STEP,
			label: `Rattrapage — mot n°${fragment.wordSlot ?? '?'}`,
			description: `Le mot perdu n°${fragment.wordSlot ?? '?'} est révélé — aux deux camps.`,
			rank: LOST_WORD_RANKS[Math.min(index, LOST_WORD_RANKS.length - 1)],
			kind: 'rattrapage' as const
		}));
}

/** Rattrapage : les mots perdus par les Fragmentés reviennent via les paliers TikTok. */
export const TIKTOK_LOST_WORD_NOTE =
	'Chaque mot perdu par un Fragmenté ouvre une porte de rattrapage : +250 000 vues au-dessus du dernier palier. Franchie, elle révèle le mot — aux deux camps.' as const;

export const TIKTOK_ACCOUNT = {
	handle: '@leveling.event',
	url: 'https://www.tiktok.com/@leveling.event?_r=1&_t=ZN-97Edzoo61hu',
	label: 'Compte officiel Leveling Event'
} as const;

export const SOLO_LEVELING_FACTS = [
	'Ahjin est le nom inversé de Jin Ah, la sœur de Sung Jin-Woo — un clin d’œil caché dans la série.',
	'Sung Jin-Woo était surnommé « l’homme le plus faible » avant que le Système ne le choisisse.',
	'Le Système n’apparaît qu’à Sung Jin-Woo : aucun autre chasseur ne voit ses quêtes.',
	'Igris est le premier soldat de l’ombre extrait par Jin-Woo, issu du temple de Cartenon.',
	'Beru, roi des fourmis, devient l’un des lieutenants les plus redoutés de l’armée d’ombres.',
	'La double donjon de Jeju Island marque un tournant où la menace dépasse les rangs nationaux.',
	'Les Monarques des ombres et Ashborn sont au cœur du lore des pouvoirs ultimes de la série.',
	'Jin-Woo peut stocker des objets dans une dimension d’inventaire grâce au Système.',
	'La ligue des chasseurs classe les donjons de E à S — chaque rang change la donne en combat.',
	'Cha Hae-In est l’une des rares personnes à percevoir l’aura unique de Sung Jin-Woo.',
	'Un easter egg est caché quelque part sur ce site — saurez-vous le trouver ?'
] as const;

export const SUBMIT_FOOTNOTE =
	"pas la peine de tricher avec plusieurs compte famé y'a 15000 milliards de possibiité 🥀 littérelement" as const;

/** Indices publiés officiellement (annonces + paliers TikTok atteints). */
export const PUBLIC_INDICES: PublicIndex[] = [];

export const CONCEPT_INTRO = [
	'Une phrase de quinze mots est cachée. Personne n’en détient assez pour la reconstituer seul.',
	'À chaque vague, cinq Fragmentés sont désignés publiquement. Chacun porte un mot ; son énigme est publiée sur la page Fragmentés.',
	'Tout le monde cherche. Seul le porteur valide son mot auprès de l’organisateur, @so_hakai — un essai, deux confirmations de son camp, 72 heures. Un mot raté est perdu jusqu’au prochain palier TikTok.',
	'Deux camps s’affrontent : la Communauté Leveling et le Staff. L’organisateur, @so_hakai (Hakai), est neutre — il conçoit, observe et tranche.'
];

export const ORGANIZER_ROLE = {
	title: 'L’organisateur — @so_hakai',
	description:
		'Hakai conçoit l’énigme, désigne les Fragmentés et valide les mots en MP. Il ne joue dans aucun camp.',
	items: [
		'Neutre — ni Membres, ni Staff',
		'Propose les shortlists des votes',
		'Gère remplacements et fuites',
		'Décision finale en cas de litige'
	]
};

export const COLLABORATION_RULES = [
	'Personne ne possède assez d’informations pour résoudre la phrase seul — l’enquête est collective.',
	'Les Enquêteurs théorisent et recoupent les indices dans les salons d’enquête.',
	'Les Fragmentés restent joignables ; la validation d’un mot passe uniquement par eux.',
	'Le journal épinglé (#journal-unite) résume l’enquête pour ceux qui arrivent en cours de route.'
];

export const CONFIDENTIALITY_RULES = [
	'Les énigmes sont publiques ; les mots restent confidentiels jusqu’à la fin de l’événement.',
	'Seul le Fragmenté nommé valide son mot en MP à @so_hakai (organisateur) — un essai, définitif.',
	'Avant l’envoi : 2 confirmations d’autres Fragmentés du camp, dans le salon dédié. Les confirmateurs écrivent aussi à @so_hakai. Sans elles, l’essai n’est pas traité.',
	'72 h par mot. Raté ou expiré : perdu jusqu’au prochain palier TikTok, révélé aux deux camps.',
	'Après validation, le porteur relaie des indices indirects — jamais le mot exact.',
	'Pas de capture des MP de validation. Un mot fuité est invalidé et remplacé par un indice public.'
];

export const RULES = [
	'Deux camps : Communauté Leveling vs Staff Leveling. L’organisateur, @so_hakai (Hakai), est neutre.',
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
	'Le Fragmenté est remplacé par un remplaçant pour les énigmes restantes de la vague.',
	'Le remplaçant hérite de l’essai unique s’il n’a pas déjà été consommé — un remplacement ne redonne jamais d’essai supplémentaire.'
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
			'Harcèlement d’un Fragmenté, fausses informations majeures en connaissance de cause, sabotage des salons d’enquête ou essai de validation volontairement grillé (mot faux envoyé en connaissance de cause).'
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
		description: 'Cinq porteurs désignés, cinq énigmes publiées. L’enquête commence.'
	},
	{
		id: 'wave-2',
		name: 'Vague 2 — L’Accélération',
		share: '5 fragments',
		description: 'Cinq nouveaux porteurs. Les théories se recoupent, le journal s’épaissit.'
	},
	{
		id: 'wave-3',
		name: 'Vague 3 — Le Chaos',
		share: '5 fragments',
		description: 'Les salons s’embrasent. TikTok peut faire basculer l’enquête.'
	},
	{
		id: 'wave-4',
		name: 'Vague 4 — La Résolution',
		share: 'Sprint final',
		description: 'Derniers mots, course à la soumission. Un seul camp validera.'
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
			'Cinq porteurs par vague, désignés publiquement. Chacun détient un mot — et un seul essai pour le valider.',
		items: [
			'Pseudo + énigme publics sur /fragmentes',
			'Un essai, confirmé par 2 pairs du camp',
			'72 h — sinon le mot est perdu',
			'Max 2 vagues par personne'
		]
	},
	{
		title: 'Les Enquêteurs',
		description:
			'Tout le reste du camp. Ils décodent les énigmes, assemblent la phrase et la soumettent sur ce site.',
		items: [
			'Théories dans #enquete',
			'Décodage des énigmes publiques',
			'Soumission — 2 essais / 24 h',
			'Éligibles au vote Top Enquêteur'
		]
	}
];

export const CAMPS = [
	{
		name: 'Communauté Leveling',
		description: 'Tous les membres du serveur. Reconstituer la phrase, la soumettre en premier.'
	},
	{
		name: 'Staff Leveling',
		description: 'La modération du serveur. Même énigme, salon séparé, aucun privilège.'
	}
];
