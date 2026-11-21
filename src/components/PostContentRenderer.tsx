import React, { useMemo, useState } from 'react';
import { Check, ExternalLink, Play } from 'lucide-react';
import {
  decodeHtmlEntities,
  resolveAssetUrl,
  stripLegacyEmbeds,
  type DynamicPost,
  type EverestFormConfig,
  type EverestFormField,
} from '../data/posts';

interface PostContentRendererProps {
  post: DynamicPost;
}

const ResilientImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => {
  const [failed, setFailed] = useState(false);
  if (failed || !src) return null;

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setFailed(true)}
      className={
        className ||
        'w-full rounded-xl border border-[#DADADA] my-4 object-cover bg-[#F8FAFA]'
      }
    />
  );
};

const EverestFormRenderer: React.FC<{ form: EverestFormConfig; fallbackTitle: string }> = ({
  form,
  fallbackTitle,
}) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (id: string, val: string) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    for (const row of form.rows) {
      for (const grid of row.grids) {
        for (const fieldId of grid) {
          const field = form.fields[fieldId];
          if (!field) continue;
          const val = (values[fieldId] || '').trim();
          if (field.required === '1' && !val) {
            setError(
              field['required-field-message'] ||
                `Merci de remplir le champ « ${field.label || field.id} ».`
            );
            return;
          }
          if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            setError('Veuillez saisir une adresse courriel valide.');
            return;
          }
        }
      }
    }

    setError('');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-[#F8FAFA] border border-[#DADADA] rounded-2xl p-8 space-y-4">
        <div className="w-10 h-10 rounded-full bg-[#007580]/10 text-[#007580] flex items-center justify-center">
          <Check className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-semibold text-[#1A2B2E]">
          {form.title || fallbackTitle}
        </h2>
        <p className="text-sm text-[#526669] leading-relaxed">
          {form.successMessage}
        </p>
        <button
          type="button"
          onClick={() => {
            setValues({});
            setSubmitted(false);
          }}
          className="text-xs font-medium text-[#007580] hover:underline cursor-pointer"
        >
          Envoyer une autre réponse
        </button>
      </div>
    );
  }

  const renderField = (field: EverestFormField) => {
    const val = values[field.id] ?? field.default_value ?? '';
    const isRequired = field.required === '1';
    const inputClass =
      'w-full px-3.5 py-2.5 text-sm bg-white border border-[#DADADA] rounded-lg focus:outline-none focus:border-[#007580] text-[#1A2B2E]';

    if (field.type === 'textarea') {
      return (
        <div key={field.id} className="space-y-1.5">
          <label htmlFor={`evf-${field.id}`} className="block text-xs font-medium text-[#1A2B2E]">
            {field.label}
            {isRequired && <span className="text-[#007580] ml-1">*</span>}
          </label>
          <textarea
            id={`evf-${field.id}`}
            rows={4}
            value={val}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder || ''}
            className={inputClass}
          />
          {field.description && (
            <p className="text-xs text-[#526669]">{field.description}</p>
          )}
        </div>
      );
    }

    const inputType =
      field.type === 'email'
        ? 'email'
        : field.type === 'date-time'
        ? 'date'
        : field.type === 'number'
        ? 'number'
        : field.type === 'tel'
        ? 'tel'
        : field.type === 'url'
        ? 'url'
        : 'text';

    return (
      <div key={field.id} className="space-y-1.5">
        <label htmlFor={`evf-${field.id}`} className="block text-xs font-medium text-[#1A2B2E]">
          {field.label}
          {isRequired && <span className="text-[#007580] ml-1">*</span>}
        </label>
        <input
          id={`evf-${field.id}`}
          type={inputType}
          value={val}
          onChange={(e) => handleChange(field.id, e.target.value)}
          placeholder={field.placeholder || ''}
          className={inputClass}
        />
        {field.description && (
          <p className="text-xs text-[#526669]">{field.description}</p>
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-[#F8FAFA] border border-[#DADADA] rounded-2xl p-6 sm:p-8 space-y-5"
    >
      {(form.title || form.description) && (
        <div className="space-y-1 pb-2 border-b border-[#DADADA]">
          {form.title && (
            <h2 className="text-lg font-semibold text-[#1A2B2E]">{form.title}</h2>
          )}
          {form.description && (
            <p className="text-xs text-[#526669]">{form.description}</p>
          )}
        </div>
      )}

      <div className="space-y-4">
        {form.rows.map((row) => (
          <div
            key={row.rowKey}
            className={`grid grid-cols-1 ${
              row.grids.length >= 2 ? 'sm:grid-cols-2' : ''
            } gap-4`}
          >
            {row.grids.map((grid, gIdx) => (
              <div key={`${row.rowKey}-g-${gIdx}`} className="space-y-4">
                {grid.map((fieldId) => {
                  const field = form.fields[fieldId];
                  return field ? renderField(field) : null;
                })}
              </div>
            ))}
          </div>
        ))}
      </div>

      {error && <p className="text-xs text-red-700">{error}</p>}

      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-[#007580] hover:bg-[#0095A9] rounded-lg transition-colors cursor-pointer"
      >
        {form.submitText}
      </button>
    </form>
  );
};

function unescapeUrl(url: string): string {
  return url.replace(/\\([_~*])/g, '$1').trim();
}

function unescapeProse(text: string): string {
  return text.replace(/\\([_*[\]])/g, '$1');
}

function extractYoutubeId(url: string): string | null {
  const cleanUrl = unescapeUrl(url);
  const match = cleanUrl.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i
  );
  return match ? match[1] : null;
}

function sanitizeAndTransformHtml(rawHtml: string): string {
  const cleaned = stripLegacyEmbeds(rawHtml)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/gi, '$1');

  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return cleaned;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(cleaned, 'text/html');

  doc.querySelectorAll('script, style, object, embed, form, iframe').forEach((el) => el.remove());

  doc.querySelectorAll('*').forEach((el) => {
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      if (
        name.startsWith('on') ||
        (name === 'href' && attr.value.trim().toLowerCase().startsWith('javascript:'))
      ) {
        el.removeAttribute(attr.name);
      }
      if (name === 'style' || name === 'width' || name === 'height') {
        el.removeAttribute(attr.name);
      }
    }

    if (el.tagName === 'IMG') {
      const src = el.getAttribute('src') || el.getAttribute('data-src');
      const resolved = resolveAssetUrl(src);
      if (!resolved) {
        el.remove();
        return;
      }
      el.setAttribute('src', resolved);
      el.setAttribute('referrerpolicy', 'no-referrer');
      el.setAttribute('loading', 'lazy');
      el.className = 'w-full rounded-xl border border-[#DADADA] my-4 object-cover';
    }

    if (el.tagName === 'A') {
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noreferrer');
      el.className = 'text-[#007580] font-medium hover:underline break-words';
    }

    if (el.tagName === 'H2') {
      el.className = 'text-2xl font-semibold text-[#1A2B2E] pt-4';
    }

    if (el.tagName === 'H3' || el.tagName === 'H4') {
      el.className = 'text-lg font-semibold text-[#1A2B2E] pt-2';
    }

    if (el.tagName === 'UL') {
      el.className = 'list-disc pl-5 space-y-1.5 text-[#1A2B2E]';
    }

    if (el.tagName === 'OL') {
      el.className = 'list-decimal pl-5 space-y-1.5 text-[#1A2B2E]';
    }

    if (el.tagName === 'BLOCKQUOTE') {
      el.className = 'border-l-2 border-[#007580] pl-4 italic text-[#526669]';
    }
  });

  return doc.body.innerHTML;
}

function renderInlineMarkdown(text: string): React.ReactNode[] {
  const decoded = decodeHtmlEntities(text);
  const parts: React.ReactNode[] = [];
  const tokenRegex =
    /(\[!\[[^\]]*\]\([^)]+\)\]\([^)]+\)|!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s<)]+|\*\*_[^_]+_\*\*|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*\n]+\*|(?<!\w)_[^_\n]+_(?!\w))/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;

  while ((match = tokenRegex.exec(decoded)) !== null) {
    if (match.index > lastIndex) {
      const plainChunk = unescapeProse(decoded.slice(lastIndex, match.index));
      if (plainChunk) parts.push(plainChunk);
    }

    const token = match[0];

    if (token.startsWith('[![')) {
      const m = token.match(
        /^\[!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)\]\(([^)\s]+)\)$/
      );
      if (m) {
        const alt = unescapeProse(m[1]) || 'Illustration du projet';
        const resolvedImg = resolveAssetUrl(m[2]);
        const targetHref = unescapeUrl(m[3]);
        const isSelfUploadLink =
          /creationcatudal\.com\/wp-content\/uploads/i.test(targetHref) ||
          /creationcatudal\.com\/?$/i.test(targetHref);

        if (resolvedImg) {
          const imgEl = (
            <ResilientImage
              key={`limg-${keyCounter++}`}
              src={resolvedImg}
              alt={alt}
            />
          );
          if (!isSelfUploadLink && /^https?:\/\//i.test(targetHref)) {
            parts.push(
              <a
                key={`la-${keyCounter++}`}
                href={targetHref}
                target="_blank"
                rel="noreferrer"
                className="block group"
              >
                {imgEl}
              </a>
            );
          } else {
            parts.push(imgEl);
          }
        }
      }
    } else if (token.startsWith('![')) {
      const m = token.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)$/);
      if (m) {
        const resolvedImg = resolveAssetUrl(m[2]);
        if (resolvedImg) {
          parts.push(
            <ResilientImage
              key={`img-${keyCounter++}`}
              src={resolvedImg}
              alt={unescapeProse(m[1]) || 'Illustration du projet'}
            />
          );
        }
      }
    } else if (token.startsWith('[')) {
      const m = token.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      if (m) {
        const linkLabel = unescapeProse(m[1]);
        const linkHref = unescapeUrl(m[2]);
        parts.push(
          <a
            key={`lnk-${keyCounter++}`}
            href={linkHref}
            target="_blank"
            rel="noreferrer"
            className="text-[#007580] font-medium hover:underline inline-flex items-center gap-1"
          >
            {linkLabel}
            <ExternalLink className="w-3 h-3 inline shrink-0" />
          </a>
        );
      }
    } else if (token.startsWith('http')) {
      const cleanUrl = unescapeUrl(token);
      parts.push(
        <a
          key={`url-${keyCounter++}`}
          href={cleanUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[#007580] font-medium hover:underline break-all"
        >
          {cleanUrl}
        </a>
      );
    } else if (token.startsWith('**_') && token.endsWith('_**')) {
      parts.push(
        <strong key={`bi-${keyCounter++}`} className="font-semibold italic text-[#1A2B2E]">
          {unescapeProse(token.slice(3, -3))}
        </strong>
      );
    } else if (token.startsWith('***') && token.endsWith('***')) {
      parts.push(
        <strong key={`bi2-${keyCounter++}`} className="font-semibold italic text-[#1A2B2E]">
          {unescapeProse(token.slice(3, -3))}
        </strong>
      );
    } else if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={`b-${keyCounter++}`} className="font-semibold text-[#1A2B2E]">
          {renderInlineMarkdown(token.slice(2, -2))}
        </strong>
      );
    } else if (
      (token.startsWith('*') && token.endsWith('*')) ||
      (token.startsWith('_') && token.endsWith('_'))
    ) {
      parts.push(
        <em key={`i-${keyCounter++}`} className="italic">
          {unescapeProse(token.slice(1, -1))}
        </em>
      );
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < decoded.length) {
    const tail = unescapeProse(decoded.slice(lastIndex));
    if (tail) parts.push(tail);
  }

  return parts;
}

const MarkdownContentRenderer: React.FC<{ content: string; title: string }> = ({
  content,
  title,
}) => {
  const blocks = useMemo(() => {
    return stripLegacyEmbeds(content)
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/gi, '$1')
      // WordPress export wrapped conversational callout sentences in code fences; unwrap cleanly
      .replace(/```[^\n]*\n?/g, '')
      .split(/\n{2,}/)
      .map((b) => b.trim())
      .filter(Boolean);
  }, [content]);

  return (
    <div className="space-y-4 text-base leading-[1.7] text-[#1A2B2E] max-w-[68ch]">
      {blocks.map((block, idx) => {
        // Standalone YouTube URL (with optional escaped underscores)
        if (/^https?:\/\/\S+$/i.test(block)) {
          const cleanUrl = unescapeUrl(block);
          const ytId = extractYoutubeId(cleanUrl);
          if (ytId) {
            return (
              <div
                key={`yt-${idx}`}
                className="bg-[#F8FAFA] border border-[#DADADA] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-4"
              >
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#007580]">
                    Tutoriel vidéo
                  </p>
                  <p className="text-sm font-semibold text-[#1A2B2E]">{title}</p>
                </div>
                <a
                  href={cleanUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#1A2B2E] bg-white border border-[#DADADA] hover:border-[#007580] hover:text-[#007580] rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Play className="w-3.5 h-3.5 text-[#007580]" />
                  Regarder sur YouTube
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            );
          }
        }

        // Markdown Heading
        const headingMatch = block.match(/^(#{1,4})\s+(.+)$/);
        if (headingMatch) {
          const level = headingMatch[1].length;
          const headingNodes = renderInlineMarkdown(headingMatch[2]);
          if (headingNodes.length === 0) return null;
          if (level <= 2) {
            return (
              <h2 key={`h-${idx}`} className="text-2xl font-semibold text-[#1A2B2E] pt-3">
                {headingNodes}
              </h2>
            );
          }
          return (
            <h3 key={`h-${idx}`} className="text-lg font-semibold text-[#1A2B2E] pt-2">
              {headingNodes}
            </h3>
          );
        }

        // Unordered list
        const lines = block.split('\n');
        if (lines.every((l) => /^[-*•]\s+/.test(l.trim()))) {
          return (
            <ul key={`ul-${idx}`} className="list-disc pl-5 space-y-1.5 text-[#1A2B2E]">
              {lines.map((line, lIdx) => (
                <li key={`li-${idx}-${lIdx}`}>
                  {renderInlineMarkdown(line.trim().replace(/^[-*•]\s+/, ''))}
                </li>
              ))}
            </ul>
          );
        }

        // Ordered list
        if (lines.every((l) => /^\d+\.\s+/.test(l.trim()))) {
          return (
            <ol key={`ol-${idx}`} className="list-decimal pl-5 space-y-1.5 text-[#1A2B2E]">
              {lines.map((line, lIdx) => (
                <li key={`oli-${idx}-${lIdx}`}>
                  {renderInlineMarkdown(line.trim().replace(/^\d+\.\s+/, ''))}
                </li>
              ))}
            </ol>
          );
        }

        const inlineNodes = renderInlineMarkdown(block);
        if (inlineNodes.length === 0) return null;

        // If block consists solely of image/link elements, avoid wrapping in <p>
        const hasOnlyReactElements = inlineNodes.every(
          (node) => typeof node !== 'string' || node.trim() === ''
        );
        if (hasOnlyReactElements && /!\[/.test(block)) {
          return (
            <div key={`media-${idx}`} className="space-y-3">
              {inlineNodes}
            </div>
          );
        }

        return (
          <p key={`p-${idx}`} className="whitespace-pre-line">
            {inlineNodes}
          </p>
        );
      })}
    </div>
  );
};

export const PostContentRenderer: React.FC<PostContentRendererProps> = ({ post }) => {
  const cleanContent = useMemo(() => stripLegacyEmbeds(post.content), [post.content]);

  const hasHtmlTags = useMemo(
    () => /<(p|div|h[1-6]|ul|ol|li|img|figure|a|br|strong|em|blockquote)\b/i.test(cleanContent),
    [cleanContent]
  );

  const sanitizedHtml = useMemo(
    () => (hasHtmlTags && !post.everestForm ? sanitizeAndTransformHtml(cleanContent) : ''),
    [hasHtmlTags, cleanContent, post.everestForm]
  );

  if (post.everestForm) {
    return <EverestFormRenderer form={post.everestForm} fallbackTitle={post.title} />;
  }

  if (hasHtmlTags) {
    return (
      <div
        className="space-y-4 text-base leading-[1.7] text-[#1A2B2E] max-w-[68ch] [&_p]:leading-[1.7] [&_figure]:my-6 [&_figcaption]:text-xs [&_figcaption]:text-[#526669] [&_figcaption]:mt-2"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    );
  }

  return <MarkdownContentRenderer content={cleanContent} title={post.title} />;
};
