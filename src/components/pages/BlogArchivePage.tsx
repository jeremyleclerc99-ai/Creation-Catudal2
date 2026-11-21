import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Play,
  Search,
} from 'lucide-react';
import { ALL_CATEGORIES, ALL_POSTS, type DynamicPost } from '../../data/posts';
import type { RouteSlug } from '../../data/siteArchitecture';

interface BlogArchivePageProps {
  onNavigate: (route: RouteSlug) => void;
}

const POSTS_PER_PAGE = 12;

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | 'ellipsis')[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push('ellipsis');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push('ellipsis');
  pages.push(total);
  return pages;
}

export const BlogArchivePage: React.FC<BlogArchivePageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [failedCovers, setFailedCovers] = useState<Record<string, boolean>>({});

  const markCoverFailed = (slug: string) => {
    setFailedCovers((prev) => (prev[slug] ? prev : { ...prev, [slug]: true }));
  };

  const categories = useMemo(() => ['Tous', ...ALL_CATEGORIES], []);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_POSTS.filter((post) => {
      const matchesCat =
        selectedCategory === 'Tous' || post.categories.includes(selectedCategory);
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.slug.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q) ||
        post.categories.some((c) => c.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedPosts = useMemo(() => {
    const start = (safePage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, safePage]);

  const featured = ALL_POSTS[0];

  const handleOpenPost = (post: DynamicPost) => {
    onNavigate(post.route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    const clamped = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(clamped);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startItem = filteredPosts.length === 0 ? 0 : (safePage - 1) * POSTS_PER_PAGE + 1;
  const endItem = Math.min(safePage * POSTS_PER_PAGE, filteredPosts.length);

  return (
    <div className="bg-white text-[#1A2B2E]">
      {/* Header & Instant Filters */}
      <section className="border-b border-[#E5D4D3] bg-gradient-to-b from-[#E5D4D3]/30 to-[#F8FAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
                Blog créatif · Tutoriels & Projets
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1A2B2E]">
                Le Blog créatif
              </h1>
              <p className="text-sm sm:text-base text-[#526669]">
                {ALL_POSTS.length} {ALL_POSTS.length > 1 ? 'publications' : 'publication'} — cartes, tutoriels vidéo, techniques Stampin’ Up! et blog hops classés par thème.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#526669] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Rechercher un article, un slug..."
                aria-label="Rechercher un article du blog"
                className="w-full pl-10 pr-3.5 py-2 text-sm bg-white border border-[#DADADA] rounded-lg focus:outline-none focus:border-[#007580]"
              />
            </div>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filtrer par catégorie">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleSelectCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-[#007580] text-white'
                        : 'bg-white text-[#526669] border border-[#DADADA] hover:text-[#1A2B2E]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-[#526669] tabular-nums">
              {filteredPosts.length} {filteredPosts.length > 1 ? 'résultats' : 'résultat'}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Featured Latest Post */}
        {featured && selectedCategory === 'Tous' && !searchQuery && safePage === 1 && (
          <article className="bg-gradient-to-br from-[#E5D4D3]/35 via-[#F8FAFA] to-white border border-[#E5D4D3] rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div
                className="aspect-[4/3] rounded-xl overflow-hidden border border-[#DADADA] bg-white flex items-center justify-center"
                style={
                  !featured.coverImage || failedCovers[featured.slug]
                    ? {
                        background: `linear-gradient(135deg, ${featured.accentColor}45 0%, #F8FAFA 100%)`,
                      }
                    : undefined
                }
              >
                {featured.coverImage && !failedCovers[featured.slug] ? (
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    referrerPolicy="no-referrer"
                    onError={() => markCoverFailed(featured.slug)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="p-6 text-center space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#DADADA] text-[#007580] flex items-center justify-center mx-auto">
                      <FileText className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-medium text-[#526669]">{featured.title}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#526669]">
                <span className="font-medium text-[#007580]">Publication récente</span>
                {featured.categories.length > 0 && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{featured.categories.join(' · ')}</span>
                  </>
                )}
                {featured.formattedDate && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{featured.formattedDate}</span>
                  </>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A2B2E]">
                {featured.title}
              </h2>
              <p className="text-sm sm:text-base text-[#526669] leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleOpenPost(featured)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors cursor-pointer"
                >
                  Lire la publication
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-[#526669]">
                  /{featured.slug}/
                </span>
              </div>
            </div>
          </article>
        )}

        {/* 3-Column Post Grid (Clean White Surfaces, Zero Pill Sandwiches) */}
        {filteredPosts.length === 0 ? (
          <div className="border border-[#DADADA] rounded-2xl p-10 text-center space-y-3">
            <p className="text-base font-medium text-[#1A2B2E]">
              Aucun article ne correspond à votre recherche.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Tous');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="text-sm font-medium text-[#007580] hover:underline cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map((post) => {
                const categoryLabel =
                  post.categories.length > 0
                    ? post.categories.slice(0, 2).join(' · ')
                    : post.everestForm
                    ? 'Formulaire'
                    : 'Article';

                return (
                  <article
                    key={post.slug}
                    className="group bg-white border border-[#DADADA] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#007580] transition-colors"
                  >
                    <div>
                      {/* Photographic Card Cover with Resilient Gradient Fallback */}
                      <div
                        className="aspect-[4/3] relative overflow-hidden border-b border-[#DADADA] flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${post.accentColor}45 0%, #F8FAFA 100%)`,
                        }}
                      >
                        {post.coverImage && !failedCovers[post.slug] ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            onError={() => markCoverFailed(post.slug)}
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                          />
                        ) : (
                          <div className="px-5 text-center space-y-2">
                            <div className="w-10 h-10 rounded-xl bg-white/90 border border-[#DADADA] text-[#007580] flex items-center justify-center mx-auto">
                              <FileText className="w-5 h-5" />
                            </div>
                            <p className="text-xs font-medium text-[#526669] line-clamp-2 max-w-[220px]">
                              {post.title}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="p-5 space-y-2.5">
                        {/* Unboxed Metadata with middot separators */}
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#526669]">
                          <span>{categoryLabel}</span>
                          {post.formattedDate && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{post.formattedDate}</span>
                            </>
                          )}
                          {post.hasVideo && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="inline-flex items-center gap-1 text-[#007580] font-medium">
                                <Play className="w-3 h-3" /> Vidéo
                              </span>
                            </>
                          )}
                        </div>

                        <h3 className="text-lg font-semibold text-[#1A2B2E] group-hover:text-[#007580] transition-colors leading-snug">
                          <button
                            type="button"
                            onClick={() => handleOpenPost(post)}
                            className="text-left cursor-pointer"
                          >
                            {post.title}
                          </button>
                        </h3>

                        <p className="text-sm text-[#526669] leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => handleOpenPost(post)}
                        className="font-medium text-[#007580] hover:text-[#0095A9] inline-flex items-center gap-1 cursor-pointer"
                      >
                        {post.everestForm ? 'Ouvrir le formulaire' : 'Voir le projet'}{' '}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[#526669]">{post.readTime}</span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <nav
              aria-label="Pagination du blog"
              className="pt-4 border-t border-[#DADADA] flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <p className="text-xs text-[#526669] tabular-nums">
                Affichage {startItem}–{endItem} sur {filteredPosts.length} · Page {safePage} sur {totalPages}
              </p>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage <= 1}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#DADADA] bg-white text-[#1A2B2E] hover:border-[#007580] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Précédent
                </button>

                {getPageNumbers(safePage, totalPages).map((item, idx) =>
                  item === 'ellipsis' ? (
                    <span
                      key={`el-${idx}`}
                      className="px-2 text-xs text-[#526669]"
                      aria-hidden="true"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      type="button"
                      onClick={() => goToPage(item)}
                      aria-current={item === safePage ? 'page' : undefined}
                      className={`min-w-[32px] h-8 px-2.5 text-xs font-medium rounded-lg transition-colors tabular-nums cursor-pointer ${
                        item === safePage
                          ? 'bg-[#007580] text-white'
                          : 'bg-white text-[#526669] border border-[#DADADA] hover:border-[#007580] hover:text-[#1A2B2E]'
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage >= totalPages}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#DADADA] bg-white text-[#1A2B2E] hover:border-[#007580] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  Suivant
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </nav>
          </div>
        )}

        {/* Inline Mid-Archive Lead Magnet */}
        <section className="bg-gradient-to-r from-[#E5D4D3]/45 via-[#FAF1D1]/45 to-[#E5D4D3]/30 border border-[#E5D4D3] rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
              Ne manquez aucun tutoriel
            </p>
            <h2 className="text-xl font-semibold text-[#1A2B2E]">
              Recevez mes nouveaux plans de coupe et idées de cartes par courriel
            </h2>
          </div>

          {newsletterDone ? (
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#007580] bg-white border border-[#DADADA] px-4 py-2.5 rounded-lg">
              <Check className="w-4 h-4" /> Merci ! Vérifiez votre boîte de réception.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail.includes('@')) setNewsletterDone(true);
              }}
              className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="votre@courriel.com"
                className="px-3.5 py-2.5 text-sm bg-white border border-[#DADADA] rounded-lg focus:outline-none focus:border-[#007580] min-w-[240px]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 text-sm font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                M’abonner gratuitement
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};
