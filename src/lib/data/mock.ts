export type AnnouncementTag = 'URGENT' | 'INDICE' | 'RÈGLE';

export interface Announcement {
	id: string;
	date: string;
	tag: AnnouncementTag;
	content: string;
	/** Lien optionnel (ex. vers /indices pour un INDICE). */
	href?: string;
	linkLabel?: string;
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
	/** Lien externe cliquable (TikTok, annonce, etc.). */
	url?: string;
}

/** Option de règle gagnée via l'énigme du creux (entre-vagues). */
export interface CreuxRuleOption {
	id: string;
	title: string;
	description: string;
}

export interface CreuxChallenge {
	id: string;
	deadline: string;
	deadlineLabel: string;
	audioUrl: string;
	cipher: string;
	audioHint: string;
}

/** Section de la révélation du Cadran Creux (vague 4). */
export interface CadranSection {
	id: string;
	title: string;
	paragraphs: string[];
	/** Bloc monospace (comptages, tableaux). */
	code?: string;
	emphasis?: string;
}

export interface CadranCreux {
	id: string;
	title: string;
	resolved: boolean;
	resolvedLabel: string;
	answer: string;
	closingLines: readonly string[];
	verses: readonly string[];
	epigraph: string;
	sections: readonly CadranSection[];
	/** Réouverture de la soumission (fenêtre finale). */
	submitOpenDate: Date;
	submitOpenDateLabel: string;
	/** Dernière chance de soumettre la phrase des 15 mots. */
	submitDeadline: Date;
	submitDeadlineLabel: string;
	rewardTeaser: string;
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
	/** Note de règle spécifique à ce porteur (affichée sous le pseudo). */
	note?: string;
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
	title: 'LEVELING: Unite',
	subtitle: 'The Fragments',
	tagline: '15 mots cachés. 2 camps. On cherche ensemble.',
	/** Ouverture officielle — samedi 25 juillet 2026 à 13h (heure de Paris). */
	startDate: new Date('2026-07-25T13:00:00+02:00'),
	startDateLabel: '25 juillet 2026 · 13h',
	/** Fin — soumission prolongée jusqu'au 28/08 · 21h10. */
	endDate: new Date('2026-08-28T21:10:00+02:00'),
	endDateLabel: '28 août 2026 · 21h10',
	duration: '26 jours (4 vagues · calendrier prolongé)',
	discordLabel: 'Serveur Discord Leveling',
	discordUrl: 'https://discord.com/invite/appleveling'
};

/** Résumé ultra-court pour les nouveaux (accueil, hero). */
export const NEWCOMER_BRIEF = {
	headline: 'C\'est quoi ?',
	lines: [
		'15 mots secrets forment une phrase.',
		'Des joueurs portent chaque mot. Leur énigme est publique.',
		'Toi, tu cherches. Lui seul envoie le mot à Hakai.',
		'Quand ton camp a les 15 mots, envoie la phrase ici.'
	]
} as const;

export type StartHereCard =
	| { id: string; step: string; title: string; body: string; href: string; cta: string }
	| { id: string; step: string; title: string; body: string; action: 'tour'; cta: string };

export const START_HERE_CARDS: StartHereCard[] = [
	{
		id: 'help',
		step: '1',
		title: 'Lire la révélation',
		body: 'Le Cadran Creux est résolu. Lis la vérité, puis soumets ta phrase.',
		href: '/creux#cadran-revelation',
		cta: 'Ouvrir la révélation'
	},
	{
		id: 'understand',
		step: '2',
		title: 'Comprends le jeu',
		body: 'Deux camps, des rôles, des règles simples.',
		href: '/concept',
		cta: 'Voir le concept'
	},
	{
		id: 'tour',
		step: '3',
		title: 'Guide en 1 minute',
		body: 'Un stickman te montre le site. Rapide et clair.',
		action: 'tour',
		cta: 'Lancer le guide'
	}
];

export const EVENT_STATUS = {
	waveLabel: 'Finale',
	progressLabel: '9 mots sécurisés sur 15',
	note: 'Soumission prolongée jusqu’au 28/08 à 21h10.',
	noteHref: '/soumettre',
	noteLinkLabel: 'Soumettre'
} as const;

/** Renseigner manuellement quand le staff annonce le camp gagnant sur Discord. */
export const EVENT_OUTCOME = {
	forceFinished: false,
	winnerCamp: null as 'communaute' | 'staff' | null,
	winnerLabel: null as string | null
} as const;

export const GLOSSARY = [
	{ term: 'Fragmenté', definition: 'Joueur choisi pour porter un mot secret et le valider.' },
	{ term: 'Enquêteur', definition: 'Joueur qui cherche et aide, sans porter de mot.' },
	{ term: 'Camp', definition: 'Communauté ou Staff — deux équipes qui s\'affrontent.' },
	{ term: 'Hakai', definition: 'Organisateur neutre (@so_hakai). Il valide les mots en MP.' },
	{ term: 'Sursis', definition: 'Second essai pour un Fragmenté (règle gagnée au Creux). Inactif sur le Cadran.' },
	{ term: 'Cadran', definition: 'Énigme unique de la Vague 4. Un mot, un essai par camp — tous les mots manquants à la clé.' },
	{ term: 'Phrase', definition: '15 mots à envoyer sur le site pour gagner l\'événement.' }
] as const;

/** Deadline ISO par vague (validation des mots). */
export const WAVE_DEADLINES: Record<number, string> = {
	1: '2026-07-28T13:00:00+02:00',
	2: '2026-08-02T13:00:00+02:00',
	3: '2026-08-15T13:00:00+02:00',
	4: '2026-08-19T21:00:00+02:00'
};

/** Fenêtre avant échéance pendant laquelle les cartes « En cours » clignotent. */
export const DEADLINE_URGENCY_HOURS = 48;

export const ENIGMA_SUMMARY = {
	phraseWords: 15,
	fragmentsPerWave: 5,
	waveDurationDays: 5,
	waveCount: 4,
	submitAttempts: 2,
	submitWindowHours: 24,
	/** Essais de validation par Fragmenté (définitif, sauf édit du Creux). */
	fragmentAttempts: 1,
	/** Sursis actif : 1 second essai par vague et par camp (cf. CREUX_RESOLUTION). */
	sursisPerWavePerCamp: 1,
	/** Confirmations requises par d'autres Fragmentés du camp avant l'envoi. */
	fragmentConfirmations: 2,
	/** Délai pour valider son mot avant qu'il soit perdu. */
	fragmentDeadlineHours: 72
} as const;

/** Index 0-based de la vague en cours (3 = Vague 4 · Cadran Creux, close si résolu). */
export const CURRENT_PHASE_INDEX = 3;

export const HEADER_NAV = [
	{ href: '/fragmentes', label: 'Fragmentés' },
	{ href: '/soumettre', label: 'Soumettre' },
	{ href: '/indices', label: 'Indices' },
	{ href: '/regles', label: 'Règles' },
	{ href: '/objectif-tiktok', label: 'TikTok' },
	{ href: '/deroule', label: 'Déroulé' },
	{ href: '/recompenses', label: 'Récompenses' }
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
		title: 'Rejoins le Discord',
		description: 'C\'est là que l\'enquête vit. Le journal résume ce que tu as manqué.'
	},
	{
		step: '02',
		title: 'Lire la révélation',
		description: 'Le Cadran Creux est résolu. Recoupe les indices avant de soumettre.'
	},
	{
		step: '03',
		title: 'Envoie la phrase',
		description: '15 mots, 2 essais par 24 h. Le premier camp qui valide gagne.'
	}
] as const;

export const NAV_LINKS: NavLink[] = [
	{
		href: '/fragmentes',
		title: 'Fragmentés',
		description: 'Archives des vagues 1 à 3 et du Cadran Creux.',
		icon: 'fragments',
		featured: true
	},
	{
		href: '/creux',
		title: 'Le Creux',
		description: 'Révélation du Cadran Creux — édit Le Sursis (archives).',
		icon: 'clues',
		featured: true
	},
	{
		href: '/indices',
		title: 'Indices',
		description: 'Annonces staff & révélations TikTok (pas les énigmes).',
		icon: 'clues'
	},
	{
		href: '/objectif-tiktok',
		title: 'Objectif TikTok',
		description: 'Les vues débloquent des révélations.',
		icon: 'tiktok'
	},
	{
		href: '/regles',
		title: 'Règles',
		description: 'Le cadre, les camps, les sanctions.',
		icon: 'rules'
	},
	{
		href: '/deroule',
		title: 'Déroulé',
		description: 'Quatre vagues — dernière ligne droite.',
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
		status: 'validated',
		metaHint: 'Le premier fragment est sécurisé. Sa forme exacte reste confidentielle jusqu’à la fin.',
		enigma: `L'ANCRE

PUHUEQE
UEAXQE
EQGXE
RMUNXQE

Tout a glissé du même nombre de crans. Combien ? La réponse n'est pas ici.

Elle est sur le serveur. Un salon porte un nom : celui où l'enquête garde sa mémoire, celui qui existe pour que personne ne soit laissé en arrière. Compte ses lettres, tirets exclus.

Ce nombre est ta clé.

Date limite : 28/07 à 13h00.`
	},
	{
		id: 'w1-m2',
		wave: 1,
		wordSlot: 2,
		discordUsername: 'pourfendeur8',
		camp: 'communaute',
		status: 'validated',
		metaHint: 'Le deuxième fragment est sécurisé. Sa forme exacte reste confidentielle jusqu’à la fin.',
		enigma: `LE SABLIER

Ce qui suit a été versé dans un seul flux, une lettre à la fois, à tour de rôle. Tout s'écoule ensemble.

TCNE OEOU UUUX SXS.

Prends une lettre sur quatre, et tu tiendras le premier fil. Recommence un cran plus loin pour le suivant.

Le point marque une fin.

Date limite : 28/07 à 13h00.`
	},
	{
		id: 'w1-m3',
		wave: 1,
		wordSlot: 3,
		discordUsername: 'asterion_45',
		camp: 'staff',
		status: 'lost',
		note: 'Seul Fragmenté Staff de cette vague : il pouvait valider son mot en solo, sans confirmations.',
		enigma: `LE CERCLE

BGTSNMR
UPNCPOT
EGFQPU
SOLRQV

Tout a glissé — mais pas d'autant. Chaque ligne avance d'un pas de plus que celle qui la précède.

Le premier pas t'est donné par le jour où cette énigme a été publiée. Ensuite, tourne.

Date limite : 28/07 à 13h00.`
	},
	{
		id: 'w1-m4',
		wave: 1,
		wordSlot: 4,
		discordUsername: 'mabimzaa',
		camp: 'communaute',
		status: 'validated',
		metaHint: 'Le quatrième fragment est sécurisé. Sa forme exacte reste confidentielle jusqu’à la fin.',
		enigma: `L'ANCRE

AD
OMD
YMUE
PAZO

Tout a glissé du même nombre de crans. Combien ? La réponse n'est pas ici.

Elle est sur le serveur. Un salon porte un nom : celui où l'enquête garde sa mémoire, celui qui existe pour que personne ne soit laissé en arrière. Compte ses lettres, tirets exclus.

Ce nombre est ta clé.

Date limite : 28/07 à 13h00.`
	},
	{
		id: 'w1-m5',
		wave: 1,
		wordSlot: 5,
		discordUsername: 'zero6777_',
		camp: 'communaute',
		status: 'validated',
		metaHint: 'Le cinquième fragment est sécurisé. Sa forme exacte reste confidentielle jusqu’à la fin.',
		enigma: `LE SABLIER

Ce qui suit a été versé dans un seul flux, une lettre à la fois, à tour de rôle. Tout s'écoule ensemble.

CNLU EOEN TTUE TRR. EE..

Prends une lettre sur quatre, et tu tiendras le premier fil. Recommence un cran plus loin pour le suivant.

Le point marque une fin.

Date limite : 28/07 à 13h00.`
	},
	{
		id: 'w2-m6',
		wave: 2,
		wordSlot: 6,
		discordUsername: 'Starypik',
		camp: 'staff',
		status: 'lost',
		note: 'Mot perdu — camp Staff. Sursis invoqué sur la vague, sans succès.',
		enigma: `LES SIGNES

Quatre possibilités. Une seule est la tienne.

    YUIOQ     GVHEVPQR     IUTEQAG     ESLIDUEI

Tu ne peux pas les lire. Pas encore.
Ton camp les a écartés.
Va les chercher.

Date limite : 02/08 à 13h00.`
	},
	{
		id: 'w2-m7',
		wave: 2,
		wordSlot: 7,
		discordUsername: 'spacestone_',
		camp: 'communaute',
		status: 'lost',
		note: 'Mot perdu — aucune réponse dans le temps imparti.',
		enigma: `LES SIGNES

Quatre possibilités. Une seule est la tienne.

    MUALWLTEILE     MUVIQJKFSE
    MUDEVATYJTIESG  MUEBUHPPHBLH

Tu ne peux pas les lire. Pas encore.
Ton camp les a écartés.
Va les chercher.

Date limite : 02/08 à 13h00.`
	},
	{
		id: 'w2-m8',
		wave: 2,
		wordSlot: 8,
		discordUsername: 'hiolxx',
		camp: 'staff',
		status: 'lost',
		note: 'Mot perdu — camp Staff.',
		enigma: `LES SIGNES

Quatre possibilités. Une seule est la tienne.

    GYEEUH     JVRGHYC     HVNNHYC     FHTIUH

Tu ne peux pas les lire. Pas encore.
Ton camp les a écartés.
Va les chercher.

Date limite : 02/08 à 13h00.`
	},
	{
		id: 'w2-m9',
		wave: 2,
		wordSlot: 9,
		discordUsername: '.xynea',
		camp: 'communaute',
		status: 'lost',
		note: 'Mot perdu.',
		enigma: `LES SIGNES

Quatre possibilités. Une seule est la tienne.

    PH     YUE     WH     GLTTH

Le tien est court. Cela ne le rend pas plus facile — cela le
rend plus fragile.

Tu ne peux pas les lire. Pas encore.
Ton camp les a écartés.
Va les chercher.

Date limite : 02/08 à 13h00.`
	},
	{
		id: 'w2-m10',
		wave: 2,
		wordSlot: 10,
		discordUsername: 'bangodsno',
		camp: 'communaute',
		status: 'validated',
		metaHint: 'Le dixième fragment est sécurisé. Sa forme exacte reste confidentielle jusqu’à la fin.',
		enigma: `LES SIGNES

Quatre possibilités. Une seule est la tienne.

    FYISHZ     TLRDXZ     ZHINFBU     IWUIVLU

Tu ne peux pas les lire. Pas encore.
Ton camp les a écartés.
Va les chercher.

Date limite : 02/08 à 13h00.`
	},
	{
		id: 'w3-m11',
		wave: 3,
		wordSlot: 11,
		discordUsername: 'swapygames',
		camp: 'staff',
		status: 'validated',
		metaHint: 'Le onzième fragment est sécurisé. Sa forme exacte reste confidentielle jusqu’à la fin.',
		enigma: `LE REDOUBLANT

« Deux fois la même classe, alors le latin, je le connais.
La version du jour commençait par " pro patria ". Le
professeur nous l'a assez répété : devant ce qu'on défend,
" pro " ne se traduit que d'une seule façon.

Dans la cour, à la récréation, on ne parlait que du Mondial
qui venait de commencer. Moi je parlais pas. Le surveillant
m'avait confisqué ma montre — soi-disant qu'elle était trop
près de la copie du voisin.

La traduction de " pro " : c'est la tienne. »`
	},
	{
		id: 'w3-m12',
		wave: 3,
		wordSlot: 12,
		discordUsername: 'lacometeblanche',
		camp: 'communaute',
		status: 'validated',
		metaHint: 'Le douzième fragment est sécurisé. Sa forme exacte reste confidentielle jusqu’à la fin.',
		enigma: `LA PREMIÈRE DE CLASSE

« C'était le contrôle de mathématiques. L'exercice deux
portait sur 220 et 284 — les nombres qui s'aiment, disait
le professeur : chacun est la somme des diviseurs de
l'autre. J'ai fini avant tout le monde, comme toujours.

Le dernier exercice utilisait cette notation qu'on apprend
en quatrième : un nombre coiffé d'un petit chiffre, en haut
à droite. Le professeur répétait que tout tenait dans le
nom de cette opération.

En sortant, j'ai croisé l'infirmière qui remontait de la
cour, et le surveillant faisait les cent pas près des
fenêtres.

Le nom de cette opération : c'est le tien. »`
	},
	{
		id: 'w3-m13',
		wave: 3,
		wordSlot: 13,
		discordUsername: 'l_inspecteur',
		camp: 'communaute',
		status: 'lost',
		note: 'Mot perdu — camp Communauté.',
		enigma: `LE SURVEILLANT

« Je suis entré dans la salle 12 à 10h07, avec les sujets
sous le bras. Au tableau, le professeur de philosophie
avait laissé sa leçon de la veille, inachevée — la craie
s'était brisée avant le dernier mot :

    " Une condition peut être suffisante sans être… "

Personne ne l'avait effacée. Les élèves ont composé dessous
pendant une heure.

Par la fenêtre, j'ai vu l'élève du fond regarder ailleurs,
comme toujours. La première de classe a rendu sa copie
avant tout le monde. Un redoublant a posé sa montre un peu
trop près de la copie du voisin — je la lui ai confisquée.

Le dernier mot du tableau, celui que la craie n'a jamais
écrit : c'est le tien. »`
	},
	{
		id: 'w3-m14',
		wave: 3,
		wordSlot: 14,
		discordUsername: 'natsume.senpai',
		camp: 'communaute',
		status: 'validated',
		metaHint: 'Le quatorzième fragment est sécurisé. Sa forme exacte reste confidentielle jusqu’à la fin.',
		enigma: `L'INFIRMIÈRE

« L'infirmerie donne sur la cour. Pendant leur contrôle,
je préparais les affiches de la campagne de vaccination
contre la grippe H1N1 — encore des piqûres que personne
ne viendra chercher.

Au-dessus de ma porte, la maxime latine que le proviseur
a fait graver : " salus populi suprema lex esto " — le
salut du peuple est la loi suprême. Il en tirait toujours
le même mot : celui qui ne s'incline devant rien, celui
au-dessus duquel il n'y a plus rien.

J'ai vu la première de classe sortir en avance, encore.

Ce mot : c'est le tien. »`
	},
	{
		id: 'w3-m15',
		wave: 3,
		wordSlot: 15,
		discordUsername: 'mega061800',
		camp: 'communaute',
		status: 'validated',
		metaHint: 'Le quinzième fragment est sécurisé. Sa forme exacte reste confidentielle jusqu’à la fin.',
		enigma: `L'ÉLÈVE DU FOND

« Moi, du fond, on voit tout. Le contrôle de maths, je
l'ai à peine regardé. Mais la courbe que le prof avait
laissée au tableau, elle, je la connais : celle qui monte
de plus en plus vite, qui double, puis redouble. Il
répétait son nom à chaque cours — la croissance qui
finit toujours par tout dépasser.

Le soir, en rentrant, j'ai vérifié sur Wikipédia. J'avais
bon. Pour une fois.

Le surveillant m'a regardé par la fenêtre. Je regardais
ailleurs. Comme toujours.

Le nom de cette croissance : c'est le tien. »`
	}
];

export const FRAGMENT_MODE_INTRO_BASE = [
	'Les énigmes sont publiques. Tout le monde peut chercher.',
	'Seul le Fragmenté envoie son mot à @so_hakai — 1 essai, 72 h.',
	'2 autres Fragmentés du même camp doivent confirmer avant l\'envoi.',
	'Raté ou trop tard : le mot est perdu (récupération possible via TikTok).'
] as const;

export const FRAGMENT_MODE_EDIT_NOTE =
	'Édit du Creux actif — Le Sursis : 1 second essai par vague et par camp. Détails sur Règles.';

/** Introduction narrative affichée en tête de la vague sur /fragmentes. */
export const WAVE_INTROS: Record<number, string> = {
	2: `◈ VAGUE II — LES SIGNES ANCIENS

La première vague est close. Cinq mots sont tombés, cinq
autres se lèvent.

Mais quelque chose a changé.

Les Fragmentés de cette vague ont reçu leurs mots. Ils ne
peuvent pas les lire. Aucun d'eux ne le pourra sans vous.

1530470595790110820

L'un d'eux ouvre la vague II. Les autres ne servent à rien —
et vous les avez tous vus.

Les Fragmentés attendent. Ils ne peuvent pas commencer
sans vous, et l'heure court pour eux : 02/08, 13h00.`,
	3: `◈ VAGUE III — SALLE 12

Le 16 juin 1998, à 10h07, quelque part en France, une heure
de contrôle commence dans la salle 12 d'un lycée.

Cinq personnes ont vu cette heure.
Aucune ne l'a vue en entier.

Leurs témoignages ont été recueillis. Chacun a été confié
à un Fragmenté — un témoin par gardien.

Chaque témoignage porte un mot. Le témoin sait ce qu'il a vu.

C'est tout ce qu'on peut dire des témoins : ils savent
ce qu'ils ont vu.

Les Fragmentés de la vague III sont désignés. L'heure court :
15/08 à 13h00.`,
	4: `◈ VAGUE IV — LE CADRAN CREUX

La dernière vague. Plus d'énigmes individuelles.

Un seul mot. Un seul essai par camp.
Le Sursis ne s'applique pas.

La première soumission d'un camp est définitive.
Aucun résultat avant l'échéance.

La récompense : tous les mots manquants.

Deadline : 19/08 à 21h00.`
};

export const ANNOUNCEMENTS: Announcement[] = [
	{
		id: 'prolongation-soumission',
		date: '2026-08-27T16:00:00+02:00',
		tag: 'URGENT',
		content:
			'Soumission prolongée jusqu’au 28/08 à 21h10. Connectez-vous avec Discord sur le site pour tester votre phrase.',
		href: '/soumettre',
		linkLabel: 'Soumettre une phrase'
	},
	{
		id: 'reouverture-soumission',
		date: '2026-08-24T22:00:00+02:00',
		tag: 'URGENT',
		content:
			'Soumission rouverte 48 h — du 25/08 à 13h au 27/08 à 13h. Connectez-vous avec Discord sur le site pour tester votre phrase.',
		href: '/soumettre',
		linkLabel: 'Soumettre une phrase'
	},
	{
		id: 'cadran-creux-resolu',
		date: '2026-08-19T21:00:00+02:00',
		tag: 'URGENT',
		content:
			'Le Cadran Creux est résolu — la Vague 4 est close. Deux camps, deux essais : aucun n\'a dépassé la troisième couche. Soumettez vos phrases sur le site jusqu\'au 21/08 à 21h.',
		href: '/creux#cadran-revelation',
		linkLabel: 'Lire la révélation'
	},
	{
		id: 'ouverture-vague-4',
		date: '2026-08-16T13:00:00+02:00',
		tag: 'URGENT',
		content:
			'Vague 4 — Le Cadran Creux. Plus d’énigmes individuelles. Un mot, un essai par camp. Tous les Fragmentés (toutes vagues) peuvent soumettre. Le Sursis ne s’applique pas. Récompense : tous les mots manquants. Deadline 19/08 à 21h.',
		href: '/fragmentes',
		linkLabel: 'Ouvrir le Cadran'
	},
	{
		id: 'cloture-vague-3',
		date: '2026-08-15T13:00:00+02:00',
		tag: 'URGENT',
		content:
			'Vague 3 — Salle 12 close (15/08, 13h). Quatre mots sécurisés (n°11, 12, 14, 15). Mot n°13 perdu (@l_inspecteur, Communauté). 9 fragments tenus, 6 encore perdus. La Vague 4 ouvre le 16/08 à 13h.'
	},
	{
		id: 'ouverture-vague-3',
		date: '2026-08-09T20:00:00+02:00',
		tag: 'URGENT',
		content:
			'Vague 3 — Salle 12. Cinq nouveaux Fragmentés (mots n°11 à 15). Témoignages publics, un mot chacun. Deadline 15/08 à 13h. Calendrier prolongé : fin d\'événement le 20/08.',
		href: '/fragmentes',
		linkLabel: 'Voir les quêtes'
	},
	{
		id: 'calendrier-prolonge',
		date: '2026-08-09T19:30:00+02:00',
		tag: 'RÈGLE',
		content:
			'Calendrier mis à jour. Vague 3 : 09/08 20h → 15/08 13h. Vague 4 : 15/08 → 20/08 13h. Fin de l\'événement : 20 août 2026 · 13h.'
	},
	{
		id: 'creux-imminent',
		date: '2026-08-03T14:00:00+02:00',
		tag: 'URGENT',
		content:
			'Phase Creux — entre Vague 2 et Vague 3. Une nouvelle transmission est imminente. Restez en veille.',
		href: '/creux',
		linkLabel: 'Ouvrir le Creux'
	},
	{
		id: 'cloture-vague-2',
		date: '2026-08-02T13:00:00+02:00',
		tag: 'URGENT',
		content:
			'Vague 2 — échéance atteinte (02/08, 13h). Mot n°10 sécurisé (@bangodsno, Communauté). Mots n°6 et n°8 perdus (Staff — Sursis consommé). Mots n°7 (délai) et n°9 (essai refusé) perdus (Communauté).'
	},
	{
		id: 'transmission-troisieme-signal',
		date: '2026-08-01T17:16:00+02:00',
		tag: 'INDICE',
		content: 'Un troisième signal a été intercepté.',
		href: '/indices#transmission-troisieme-signal',
		linkLabel: 'Consulter l’indice'
	},
	{
		id: 'transmission-second-signal',
		date: '2026-07-31T15:13:00+02:00',
		tag: 'INDICE',
		content: 'Un second signal a été intercepté.',
		href: '/indices#transmission-second-signal',
		linkLabel: 'Consulter l’indice'
	},
	{
		id: 'ouverture-vague-2',
		date: '2026-07-30T13:00:00+02:00',
		tag: 'URGENT',
		content:
			'Vague 2 — Les Signes Anciens. Cinq nouveaux Fragmentés désignés (mots n°6 à 10). Les porteurs ne peuvent pas lire leurs mots sans l\'enquête collective — deadline 02/08 à 13h.',
		href: '/fragmentes',
		linkLabel: 'Voir les quêtes'
	},
	{
		id: 'edit-du-creux-sursis',
		date: '2026-07-28T16:30:00+02:00',
		tag: 'URGENT',
		content:
			'ÉNIGME DU CREUX — RÉSOLUE par la Communauté. Édit activé : II — Le Sursis. Un Fragmenté par vague et par camp obtient un second essai. Restez en alerte : de nouveaux signaux peuvent frapper sans annonce.',
		href: '/regles#edit-du-creux',
		linkLabel: 'Lire l’édit'
	},
	{
		id: 'enigme-du-creux',
		date: '2026-07-28T14:00:00+02:00',
		tag: 'INDICE',
		content:
			'Une transmission non identifiée a été captée. L’énigme du creux est en ligne — le premier camp à la résoudre choisira une règle pour toute la suite de l’événement.',
		href: '/creux',
		linkLabel: 'Ouvrir l’énigme du creux'
	},
	{
		id: 'cloture-vague-1',
		date: '2026-07-28T13:00:00+02:00',
		tag: 'URGENT',
		content:
			'Vague 1 — échéance atteinte (28/07, 13h). Quatre fragments sécurisés. Le mot n°3 (Staff, @asterion_45) est perdu : essai refusé. Récupération possible via palier TikTok.'
	},
	{
		id: 'signal-secondaire-1',
		date: '2026-07-27T20:00:00+02:00',
		tag: 'INDICE',
		content: 'Un nouvel indice a été publié dans le vault.',
		href: '/indices#signal-secondaire-1',
		linkLabel: 'Consulter l’indice'
	},
	{
		id: 'ouverture-vague-1',
		date: '2026-07-25T13:00:00+02:00',
		tag: 'URGENT',
		content:
			'L’énigme est ouverte. Les 5 premiers porteurs de la Vague 1 sont désignés, leurs énigmes sont publiques — 72 heures par mot, un seul essai. Tout le monde peut chercher. Bonne chasse.'
	}
];

export const TIKTOK_TRACKER = {
	currentViews: 45,
	goal: 500_000,
	/** Mise à jour manuelle staff — affichée sur /objectif-tiktok. */
	updatedAtLabel: 'Compteur mis à jour manuellement par le staff',
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
export const PUBLIC_INDICES: PublicIndex[] = [
	{
		id: 'vague-4-cadran-creux',
		date: '2026-08-16T13:00:00+02:00',
		source: 'annonce',
		title: '◈ VAGUE IV — LE CADRAN CREUX',
		content:
			'La dernière vague. Plus d\'énigmes individuelles.\n\nUn mot. Un essai par camp. Le Sursis ne s\'applique pas.\nTous les Fragmentés, toutes vagues confondues, peuvent soumettre.\nLa première soumission d\'un camp est définitive.\nAucun résultat ne sera annoncé avant l\'échéance.\n\nRécompense : tous les mots manquants de la phrase.\nDeadline : mercredi 19 août, 21h00.',
		url: '/fragmentes'
	},
	{
		id: 'vague-3-salle-12',
		date: '2026-08-09T20:00:00+02:00',
		source: 'annonce',
		title: '◈ VAGUE III — SALLE 12',
		content:
			'Le 16 juin 1998, à 10h07, quelque part en France, une heure de contrôle commence dans la salle 12 d\'un lycée.\n\nCinq personnes ont vu cette heure. Aucune ne l\'a vue en entier.\n\nLeurs témoignages ont été recueillis. Chacun a été confié à un Fragmenté — un témoin par gardien.\n\nChaque témoignage porte un mot. Le témoin sait ce qu\'il a vu.\n\nDeadline : 15/08 à 13h00.',
		url: '/fragmentes'
	},
	{
		id: 'transmission-troisieme-signal',
		date: '2026-08-01T17:16:00+02:00',
		source: 'annonce',
		title: '◈ TRANSMISSION — TROISIÈME SIGNAL',
		content:
			'#  A · B · C · D · H\n\nCinq lettres. Cinq d\'entre vous.\nAucune n\'appartient à deux.'
	},
	{
		id: 'transmission-second-signal',
		date: '2026-07-31T15:13:00+02:00',
		source: 'annonce',
		title: '◈ TRANSMISSION — SECOND SIGNAL',
		content:
			'L\'échéance est proche.\nVoici le premier témoin.\nLe premier signal ne mentait pas. Il se taisait simplement.\nVoici ce qu\'il gardait :\n\nLe journal dit ce qu\'il est avant de dire ce qu\'il contient.\n\nLe reste ne s\'obtient pas seul.'
	},
	{
		id: 'vague-2-signes-anciens',
		date: '2026-07-30T13:00:00+02:00',
		source: 'annonce',
		title: '◈ VAGUE II — LES SIGNES ANCIENS',
		content:
			'La première vague est close. Cinq mots sont tombés, cinq autres se lèvent.\n\nLes Fragmentés de cette vague ont reçu leurs mots. Ils ne peuvent pas les lire. Aucun d\'eux ne le pourra sans vous.\n\n1530470595790110820\n\nL\'un d\'eux ouvre la vague II. Les autres ne servent à rien — et vous les avez tous vus.\n\nLes Fragmentés attendent. Deadline : 02/08 à 13h00.',
		url: '/fragmentes'
	},
	{
		id: 'enigme-du-creux',
		date: '2026-07-28T14:00:00+02:00',
		source: 'annonce',
		title: 'TRANSMISSION NON IDENTIFIÉE — Énigme du creux',
		content:
			'Un signal a été capté sur la fréquence de l’événement. Il ne provient d’aucun de nos canaux. Écoutez la transmission, décodez ce qu’elle cache — le premier camp à répondre choisira une règle jusqu’à la fin.',
		url: '/creux'
	},
	{
		id: 'tiktok-signal-1',
		date: '2026-07-26T00:00:00+02:00',
		source: 'tiktok',
		title: 'Transmission TikTok — Signal intercepté',
		content:
			'Une séquence a été diffusée sur le compte officiel. Elle ne dit pas tout — mais elle dit assez.',
		url: 'https://vm.tiktok.com/ZN8JxQc4e/'
	},
	{
		id: 'signal-secondaire-1',
		date: '2026-07-27T20:00:00+02:00',
		source: 'annonce',
		title: 'SIGNAL SECONDAIRE — intercepté',
		content:
			'Les cinq premiers mots de la phrase commencent, dans le désordre, par les lettres :\n\nC · I · M · N · N\n\nL’ordre n’est pas donné. Il ne le sera pas.'
	}
];

/** Seconde phase Creux (entre Vague 3 et Vague 4) — Le Cadran Creux, résolu. */
export const CREUX_PENDING = {
	active: false,
	betweenLabel: 'Entre Vague 3 et Vague 4',
	title: 'Le Cadran Creux',
	body:
		'La Vague 3 est close. Une nouvelle transmission a été captée — Le Cadran Creux. Elle est désormais résolue ; la révélation est publiée.',
	href: '/creux#cadran-revelation'
} as const;

/** Le Cadran Creux — énigme entre Vague 3 et Vague 4, révélée le 19/08. */
export const CADRAN_CREUX: CadranCreux = {
	id: 'cadran-creux',
	title: 'LE CADRAN CREUX',
	resolved: true,
	resolvedLabel: '19 août 2026',
	answer: 'MENTOR',
	closingLines: [
		'Deux camps. Deux essais. Aucun n\'a dépassé la troisième couche.',
		'Les mots manquants restent manquants.',
		'Le journal vous donnera le vrai dénouement'
	],
	verses: [
		'Ce marbre gris',
		'À l\'heure où plus rien ne se prononce',
		'Douce nuit, rien ne bouge donc',
		'Rien ne tient, et tout doit mourir',
		'Autre rive, autre cendre, même promesse',
		'Nulle main ne te tient'
	],
	epigraph: 'Rien n\'est à sa place, et tout est à sa mesure.',
	sections: [
		{
			id: 'facade',
			title: 'I. LA FAÇADE',
			paragraphs: [
				'Vous l\'avez vue en premier. Les initiales de chaque vers : C · A · D · R · A · N',
				'CADRAN. Le titre le disait déjà. Vous avez cru à une confirmation. C\'était une porte peinte sur un mur.'
			]
		},
		{
			id: 'secret',
			title: 'II. CE QUI ÉTAIT DISSIMULÉ',
			paragraphs: [
				'Certains ont douté de la façade et ont regardé de l\'autre côté. Les dernières lettres : griS · prononcE · donC · mouriR · promessE · tienT — S · E · C · R · E · T',
				'SECRET. Un deuxième mot, plus profond, trouvé par la méfiance. Vous avez été récompensés d\'avoir douté. C\'est exactement pour ça que vous avez cessé de douter.'
			]
		},
		{
			id: 'montre',
			title: 'III. CE QUI SEMBLAIT PARFAIT',
			paragraphs: [
				'Il fallait compter. Dans chaque vers, le nombre de mots donne le rang d\'une lettre.',
				'Un cadran. Une montre. Deux couches indépendantes qui se confirment l\'une l\'autre. Aucune raison d\'aller plus loin — c\'est le propre d\'un piège réussi : il ressemble à une fin.'
			],
			code: `Ce marbre gris                            3 mots  →  M
À l'heure où plus rien ne se prononce     8 mots  →  O
Douce nuit, rien ne bouge donc            6 mots  →  N
Rien ne tient, et tout doit mourir        7 mots  →  T
Autre rive, autre cendre, même promesse   6 mots  →  R
Nulle main ne te tient                    5 mots  →  E`,
			emphasis: 'MONTRE.'
		},
		{
			id: 'reponse',
			title: 'IV. LA RÉPONSE',
			paragraphs: [
				'« Rien n\'est à sa place, et tout est à sa mesure. »',
				'Les six lettres étaient bonnes. L\'ordre était faux. La mesure d\'un vers, ce n\'est pas ses mots — c\'est ses lettres.',
				'Le mot contient MENT.',
				'Vous avez cherché une horloge. On vous en a montré une, deux fois, pour que vous arrêtiez de chercher. Le Cadran n\'a jamais mesuré le temps — il mesurait votre confiance.',
				'Et la réponse n\'était pas une chose. C\'était quelqu\'un.'
			],
			code: `Ce marbre gris                            12 lettres  →  1er   M
Nulle main ne te tient                    18 lettres  →  2e    E
Douce nuit, rien ne bouge donc            24 lettres  →  3e    N
Rien ne tient, et tout doit mourir        27 lettres  →  4e    T
À l'heure où plus rien ne se prononce     29 lettres  →  5e    O
Autre rive, autre cendre, même promesse   32 lettres  →  6e    R`,
			emphasis: 'MENTOR'
		}
	],
	submitOpenDate: new Date('2026-08-25T13:00:00+02:00'),
	submitOpenDateLabel: '25 août 2026 · 13h',
	submitDeadline: new Date('2026-08-28T21:10:00+02:00'),
	submitDeadlineLabel: '28 août 2026 · 21h10',
	rewardTeaser: 'Demain une récompense vous attend !'
};

export const CREUX_CHALLENGE: CreuxChallenge = {
	id: 'enigme-du-creux',
	deadline: '2026-07-30T13:00:00+02:00',
	deadlineLabel: '30 juillet 2026 · 13h (ouverture Vague 2)',
	audioUrl: '/transmission.wav',
	audioHint: 'Entendu ?.. Nien',
	cipher: 'DIOPZRQVZ NP QCK SGAYZTRG'
};

export const CREUX_RULE_OPTIONS: CreuxRuleOption[] = [
	{
		id: 'transparence',
		title: 'I — La Transparence',
		description:
			'Tout mot validé est révélé publiquement, aux deux camps. Vous verrez la phrase se construire. Eux aussi.'
	},
	{
		id: 'sursis',
		title: 'II — Le Sursis',
		description:
			'Un Fragmenté par vague et par camp obtient un second essai. Une erreur cesse d’être définitive. Les Sursis ne sont pas cumulables.'
	},
	{
		id: 'tribut',
		title: 'III — Le Tribut',
		description:
			'Un indice public supplémentaire à chaque vague. Mais chaque camp perd un jour sur son délai.'
	}
];

export type CreuxCampWinner = 'communaute' | 'staff';

export interface CreuxResolution {
	resolved: boolean;
	winnerCamp: CreuxCampWinner;
	chosenRuleId: string;
	resolvedAt: string;
	resolvedLabel: string;
}

/** Résultat de l'énigme du creux — règle active jusqu'à la fin de l'événement. */
export const CREUX_RESOLUTION: CreuxResolution = {
	resolved: true,
	winnerCamp: 'communaute',
	chosenRuleId: 'sursis',
	resolvedAt: '2026-07-28T16:30:00+02:00',
	resolvedLabel: '28 juillet 2026 · après-midi'
};

export const CREUX_CAMP_LABEL: Record<CreuxCampWinner, string> = {
	communaute: 'Communauté Leveling',
	staff: 'Staff Leveling'
};

export const ACTIVE_CREUX_RULE: CreuxRuleOption =
	CREUX_RULE_OPTIONS.find((r) => r.id === CREUX_RESOLUTION.chosenRuleId) ?? CREUX_RULE_OPTIONS[1];

/** Détail opérationnel de l'édit « Le Sursis » (règle II du creux). */
export const SURCIS_RULE_DETAILS = [
	'Chaque vague : un Fragmenté par camp (Communauté et Staff) peut obtenir un second essai de validation.',
	'Le Sursis s’invoque après un premier essai refusé ou raté, avant la fin du délai de 72 h du mot concerné.',
	'Une fois utilisé par un camp sur une vague, le Sursis est épuisé pour ce camp — l’autre camp conserve le sien.',
	'Les Sursis ne sont pas cumulables : pas de report sur une vague suivante, pas de second Sursis pour un autre Fragmenté du même camp sur la même vague.',
	'Les 2 confirmations Fragmentés restent obligatoires à chaque essai, y compris au Sursis.',
	'Un remplacement de porteur n’accorde pas de Sursis supplémentaire.',
	'Le Sursis ne s’applique pas au Cadran Creux (Vague 4) : un seul essai par camp, définitif.'
] as const;

export type SursisWaveStatus = 'expired' | 'available' | 'consumed' | 'unavailable';

export interface SursisCampSlot {
	status: SursisWaveStatus;
	usedBy?: string;
}

export interface SursisWaveEntry {
	communaute: SursisCampSlot;
	staff: SursisCampSlot;
	note?: string;
}

export const SURCIS_WAVE_STATUS: Record<number, SursisWaveEntry> = {
	1: {
		communaute: { status: 'expired' },
		staff: { status: 'expired' },
		note: 'Vague 1 close — aucun camp n’a invoqué le Sursis avant l’échéance.'
	},
	2: {
		communaute: { status: 'expired' },
		staff: { status: 'consumed' },
		note:
			'Vague 2 close — Staff a invoqué le Sursis, puis perdu les mots n°6 et n°8. Communauté : n°10 sécurisé, n°7 et n°9 perdus (Sursis non utilisé).'
	},
	3: {
		communaute: { status: 'expired' },
		staff: { status: 'expired' },
		note: 'Vague 3 close — 4 mots sécurisés, mot n°13 perdu (Communauté). Aucun camp n’a invoqué le Sursis.'
	},
	4: {
		communaute: { status: 'unavailable' },
		staff: { status: 'unavailable' },
		note: 'Le Sursis ne s’applique pas au Cadran Creux. Un seul essai par camp, définitif.'
	}
};

/** Alerte veille — indices non annoncés peuvent tomber à tout moment. */
export const EVENT_VIGILANCE = {
	eyebrow: 'Protocole de veille',
	title: 'Restez en alerte',
	body:
		'Des transmissions peuvent apparaître sur le site, dans le journal ou ailleurs — sans préavis et sans annonce Discord.',
	ps: 'Soyez rapides : ils ne seront pas annoncés.'
} as const;

export function isSursisAvailableForWave(wave: number): boolean {
	const entry = SURCIS_WAVE_STATUS[wave];
	if (!entry) return false;
	return entry.communaute.status === 'available' || entry.staff.status === 'available';
}

export function isSursisAvailableForCamp(wave: number, camp: CreuxCampWinner): boolean {
	return SURCIS_WAVE_STATUS[wave]?.[camp]?.status === 'available';
}

export function getSursisWaveNote(wave: number): string | null {
	return SURCIS_WAVE_STATUS[wave]?.note ?? null;
}

export const CONCEPT_INTRO = [
	'Une phrase de 15 mots est cachée. Personne ne peut la deviner seul.',
	'À chaque vague, 5 Fragmentés portent un mot. Leur énigme est publique sur le site.',
	'Tout le monde cherche. Seul le Fragmenté envoie son mot à Hakai — 1 essai, 72 h, confirmé par 2 autres Fragmentés du camp.',
	'Deux camps s\'affrontent : Communauté et Staff. Hakai (@so_hakai) est neutre.'
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
	'Seul le Fragmenté nommé valide son mot en MP à @so_hakai (organisateur) — un essai par défaut, définitif.',
	'Édit du Creux — Le Sursis (Communauté) : une fois par vague et par camp, un Fragmenté peut demander un second essai après un premier refus. Les Sursis ne sont pas cumulables.',
	'Avant l’envoi : exactement 2 confirmations d’autres Fragmentés du même camp (salon #fragmentes-membres ou #fragmentes-staff). Les Enquêteurs et les membres sans rôle Fragmenté ne peuvent pas confirmer — leurs messages ne comptent pas.',
	'Les 2 confirmateurs écrivent aussi en MP à @so_hakai. Sans ces 2 confirmations Fragmentés, l’essai n’est pas traité.',
	'72 h par mot. Raté ou expiré : perdu jusqu’au prochain palier TikTok, révélé aux deux camps — sauf si le Sursis du camp est encore disponible sur la vague.',
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
		description:
			'Clôturée le 28/07 à 13h — 4 fragments sécurisés, 1 mot perdu (n°3, Staff).'
	},
	{
		id: 'wave-2',
		name: 'Vague 2 — L’Accélération',
		share: '5 fragments',
		description:
			'Clôturée le 02/08 à 13h — 1 fragment sécurisé (n°10), 4 mots perdus (n°6–9). Staff a consommé son Sursis.'
	},
	{
		id: 'wave-3',
		name: 'Vague 3 — Salle 12',
		share: '5 fragments',
		description:
			'Clôturée le 15/08 à 13h — 4 fragments sécurisés, 1 mot perdu (n°13, Communauté).'
	},
	{
		id: 'wave-4',
		name: 'Vague 4 — Le Cadran Creux',
		share: 'Énigme unique',
		description:
			'Clôturée le 19/08 — Le Cadran Creux résolu. Soumission prolongée jusqu’au 28/08 à 21h10.'
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
			'Un essai, confirmé par exactement 2 Fragmentés du camp (pas les Enquêteurs)',
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
