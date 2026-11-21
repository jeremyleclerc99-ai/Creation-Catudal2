import rawPostsData from './posts.json';
import rawAssetMap from './assetMap.json';
import { withBase, type RouteSlug } from './siteArchitecture';

const ASSET_MAP = rawAssetMap as Record<string, string>;

export interface RawJsonPost {
  slug: string;
  title: string;
  date: string;
  categories?: unknown;
  tags?: unknown;
  content: string;
  excerpt?: string;
  coverImage?: string;
  image?: string;
}

export interface EverestFormField {
  id: string;
  type: string;
  label: string;
  description?: string;
  required?: string;
  'required-field-message'?: string;
  placeholder?: string;
  default_value?: string;
  options?: Record<string, { label?: string; value?: string }> | string[];
}

export interface EverestFormRow {
  rowKey: string;
  grids: string[][];
}

export interface EverestFormConfig {
  id: string;
  title: string;
  description?: string;
  submitText: string;
  successMessage: string;
  fields: Record<string, EverestFormField>;
  rows: EverestFormRow[];
}

export interface DynamicPost {
  slug: string;
  route: RouteSlug;
  title: string;
  date: string;
  formattedDate: string;
  fullDate: string;
  categories: string[];
  content: string;
  excerpt: string;
  coverImage: string | null;
  galleryImages: string[];
  hasVideo: boolean;
  readTime: string;
  accentColor: string;
  everestForm: EverestFormConfig | null;
}

const ACCENT_PALETTE = ['#E3B9B3', '#FAF1D1', '#7CA7AD', '#AFC6B7', '#E5D4D3'];

export function normalizeSlug(slug: string): string {
  return slug.trim().replace(/^\/+|\/+$/g, '');
}

export function slugToRoute(slug: string): RouteSlug {
  const clean = normalizeSlug(slug);
  return (clean ? `/${clean}/` : '/') as RouteSlug;
}

export function decodeHtmlEntities(input: string): string {
  if (!input) return '';
  return input
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;|&rsquo;|&#8217;/gi, '’')
    .replace(/&lsquo;|&#8216;/gi, '‘')
    .replace(/&ldquo;|&#8220;/gi, '« ')
    .replace(/&rdquo;|&#8221;/gi, ' »')
    .replace(/&laquo;/gi, '«')
    .replace(/&raquo;/gi, '»')
    .replace(/&ndash;|&#8211;/gi, '–')
    .replace(/&mdash;|&#8212;/gi, '—')
    .replace(/&hellip;|&#8230;/gi, '…')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(Number(num)))
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'");
}

export function stripLegacyEmbeds(content: string): string {
  if (!content) return '';
  return content
    .replace(/<iframe[^>]*mystampinblog[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
}

function safeDecodeUriComponent(str: string): string {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
}

export function resolveAssetUrl(rawUrl: string | undefined | null): string | null {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith('/assets/aistudio/')) {
    return withBase(trimmed);
  }

  const withoutQuery = trimmed.split(/[?#]/)[0];
  const segments = withoutQuery.split('/');
  const rawFilename = safeDecodeUriComponent(segments[segments.length - 1] || '');
  const filename = rawFilename.toLowerCase().normalize('NFC');

  if (filename) {
    const asciiFilename = filename.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (ASSET_MAP[filename]) return withBase(ASSET_MAP[filename]);
    if (ASSET_MAP[asciiFilename]) return withBase(ASSET_MAP[asciiFilename]);

    const dotIdx = filename.lastIndexOf('.');
    if (dotIdx > 0) {
      const stem = filename.slice(0, dotIdx);
      const ext = filename.slice(dotIdx);
      const candidates = [
        stem.replace(/-\d+x\d+$/, '') + ext,
        stem.replace(/-scaled$/, '') + ext,
        stem.replace(/-scaled-\d+x\d+$/, '') + ext,
        stem.replace(/-\d+x\d+-scaled$/, '') + ext,
        stem.replace(/-e\d{10,}$/, '') + ext,
        stem.replace(/-\d+x\d+$/, '').replace(/-scaled$/, '') + ext,
      ];
      for (const candidate of candidates) {
        if (ASSET_MAP[candidate]) return withBase(ASSET_MAP[candidate]);
        const asciiCand = candidate.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (ASSET_MAP[asciiCand]) return withBase(ASSET_MAP[asciiCand]);
      }
    }
  }

  // Relative WordPress paths (images/...) or legacy creationcatudal.com upload URLs not in ASSET_MAP
  // should return null rather than producing broken 404 image elements.
  if (
    !/^https?:\/\//i.test(trimmed) ||
    /creationcatudal\.com\/wp-content\//i.test(trimmed) ||
    /mystampinblog\.com/i.test(trimmed)
  ) {
    return null;
  }

  return trimmed;
}

function parseEverestForm(content: string): EverestFormConfig | null {
  const trimmed = content.trim();
  if (!trimmed.startsWith('{') || !trimmed.includes('form')) {
    return null;
  }

  try {
    const cleaned = trimmed.replace(/\\([_\[\]])/g, '$1').replace(/\\\\/g, '\\');
    const parsed = JSON.parse(cleaned) as Record<string, unknown>;

    if (!parsed || typeof parsed !== 'object' || !parsed.form_fields) {
      return null;
    }

    const rawFields = parsed.form_fields as Record<string, EverestFormField>;
    const settings = (parsed.settings || {}) as Record<string, unknown>;
    const structure = (parsed.structure || {}) as Record<string, Record<string, unknown>>;

    const rows: EverestFormRow[] = Object.entries(structure)
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
      .map(([rowKey, rowValue]) => {
        const grids = Object.entries(rowValue || {})
          .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
          .map(([, gridVal]) => (Array.isArray(gridVal) ? gridVal.filter((x): x is string => typeof x === 'string') : []))
          .filter((grid) => grid.length > 0);
        return { rowKey, grids };
      })
      .filter((row) => row.grids.length > 0);

    if (rows.length === 0) {
      const allIds = Object.keys(rawFields);
      if (allIds.length > 0) {
        rows.push({ rowKey: 'row_1', grids: [allIds] });
      }
    }

    const rawSubmit = String(settings.submit_button_text || 'Envoyer');
    const submitText = rawSubmit.toLowerCase() === 'submit' ? 'Envoyer' : rawSubmit;

    return {
      id: String(parsed.id || ''),
      title: String(settings.form_title || ''),
      description: settings.form_description ? String(settings.form_description) : undefined,
      submitText,
      successMessage: String(
        settings.successful_form_submission_message ||
          'Merci pour votre message ! Nous vous contacterons sous peu.'
      ),
      fields: rawFields,
      rows,
    };
  } catch {
    return null;
  }
}

function normalizeCategories(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .map((item) => {
        if (typeof item === 'string') return decodeHtmlEntities(item.trim());
        if (item && typeof item === 'object' && 'name' in item) {
          return decodeHtmlEntities(String((item as { name: unknown }).name).trim());
        }
        return '';
      })
      .filter(Boolean);
  }
  if (typeof raw === 'string') {
    return raw
      .split(',')
      .map((s) => decodeHtmlEntities(s.trim()))
      .filter(Boolean);
  }
  return [];
}

function deriveFallbackCategories(
  title: string,
  slug: string,
  content: string,
  hasVideo: boolean
): string[] {
  const haystack = `${title} ${slug} ${content}`.toLowerCase();
  const derived: string[] = [];

  if (/blog[\s-]?hop/.test(haystack)) derived.push('Blog Hop');
  if (hasVideo || /\bvid[ée]os?\b/.test(haystack)) derived.push('Vidéos');
  if (/no[ëe]l|temps des f[êe]tes|flocons?|sapin|hiver/.test(haystack)) derived.push('Noël');
  if (/technique|pliage|embossage|aquarelle|wash|one sheet|pochoir|brosse/.test(haystack)) {
    derived.push('Techniques');
  }
  if (/tutoriel|pas[- ]à[- ]pas|mesures|plan de coupe|\bcours\b/.test(haystack)) {
    derived.push('Tutoriels');
  }
  if (/bo[îi]te|sac\b|emballage|calendrier/.test(haystack)) {
    derived.push('Boîtes & Emballages');
  }
  if (/\bcartes?\b/.test(haystack)) derived.push('Cartes');

  return derived.length > 0 ? derived : ['Inspiration'];
}

function formatFrenchDates(dateStr: string): { short: string; full: string; timestamp: number } {
  if (!dateStr) return { short: '', full: '', timestamp: 0 };
  const normalized = dateStr.includes('T') || dateStr.includes(' ')
    ? dateStr.replace(' ', 'T')
    : `${dateStr}T12:00:00`;
  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) {
    return { short: dateStr, full: dateStr, timestamp: 0 };
  }
  const short = new Intl.DateTimeFormat('fr-CA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
  const full = new Intl.DateTimeFormat('fr-CA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed);
  return { short, full, timestamp: parsed.getTime() };
}

function extractImagesFromContent(content: string): string[] {
  const urls: string[] = [];
  const seen = new Set<string>();

  const addUrl = (candidate: string | undefined | null) => {
    const resolved = resolveAssetUrl(candidate);
    if (!resolved) return;
    if (resolved.includes('woocommerce-placeholder')) return;
    if (!seen.has(resolved)) {
      seen.add(resolved);
      urls.push(resolved);
    }
  };

  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = imgRegex.exec(content)) !== null) {
    addUrl(m[1]);
  }

  const mdImgRegex = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  while ((m = mdImgRegex.exec(content)) !== null) {
    addUrl(m[1]);
  }

  return urls;
}

function stripContentToPlainText(content: string): string {
  return decodeHtmlEntities(
    stripLegacyEmbeds(content)
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      // Remove linked markdown images [![alt](img)](url) and standard ![alt](img)
      .replace(/\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      // Replace Markdown links [label](url) with label
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      // Remove WordPress shortcodes like [caption ...]
      .replace(/\[\/?[a-z0-9_-]+(?:\s+[^\]]*)?\]/gi, ' ')
      // Strip Markdown formatting symbols
      .replace(/```/g, ' ')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/\\([_*[\]])/g, '$1')
      .replace(/[*_`~>]/g, '')
      // Remove raw URLs
      .replace(/https?:\/\/\S+/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

function truncateAtWord(text: string, maxLen = 165): string {
  if (text.length <= maxLen) return text;
  const slice = text.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(' ');
  return `${(lastSpace > 80 ? slice.slice(0, lastSpace) : slice).trim()}…`;
}

function detectVideo(content: string): boolean {
  return /(?:youtube\.com|youtu\.be|vimeo\.com|<video|<iframe[^>]+youtube)/i.test(content);
}

const rawList = (Array.isArray(rawPostsData) ? rawPostsData : []) as RawJsonPost[];

export const ALL_POSTS: DynamicPost[] = rawList
  .map((raw, index) => {
    const slug = normalizeSlug(raw.slug || `article-${index + 1}`);
    const title = decodeHtmlEntities(raw.title || slug);
    const rawContent = typeof raw.content === 'string' ? raw.content : '';
    const everestForm = parseEverestForm(rawContent);
    const content = everestForm ? rawContent : stripLegacyEmbeds(rawContent);
    const dates = formatFrenchDates(raw.date || '');

    const hasVideo = !everestForm && detectVideo(content);
    const explicitCategories = normalizeCategories(raw.categories);
    const categories =
      explicitCategories.length > 0
        ? explicitCategories
        : everestForm
        ? ['Formulaires']
        : deriveFallbackCategories(title, slug, content, hasVideo);

    const extractedImages = extractImagesFromContent(content);
    const explicitCover = resolveAssetUrl(raw.coverImage || raw.image);
    const coverImage = explicitCover || extractedImages[0] || null;
    const galleryImages =
      explicitCover && !extractedImages.includes(explicitCover)
        ? [explicitCover, ...extractedImages]
        : extractedImages;

    let excerpt = '';
    if (raw.excerpt) {
      excerpt = truncateAtWord(stripContentToPlainText(raw.excerpt));
    } else if (everestForm) {
      const fieldLabels = everestForm.rows
        .flatMap((r) => r.grids.flat())
        .map((id) => everestForm.fields[id]?.label)
        .filter(Boolean);
      excerpt =
        fieldLabels.length > 0
          ? `Formulaire interactif en ligne (${fieldLabels.join(', ')}).`
          : `Formulaire interactif : ${everestForm.title || title}.`;
    } else {
      const plain = stripContentToPlainText(content);
      excerpt = plain ? truncateAtWord(plain) : title;
    }

    let readTime = 'Formulaire';
    if (!everestForm) {
      const words = stripContentToPlainText(content).split(/\s+/).filter(Boolean).length;
      const mins = Math.max(1, Math.round(words / 200));
      readTime = hasVideo ? `${mins} min · Vidéo` : `${mins} min`;
    }

    return {
      slug,
      route: slugToRoute(slug),
      title,
      date: raw.date || '',
      formattedDate: dates.short,
      fullDate: dates.full,
      categories,
      content,
      excerpt,
      coverImage,
      galleryImages,
      hasVideo,
      readTime,
      accentColor: ACCENT_PALETTE[index % ACCENT_PALETTE.length],
      everestForm,
      _timestamp: dates.timestamp,
      _index: index,
    };
  })
  .sort((a, b) => {
    if (b._timestamp !== a._timestamp) return b._timestamp - a._timestamp;
    return a._index - b._index;
  })
  .map(({ _timestamp: _t, _index: _i, ...post }) => post);

export const ALL_CATEGORIES: string[] = (() => {
  const counts = new Map<string, number>();
  for (const post of ALL_POSTS) {
    for (const cat of post.categories) {
      counts.set(cat, (counts.get(cat) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'fr'))
    .map(([name]) => name);
})();

const POSTS_BY_SLUG = new Map<string, DynamicPost>(
  ALL_POSTS.map((post) => [post.slug.toLowerCase(), post])
);

export function getPostBySlug(slug: string): DynamicPost | undefined {
  return POSTS_BY_SLUG.get(normalizeSlug(slug).toLowerCase());
}

export function getAdjacentPosts(slug: string): {
  previous: DynamicPost | null;
  next: DynamicPost | null;
} {
  const clean = normalizeSlug(slug).toLowerCase();
  const idx = ALL_POSTS.findIndex((p) => p.slug.toLowerCase() === clean);
  if (idx === -1) return { previous: null, next: null };
  return {
    previous: idx < ALL_POSTS.length - 1 ? ALL_POSTS[idx + 1] : null,
    next: idx > 0 ? ALL_POSTS[idx - 1] : null,
  };
}
