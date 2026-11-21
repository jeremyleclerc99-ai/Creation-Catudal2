import React from 'react';
import { BrandMark } from './BrandMark';
import type { RouteSlug } from '../data/siteArchitecture';
import { ALL_POSTS } from '../data/posts';

interface SiteFooterProps {
  onNavigate: (route: RouteSlug) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const go = (route: RouteSlug) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#E5D4D3] bg-gradient-to-b from-[#E5D4D3]/30 to-[#F8FAFA] text-[#526669]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#E5D4D3]">
          <div className="md:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => go('/')}
              className="text-left cursor-pointer"
            >
              <BrandMark />
            </button>
            <p className="text-sm leading-relaxed max-w-xs">
              Démonstratrice indépendante Stampin’ Up!® depuis octobre 2013 et fondatrice de l’Académie créative.
            </p>
            <div className="text-sm space-y-1">
              <p>
                <a
                  href="mailto:andree.creation.su@gmail.com"
                  className="text-[#007580] hover:underline font-medium"
                >
                  andree.creation.su@gmail.com
                </a>
              </p>
              <p className="tabular-nums text-[#526669]">819 930-6738</p>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A2B2E]">
              Créer & Apprendre
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button type="button" onClick={() => go('/blog/')} className="hover:text-[#007580] cursor-pointer">
                  Blog créatif ({ALL_POSTS.length} projets)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('/tutoriels/')} className="hover:text-[#007580] cursor-pointer">
                  Tutoriels gratuits
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('/club-creatif-stampin-up/')}
                  className="hover:text-[#007580] cursor-pointer"
                >
                  Club de cartes & Académie
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('/one-sheet-wonder-murmure-des-bois/')}
                  className="hover:text-[#007580] cursor-pointer"
                >
                  One Sheet Wonder
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A2B2E]">
              Boutique & Communauté
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => go('/la-boutique/')}
                  className="hover:text-[#007580] cursor-pointer"
                >
                  Boutique Stampin’ Up!
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('/catalogues-stampinup/')}
                  className="hover:text-[#007580] cursor-pointer"
                >
                  Catalogues en vigueur
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('/scrapbookeusespassionnees/')}
                  className="hover:text-[#007580] cursor-pointer"
                >
                  Joindre Les Scrapbookeuses passionnées!
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('/a-propos/')} className="hover:text-[#007580] cursor-pointer">
                  À propos d’Andrée
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A2B2E]">
              Réseaux
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#007580]"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#007580]"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#007580]"
                >
                  Instagram
                </a>
              </li>
              <li>
                <button type="button" onClick={() => go('/contact/')} className="hover:text-[#007580] cursor-pointer">
                  Me contacter
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#526669]">
          <p>
            © 2026 Andrée Catudal. Tous droits réservés. En tant que démonstratrice indépendante Stampin’ Up!®, je suis seule responsable du contenu de ce site Web ainsi que des cours, services et produits qui y sont proposés.
          </p>
        </div>
      </div>
    </footer>
  );
};
