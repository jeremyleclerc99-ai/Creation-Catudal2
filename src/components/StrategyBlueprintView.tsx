import React, { useState } from 'react';
import { ArrowRight, Check, Copy, ExternalLink, FolderTree, Layers, Palette } from 'lucide-react';
import {
  BRAND_TOKENS,
  PRESERVED_PAGES,
  WIREFRAME_BLUEPRINTS,
  type RouteSlug,
} from '../data/siteArchitecture';

interface StrategyBlueprintViewProps {
  onOpenPrototypeRoute: (route: RouteSlug) => void;
}

export const StrategyBlueprintView: React.FC<StrategyBlueprintViewProps> = ({
  onOpenPrototypeRoute,
}) => {
  const [activeSection, setActiveSection] = useState<'seo' | 'design' | 'wireframes'>('seo');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [selectedWireframeIdx, setSelectedWireframeIdx] = useState(0);

  const copyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const activeWireframe = WIREFRAME_BLUEPRINTS[selectedWireframeIdx];

  return (
    <div className="bg-[#F8FAFA] min-h-screen text-[#1A2B2E]">
      {/* Sub-Header */}
      <div className="bg-white border-b border-[#DADADA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6">
          <div className="space-y-2 max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
              Livrable Stratégie de Conversion & Architecture UI/UX · Astro + Tailwind CSS
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1A2B2E]">
              Plan directeur de refonte — Création Catudal
            </h1>
            <p className="text-sm sm:text-base text-[#526669] leading-relaxed">
              Audit complet issu de vos plans de site XML (12 pages + 202 articles), de votre Charte graphique (PDF), de la référence visuelle (Stripe) et de l’article converti en Markdown.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Sections du plan directeur">
            <button
              type="button"
              onClick={() => setActiveSection('seo')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeSection === 'seo'
                  ? 'bg-[#007580] text-white'
                  : 'bg-[#F8FAFA] text-[#526669] border border-[#DADADA] hover:text-[#1A2B2E]'
              }`}
            >
              <FolderTree className="w-4 h-4" />
              1. Structure & Préservation SEO
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('design')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeSection === 'design'
                  ? 'bg-[#007580] text-white'
                  : 'bg-[#F8FAFA] text-[#526669] border border-[#DADADA] hover:text-[#1A2B2E]'
              }`}
            >
              <Palette className="w-4 h-4" />
              2. Traduction du Système de Design
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('wireframes')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeSection === 'wireframes'
                  ? 'bg-[#007580] text-white'
                  : 'bg-[#F8FAFA] text-[#526669] border border-[#DADADA] hover:text-[#1A2B2E]'
              }`}
            >
              <Layers className="w-4 h-4" />
              3. Wireframes & Conversions
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* TAB 1: STRUCTURE & SEO */}
        {activeSection === 'seo' && (
          <div className="space-y-8">
            {/* Key Technical Astro Rules */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white border border-[#DADADA] rounded-xl p-5 space-y-2">
                <p className="text-xs font-mono text-[#007580]">astro.config.mjs</p>
                <h2 className="text-base font-semibold">Barres obliques finales</h2>
                <p className="text-xs text-[#526669] leading-relaxed">
                  Forcer <code className="font-mono text-[#1A2B2E]">trailingSlash: &apos;always&apos;</code> et <code className="font-mono text-[#1A2B2E]">build.format: &apos;directory&apos;</code> afin que chaque page et article génère exactement <code className="font-mono">/slug/</code> sans redirection superflue.
                </p>
              </div>
              <div className="bg-white border border-[#DADADA] rounded-xl p-5 space-y-2">
                <p className="text-xs font-mono text-[#007580]">src/pages/[slug].astro</p>
                <h2 className="text-base font-semibold">202+ articles à la racine</h2>
                <p className="text-xs text-[#526669] leading-relaxed">
                  Route dynamique générée depuis <code className="font-mono text-[#1A2B2E]">src/content/blog/</code> via <code className="font-mono">getStaticPaths()</code>. Conserve 100 % des URLs WordPress existantes comme <code className="font-mono">/one-sheet-wonder-murmure-des-bois/</code>.
                </p>
              </div>
              <div className="bg-white border border-[#DADADA] rounded-xl p-5 space-y-2">
                <p className="text-xs font-mono text-[#007580]">_redirects / vercel.json</p>
                <h2 className="text-base font-semibold">Redirections 301 propres</h2>
                <p className="text-xs text-[#526669] leading-relaxed">
                  Élimination des doublons WordPress (<code className="font-mono">/home/ → /</code>, <code className="font-mono">/a-propos-de-moi/ → /a-propos/</code>, <code className="font-mono">/appointment/ → /contact/</code>, <code className="font-mono">/service/ → /la-boutique/</code>).
                </p>
              </div>
            </div>

            {/* Complete URL Preservation Matrix */}
            <div className="bg-white border border-[#DADADA] rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[#DADADA] flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold">
                    Matrice de préservation des pages (page-sitemap.xml)
                  </h2>
                  <p className="text-xs text-[#526669]">
                    Cliquez sur « Voir dans le prototype » pour tester la page reconstruite.
                  </p>
                </div>
                <span className="text-xs font-mono tabular-nums text-[#526669]">
                  {PRESERVED_PAGES.length} routes cartographiées + 202 articles
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#DADADA] bg-[#F8FAFA] text-xs text-[#526669]">
                      <th className="py-3 px-4 font-medium">URL WordPress actuelle</th>
                      <th className="py-3 px-4 font-medium">Fichier Astro</th>
                      <th className="py-3 px-4 font-medium">Action SEO</th>
                      <th className="py-3 px-4 font-medium">Rôle de conversion</th>
                      <th className="py-3 px-4 font-medium text-right">Aperçu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DADADA]">
                    {PRESERVED_PAGES.map((row) => (
                      <tr key={row.url} className="hover:bg-[#F8FAFA]/70">
                        <td className="py-3 px-4 font-mono text-xs text-[#1A2B2E] whitespace-nowrap">
                          {row.url}
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-[#526669] whitespace-nowrap">
                          {row.astroFile}
                        </td>
                        <td className="py-3 px-4 text-xs whitespace-nowrap">
                          <span
                            className={`font-medium ${
                              row.strategy === 'Conserver' ? 'text-[#007580]' : 'text-[#526669]'
                            }`}
                          >
                            {row.strategy}
                            {row.targetUrl ? ` → ${row.targetUrl}` : ''}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#526669] max-w-md">
                          {row.conversionRole}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          {row.prototypeRoute && (
                            <button
                              type="button"
                              onClick={() => onOpenPrototypeRoute(row.prototypeRoute!)}
                              className="inline-flex items-center gap-1 text-xs font-medium text-[#007580] hover:underline cursor-pointer"
                            >
                              Tester
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DESIGN SYSTEM TRANSLATION */}
        {activeSection === 'design' && (
          <div className="space-y-8">
            <div className="bg-white border border-[#DADADA] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">
                  Traduction : ADN visuel Stripe → Charte graphique Création Catudal
                </h2>
                <p className="text-sm text-[#526669]">
                  On conserve les proportions aérées, les grilles Bento et la hiérarchie typographique nette de Stripe tout en remplaçant intégralement ses couleurs tech par votre palette côtière et apaisante. Cliquez sur un code hex pour le copier.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BRAND_TOKENS.map((token) => (
                  <div
                    key={token.hex}
                    className="border border-[#DADADA] rounded-xl p-4 bg-white flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div
                          className="w-12 h-12 rounded-lg border border-black/10"
                          style={{ backgroundColor: token.hex }}
                        />
                        <button
                          type="button"
                          onClick={() => copyHex(token.hex)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-[#F8FAFA] border border-[#DADADA] rounded-md hover:border-[#007580] cursor-pointer"
                        >
                          {copiedHex === token.hex ? (
                            <>
                              <Check className="w-3 h-3 text-[#007580]" /> Copié
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-[#526669]" /> {token.hex}
                            </>
                          )}
                        </button>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#526669]">
                          <span>{token.role}</span>
                          <span className="font-mono tabular-nums font-medium text-[#007580]">
                            {token.usageRatio}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-[#1A2B2E] mt-0.5">
                          {token.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-[#526669] leading-relaxed border-t border-[#DADADA] pt-3">
                      {token.stripeMapping}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography Mapping */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#DADADA] rounded-2xl p-6 space-y-3">
                <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
                  Titres & Affichage · Caviar Dreams → Outfit (ou auto-hébergée)
                </p>
                <p className="text-3xl font-light tracking-tight text-[#1A2B2E]" style={{ fontFamily: 'var(--font-display)' }}>
                  Décrochez du quotidien grâce à la créativité.
                </p>
                <p className="text-xs text-[#526669] leading-relaxed">
                  La police <strong>Caviar Dreams</strong> de votre guide de marque possède des formes géométriques circulaires épurées. Pour le Web (vitesse Astro et accents français parfaits), <strong>Outfit</strong> (graisses 300/600) ou l’auto-hébergement WOFF2 de Caviar Dreams pour les grands titres garantit une fidélité visuelle sans pénaliser les Core Web Vitals.
                </p>
              </div>

              <div className="bg-white border border-[#DADADA] rounded-2xl p-6 space-y-3">
                <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
                  Corps de texte & Accent script · Plus Jakarta Sans + Biloxi Script
                </p>
                <p className="text-base text-[#1A2B2E] leading-relaxed">
                  Un texte courant en 16px (interligne 1.7, largeur 68 caractères) assure une lecture reposante de vos tutoriels et listes de mesures, tout en réservant la calligraphie <em>Biloxi Script</em> uniquement au logo et à la signature personnelle d’Andrée.
                </p>
                <p className="text-xs text-[#526669] leading-relaxed">
                  Ton éditorial : chaleureux, francophone québécois authentique, rassurant et axé sur le plaisir de créer sans pression.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WIREFRAMES & CONVERSION UPGRADES */}
        {activeSection === 'wireframes' && (
          <div className="space-y-6">
            {/* Page Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {WIREFRAME_BLUEPRINTS.map((bp, idx) => (
                <button
                  key={bp.page}
                  type="button"
                  onClick={() => setSelectedWireframeIdx(idx)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    selectedWireframeIdx === idx
                      ? 'bg-[#007580] text-white'
                      : 'bg-white text-[#526669] border border-[#DADADA] hover:text-[#1A2B2E]'
                  }`}
                >
                  {bp.page}
                </button>
              ))}
            </div>

            <div className="bg-white border border-[#DADADA] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DADADA] pb-5">
                <div>
                  <p className="text-xs font-mono text-[#007580]">{activeWireframe.route}</p>
                  <h2 className="text-2xl font-semibold text-[#1A2B2E] mt-0.5">
                    Plan section par section : {activeWireframe.page}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const mapRoute: Record<string, RouteSlug> = {
                      Accueil: '/',
                      'Archive du Blog': '/blog/',
                      'Article de Blog': '/one-sheet-wonder-murmure-des-bois/',
                      'Boutique & Club de cartes': '/la-boutique/',
                      'Joindre l’équipe & Contact': '/scrapbookeusespassionnees/',
                    };
                    onOpenPrototypeRoute(mapRoute[activeWireframe.page] || '/');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
                >
                  Voir le prototype interactif
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Friction Diagnosis */}
              <div className="bg-[#FAF1D1]/50 border border-[#DADADA] rounded-xl p-4 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1A2B2E]">
                  Diagnostic du site WordPress actuel
                </p>
                <p className="text-sm text-[#526669] leading-relaxed">{activeWireframe.diagnosis}</p>
              </div>

              {/* Section-by-Section Blueprint */}
              <div className="space-y-3">
                {activeWireframe.sections.map((sec) => (
                  <div
                    key={sec.order}
                    className="border border-[#DADADA] rounded-xl p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
                  >
                    <div className="md:col-span-4 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-[#526669]">
                        <span className="font-mono font-semibold text-[#007580]">{sec.order}</span>
                        {sec.isNew && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="font-medium text-[#007580]">Nouveau / Restructuré</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-base font-semibold text-[#1A2B2E]">{sec.name}</h3>
                    </div>

                    <div className="md:col-span-4 text-xs text-[#526669] space-y-1">
                      <p className="font-medium text-[#1A2B2E]">Modèle ADN (Stripe)</p>
                      <p className="leading-relaxed">{sec.dnaPattern}</p>
                    </div>

                    <div className="md:col-span-4 text-xs text-[#526669] space-y-1">
                      <p className="font-medium text-[#1A2B2E]">Rôle stratégique & Conversion</p>
                      <p className="leading-relaxed">{sec.conversionPurpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
