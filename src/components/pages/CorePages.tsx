import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  ExternalLink,
  FileDown,
  Mail,
  Phone,
  ShoppingBag,
  Sparkles,
  Users,
} from 'lucide-react';
import rawTutorialsData from '../../data/tutorials.json';
import { SITE_IMAGES, type RouteSlug } from '../../data/siteArchitecture';

export interface TutorialRecord {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  pagesCount: string;
  isPaid: boolean;
  price: string;
  fileUrl: string;
  checkoutUrl: string;
}

const TUTORIALS: TutorialRecord[] = rawTutorialsData as TutorialRecord[];

interface CorePagesProps {
  route: RouteSlug;
  onNavigate: (route: RouteSlug) => void;
}

export const CorePages: React.FC<CorePagesProps> = ({ route, onNavigate }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('Club de cartes / Académie créative');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);
  const [contactError, setContactError] = useState('');
  const [tutorialFilter, setTutorialFilter] = useState<'all' | 'free' | 'paid'>('all');

  const baseRoute = (route.split('#')[0] || '/') as RouteSlug;
  const isTutorielsSection = route.includes('#tutoriels');

  const go = (target: RouteSlug) => {
    onNavigate(target);
    if (!target.includes('#')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sub-navigation inside Boutique ecosystem (/la-boutique/, /boutique/#tutoriels, /club-creatif-stampin-up/, /catalogues-stampinup/)
  const BoutiqueSubNav = () => (
    <div className="border-b border-[#E5D4D3] bg-[#E5D4D3]/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-2">
        {[
          {
            label: 'Boutique Stampin’ Up!',
            slug: '/la-boutique/' as RouteSlug,
            active: (baseRoute === '/la-boutique/' || baseRoute === '/boutique/') && !isTutorielsSection,
          },
          {
            label: 'Tutoriels PDF',
            slug: '/boutique/#tutoriels' as RouteSlug,
            active: isTutorielsSection,
          },
          {
            label: 'Club de cartes / Académie',
            slug: '/club-creatif-stampin-up/' as RouteSlug,
            active: baseRoute === '/club-creatif-stampin-up/',
          },
          {
            label: 'Catalogues',
            slug: '/catalogues-stampinup/' as RouteSlug,
            active: baseRoute === '/catalogues-stampinup/',
          },
        ].map((tab) => (
          <button
            key={tab.slug}
            type="button"
            onClick={() => go(tab.slug)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              tab.active
                ? 'bg-[#007580] text-white'
                : 'bg-[#F8FAFA] text-[#526669] border border-[#DADADA] hover:text-[#1A2B2E]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );

  const isBoutiqueView =
    baseRoute === '/la-boutique/' ||
    baseRoute === '/boutique/' ||
    baseRoute === '/tutoriels/';

  if (
    isBoutiqueView ||
    baseRoute === '/club-creatif-stampin-up/' ||
    baseRoute === '/catalogues-stampinup/'
  ) {
    return (
      <div className="bg-white text-[#1A2B2E]">
        <BoutiqueSubNav />

        {isBoutiqueView && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-4">
                <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
                  URL conservée : /la-boutique/
                </p>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  Commander vos produits Stampin’ Up! avec un accompagnement personnalisé.
                </h1>
                <p className="text-base text-[#526669] leading-relaxed">
                  Laissez-vous inspirer par des papiers design, étampes, encres et accessoires parfaitement coordonnés. Besoin d’aide pour choisir vos essentiels ? Je vous guide avec plaisir.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="https://www.stampinup.ca/fr/?demoid=2126905"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Accéder à la boutique officielle
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => go('/catalogues-stampinup/')}
                    className="px-5 py-3 text-sm font-medium text-[#1A2B2E] border border-[#DADADA] hover:border-[#007580] rounded-lg transition-colors cursor-pointer"
                  >
                    Voir les catalogues en vigueur
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-[#DADADA] bg-[#F8FAFA]">
                  <img
                    src={SITE_IMAGES.studioShelf}
                    alt="Atelier de carterie avec encres, cartons et machine de découpe Stampin' Up!"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-[#E5D4D3]/25 border border-[#E5D4D3] rounded-2xl p-5 space-y-3">
                  <h2 className="text-sm font-semibold text-[#1A2B2E]">
                    3 façons de créer avec moi
                  </h2>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => go('/club-creatif-stampin-up/')}
                    className="w-full text-left bg-white border border-[#DADADA] hover:border-[#007580] rounded-xl p-4 transition-colors cursor-pointer"
                  >
                    <p className="text-sm font-semibold text-[#007580]">Club de cartes mensuel</p>
                    <p className="text-xs text-[#526669] mt-0.5">
                      Zoom l’avant-dernier mercredi à 19h · Option kit ou virtuel
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => go('/boutique/#tutoriels')}
                    className="w-full text-left bg-white border border-[#DADADA] hover:border-[#007580] rounded-xl p-4 transition-colors cursor-pointer"
                  >
                    <p className="text-sm font-semibold text-[#1A2B2E]">Tutoriels PDF gratuits</p>
                    <p className="text-xs text-[#526669] mt-0.5">
                      Fiches techniques téléchargeables étape par étape avec mesures
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => go('/scrapbookeusespassionnees/')}
                    className="w-full text-left bg-gradient-to-r from-[#E5D4D3]/45 to-[#FAF1D1]/50 border border-[#E5D4D3] hover:border-[#007580] rounded-xl p-4 transition-colors cursor-pointer"
                  >
                    <p className="text-sm font-semibold text-[#1A2B2E]">
                      Économiser 20 % avec l’équipe
                    </p>
                    <p className="text-xs text-[#526669] mt-0.5">
                      Trousse de démarrage à 135 $ (170 $ de produits au choix)
                    </p>
                  </button>
                </div>
                </div>
              </div>
            </div>

            {/* Académie créative / Club de cartes section matching original Boutique page */}
            <div className="bg-gradient-to-br from-[#E5D4D3]/35 via-[#F8FAFA] to-white border border-[#E5D4D3] rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <div className="max-w-sm mx-auto rounded-xl overflow-hidden border border-[#DADADA] bg-white">
                  <img
                    src={SITE_IMAGES.academieClubPoster}
                    alt="Académie Créative - Club de cartes l'avant-dernier mercredi de chaque mois à 19h en Zoom"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
                  Apprendre avec moi
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A2B2E]">
                  L’Académie créative et le Club de cartes
                </h2>
                <p className="text-sm sm:text-base text-[#526669] leading-relaxed">
                  J’ai créé l’<strong>Académie créative</strong>, une bibliothèque de contenu pour vous inspirer, apprendre de nouvelles techniques et prendre plaisir à créer ! Depuis juin 2021, mon <strong>Club de cartes</strong> mensuel vous propose une nouvelle classe chaque mois, avec ou sans matériel.
                </p>
                <p className="text-sm font-medium text-[#1A2B2E]">
                  Fini les pannes d’inspiration ! Vous aurez toujours de nouvelles idées à explorer à votre rythme.
                </p>
                <div className="pt-1 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => go('/club-creatif-stampin-up/')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors cursor-pointer"
                  >
                    Découvrir le Club de cartes
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go('/boutique/#tutoriels')}
                    className="px-4 py-2.5 text-sm font-medium text-[#1A2B2E] bg-white border border-[#DADADA] hover:border-[#007580] rounded-lg transition-colors cursor-pointer"
                  >
                    Voir les tutoriels PDF gratuits
                  </button>
                </div>
              </div>
            </div>

            {/* Section dédiée : Tutoriels PDF à télécharger (/boutique/#tutoriels) */}
            {(() => {
              const filteredTutorials = TUTORIALS.filter((tut) => {
                if (tutorialFilter === 'free') return !tut.isPaid;
                if (tutorialFilter === 'paid') return tut.isPaid;
                return true;
              });

              return (
                <section
                  id="tutoriels"
                  className="pt-10 border-t border-[#DADADA] space-y-6 scroll-mt-24"
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="max-w-2xl space-y-2">
                      <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
                        Fiches techniques PDF · Étape par étape
                      </p>
                      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A2B2E]">
                        Tutoriels PDF à télécharger
                      </h2>
                      <p className="text-sm sm:text-base text-[#526669] leading-relaxed">
                        Retrouvez mes fiches techniques imprimables avec schémas de coupe, mesures précises et consignes d’assemblage — tutoriels gratuits et collections exclusives.
                      </p>
                    </div>
                    <p className="text-xs text-[#526669] tabular-nums shrink-0">
                      {filteredTutorials.length}{' '}
                      {filteredTutorials.length > 1 ? 'fiches disponibles' : 'fiche disponible'}
                    </p>
                  </div>

                  {/* Filter Tabs: Tous / Gratuits / Payants */}
                  <div
                    className="flex flex-wrap items-center gap-2"
                    role="tablist"
                    aria-label="Filtrer les tutoriels PDF"
                  >
                    {[
                      { key: 'all' as const, label: 'Tous' },
                      { key: 'free' as const, label: 'Gratuits' },
                      { key: 'paid' as const, label: 'Payants' },
                    ].map((tab) => {
                      const active = tutorialFilter === tab.key;
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setTutorialFilter(tab.key)}
                          className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                            active
                              ? 'bg-[#007580] text-white'
                              : 'bg-white text-[#526669] border border-[#DADADA] hover:text-[#1A2B2E] hover:border-[#007580]'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {filteredTutorials.length === 0 ? (
                    <div className="bg-[#F8FAFA] border border-[#DADADA] rounded-2xl p-8 text-center space-y-3">
                      <p className="text-base font-medium text-[#1A2B2E]">
                        Nos prochains tutoriels PDF exclusifs seront ajoutés ici très bientôt.
                      </p>
                      <p className="text-sm text-[#526669] max-w-lg mx-auto">
                        En attendant, profitez de nos {TUTORIALS.filter((t) => !t.isPaid).length} fiches gratuites ou découvrez les projets mensuels du Club de cartes.
                      </p>
                      <div className="flex flex-wrap justify-center gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => setTutorialFilter('free')}
                          className="px-4 py-2 text-xs font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors cursor-pointer"
                        >
                          Voir les tutoriels gratuits
                        </button>
                        <button
                          type="button"
                          onClick={() => go('/club-creatif-stampin-up/')}
                          className="px-4 py-2 text-xs font-medium text-[#1A2B2E] bg-white border border-[#DADADA] hover:border-[#007580] rounded-lg transition-colors cursor-pointer"
                        >
                          Découvrir le Club de cartes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredTutorials.map((tut) => (
                        <article
                          key={tut.id}
                          className="group bg-white border border-[#DADADA] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#007580] transition-colors"
                        >
                          <div>
                            <div className="aspect-[4/3] bg-[#E5D4D3]/25 border-b border-[#E5D4D3] overflow-hidden p-3 flex items-center justify-center">
                              <img
                                src={tut.coverImage}
                                alt={`Aperçu du tutoriel ${tut.title}`}
                                loading="lazy"
                                className="w-full h-full object-cover object-top rounded-lg border border-[#DADADA] bg-white group-hover:scale-[1.02] transition-transform duration-200"
                              />
                            </div>

                            <div className="p-5 space-y-2.5">
                              <div className="flex items-center justify-between gap-2">
                                {tut.isPaid ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-md bg-[#FAF1D1] text-[#1A2B2E] border border-[#DADADA] tabular-nums">
                                    {tut.price}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-medium rounded-md bg-[#F8FAFA] text-[#007580] border border-[#007580]/25">
                                    Gratuit
                                  </span>
                                )}
                                <span className="text-xs text-[#526669] tabular-nums">
                                  {tut.pagesCount}
                                </span>
                              </div>

                              <h3 className="text-base font-semibold text-[#1A2B2E] leading-snug">
                                {tut.title}
                              </h3>

                              <p className="text-sm text-[#526669] leading-relaxed">
                                {tut.description}
                              </p>

                              {tut.isPaid && (
                                <ul className="pt-2 border-t border-[#DADADA] space-y-1 text-xs text-[#526669]">
                                  <li className="flex items-center gap-1.5">
                                    <Check className="w-3.5 h-3.5 text-[#007580] shrink-0" />
                                    <span>Guide complet ({tut.pagesCount})</span>
                                  </li>
                                  <li className="flex items-center gap-1.5">
                                    <Check className="w-3.5 h-3.5 text-[#007580] shrink-0" />
                                    <span>Photos pas à pas et gabarits</span>
                                  </li>
                                  <li className="flex items-center gap-1.5">
                                    <Check className="w-3.5 h-3.5 text-[#007580] shrink-0" />
                                    <span>Liste détaillée du matériel</span>
                                  </li>
                                </ul>
                              )}
                            </div>
                          </div>

                          <div className="px-5 pb-5 pt-1">
                            {tut.isPaid ? (
                              <a
                                href={tut.checkoutUrl || '#'}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-[#1A2B2E] bg-[#FAF1D1] hover:bg-[#F3E5B1] border border-[#DADADA] rounded-lg transition-colors"
                              >
                                <ShoppingBag className="w-4 h-4 text-[#007580] shrink-0" />
                                <span>Acheter le tutoriel</span>
                                <ExternalLink className="w-3 h-3 shrink-0" />
                              </a>
                            ) : (
                              <a
                                href={tut.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                download
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors"
                              >
                                <FileDown className="w-4 h-4 shrink-0" />
                                <span>Télécharger le PDF</span>
                              </a>
                            )}
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </section>
              );
            })()}
          </div>
        )}

        {baseRoute === '/club-creatif-stampin-up/' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
                  URL conservée : /club-creatif-stampin-up/
                </p>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  L’Académie créative & le Club de cartes mensuel
                </h1>
                <p className="text-base text-[#526669] leading-relaxed">
                  Depuis juin 2021, je propose une nouvelle classe chaque mois avec tutoriels pas-à-pas. Fini les pannes d’inspiration : choisissez la formule adaptée à votre rythme et profitez des rencontres Zoom l’avant-dernier mercredi de chaque mois à 19h.
                </p>
                <div className="rounded-xl overflow-hidden border border-[#DADADA] bg-white">
                  <img
                    src={SITE_IMAGES.academieClubBanner}
                    alt="Inclus dans le kit mensuel du Club de cartes : papier design, matériel pré-coupé pour 6 cartes, cours Zoom et cadeau aux 6 mois"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="max-w-sm mx-auto rounded-2xl overflow-hidden border border-[#DADADA] bg-[#F8FAFA]">
                  <img
                    src={SITE_IMAGES.academieClubPoster}
                    alt="Affiche officielle Club de cartes Académie Créative"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#DADADA] rounded-2xl p-7 space-y-5">
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
                    Formule 1 · Clé en main
                  </p>
                  <h2 className="text-2xl font-semibold">Option avec Kit postal</h2>
                  <p className="text-sm text-[#526669]">
                    Idéal si vous voulez recevoir tout le papier préparé directement chez vous.
                  </p>
                </div>
                <ul className="space-y-2.5 text-sm text-[#1A2B2E]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#007580] shrink-0 mt-0.5" />
                    <span>Papiers coupés, rubans et embellissements livrés par la poste (6 cartes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#007580] shrink-0 mt-0.5" />
                    <span>Rencontre Zoom en direct l’avant-dernier mercredi à 19h</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#007580] shrink-0 mt-0.5" />
                    <span>Accès complet aux rediffusions, fiches PDF et cadeau aux 6 mois consécutifs</span>
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={() => go('/contact/')}
                  className="w-full py-3 text-sm font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors cursor-pointer"
                >
                  Réserver ma place avec Kit
                </button>
              </div>

              <div className="bg-[#F8FAFA] border border-[#DADADA] rounded-2xl p-7 space-y-5">
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#526669]">
                    Formule 2 · 100 % en ligne
                  </p>
                  <h2 className="text-2xl font-semibold">Option Virtuelle</h2>
                  <p className="text-sm text-[#526669]">
                    Parfait si vous possédez déjà votre matériel ou habitez à l’étranger.
                  </p>
                </div>
                <ul className="space-y-2.5 text-sm text-[#1A2B2E]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#007580] shrink-0 mt-0.5" />
                    <span>Fiches de mesures (pouces et cm) et plans de coupe PDF téléchargeables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#007580] shrink-0 mt-0.5" />
                    <span>Atelier en direct sur Zoom + bibliothèque vidéo illimitée</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#007580] shrink-0 mt-0.5" />
                    <span>Défis créatifs et entraide dans le groupe privé</span>
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={() => go('/contact/')}
                  className="w-full py-3 text-sm font-medium text-[#1A2B2E] bg-white border border-[#DADADA] hover:border-[#007580] rounded-lg transition-colors cursor-pointer"
                >
                  Rejoindre l’option Virtuelle
                </button>
              </div>
            </div>

            {/* Éditions mensuelles récentes & Cours to go */}
            <div className="space-y-6 pt-2">
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
                  Calendrier du Club de cartes
                </p>
                <h2 className="text-2xl font-semibold text-[#1A2B2E]">
                  Thématiques récentes en images
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <figure className="bg-[#F8FAFA] border border-[#DADADA] rounded-2xl overflow-hidden">
                  <img
                    src={SITE_IMAGES.clubNovember2026}
                    alt="Club de cartes Novembre 2026 - Noël éternel le mercredi 18 novembre à 19h en Zoom"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain bg-white"
                  />
                  <figcaption className="p-4 border-t border-[#DADADA]">
                    <p className="text-sm font-semibold text-[#1A2B2E]">Novembre 2026 · Noël éternel</p>
                    <p className="text-xs text-[#526669]">Mercredi 18 novembre à 19h en Zoom · Disponible en replay</p>
                  </figcaption>
                </figure>
                <figure className="bg-[#F8FAFA] border border-[#DADADA] rounded-2xl overflow-hidden">
                  <img
                    src={SITE_IMAGES.clubOctober2026}
                    alt="Club de cartes Octobre 2026 - Joli petit Noël le mercredi 21 octobre à 19h en Zoom"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain bg-white"
                  />
                  <figcaption className="p-4 border-t border-[#DADADA]">
                    <p className="text-sm font-semibold text-[#1A2B2E]">Octobre 2026 · Joli petit Noël</p>
                    <p className="text-xs text-[#526669]">Mercredi 21 octobre à 19h en Zoom · Disponible en replay</p>
                  </figcaption>
                </figure>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {[
                  { src: SITE_IMAGES.coursToGoMoments, title: 'Cours to go · Moments lumineux' },
                  { src: SITE_IMAGES.coursToGoJul2022, title: 'Cours to go · Juillet 2022' },
                  { src: SITE_IMAGES.coursToGoFeb2022, title: 'Cours to go · Février 2022' },
                  { src: SITE_IMAGES.coursToGoAug2021, title: 'Cours to go · Août 2021' },
                ].map((edition) => (
                  <figure key={edition.title} className="bg-white border border-[#DADADA] rounded-xl overflow-hidden">
                    <div className="aspect-square bg-[#F8FAFA] overflow-hidden">
                      <img
                        src={edition.src}
                        alt={edition.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <figcaption className="px-3.5 py-2.5 text-xs font-medium text-[#1A2B2E] border-t border-[#DADADA]">
                      {edition.title}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        )}

        {baseRoute === '/catalogues-stampinup/' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
                URL conservée : /catalogues-stampinup/
              </p>
              <h1 className="text-3xl font-semibold">Catalogues Stampin’ Up! en vigueur</h1>
              <p className="text-base text-[#526669]">
                Feuilletez les collections actuelles en format numérique ou demandez votre exemplaire papier gratuit (au Canada).
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Catalogue Septembre–Décembre 2026',
                  desc: 'Collections festives des Fêtes, projets d’automne, calendriers de l’Avent et souvenirs saisonniers.',
                  image: SITE_IMAGES.catalogueSepDec2026,
                  alt: 'Couverture du catalogue Stampin Up Septembre-Décembre 2026',
                },
                {
                  title: 'Catalogue Annuel Stampin’ Up!',
                  desc: 'Toutes les couleurs phares, jeux d’étampes classiques, encres, outils de coupe et adhésifs.',
                  image: SITE_IMAGES.catalogueAnnuel,
                  alt: 'Couverture du Catalogue Annuel Stampin Up',
                },
              ].map((cat) => (
                <div key={cat.title} className="bg-white border border-[#DADADA] rounded-2xl overflow-hidden flex flex-col justify-between">
                  <div className="aspect-[4/3] bg-[#F8FAFA] border-b border-[#DADADA] overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain p-3"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#007580]">
                      <BookOpen className="w-4 h-4" />
                      <span>Édition francophone · Canada</span>
                    </div>
                    <h2 className="text-xl font-semibold">{cat.title}</h2>
                    <p className="text-sm text-[#526669]">{cat.desc}</p>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <a
                        href="https://www.stampinup.ca/fr/?demoid=2126905"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 text-xs font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors"
                      >
                        Consulter en ligne
                      </a>
                      <button
                        type="button"
                        onClick={() => go('/contact/')}
                        className="px-4 py-2 text-xs font-medium text-[#1A2B2E] border border-[#DADADA] hover:border-[#007580] rounded-lg cursor-pointer transition-colors"
                      >
                        Demander la version papier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-2">
              <h2 className="text-xl font-semibold text-[#1A2B2E]">Éditions d’archives et inspiration</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Catalogue Annuel 2023–2024',
                    image: SITE_IMAGES.catalogueAnnuel2023,
                    alt: 'Couverture du Catalogue Annuel Mai 2023 à Avril 2024',
                  },
                  {
                    title: 'Mini-Catalogue Septembre–Décembre 2023',
                    image: SITE_IMAGES.catalogueHoliday2023,
                    alt: 'Couverture du Mini-Catalogue Septembre-Décembre 2023',
                  },
                ].map((arch) => (
                  <figure
                    key={arch.title}
                    className="bg-[#F8FAFA] border border-[#DADADA] rounded-2xl overflow-hidden flex items-center gap-4 p-4"
                  >
                    <img
                      src={arch.image}
                      alt={arch.alt}
                      referrerPolicy="no-referrer"
                      className="w-24 h-28 object-cover rounded-lg border border-[#DADADA] shrink-0 bg-white"
                    />
                    <figcaption className="space-y-1">
                      <p className="text-sm font-semibold text-[#1A2B2E]">{arch.title}</p>
                      <p className="text-xs text-[#526669]">
                        Source d’inspiration de modèles et d’agencements de couleurs sur le blog.
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  if (baseRoute === '/scrapbookeusespassionnees/') {
    return (
      <div className="bg-white text-[#1A2B2E]">
        <section className="border-b border-[#E5D4D3] bg-gradient-to-b from-[#E5D4D3]/35 to-[#F8FAFA]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
                Communauté francophone · Les Scrapbookeuses passionnées
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Joindre Les Scrapbookeuses passionnées!
              </h1>
              <p className="text-base text-[#526669] leading-relaxed">
                La trousse de démarrage reste la meilleure offre chez Stampin’ Up! : que ce soit pour économiser sur votre propre matériel ou développer votre activité créative, vous décidez de votre rythme.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => go('/contact/')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors cursor-pointer"
                >
                  Discuter de l’adhésion avec Andrée
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border border-[#E5D4D3] rounded-2xl p-6 space-y-4">
              <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
                Trousse de base · Offre permanente
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-semibold tabular-nums text-[#1A2B2E]">135 $</span>
                <span className="text-sm text-[#526669]">
                  pour choisir <strong className="text-[#007580]">170 $ de produits</strong>
                </span>
              </div>
              <ul className="space-y-2 text-sm text-[#526669] border-t border-[#E5D4D3] pt-4">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#007580] shrink-0 mt-0.5" />
                  <span>Fournitures d’affaires offertes + carte de bienvenue faite main</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#007580] shrink-0 mt-0.5" />
                  <span>Rabais membre de 20 % sur vos achats suivants</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#007580] shrink-0 mt-0.5" />
                  <span>Aucune obligation de vendre ni de faire des ateliers</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-10">
          <figure className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[#E5D4D3] bg-[#E5D4D3]/20 flex flex-col">
            <img
              src={SITE_IMAGES.montebelloRetreat2026}
              alt="Photo souvenir de notre weekend à Montebello en septembre 2026 avec Les Scrapbookeuses passionnées"
              referrerPolicy="no-referrer"
              className="w-full max-h-[480px] object-cover object-top"
            />
            <figcaption className="px-5 py-3 text-xs text-[#526669] border-t border-[#E5D4D3] text-center">
              Photo souvenir de notre weekend à Montebello en septembre 2026.
            </figcaption>
          </figure>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[#E5D4D3] rounded-2xl p-6 space-y-3 bg-white">
              <Users className="w-5 h-5 text-[#007580]" />
              <h2 className="text-xl font-semibold">La force de notre communauté</h2>
              <ul className="space-y-2 text-sm text-[#526669]">
                <li>• Groupe Facebook privé et entraide bienveillante</li>
                <li>• Défi créatif mensuel avec tirages et programme de reconnaissance</li>
                <li>• Soirées créatives trimestrielles et rencontres mensuelles (Projet mystère & tutoriel exclusif)</li>
                <li>• Week-ends mémorables en équipe (comme notre retraite à Montebello)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#E5D4D3]/45 to-[#FAF1D1]/45 border border-[#E5D4D3] rounded-2xl p-6 space-y-3">
              <Sparkles className="w-5 h-5 text-[#007580]" />
              <h2 className="text-xl font-semibold">Même si vous débutez complètement</h2>
              <p className="text-sm text-[#526669] leading-relaxed">
                Je suis là pour vous montrer les bases de l’art du papier et de l’étampage afin de vous aider à démarrer du bon pied. Vous n’êtes jamais seule ni laissée à vous-même, et vous accédez aussi à mes formations vidéo.
              </p>
              <div className="pt-2 text-sm text-[#1A2B2E] space-y-1">
                <p>
                  Courriel :{' '}
                  <a href="mailto:andree.creation.su@gmail.com" className="text-[#007580] font-medium hover:underline">
                    andree.creation.su@gmail.com
                  </a>
                </p>
                <p className="tabular-nums">Téléphone : 819 930-6738</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (baseRoute === '/a-propos/') {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
            URL canonique conservée : /a-propos/ (301 depuis /a-propos-de-moi/)
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1A2B2E]">
            À propos d’Andrée Catudal
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#E5D4D3] bg-[#E5D4D3]/20">
            <img
              src={SITE_IMAGES.andreeAbout}
              alt="Andrée Catudal à sa table de création avec son tablier Stampin' Up!"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top min-h-[340px]"
            />
          </div>

          <div className="lg:col-span-7 bg-gradient-to-br from-[#E5D4D3]/30 to-[#F8FAFA] border border-[#E5D4D3] rounded-2xl p-7 sm:p-9 space-y-5 text-base text-[#1A2B2E] leading-relaxed flex flex-col justify-between">
            <div className="space-y-4">
              <p>
                Bonjour ! Je suis <strong>Andrée Catudal</strong>, mère de deux grands enfants et soutenue par un conjoint merveilleux dans tous mes projets créatifs.
              </p>
              <p>
                Je suis démonstratrice indépendante Stampin’ Up! depuis <strong>octobre 2013</strong>. J’adore partager ma passion, animer des ateliers créatifs, enseigner des techniques accessibles et créer de belles amitiés précieuses au sein de ma communauté, <em>Les Scrapbookeuses passionnées</em>.
              </p>
              <p>
                Pour moi, la créativité est une façon douce de décrocher du quotidien, de réduire le stress et de profiter pleinement du moment présent.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E5D4D3] flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm font-medium text-[#007580]">— Andrée Catudal</span>
              <button
                type="button"
                onClick={() => go('/contact/')}
                className="px-4 py-2 text-sm font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors cursor-pointer"
              >
                Écrire à Andrée
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: /contact/
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.includes('@') || !contactMessage.trim()) {
      setContactError('Merci de remplir votre nom, un courriel valide et votre message.');
      return;
    }
    setContactError('');
    setContactSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-5">
          <div className="w-56 sm:w-64 aspect-[4/5] rounded-2xl overflow-hidden border border-[#E5D4D3] bg-[#E5D4D3]/20">
            <img
              src={SITE_IMAGES.andreeContact}
              alt="Andrée Catudal souriante à sa table de bricolage"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
            URL conservée : /contact/
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1A2B2E]">
            Me contacter
          </h1>
          <p className="text-sm sm:text-base text-[#526669] leading-relaxed">
            Une question sur un produit Stampin’ Up!, le Club de cartes ou l’adhésion à mon équipe ? Il me fera grand plaisir de vous répondre rapidement.
          </p>

          <div className="bg-[#E5D4D3]/25 border border-[#E5D4D3] rounded-2xl p-5 space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#007580] shrink-0" />
              <a href="mailto:andree.creation.su@gmail.com" className="text-[#007580] font-medium hover:underline">
                andree.creation.su@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#007580] shrink-0" />
              <span className="tabular-nums text-[#1A2B2E]">819 930-6738</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-[#007580] shrink-0" />
              <span className="text-[#526669]">Club de cartes : avant-dernier mercredi, 19h</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white border border-[#DADADA] rounded-2xl p-6 sm:p-8">
          {contactSent ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-11 h-11 rounded-full bg-[#007580]/10 text-[#007580] flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-[#1A2B2E]">Message envoyé !</h2>
              <p className="text-sm text-[#526669] max-w-md mx-auto">
                Merci {contactName}. Votre demande concernant « {contactTopic} » a bien été enregistrée pour {contactEmail}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setContactSent(false);
                  setContactMessage('');
                }}
                className="text-sm font-medium text-[#007580] hover:underline cursor-pointer"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="c-name" className="text-xs font-medium text-[#1A2B2E]">
                    Votre prénom et nom
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Marie-Claire Tremblay"
                    className="w-full px-3.5 py-2.5 text-sm border border-[#DADADA] rounded-lg focus:outline-none focus:border-[#007580]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="c-email" className="text-xs font-medium text-[#1A2B2E]">
                    Courriel
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    className="w-full px-3.5 py-2.5 text-sm border border-[#DADADA] rounded-lg focus:outline-none focus:border-[#007580]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="c-topic" className="text-xs font-medium text-[#1A2B2E]">
                  Sujet de votre demande
                </label>
                <select
                  id="c-topic"
                  value={contactTopic}
                  onChange={(e) => setContactTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DADADA] rounded-lg focus:outline-none focus:border-[#007580]"
                >
                  <option>Club de cartes / Académie créative</option>
                  <option>Commander des produits Stampin’ Up!</option>
                  <option>Joindre Les Scrapbookeuses passionnées!</option>
                  <option>Recevoir un catalogue papier</option>
                  <option>Autre question créative</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="c-msg" className="text-xs font-medium text-[#1A2B2E]">
                  Votre message
                </label>
                <textarea
                  id="c-msg"
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Écrivez-moi votre question..."
                  className="w-full px-3.5 py-2.5 text-sm border border-[#DADADA] rounded-lg focus:outline-none focus:border-[#007580]"
                />
              </div>

              {contactError && <p className="text-xs text-red-700">{contactError}</p>}

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors cursor-pointer"
              >
                Envoyer mon message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
