import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  FileDown,
  Play,
  ShoppingBag,
} from 'lucide-react';
import { OneSheetWonderDiagram } from '../BrandMark';
import { PostContentRenderer } from '../PostContentRenderer';
import { getAdjacentPosts, getPostBySlug, normalizeSlug } from '../../data/posts';
import { ONE_SHEET_WONDER_CARDS, SITE_IMAGES, type RouteSlug } from '../../data/siteArchitecture';

interface SinglePostPageProps {
  slug?: string;
  onNavigate: (route: RouteSlug) => void;
}

const StickyConversionSidebar: React.FC<{ onGo: (route: RouteSlug) => void }> = ({ onGo }) => {
  const [pdfRequested, setPdfRequested] = useState(false);
  const [pdfEmail, setPdfEmail] = useState('');

  return (
    <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
      {/* Lead Magnet Card */}
      <div className="bg-gradient-to-br from-[#E5D4D3]/45 to-[#FAF1D1]/45 border border-[#E5D4D3] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#007580]">
          <FileDown className="w-4 h-4" />
          <span>Plan imprimable gratuit</span>
        </div>
        <h2 className="text-lg font-semibold text-[#1A2B2E]">
          Télécharger le plan de coupe avec mesures
        </h2>
        <p className="text-xs text-[#526669] leading-relaxed">
          Gardez le gabarit 12" × 12" numéroté dans votre atelier pour le réutiliser avec n’importe quel papier design.
        </p>

        {pdfRequested ? (
          <div className="bg-white border border-[#007580]/30 rounded-lg p-3 flex items-start gap-2 text-xs text-[#1A2B2E]">
            <Check className="w-4 h-4 text-[#007580] shrink-0 mt-0.5" />
            <span>Gabarit PDF envoyé à {pdfEmail} !</span>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (pdfEmail.includes('@')) setPdfRequested(true);
            }}
            className="space-y-2"
          >
            <input
              type="email"
              required
              value={pdfEmail}
              onChange={(e) => setPdfEmail(e.target.value)}
              placeholder="votre@courriel.com"
              className="w-full px-3 py-2 text-sm bg-white border border-[#DADADA] rounded-lg focus:outline-none focus:border-[#007580]"
            />
            <button
              type="submit"
              className="w-full py-2.5 text-sm font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors cursor-pointer"
            >
              Recevoir le PDF gratuit
            </button>
          </form>
        )}
      </div>

      {/* Direct Shop CTA */}
      <div className="bg-white border border-[#DADADA] rounded-2xl p-6 space-y-3">
        <p className="text-xs font-medium uppercase tracking-wider text-[#526669]">
          Matériel utilisé
        </p>
        <h3 className="text-base font-semibold text-[#1A2B2E]">
          Boutique officielle Stampin’ Up!
        </h3>
        <p className="text-xs text-[#526669] leading-relaxed">
          Commandez vos papiers, encres et outils coordonnés via ma boutique Stampin’ Up! Canada (Démo ID 2126905).
        </p>
        <a
          href="https://www.stampinup.ca/fr/?demoid=2126905"
          target="_blank"
          rel="noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-[#007580] border border-[#007580] hover:bg-[#007580] hover:text-white rounded-lg transition-colors"
        >
          Ouvrir la boutique en ligne
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Club de cartes Cross-sell */}
      <div className="bg-[#007580] text-white rounded-2xl p-6 space-y-3">
        <p className="text-xs uppercase tracking-wider text-[#FAF1D1]">
          Envie de créer chaque mois ?
        </p>
        <h3 className="text-lg font-semibold">Rejoignez le Club de cartes</h3>
        <p className="text-xs text-white/85 leading-relaxed">
          Un atelier Zoom mensuel convivial avec kit postal ou accès virtuel à toute l’Académie créative.
        </p>
        <button
          type="button"
          onClick={() => onGo('/club-creatif-stampin-up/')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#FAF1D1] hover:underline cursor-pointer"
        >
          Découvrir les formules <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};

const OneSheetWonderShowcase: React.FC<{ onGo: (route: RouteSlug) => void }> = ({ onGo }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(1);
  const [planTab, setPlanTab] = useState<'interactive' | 'original'>('interactive');

  const videoChapters = [
    {
      num: 'Vidéo 1',
      title: 'Découpe de la feuille 12" × 12" et création des cartes #1 et #4',
      cards: ['#1', '#4'],
      url: 'https://youtube.com/live/YcseDYpE2Ww',
      note: 'Introduction du plan miroir et premières découpes de base.',
    },
    {
      num: 'Vidéo 2',
      title: 'Création des cartes #2 et #6',
      cards: ['#2', '#6'],
      url: 'https://youtube.com/live/M7YA3-zbQDo',
      note: 'Agencement des papiers Murmure des bois et souhaits coordonnés.',
    },
    {
      num: 'Vidéo 3',
      title: 'Création des cartes #3 et #7',
      cards: ['#3', '#7'],
      url: 'https://youtube.com/live/HPhW6LcjZXA',
      note: 'Superpositions simples et utilisation des retailles.',
    },
    {
      num: 'Vidéo 4',
      title: 'Suite de la session : la carte #5',
      cards: ['#5'],
      url: 'https://youtube.com/live/bxfd3ZGSFRA',
      note: 'Finition rapide et astuce d’alignement des rubans.',
    },
    {
      num: 'Vidéo 5',
      title: 'Section du milieu : cartes #15, #16 et #17',
      cards: ['#15', '#16', '#17'],
      url: 'https://youtube.com/live/AvWBPEQz4CY',
      note: 'Valorisation des bandes centrales pour un ensemble cadeau complet.',
    },
  ];

  return (
    <div className="bg-white text-[#1A2B2E]">
      {/* Breadcrumb & Article Header */}
      <section className="border-b border-[#DADADA] bg-[#F8FAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-4">
          <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-xs text-[#526669]">
            <button type="button" onClick={() => onGo('/')} className="hover:text-[#007580] cursor-pointer">
              Accueil
            </button>
            <span aria-hidden="true">/</span>
            <button type="button" onClick={() => onGo('/blog/')} className="hover:text-[#007580] cursor-pointer">
              Blog
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#1A2B2E] font-medium">One Sheet wonder - Murmure des bois</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#526669]">
              <span className="font-medium text-[#007580]">Cours · Noël · Saisons · Techniques · Vidéos</span>
              <span aria-hidden="true">·</span>
              <span>14 novembre 2026</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">URL conservée : /one-sheet-wonder-murmure-des-bois/</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1A2B2E]">
              One Sheet wonder - Murmure des bois
            </h1>

            <p className="text-base text-[#526669] leading-relaxed">
              Par Andrée Catudal, Artiste et démonstratrice indépendante Stampin’ Up!
            </p>
          </div>
        </div>
      </section>

      {/* Main 2-Column Editorial + Sticky Conversion Rail */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Reading Column (68ch prose) */}
          <article className="lg:col-span-8 space-y-8">
            <figure className="rounded-2xl overflow-hidden border border-[#DADADA] bg-[#F8FAFA]">
              <img
                src={SITE_IMAGES.murmureDesBois}
                alt="Assortiment de cartes faites main avec le papier design Murmure des bois"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover"
              />
              <figcaption className="px-5 py-3 text-xs text-[#526669] border-t border-[#DADADA]">
                Exemple des cartes assorties réalisées à partir d’une seule feuille 12" × 12" Murmure des bois.
              </figcaption>
            </figure>

            <div className="space-y-4 text-base leading-[1.7] text-[#1A2B2E] max-w-[68ch]">
              <p>Bonjour et bienvenue sur mon blog!</p>
              <p>
                Ça fait une éternité que je ne suis pas venue déposer un nouveau projet ici. J’ai eu l’envie de redonner vie à mon blogue! Je viendrai vous partager des créations plus régulièrement.
              </p>
              <p>
                J’ai fait un <em>One Sheet Wonder</em> avec une feuille 12 × 12 du papier design <strong>Murmure des bois</strong>. Voici le plan que j’ai utilisé pour couper mon papier design. C’est un plan partagé par Stampin’ Up! auquel j’ai ajouté les mesures exactes et numéroté chaque carte. Comme c’est un plan miroir, j’ai réalisé les cartes de 1 à 7 et celles du milieu 15, 16 et 17 — vous pouvez reproduire les mêmes modèles pour les cartes 8 à 14.
              </p>
            </div>

            {/* Cutting Plan: Interactive Diagram + Original Annotated Sheet */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-[#007580]">
                  Plan de coupe 12" × 12"
                </span>
                <div className="inline-flex p-0.5 bg-[#F8FAFA] border border-[#DADADA] rounded-lg">
                  <button
                    type="button"
                    onClick={() => setPlanTab('interactive')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      planTab === 'interactive'
                        ? 'bg-[#007580] text-white'
                        : 'text-[#526669] hover:text-[#1A2B2E]'
                    }`}
                  >
                    Plan interactif
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlanTab('original')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      planTab === 'original'
                        ? 'bg-[#007580] text-white'
                        : 'text-[#526669] hover:text-[#1A2B2E]'
                    }`}
                  >
                    Plan original annoté
                  </button>
                </div>
              </div>

              {planTab === 'interactive' ? (
                <OneSheetWonderDiagram
                  selectedCard={selectedCard}
                  onSelectCard={(num) => setSelectedCard(num)}
                />
              ) : (
                <figure className="bg-white border border-[#DADADA] rounded-xl p-5 space-y-3">
                  <img
                    src={SITE_IMAGES.oneSheetWonderPlan}
                    alt="Plan de coupe original One Sheet Wonder 12 x 12 annoté avec mesures par Andrée Catudal"
                    referrerPolicy="no-referrer"
                    className="w-full max-w-lg mx-auto rounded-lg"
                  />
                  <figcaption className="text-xs text-center text-[#526669]">
                    Gabarit original 12" × 12" avec mesures exactes et numérotation miroir (#1 à #17).
                  </figcaption>
                </figure>
              )}
            </div>

            {/* Structured Video Chapters + Card Photos */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-[#1A2B2E]">
                  Les 5 démonstrations vidéo et les cartes réalisées
                </h2>
                <p className="text-sm text-[#526669]">
                  Toutes les cartes ont été créées en direct sur Facebook et YouTube. Retrouvez chaque vidéo accompagnée des photos des cartes correspondantes.
                </p>
              </div>

              <div className="space-y-6">
                {videoChapters.map((chap) => {
                  const chapterPhotos = ONE_SHEET_WONDER_CARDS.filter(
                    (c) => c.videoNum === chap.num
                  );
                  return (
                    <div
                      key={chap.num}
                      className="bg-[#F8FAFA] border border-[#DADADA] rounded-2xl p-5 sm:p-6 space-y-5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#526669]">
                            <span className="font-semibold text-[#007580]">{chap.num}</span>
                            <span aria-hidden="true">·</span>
                            <span>Cartes {chap.cards.join(', ')}</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-[#1A2B2E]">
                            {chap.title}
                          </h3>
                          <p className="text-xs text-[#526669]">{chap.note}</p>
                        </div>

                        <a
                          href={chap.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#1A2B2E] bg-white border border-[#DADADA] hover:border-[#007580] hover:text-[#007580] rounded-lg transition-colors whitespace-nowrap shrink-0"
                        >
                          <Play className="w-3.5 h-3.5 text-[#007580]" />
                          Regarder sur YouTube
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      {chapterPhotos.length > 0 && (
                        <div
                          className={`grid grid-cols-1 ${
                            chapterPhotos.length === 1
                              ? 'sm:grid-cols-1 max-w-md'
                              : chapterPhotos.length === 3
                              ? 'sm:grid-cols-3'
                              : 'sm:grid-cols-2'
                          } gap-4 pt-2 border-t border-[#DADADA]`}
                        >
                          {chapterPhotos.map((card) => (
                            <figure
                              key={card.id}
                              onClick={() => setSelectedCard(card.pieceNumber)}
                              className={`bg-white border rounded-xl overflow-hidden transition-colors cursor-pointer ${
                                selectedCard === card.pieceNumber
                                  ? 'border-[#007580]'
                                  : 'border-[#DADADA] hover:border-[#007580]'
                              }`}
                            >
                              <div className="aspect-square overflow-hidden bg-white">
                                <img
                                  src={card.image}
                                  alt={card.alt}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <figcaption className="px-3.5 py-2.5 text-xs font-medium text-[#1A2B2E] border-t border-[#DADADA] flex items-center justify-between">
                                <span>{card.label}</span>
                                <span className="font-mono text-[#007580]">
                                  Pièce #{card.pieceNumber}
                                </span>
                              </figcaption>
                            </figure>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Closing Note & Primary Shop CTA */}
            <div className="bg-[#F8FAFA] border border-[#DADADA] rounded-2xl p-6 sm:p-8 space-y-4">
              <p className="text-base text-[#1A2B2E] leading-relaxed">
                Voilà le résultat de ce One Sheet Wonder que vous pouvez reproduire avec le papier design et le thème de votre choix. Comme le soulignait une membre de mon équipe, ça fait de superbes ensembles de cartes assorties à offrir en cadeau!
              </p>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#DADADA]">
                <div>
                  <p className="text-sm font-semibold text-[#1A2B2E]">Andrée Catudal</p>
                  <p className="text-xs text-[#526669]">
                    Artiste et démonstratrice indépendante Stampin’ Up!
                  </p>
                </div>
                <a
                  href="https://www.stampinup.ca/fr/?demoid=2126905"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Magasiner les fournitures
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onGo('/blog/')}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#007580] hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour à tous les articles du blog
              </button>
            </div>
          </article>

          <StickyConversionSidebar onGo={onGo} />
        </div>
      </div>
    </div>
  );
};

export const SinglePostPage: React.FC<SinglePostPageProps> = ({
  slug = 'one-sheet-wonder-murmure-des-bois',
  onNavigate,
}) => {
  const [oswSelectedCard, setOswSelectedCard] = useState<number | null>(1);

  const go = (route: RouteSlug) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanSlug = normalizeSlug(slug);
  const post = getPostBySlug(cleanSlug);

  if (!post && cleanSlug === 'one-sheet-wonder-murmure-des-bois') {
    return <OneSheetWonderShowcase onGo={go} />;
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center space-y-5">
        <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
          Publication introuvable
        </p>
        <h1 className="text-3xl font-semibold text-[#1A2B2E]">
          Cet article est introuvable
        </h1>
        <p className="text-sm text-[#526669]">
          L’adresse demandée ne correspond à aucune publication. Explorez tous nos projets et tutoriels sur le blog.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => go('/blog/')}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </button>
          <button
            type="button"
            onClick={() => go('/')}
            className="px-4 py-2.5 text-sm font-medium text-[#1A2B2E] border border-[#DADADA] hover:border-[#007580] rounded-lg transition-colors cursor-pointer"
          >
            Accueil
          </button>
        </div>
      </div>
    );
  }

  const { previous, next } = getAdjacentPosts(post.slug);
  const categoryLabel =
    post.categories.length > 0
      ? post.categories.join(' · ')
      : post.everestForm
      ? 'Formulaire'
      : 'Blog';

  return (
    <div className="bg-white text-[#1A2B2E]">
      {/* Breadcrumb & Article Header */}
      <section className="border-b border-[#E5D4D3] bg-gradient-to-b from-[#E5D4D3]/30 to-[#F8FAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-4">
          <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-xs text-[#526669]">
            <button type="button" onClick={() => go('/')} className="hover:text-[#007580] cursor-pointer">
              Accueil
            </button>
            <span aria-hidden="true">/</span>
            <button type="button" onClick={() => go('/blog/')} className="hover:text-[#007580] cursor-pointer">
              Blog
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#1A2B2E] font-medium">{post.title}</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#526669]">
              <span className="font-medium text-[#007580]">{categoryLabel}</span>
              {post.fullDate && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{post.fullDate}</span>
                </>
              )}
              {post.readTime && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1A2B2E]">
              {post.title}
            </h1>

            <p className="text-base text-[#526669] leading-relaxed">
              Par Andrée Catudal, Artiste et démonstratrice indépendante Stampin’ Up!
            </p>
          </div>
        </div>
      </section>

      {/* Main 2-Column Editorial + Sticky Conversion Rail */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Reading Column */}
          <article className="lg:col-span-8 space-y-8">
            {post.coverImage && !/!\[|<img/i.test(post.content) && (
              <figure className="rounded-2xl overflow-hidden border border-[#DADADA] bg-[#F8FAFA]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[520px] object-cover"
                />
              </figure>
            )}

            <PostContentRenderer post={post} />

            {post.slug === 'one-sheet-wonder-murmure-des-bois' && (
              <div className="space-y-3 pt-2">
                <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
                  Plan de coupe interactif 12" × 12"
                </p>
                <OneSheetWonderDiagram
                  selectedCard={oswSelectedCard}
                  onSelectCard={setOswSelectedCard}
                />
              </div>
            )}

            {/* Closing Note & Primary Shop CTA */}
            <div className="bg-[#E5D4D3]/25 border border-[#E5D4D3] rounded-2xl p-6 sm:p-8 space-y-4">
              <p className="text-base text-[#1A2B2E] leading-relaxed">
                Envie de recréer ou de commander vos produits favoris ? Retrouvez tous les papiers, encres et outils coordonnés dans ma boutique officielle Stampin’ Up! Canada.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#DADADA]">
                <div>
                  <p className="text-sm font-semibold text-[#1A2B2E]">Andrée Catudal</p>
                  <p className="text-xs text-[#526669]">
                    Artiste et démonstratrice indépendante Stampin’ Up!
                  </p>
                </div>
                <a
                  href="https://www.stampinup.ca/fr/?demoid=2126905"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Magasiner les fournitures
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Previous / Next Post Navigation */}
            {(previous || next) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {previous ? (
                  <button
                    type="button"
                    onClick={() => go(previous.route)}
                    className="text-left p-4 rounded-xl border border-[#DADADA] bg-white hover:border-[#007580] transition-colors cursor-pointer space-y-1"
                  >
                    <span className="inline-flex items-center gap-1 text-xs text-[#526669]">
                      <ArrowLeft className="w-3.5 h-3.5" /> Article précédent
                    </span>
                    <p className="text-sm font-semibold text-[#1A2B2E] line-clamp-1">
                      {previous.title}
                    </p>
                  </button>
                ) : (
                  <div />
                )}

                {next && (
                  <button
                    type="button"
                    onClick={() => go(next.route)}
                    className="text-right p-4 rounded-xl border border-[#DADADA] bg-white hover:border-[#007580] transition-colors cursor-pointer space-y-1"
                  >
                    <span className="inline-flex items-center justify-end gap-1 text-xs text-[#526669]">
                      Article suivant <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <p className="text-sm font-semibold text-[#1A2B2E] line-clamp-1">
                      {next.title}
                    </p>
                  </button>
                )}
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={() => go('/blog/')}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#007580] hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour à tous les articles du blog
              </button>
            </div>
          </article>

          <StickyConversionSidebar onGo={go} />
        </div>
      </div>
    </div>
  );
};
