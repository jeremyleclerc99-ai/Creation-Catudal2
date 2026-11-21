import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Play,
  Scissors,
  ShoppingBag,
  Users,
} from 'lucide-react';
import { SITE_IMAGES, type RouteSlug } from '../../data/siteArchitecture';
import { ALL_POSTS } from '../../data/posts';

interface HomePageProps {
  onNavigate: (route: RouteSlug) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadError, setLeadError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const go = (route: RouteSlug) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadEmail.trim())) {
      setLeadError('Veuillez entrer une adresse courriel valide.');
      return;
    }
    setLeadError('');
    setLeadSubmitted(true);
  };

  const faqs = [
    {
      q: 'Dois-je déjà savoir étamper pour rejoindre le Club de cartes ?',
      a: 'Pas du tout ! Chaque classe mensuelle est expliquée étape par étape, avec les mesures exactes et la rediffusion vidéo accessible en tout temps dans l’Académie créative.',
    },
    {
      q: 'Quelle est la différence entre l’abonnement avec kit et l’option virtuelle ?',
      a: 'Avec l’option Kit, vous recevez les papiers coupés et embellissements par la poste avant notre rencontre Zoom. Avec l’option Virtuelle, vous utilisez votre propre matériel avec nos tutoriels PDF et vidéos.',
    },
    {
      q: 'Suis-je obligée de vendre si je prends la trousse de démarrage à 135 $ ?',
      a: 'Aucune obligation ! Plusieurs membres de Les Scrapbookeuses passionnées profitent simplement du rabais de 20 % sur leurs fournitures préférées et de notre communauté créative.',
    },
  ];

  return (
    <div className="bg-white text-[#1A2B2E]">
      {/* 1. HERO SPLIT (Stripe Proportion + Brand Guide Coastal Wave & Blush Accents) */}
      <section className="relative overflow-hidden border-b border-[#E5D4D3]">
        {/* Subtle coastal wave accent on right side echoing Brand Guide */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-[540px] h-[540px] rounded-full opacity-60"
          style={{
            background:
              'radial-gradient(circle at 40% 40%, #E5D4D3 0%, #E3B9B3 30%, #FAF1D1 60%, #7CA7AD 88%, transparent 100%)',
            filter: 'blur(42px)',
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy & Primary CTA */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-medium tracking-wider uppercase text-[#007580]">
                Démonstratrice indépendante Stampin’ Up! · Depuis 2013
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold tracking-tight leading-[1.08] text-[#1A2B2E]">
                Décrochez du quotidien grâce à la carterie guidée.
              </h1>

              <p className="text-base sm:text-lg text-[#526669] leading-relaxed max-w-xl">
                Des projets pas-à-pas, des papiers coordonnés et une communauté chaleureuse pour stimuler votre imagination et libérer le stress, une carte à la fois.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => go('/club-creatif-stampin-up/')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  Découvrir le Club de cartes
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go('/la-boutique/')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#1A2B2E] bg-white border border-[#DADADA] hover:border-[#007580] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  Magasiner Stampin’ Up!
                </button>
              </div>
            </div>

            {/* Right Layered Preview Cards (Stripe Hero Visual DNA + Authentic Homepage Photos) */}
            <div className="lg:col-span-6">
              <div className="relative bg-gradient-to-br from-[#E5D4D3]/35 via-[#F8FAFA] to-white border border-[#E5D4D3] rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-5 aspect-[4/5] sm:aspect-auto sm:h-64 rounded-xl overflow-hidden border border-[#DADADA] bg-white">
                    <img
                      src={SITE_IMAGES.andreePortrait}
                      alt="Andrée Catudal, démonstratrice indépendante Stampin' Up! depuis octobre 2013"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="sm:col-span-7 aspect-[4/3] sm:aspect-auto sm:h-64 rounded-xl overflow-hidden border border-[#DADADA] bg-white">
                    <img
                      src={SITE_IMAGES.cardClubKit}
                      alt="Création de carte avec tampons et encres Stampin' Up! sur tapis quadrillé"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white border border-[#DADADA] rounded-xl p-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-[#526669]">À la une sur le blog</p>
                      <p className="text-sm font-semibold text-[#1A2B2E]">
                        One Sheet Wonder · 17 cartes
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => go('/one-sheet-wonder-murmure-des-bois/')}
                      aria-label="Voir le tutoriel One Sheet Wonder"
                      className="w-8 h-8 rounded-lg border border-[#DADADA] flex items-center justify-center text-[#007580] hover:bg-[#007580] hover:text-white transition-colors shrink-0 cursor-pointer"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-[#007580] text-white rounded-xl p-4 space-y-0.5">
                    <p className="text-[11px] uppercase tracking-wider text-[#FAF1D1]">
                      Club de cartes en direct
                    </p>
                    <p className="text-sm font-semibold">Avant-dernier mercredi · 19h</p>
                    <p className="text-xs text-white/85">Sur Zoom + rediffusion illimitée</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / CREDIBILITY STRIP */}
      <section className="border-b border-[#E5D4D3] bg-[#E5D4D3]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-[#E5D4D3] text-xs sm:text-sm text-[#526669]">
            <div className="lg:pr-6">Démonstratrice depuis oct. 2013</div>
            <div className="lg:px-6 tabular-nums">{ALL_POSTS.length} projets & articles gratuits</div>
            <div className="lg:px-6">Club mensuel en direct sur Zoom</div>
            <div className="lg:pl-6">Communauté Les Scrapbookeuses</div>
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID: UNIVERS CRÉATIF (Stripe Flexible Solutions Architecture) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="max-w-2xl mb-10 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1A2B2E]">
            Quatre façons simples de nourrir votre créativité.
          </h2>
          <p className="text-base text-[#526669] leading-relaxed">
            Que vous cherchiez des fournitures coordonnées, un atelier clé en main chaque mois ou une équipe bienveillante, chaque parcours est conçu pour vous simplifier la vie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          {/* Card 1: Boutique Stampin' Up! (4 cols) */}
          <div className="md:col-span-4 bg-gradient-to-br from-[#E5D4D3]/30 via-[#F8FAFA] to-white border border-[#E5D4D3] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#007580] transition-colors gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-7 space-y-2">
                <p className="text-xs font-medium text-[#007580] uppercase tracking-wider">
                  01 · Fournitures coordonnées
                </p>
                <h3 className="text-xl font-semibold text-[#1A2B2E]">
                  Boutique en ligne Stampin’ Up!
                </h3>
                <p className="text-sm text-[#526669] leading-relaxed">
                  Papiers design, tampons, encres et rubans aux couleurs parfaitement harmonisées pour réussir chaque carte sans hésitation.
                </p>
                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => go('/la-boutique/')}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#007580] hover:text-[#0095A9] cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Accéder à la Boutique
                  </button>
                  <button
                    type="button"
                    onClick={() => go('/catalogues-stampinup/')}
                    className="text-sm text-[#526669] hover:text-[#1A2B2E] cursor-pointer"
                  >
                    Catalogues →
                  </button>
                </div>
              </div>

              <div className="sm:col-span-5 aspect-[16/10] rounded-xl overflow-hidden border border-[#DADADA] bg-white">
                <img
                  src={SITE_IMAGES.studioShelf}
                  alt="Étagère de studio organisée avec encres, cartons et machine de découpe"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-right"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Club de cartes (2 cols) */}
          <div className="md:col-span-2 bg-white border border-[#DADADA] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#007580] transition-colors">
            <div className="aspect-[16/10] border-b border-[#DADADA] bg-[#F8FAFA] overflow-hidden">
              <img
                src={SITE_IMAGES.cardClubKit}
                alt="Trousse du Club de cartes mensuel et atelier Zoom"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-[#007580] uppercase tracking-wider">
                  02 · Abonnement mensuel
                </p>
                <h3 className="text-xl font-semibold text-[#1A2B2E]">
                  Club de cartes créatif
                </h3>
                <p className="text-sm text-[#526669] leading-relaxed">
                  Une nouvelle classe chaque mois : option kit postal ou virtuelle, en direct sur Zoom.
                </p>
              </div>
              <button
                type="button"
                onClick={() => go('/club-creatif-stampin-up/')}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#007580] hover:text-[#0095A9] cursor-pointer"
              >
                Découvrir le Club <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Tutoriels gratuits (3 cols) */}
          <div className="md:col-span-3 bg-white border border-[#DADADA] rounded-2xl p-6 flex flex-col justify-between hover:border-[#007580] transition-colors gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-7 space-y-2">
                <p className="text-xs font-medium text-[#007580] uppercase tracking-wider">
                  03 · Plans de coupe & Vidéos
                </p>
                <h3 className="text-xl font-semibold text-[#1A2B2E]">
                  {ALL_POSTS.length} tutoriels sur le blog
                </h3>
                <p className="text-sm text-[#526669] leading-relaxed">
                  Filtrez par technique, saison ou niveau. Inclut nos plans One Sheet Wonder.
                </p>
              </div>
              <div className="sm:col-span-5 aspect-[4/3] rounded-xl overflow-hidden border border-[#DADADA] bg-[#F8FAFA]">
                <img
                  src={SITE_IMAGES.murmureDesBois}
                  alt="Cartes de Noël et d'hiver assorties Murmure des bois"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => go('/blog/')}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#007580] hover:text-[#0095A9] cursor-pointer"
              >
                <Scissors className="w-4 h-4" />
                Explorer le blog
              </button>
              <button
                type="button"
                onClick={() => go('/tutoriels/')}
                className="text-sm text-[#526669] hover:text-[#1A2B2E] cursor-pointer"
              >
                Tutoriels gratuits →
              </button>
            </div>
          </div>

          {/* Card 4: Les Scrapbookeuses passionnées (3 cols) */}
          <div className="md:col-span-3 bg-[#E5D4D3]/25 border border-[#E5D4D3] rounded-2xl p-6 flex flex-col justify-between hover:border-[#007580] transition-colors gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-7 space-y-2">
                <p className="text-xs font-medium text-[#007580] uppercase tracking-wider">
                  04 · Communauté & Rabais 20%
                </p>
                <h3 className="text-xl font-semibold text-[#1A2B2E]">
                  Les Scrapbookeuses passionnées!
                </h3>
                <p className="text-sm text-[#526669] leading-relaxed">
                  Trousse à 135 $ (170 $ de produits au choix) pour économiser ou bâtir votre activité.
                </p>
              </div>
              <div className="sm:col-span-5 aspect-[3/2] rounded-xl overflow-hidden border border-[#DADADA] bg-[#F8FAFA]">
                <img
                  src={SITE_IMAGES.communityRetreat}
                  alt="Membres de l'équipe Les Scrapbookeuses passionnées"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => go('/scrapbookeusespassionnees/')}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#007580] hover:text-[#0095A9] cursor-pointer"
              >
                <Users className="w-4 h-4" />
                Voir les avantages de l’équipe <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 5: Full-Width Lead Magnet Bar (6 cols) */}
          <div className="md:col-span-6 bg-gradient-to-r from-[#E5D4D3]/45 via-[#FAF1D1]/45 to-[#E5D4D3]/30 border border-[#E5D4D3] rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
                  Cadeau de bienvenue · Infolettre créative
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#1A2B2E]">
                  Recevez gratuitement le plan de coupe One Sheet Wonder 12" × 12"
                </h3>
                <p className="text-sm text-[#526669]">
                  Créez jusqu’à 17 cartes avec une seule feuille de papier design, plus mes nouveaux tutoriels et promotions Stampin’ Up! chaque semaine.
                </p>
              </div>

              <div className="lg:col-span-5">
                {leadSubmitted ? (
                  <div className="bg-white border border-[#007580]/30 rounded-xl p-4 flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#007580] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[#1A2B2E]">Inscription confirmée</p>
                      <p className="text-xs text-[#526669] mt-0.5">
                        Le plan PDF a été envoyé à <span className="font-medium text-[#1A2B2E]">{leadEmail}</span>.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-2" noValidate>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <label htmlFor="home-lead-email" className="sr-only">
                        Adresse courriel
                      </label>
                      <input
                        id="home-lead-email"
                        type="email"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="votre@courriel.com"
                        className="flex-1 px-3.5 py-2.5 text-sm bg-white border border-[#DADADA] rounded-lg focus:outline-none focus:border-[#007580]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 text-sm font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Recevoir le plan
                      </button>
                    </div>
                    {leadError && <p className="text-xs text-red-700">{leadError}</p>}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DEEP TEAL SPOTLIGHT SECTION (Stripe Dark Banner adapted to #007580 + #E3B9B3 waves) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-[#007580] text-white p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -bottom-24 w-80 h-80 rounded-full opacity-25"
            style={{ background: 'radial-gradient(circle, #E3B9B3 0%, transparent 70%)' }}
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-medium uppercase tracking-wider text-[#FAF1D1]">
                L’Académie créative · Fini les pannes d’inspiration
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Une nouvelle classe de cartes chaque mois, avec ou sans matériel.
              </h2>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-xl">
                Rejoignez notre atelier mensuel sur Zoom l’avant-dernier mercredi de chaque mois à 19h, ou créez à votre rythme grâce à la bibliothèque complète de tutoriels en rediffusion.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => go('/club-creatif-stampin-up/')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#1A2B2E] bg-[#FAF1D1] hover:bg-white rounded-lg transition-colors cursor-pointer"
                >
                  Voir les formules du Club
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go('/one-sheet-wonder-murmure-des-bois/')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white border border-white/30 hover:border-white rounded-lg transition-colors cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  Aperçu d’un cours vidéo
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 border border-white/20 rounded-xl p-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 items-center">
              <div className="w-28 sm:w-32 shrink-0 rounded-lg overflow-hidden border border-white/20 bg-white">
                <img
                  src={SITE_IMAGES.academieCard}
                  alt="Carte créée pour l'Académie créative"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-wider text-[#E3B9B3] font-medium">
                  Inclus dans votre abonnement
                </p>
                <ul className="space-y-2 text-sm text-white/95">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#FAF1D1] shrink-0 mt-0.5" />
                    <span>Nouveaux projets exclusifs chaque mois depuis juin 2021</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#FAF1D1] shrink-0 mt-0.5" />
                    <span>Vidéos pas-à-pas et fiches de mesures imprimables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#FAF1D1] shrink-0 mt-0.5" />
                    <span>Choix flexible : envoi du kit préparé ou formule virtuelle</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. METRICS BAND (Stripe Global Backbone Stat Grid) */}
      <section className="border-y border-[#E5D4D3] bg-[#E5D4D3]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A2B2E]">
              Une passion partagée depuis plus de dix ans
            </h2>
            <p className="text-sm text-[#526669]">
              Des ressources fiables et accessibles pour créer avec plaisir, quel que soit votre niveau.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '2013', label: 'Démonstratrice Stampin’ Up! depuis octobre 2013' },
              { value: String(ALL_POSTS.length), label: 'Articles et tutoriels gratuits publiés sur le blog' },
              { value: '170 $', label: 'Valeur de produits dans la trousse à 135 $' },
              { value: '12 / an', label: 'Classes mensuelles du Club de cartes sur Zoom' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white border border-[#E5D4D3] rounded-xl p-5">
                <p className="text-2xl sm:text-3xl font-semibold tabular-nums text-[#007580]">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-[#526669] mt-1.5 leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OBJECTION HANDLING / FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A2B2E]">
            Questions fréquentes avant de commencer
          </h2>
          <p className="text-sm text-[#526669]">
            Tout ce que vous devez savoir sur les ateliers, la boutique et notre équipe.
          </p>
        </div>

        <div className="divide-y divide-[#E5D4D3] border-y border-[#E5D4D3]">
          {faqs.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={item.q} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left py-1 cursor-pointer"
                >
                  <span className="text-base font-medium text-[#1A2B2E]">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#007580] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-2.5 text-sm text-[#526669] leading-relaxed pr-8">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
