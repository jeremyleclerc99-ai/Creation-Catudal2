export type StaticRouteSlug =
  | '/'
  | '/blog/'
  | '/one-sheet-wonder-murmure-des-bois/'
  | '/la-boutique/'
  | '/boutique/'
  | '/boutique/#tutoriels'
  | '/club-creatif-stampin-up/'
  | '/catalogues-stampinup/'
  | '/tutoriels/'
  | '/scrapbookeusespassionnees/'
  | '/a-propos/'
  | '/contact/';

export type RouteSlug = StaticRouteSlug | `/${string}/` | `/${string}/#${string}`;

export interface SitemapPageEntry {
  url: string;
  title: string;
  astroFile: string;
  strategy: 'Conserver' | 'Redirection 301' | 'Canonique + 301';
  targetUrl?: string;
  priority: 'Élevée' | 'Moyen';
  conversionRole: string;
  prototypeRoute?: RouteSlug;
}

export const PRESERVED_PAGES: SitemapPageEntry[] = [
  {
    url: '/',
    title: 'Accueil',
    astroFile: 'src/pages/index.astro',
    strategy: 'Conserver',
    priority: 'Élevée',
    conversionRole: 'Orientation claire vers les 3 piliers : Boutique, Club de cartes, Équipe + Lead Magnet Infolettre.',
    prototypeRoute: '/',
  },
  {
    url: '/blog/',
    title: 'Blog & Projets créatifs',
    astroFile: 'src/pages/blog/index.astro',
    strategy: 'Conserver',
    priority: 'Moyen',
    conversionRole: 'Découverte organique (202+ articles), filtres instantanés par technique/saison et capture courriel.',
    prototypeRoute: '/blog/',
  },
  {
    url: '/la-boutique/',
    title: 'Boutique Stampin’ Up!',
    astroFile: 'src/pages/la-boutique/index.astro',
    strategy: 'Conserver',
    priority: 'Moyen',
    conversionRole: 'Hub transactionnel : achat en ligne (demoid=2126905), accès Académie créative et liens catalogues.',
    prototypeRoute: '/la-boutique/',
  },
  {
    url: '/club-creatif-stampin-up/',
    title: 'Club de cartes / Académie créative',
    astroFile: 'src/pages/club-creatif-stampin-up/index.astro',
    strategy: 'Conserver',
    priority: 'Moyen',
    conversionRole: 'Page de vente dédiée à l’abonnement mensuel (avec kit ou virtuel) et rencontres Zoom.',
    prototypeRoute: '/club-creatif-stampin-up/',
  },
  {
    url: '/catalogues-stampinup/',
    title: 'Catalogues Stampin’ Up!',
    astroFile: 'src/pages/catalogues-stampinup/index.astro',
    strategy: 'Conserver',
    priority: 'Moyen',
    conversionRole: 'Consultation des catalogues saisonniers + demande d’envoi postal (capture de coordonnées).',
    prototypeRoute: '/catalogues-stampinup/',
  },
  {
    url: '/tutoriels/',
    title: 'Tutoriels PDF gratuits (redirection)',
    astroFile: 'vercel.json / _redirects',
    strategy: 'Redirection 301',
    targetUrl: '/boutique/#tutoriels',
    priority: 'Moyen',
    conversionRole: 'Redirection SEO automatique des anciens liens /tutoriels/ vers la section dédiée /boutique/#tutoriels.',
    prototypeRoute: '/boutique/#tutoriels',
  },
  {
    url: '/scrapbookeusespassionnees/',
    title: 'Joindre Les Scrapbookeuses passionnées!',
    astroFile: 'src/pages/scrapbookeusespassionnees/index.astro',
    strategy: 'Conserver',
    priority: 'Moyen',
    conversionRole: 'Recrutement : valeur de la trousse de démarrage (135 $ pour 170 $), communauté et rabais membre.',
    prototypeRoute: '/scrapbookeusespassionnees/',
  },
  {
    url: '/a-propos/',
    title: 'À propos de moi',
    astroFile: 'src/pages/a-propos/index.astro',
    strategy: 'Conserver',
    priority: 'Moyen',
    conversionRole: 'Crédibilité et lien humain : parcours depuis octobre 2013 et philosophie anti-stress.',
    prototypeRoute: '/a-propos/',
  },
  {
    url: '/a-propos-de-moi/',
    title: 'À propos (doublon WordPress)',
    astroFile: 'vercel.json / _redirects',
    strategy: 'Redirection 301',
    targetUrl: '/a-propos/',
    priority: 'Moyen',
    conversionRole: 'Consolidation du jus SEO vers une seule URL canonique /a-propos/ sans perte de liens entrants.',
    prototypeRoute: '/a-propos/',
  },
  {
    url: '/home/',
    title: 'Home (doublon WordPress)',
    astroFile: 'vercel.json / _redirects',
    strategy: 'Redirection 301',
    targetUrl: '/',
    priority: 'Moyen',
    conversionRole: 'Élimination du contenu dupliqué sur la racine.',
    prototypeRoute: '/',
  },
  {
    url: '/contact/',
    title: 'Me contacter',
    astroFile: 'src/pages/contact/index.astro',
    strategy: 'Conserver',
    priority: 'Moyen',
    conversionRole: 'Formulaire qualifié par intention (commande, club, équipe) + coordonnées directes.',
    prototypeRoute: '/contact/',
  },
  {
    url: '/appointment/',
    title: 'Ancienne page Rendez-vous (2021)',
    astroFile: 'vercel.json / _redirects',
    strategy: 'Redirection 301',
    targetUrl: '/contact/',
    priority: 'Moyen',
    conversionRole: 'Préservation des backlinks existants vers le nouveau formulaire de contact.',
    prototypeRoute: '/contact/',
  },
  {
    url: '/service/',
    title: 'Ancienne page Services (2021)',
    astroFile: 'vercel.json / _redirects',
    strategy: 'Redirection 301',
    targetUrl: '/la-boutique/',
    priority: 'Moyen',
    conversionRole: 'Redirection propre des visiteurs vers les offres actives.',
    prototypeRoute: '/la-boutique/',
  },
];

export interface BrandToken {
  name: string;
  role: string;
  hex: string;
  usageRatio: string;
  stripeMapping: string;
}

export const BRAND_TOKENS: BrandToken[] = [
  {
    name: 'Blanc Pur & Albâtre',
    role: 'Surface dominante (Canvas)',
    hex: '#FFFFFF',
    usageRatio: '60%',
    stripeMapping: 'Remplace le fond lourd vert sauge #8EA095 de WordPress pour restaurer l’aération et le contraste Stripe.',
  },
  {
    name: 'Sarcelle Profond',
    role: 'Accent d’action primaire (CTAs)',
    hex: '#007580',
    usageRatio: '8%',
    stripeMapping: 'Remplace le violet Stripe (#635BFF) sur tous les boutons principaux, liens actifs et sections phares sombres.',
  },
  {
    name: 'Turquoise Océan',
    role: 'État survol & emphase interactive',
    hex: '#0095A9',
    usageRatio: '2%',
    stripeMapping: 'États :hover des boutons, indicateurs d’onglets actifs et accents de courbes vectorielles.',
  },
  {
    name: 'Rose Poudré',
    role: 'Signature émotionnelle & halo doux',
    hex: '#E3B9B3',
    usageRatio: '6%',
    stripeMapping: 'Remplace les dégradés magenta/corail Stripe dans les halos organiques, étoiles à 4 branches et encadrés doux.',
  },
  {
    name: 'Sable Doux',
    role: 'Surfaces de mise en valeur (Lead Magnet)',
    hex: '#FAF1D1',
    usageRatio: '8%',
    stripeMapping: 'Fond subtil des boîtes de téléchargement (plans de coupe PDF) et cartes d’offre de trousse.',
  },
  {
    name: 'Bleu Côtier & Sauge Douce',
    role: 'Surfaces secondaires & dégradés calmes',
    hex: '#7CA7AD',
    usageRatio: '10%',
    stripeMapping: 'Utilisé en transparence (10–20%) pour les bento-cartes et séparations visuelles, jamais en plein écran.',
  },
  {
    name: 'Sauge Marque & Gris Perle',
    role: 'Bordures fines & métadonnées',
    hex: '#DADADA',
    usageRatio: '6%',
    stripeMapping: 'Bordures 1px subtiles des cartes Bento (inspirées de Stripe) remplaçant les ombres portées lourdes.',
  },
];

export function withBase(assetPath: string): string {
  if (!assetPath) return assetPath;
  if (/^https?:\/\//i.test(assetPath)) return assetPath;
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = assetPath.replace(/^\/+/, '');
  return `${normalizedBase}${cleanPath}`;
}

export const SITE_IMAGES = {
  andreePortrait: withBase('/assets/aistudio/20230522_150609-copie_31f714cf.jpg'),
  andreeAbout: withBase('/assets/aistudio/cef07d91-57de-4eae-b3aa-5f15a0cc3371_f7842d27.jpg'),
  andreeContact: withBase('/assets/aistudio/ef2f6226-af09-4b00-aec0-632b23c5e946-e1791819404700_292b4f0a.jpg'),
  studioShelf: withBase('/assets/aistudio/boutique1_6c4ae985.png'),
  academieClubPoster: withBase('/assets/aistudio/Academie-creative_d0b2eb57.png'),
  academieClubBanner: withBase('/assets/aistudio/Academie-creative-Club-copy_4d3869b5.png'),
  academieCard: withBase('/assets/aistudio/Carte-Academie-creative_fcc8b4c7.png'),
  clubOctober2026: withBase('/assets/aistudio/10-2026_96caad62.png'),
  clubNovember2026: withBase('/assets/aistudio/11-2026_304fd1a6.png'),
  cardClubKit: withBase('/assets/aistudio/20220903_141141-scaled_443c4516.jpg'),
  murmureDesBois: withBase('/assets/aistudio/111633271_3ba5c5a3.jpg'),
  oneSheetWonderPlan: withBase('/assets/aistudio/One-Sheet-Wonder_1482883c.png'),
  communityRetreat: withBase('/assets/aistudio/314630510_628682679050928_2875493947343438474_n-scaled-e1791809253953_a838d41e.jpg'),
  montebelloRetreat2026: withBase('/assets/aistudio/825279544_2323069485180091_1092562817591503218_n_fab23ce4.jpg'),
  catalogueAnnuel: withBase('/assets/aistudio/320015765_642601134214906_7584673778299756548_n_f8035c09.jpg'),
  catalogueSepDec2026: withBase('/assets/aistudio/20260504_125040-e1791825585726_efe855d8.jpg'),
  catalogueAnnuel2023: withBase('/assets/aistudio/olo_ftr_catalog_ac23_qc_0423_eb425395.webp'),
  catalogueHoliday2023: withBase('/assets/aistudio/2023_SD_COVER_24b11b0e.jpg'),
  coursToGoMoments: withBase('/assets/aistudio/Cours-to-go-10-2022_d3358154.jpg'),
  coursToGoJul2022: withBase('/assets/aistudio/Cours-to-go-07-2022_bfeca2b0.jpg'),
  coursToGoFeb2022: withBase('/assets/aistudio/Cours-to-go-02-2022_90c971cf.jpg'),
  coursToGoAug2021: withBase('/assets/aistudio/Cours-to-go-aout-2021_33a0501a.jpg'),
} as const;

export interface OneSheetCardPhoto {
  id: string;
  pieceNumber: number;
  label: string;
  videoNum: string;
  image: string;
  alt: string;
}

export const ONE_SHEET_WONDER_CARDS: OneSheetCardPhoto[] = [
  {
    id: 'card-1',
    pieceNumber: 1,
    label: 'La carte #1',
    videoNum: 'Vidéo 1',
    image: withBase('/assets/aistudio/5508005_a60de7e8.jpg'),
    alt: 'Carte #1 du One Sheet Wonder Murmure des bois – La Féerie des Fêtes',
  },
  {
    id: 'card-4',
    pieceNumber: 4,
    label: 'La carte #4',
    videoNum: 'Vidéo 1',
    image: withBase('/assets/aistudio/221189503_d45ce6c8.jpg'),
    alt: 'Carte #4 du One Sheet Wonder Murmure des bois',
  },
  {
    id: 'card-2',
    pieceNumber: 2,
    label: 'La carte #2',
    videoNum: 'Vidéo 2',
    image: withBase('/assets/aistudio/137948487_76ed3a40.jpg'),
    alt: 'Carte #2 du One Sheet Wonder Murmure des bois',
  },
  {
    id: 'card-6',
    pieceNumber: 6,
    label: 'La carte #6',
    videoNum: 'Vidéo 2',
    image: withBase('/assets/aistudio/130777061_191d066d.jpg'),
    alt: 'Carte #6 du One Sheet Wonder Murmure des bois',
  },
  {
    id: 'card-7a',
    pieceNumber: 7,
    label: 'La carte #7',
    videoNum: 'Vidéo 3',
    image: withBase('/assets/aistudio/73352619_a33dd5ae.jpg'),
    alt: 'Carte #7 du One Sheet Wonder Murmure des bois (version 1)',
  },
  {
    id: 'card-7b',
    pieceNumber: 7,
    label: 'Carte #7 (variante)',
    videoNum: 'Vidéo 3',
    image: withBase('/assets/aistudio/34344122_630df9f0.jpg'),
    alt: 'Carte #7 du One Sheet Wonder Murmure des bois (variante)',
  },
  {
    id: 'card-5',
    pieceNumber: 5,
    label: 'La carte #5',
    videoNum: 'Vidéo 4',
    image: withBase('/assets/aistudio/51073548_584dd4c6.jpg'),
    alt: 'Carte #5 du One Sheet Wonder Murmure des bois',
  },
  {
    id: 'card-15',
    pieceNumber: 15,
    label: 'La carte #15',
    videoNum: 'Vidéo 5',
    image: withBase('/assets/aistudio/108253736_ab92c473.jpg'),
    alt: 'Carte #15 du One Sheet Wonder Murmure des bois',
  },
  {
    id: 'card-16',
    pieceNumber: 16,
    label: 'La carte #16',
    videoNum: 'Vidéo 5',
    image: withBase('/assets/aistudio/23191453_6828077c.jpg'),
    alt: 'Carte #16 du One Sheet Wonder Murmure des bois',
  },
  {
    id: 'card-17',
    pieceNumber: 17,
    label: 'La carte #17',
    videoNum: 'Vidéo 5',
    image: withBase('/assets/aistudio/123999926_b460ef88.jpg'),
    alt: 'Carte #17 du One Sheet Wonder Murmure des bois',
  },
];

export interface WireframeSectionSpec {
  page: string;
  route: string;
  diagnosis: string;
  sections: {
    order: string;
    name: string;
    dnaPattern: string;
    conversionPurpose: string;
    isNew?: boolean;
  }[];
}

export const WIREFRAME_BLUEPRINTS: WireframeSectionSpec[] = [
  {
    page: 'Accueil',
    route: '/',
    diagnosis:
      'L’accueil actuel démarre sans accroche ni bouton d’action visible au-dessus de la ligne de flottaison : les 4 offres ont le même poids visuel (simples liens texte bleus) et l’infolettre est reléguée tout en bas.',
    sections: [
      {
        order: '01',
        name: 'Hero asymétrique + Promesse de transformation',
        dnaPattern: 'Split 60/40 Stripe (titre serré + 2 CTAs + visuel créatif superposé)',
        conversionPurpose:
          'Poser en 3 secondes la proposition de valeur anti-stress (« La créativité simple, guidée et apaisante ») et orienter vers le Club de cartes ou la Boutique.',
        isNew: true,
      },
      {
        order: '02',
        name: 'Bandeau de crédibilité immédiate',
        dnaPattern: 'Logo/Trust strip monochrome sous le Hero',
        conversionPurpose:
          'Rassurer immédiatement : démonstratrice depuis octobre 2013, 202+ projets publiés, communauté francophone active.',
        isNew: true,
      },
      {
        order: '03',
        name: 'Grille Bento « Choisissez votre façon de créer »',
        dnaPattern: 'Grille asymétrique Stripe (2+3+1 cartes avec aperçus visuels)',
        conversionPurpose:
          'Segmenter les visiteuses selon leur intention : 1) Magasiner, 2) Apprendre (Club), 3) Tutoriels gratuits, 4) Économiser en équipe.',
      },
      {
        order: '04',
        name: 'Aimant à prospects : Plan de coupe gratuit (Lead Magnet)',
        dnaPattern: 'Carte horizontale pleine largeur avec formulaire en ligne',
        conversionPurpose:
          'Transformer les visiteuses hésitantes en abonnées infolettre grâce à un bénéfice concret (PDF One Sheet Wonder 12 × 12 offert).',
        isNew: true,
      },
      {
        order: '05',
        name: 'Vitrine sombre Sarcelle : Club de cartes & Académie',
        dnaPattern: 'Bannière Stripe Sessions adaptée au Sarcelle #007580 + vagues #E3B9B3',
        conversionPurpose:
          'Créer un point focal haute conversion pour le revenu récurrent mensuel (Zoom le 3e/avant-dernier mercredi à 19h).',
      },
      {
        order: '06',
        name: 'Preuves chiffrées & Questions fréquentes (Accordéon)',
        dnaPattern: '4 métriques tabulaires + section Hertz/accordéon de Stripe',
        conversionPurpose:
          'Lever les objections courantes (« Je débute », « Pas le temps en direct ») juste avant le pied de page.',
        isNew: true,
      },
    ],
  },
  {
    page: 'Archive du Blog',
    route: '/blog/',
    diagnosis:
      'Le fond vert sauge plein écran réduit la lisibilité et certaines anciennes vignettes affichent des cases vides. Aucun filtre par catégorie ni barre de recherche ne guide la lectrice parmi les 202 articles.',
    sections: [
      {
        order: '01',
        name: 'En-tête éditorial + Barre de filtres & recherche instantanée',
        dnaPattern: 'Filtres segmentés Astro/Client-side sur fond blanc pur',
        conversionPurpose:
          'Permettre de trouver un projet par occasion (Noël, Anniversaire), niveau (Carte simple) ou format (Vidéos, Blog Hop).',
        isNew: true,
      },
      {
        order: '02',
        name: 'Article vedette pleine largeur (Dernier projet)',
        dnaPattern: 'Carte 2 colonnes mise en avant avec aperçu du plan de coupe',
        conversionPurpose:
          'Donner une porte d’entrée immédiate vers le tutoriel le plus complet (One Sheet Wonder – Murmure des bois).',
        isNew: true,
      },
      {
        order: '03',
        name: 'Grille 3 colonnes avec métadonnées épurées',
        dnaPattern: 'Cartes bordure hairline #DADADA, sans badges pilules superflus',
        conversionPurpose:
          'Lisibilité maximale : image nette (avec repli élégant si image manquante), catégorie · date, titre et extrait court.',
      },
      {
        order: '04',
        name: 'Bannière Infolettre intégrée à mi-parcours',
        dnaPattern: 'Module Sable Doux #FAF1D1 interrompant la grille après 6 articles',
        conversionPurpose:
          'Capter les lectrices engagées pendant leur navigation sans popup intrusif.',
        isNew: true,
      },
    ],
  },
  {
    page: 'Article de Blog',
    route: '/[post-slug]/',
    diagnosis:
      'Les articles actuels affichent une colonne blanche étroite flottant sur un grand vide sauge, des liens YouTube bruts non intégrés et un seul lien texte « BOUTIQUE EN LIGNE » tout en bas.',
    sections: [
      {
        order: '01',
        name: 'Fil d’Ariane SEO + En-tête d’article lisible',
        dnaPattern: 'Colonne prose 68ch centrée dans une grille 2 colonnes',
        conversionPurpose:
          'Conserver l’URL racine exacte (/one-sheet-wonder-murmure-des-bois/) et structurer les données Schema.org BlogPosting.',
      },
      {
        order: '02',
        name: 'Plan de coupe interactif & Résumé du projet',
        dnaPattern: 'Diagramme vectoriel cliquable + fiche mesures',
        conversionPurpose:
          'Apporter une valeur immédiate aux visiteuses pressées et augmenter le temps passé sur la page.',
        isNew: true,
      },
      {
        order: '03',
        name: 'Chapitres vidéo & Galerie de cartes structurée',
        dnaPattern: 'Blocs vidéo intégrés (facade légère YouTube) + grille 2 colonnes des cartes',
        conversionPurpose:
          'Remplacer les URL brutes par des lecteurs rapides (Core Web Vitals) et montrer chaque carte créée.',
      },
      {
        order: '04',
        name: 'Colonne latérale de conversion collante (Desktop)',
        dnaPattern: 'Rail latéral fixe avec 3 actions graduées',
        conversionPurpose:
          'Garder à portée de clic : 1) Commander les fournitures Stampin’ Up!, 2) Télécharger le plan PDF, 3) Découvrir le Club de cartes.',
        isNew: true,
      },
    ],
  },
  {
    page: 'Boutique & Club de cartes',
    route: '/la-boutique/ · /club-creatif-stampin-up/',
    diagnosis:
      'La page Boutique mélange trois objectifs différents avec de simples liens texte (« ICI pour avoir plus d’information »), sans hiérarchie claire ni comparatif entre l’option Kit et l’option Virtuelle.',
    sections: [
      {
        order: '01',
        name: 'Aiguillage en 3 cartes claires',
        dnaPattern: 'Grille tarifaire/offres inspirée de Stripe',
        conversionPurpose:
          'Séparer nettement : Achat ponctuel Stampin’ Up! / Club de cartes mensuel / Tutoriels gratuits.',
      },
      {
        order: '02',
        name: 'Comparatif transparent du Club de cartes (Avec Kit vs Virtuel)',
        dnaPattern: 'Tableau à 2 colonnes avec liste d’inclusions et horaire Zoom',
        conversionPurpose:
          'Aider la cliente à choisir en 10 secondes sans devoir envoyer un courriel pour comprendre la formule.',
        isNew: true,
      },
    ],
  },
  {
    page: 'Joindre l’équipe & Contact',
    route: '/scrapbookeusespassionnees/ · /contact/',
    diagnosis:
      'La page d’équipe contient de très bons arguments (135 $ pour 170 $ de produits, fin de semaine à Montebello) noyés dans du texte continu, et la page Contact ne propose aucun formulaire interactif.',
    sections: [
      {
        order: '01',
        name: 'Preuve communautaire (Photo Montebello) + Offre Trousse 135 $ → 170 $',
        dnaPattern: 'Mise en avant chiffrée + double parcours (Clientèle privilège 20% vs Démonstratrice)',
        conversionPurpose:
          'Démystifier l’adhésion : aucune obligation de vendre, liberté totale et accueil chaleureux avec carte faite main.',
        isNew: true,
      },
      {
        order: '02',
        name: 'Formulaire de contact qualifié par intention',
        dnaPattern: 'Formulaire minimaliste validé avec sélection du sujet',
        conversionPurpose:
          'Éliminer la friction du simple lien mailto: et accélérer les demandes d’adhésion ou d’inscription au Club.',
        isNew: true,
      },
    ],
  },
];
