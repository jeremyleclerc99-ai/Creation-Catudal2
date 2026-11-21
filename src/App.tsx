import { useEffect, useState } from 'react';
import { Compass, Layout } from 'lucide-react';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { HomePage } from './components/pages/HomePage';
import { BlogArchivePage } from './components/pages/BlogArchivePage';
import { SinglePostPage } from './components/pages/SinglePostPage';
import { CorePages } from './components/pages/CorePages';
import { StrategyBlueprintView } from './components/StrategyBlueprintView';
import { ALL_POSTS, normalizeSlug } from './data/posts';
import type { RouteSlug } from './data/siteArchitecture';

const CORE_PAGE_ROUTES = new Set<string>([
  '/la-boutique/',
  '/boutique/',
  '/club-creatif-stampin-up/',
  '/catalogues-stampinup/',
  '/scrapbookeusespassionnees/',
  '/a-propos/',
  '/contact/',
]);

function normalizeRoutePath(input: string): RouteSlug {
  const trimmed = input.trim();
  if (!trimmed || trimmed === '/') return '/';

  const [rawPath, rawHash] = trimmed.split('#');
  const withoutSlashes = rawPath.replace(/^\/+|\/+$/g, '');

  if (withoutSlashes.toLowerCase() === 'tutoriels') {
    return '/boutique/#tutoriels';
  }

  const basePath = withoutSlashes ? `/${withoutSlashes}/` : '/';
  return (rawHash ? `${basePath}#${rawHash}` : basePath) as RouteSlug;
}

function getInitialRoute(): RouteSlug {
  if (typeof window === 'undefined') return '/';
  const raw = `${window.location.pathname}${window.location.hash || ''}`;
  const normalized = normalizeRoutePath(raw);
  if (raw.replace(/\/+$/, '').toLowerCase() === '/tutoriels') {
    try {
      window.history.replaceState({}, '', '/boutique/#tutoriels');
    } catch {
      // Ignore history errors in restricted frames
    }
  }
  return normalized;
}

export default function App() {
  const [workspaceMode, setWorkspaceMode] = useState<'blueprint' | 'prototype'>('prototype');
  const [currentRoute, setCurrentRoute] = useState<RouteSlug>(getInitialRoute);

  useEffect(() => {
    const syncFromLocation = () => {
      const raw = `${window.location.pathname}${window.location.hash || ''}`;
      const normalized = normalizeRoutePath(raw);
      if (raw.replace(/\/+$/, '').toLowerCase() === '/tutoriels') {
        try {
          window.history.replaceState({}, '', '/boutique/#tutoriels');
        } catch {
          // Ignore
        }
      }
      setCurrentRoute(normalized);
    };
    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('hashchange', syncFromLocation);
    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener('hashchange', syncFromLocation);
    };
  }, []);

  useEffect(() => {
    if (workspaceMode !== 'prototype') return;
    const [, hash] = currentRoute.split('#');
    if (hash) {
      const timer = window.setTimeout(() => {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
      return () => window.clearTimeout(timer);
    }
  }, [currentRoute, workspaceMode]);

  const navigateTo = (route: RouteSlug) => {
    const normalized = normalizeRoutePath(route);
    setCurrentRoute(normalized);
    try {
      const currentFull = `${window.location.pathname}${window.location.hash || ''}`;
      if (currentFull !== normalized) {
        window.history.pushState({}, '', normalized);
      }
    } catch {
      // Ignore history errors in restricted frames
    }
    const [, hash] = normalized.split('#');
    if (hash) {
      window.setTimeout(() => {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    }
  };

  const openPrototypeAt = (route: RouteSlug) => {
    navigateTo(route);
    setWorkspaceMode('prototype');
    if (!route.includes('#')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const baseRoute = (currentRoute.split('#')[0] || '/') as RouteSlug;

  const renderPrototypeRoute = () => {
    if (baseRoute === '/') {
      return <HomePage onNavigate={navigateTo} />;
    }
    if (baseRoute === '/blog/') {
      return <BlogArchivePage onNavigate={navigateTo} />;
    }
    if (CORE_PAGE_ROUTES.has(baseRoute)) {
      return <CorePages route={currentRoute} onNavigate={navigateTo} />;
    }
    const slug = normalizeSlug(baseRoute);
    return <SinglePostPage slug={slug} onNavigate={navigateTo} />;
  };

  const previewPosts = ALL_POSTS.slice(0, 20);
  const isCustomSlugSelected =
    baseRoute !== '/' &&
    baseRoute !== '/blog/' &&
    !CORE_PAGE_ROUTES.has(baseRoute) &&
    baseRoute !== '/one-sheet-wonder-murmure-des-bois/' &&
    !previewPosts.some((p) => p.route === baseRoute);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1A2B2E]">
      {/* Non-sticky Studio Mode & URL Bar */}
      <div className="bg-[#1A2B2E] text-white border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-0.5 bg-white/10 rounded-lg">
            <button
              type="button"
              onClick={() => setWorkspaceMode('prototype')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                workspaceMode === 'prototype'
                  ? 'bg-white text-[#1A2B2E]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              Prototype interactif
            </button>
            <button
              type="button"
              onClick={() => setWorkspaceMode('blueprint')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                workspaceMode === 'blueprint'
                  ? 'bg-white text-[#1A2B2E]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Plan SEO, Charte & Wireframes
            </button>
          </div>

          {workspaceMode === 'prototype' && (
            <div className="flex items-center gap-2 text-xs text-white/80 overflow-x-auto">
              <span className="text-white/50 hidden sm:inline">URL simulée :</span>
              <select
                aria-label="Naviguer vers une URL préservée"
                value={currentRoute}
                onChange={(e) => navigateTo(e.target.value as RouteSlug)}
                className="bg-white/10 text-white font-mono text-xs px-2.5 py-1 rounded border border-white/15 focus:outline-none cursor-pointer max-w-[340px]"
              >
                <option className="text-[#1A2B2E]" value="/">https://creationcatudal.com/</option>
                <option className="text-[#1A2B2E]" value="/blog/">https://creationcatudal.com/blog/</option>
                {previewPosts.map((post) => (
                  <option key={post.slug} className="text-[#1A2B2E]" value={post.route}>
                    https://creationcatudal.com{post.route}
                  </option>
                ))}
                {isCustomSlugSelected && (
                  <option className="text-[#1A2B2E]" value={currentRoute}>
                    https://creationcatudal.com{currentRoute}
                  </option>
                )}
                {!ALL_POSTS.some((p) => p.slug === 'one-sheet-wonder-murmure-des-bois') && (
                  <option className="text-[#1A2B2E]" value="/one-sheet-wonder-murmure-des-bois/">
                    https://creationcatudal.com/one-sheet-wonder-murmure-des-bois/
                  </option>
                )}
                <option className="text-[#1A2B2E]" value="/la-boutique/">https://creationcatudal.com/la-boutique/</option>
                <option className="text-[#1A2B2E]" value="/boutique/#tutoriels">https://creationcatudal.com/boutique/#tutoriels</option>
                <option className="text-[#1A2B2E]" value="/club-creatif-stampin-up/">
                  https://creationcatudal.com/club-creatif-stampin-up/
                </option>
                <option className="text-[#1A2B2E]" value="/catalogues-stampinup/">
                  https://creationcatudal.com/catalogues-stampinup/
                </option>
                <option className="text-[#1A2B2E]" value="/scrapbookeusespassionnees/">
                  https://creationcatudal.com/scrapbookeusespassionnees/
                </option>
                <option className="text-[#1A2B2E]" value="/a-propos/">https://creationcatudal.com/a-propos/</option>
                <option className="text-[#1A2B2E]" value="/contact/">https://creationcatudal.com/contact/</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {workspaceMode === 'blueprint' ? (
        <main className="flex-1">
          <StrategyBlueprintView onOpenPrototypeRoute={openPrototypeAt} />
        </main>
      ) : (
        <>
          <SiteHeader currentRoute={currentRoute} onNavigate={navigateTo} />
          <main className="flex-1">{renderPrototypeRoute()}</main>
          <SiteFooter onNavigate={navigateTo} />
        </>
      )}
    </div>
  );
}
