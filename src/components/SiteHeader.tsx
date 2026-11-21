import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';
import type { RouteSlug } from '../data/siteArchitecture';

interface SiteHeaderProps {
  currentRoute: RouteSlug;
  onNavigate: (route: RouteSlug) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ currentRoute, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { label: string; route: RouteSlug; activeRoutes: RouteSlug[] }[] = [
    { label: 'Accueil', route: '/', activeRoutes: ['/'] },
    {
      label: 'Blog',
      route: '/blog/',
      activeRoutes: ['/blog/', '/one-sheet-wonder-murmure-des-bois/'],
    },
    {
      label: 'Boutique',
      route: '/la-boutique/',
      activeRoutes: [
        '/la-boutique/',
        '/boutique/',
        '/boutique/#tutoriels',
        '/club-creatif-stampin-up/',
        '/catalogues-stampinup/',
      ],
    },
    {
      label: 'Équipe',
      route: '/scrapbookeusespassionnees/',
      activeRoutes: ['/scrapbookeusespassionnees/'],
    },
    {
      label: 'À propos',
      route: '/a-propos/',
      activeRoutes: ['/a-propos/'],
    },
  ];

  const handleNav = (route: RouteSlug) => {
    onNavigate(route);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-[#E5D4D3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand wordmark */}
        <button
          type="button"
          onClick={() => handleNav('/')}
          className="text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#007580] rounded-md shrink-0 cursor-pointer"
          aria-label="Accueil Création Catudal"
        >
          <BrandMark />
        </button>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Navigation principale">
          {navItems.map((item) => {
            const baseRoute = currentRoute.split('#')[0] || '/';
            const nonBlogStaticRoutes = [
              '/',
              '/la-boutique/',
              '/boutique/',
              '/club-creatif-stampin-up/',
              '/catalogues-stampinup/',
              '/scrapbookeusespassionnees/',
              '/a-propos/',
              '/contact/',
            ];
            const isActive =
              item.route === '/blog/'
                ? item.activeRoutes.includes(currentRoute) || !nonBlogStaticRoutes.includes(baseRoute)
                : item.activeRoutes.includes(currentRoute) || item.activeRoutes.includes(baseRoute as RouteSlug);
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => handleNav(item.route)}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-[#007580]'
                    : 'text-[#526669] hover:text-[#1A2B2E]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-[#007580] to-[#E3B9B3] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNav('/contact/')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Me contacter
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#DADADA] text-[#1A2B2E] hover:bg-[#F6F8F8]"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E5D4D3] bg-[#E5D4D3]/15 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const baseRoute = currentRoute.split('#')[0] || '/';
            const nonBlogStaticRoutes = [
              '/',
              '/la-boutique/',
              '/boutique/',
              '/club-creatif-stampin-up/',
              '/catalogues-stampinup/',
              '/scrapbookeusespassionnees/',
              '/a-propos/',
              '/contact/',
            ];
            const isActive =
              item.route === '/blog/'
                ? item.activeRoutes.includes(currentRoute) || !nonBlogStaticRoutes.includes(baseRoute)
                : item.activeRoutes.includes(currentRoute) || item.activeRoutes.includes(baseRoute as RouteSlug);
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => handleNav(item.route)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#E5D4D3]/45 text-[#007580]'
                    : 'text-[#1A2B2E] hover:bg-[#E5D4D3]/25'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => handleNav('/contact/')}
            className="w-full mt-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-[#007580] hover:bg-[#0095A9]"
          >
            Me contacter
          </button>
        </div>
      )}
    </header>
  );
};
