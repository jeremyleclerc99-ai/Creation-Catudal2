import React, { useState } from 'react';
import { withBase } from '../data/siteArchitecture';

interface BrandMarkProps {
  variant?: 'default' | 'inverted';
  className?: string;
}

/**
 * Official Création Catudal logo from uploaded assets (/assets/aistudio/logo-100x200-1_f1ab239a.png)
 * with resilient SVG fallback.
 */
export const BrandMark: React.FC<BrandMarkProps> = ({ variant = 'default', className = '' }) => {
  const [imgError, setImgError] = useState(false);
  const textColor = variant === 'inverted' ? '#FFFFFF' : '#1A2B2E';

  if (!imgError && variant === 'default') {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src={withBase('/assets/aistudio/logo-100x200-1_f1ab239a.png')}
          alt="Création Catudal"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="h-11 w-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width="44"
        height="44"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="50" cy="50" r="45" fill={variant === 'inverted' ? '#133C42' : '#FFFFFF'} stroke="#E3B9B3" strokeWidth="3.5" />
        <path
          d="M50 7C26.2 7 7 26.2 7 50C7 73.8 26.2 93 50 93C38 86 30 74 30 60C30 45 40 38 40 24C40 16 44 10 50 7Z"
          fill="#007580"
        />
        <path
          d="M36 14C20 22 10 35 10 52C10 68 19 81 33 88C24 78 21 67 24 54C27 41 34 33 34 22C34 19 35 16 36 14Z"
          fill="#0095A9"
          opacity="0.85"
        />
        <path d="M54 20L55.5 23.5L59 25L55.5 26.5L54 30L52.5 26.5L49 25L52.5 23.5L54 20Z" fill="#E3B9B3" />
        <path d="M68 29L69 31.5L71.5 32.5L69 33.5L68 36L67 33.5L64.5 32.5L67 31.5L68 29Z" fill="#E3B9B3" />
        <path d="M44 33L45 35L47 36L45 37L44 39L43 37L41 36L43 35L44 33Z" fill="#E3B9B3" />
        <path d="M63 17L63.8 19L65.8 19.8L63.8 20.6L63 22.6L62.2 20.6L60.2 19.8L62.2 19L63 17Z" fill="#7CA7AD" />
      </svg>
      <div className="flex flex-col leading-none">
        <span
          style={{ color: textColor, fontFamily: 'var(--font-display)' }}
          className="text-[17px] font-light tracking-wide whitespace-nowrap"
        >
          Catudal
        </span>
        <span
          style={{ color: variant === 'inverted' ? '#E3B9B3' : '#007580', fontFamily: 'var(--font-display)' }}
          className="text-[13px] font-semibold tracking-tight -mt-0.5 whitespace-nowrap"
        >
          Création
        </span>
      </div>
    </div>
  );
};

interface OneSheetWonderDiagramProps {
  selectedCard: number | null;
  onSelectCard: (cardNumber: number) => void;
}

/**
 * Interactive 12" x 12" One Sheet Wonder cutting plan inspired by index_174b4cab.md
 * Allows visitors to click sections #1-#7 & #15-#17 to inspect dimensions & corresponding cards.
 */
export const OneSheetWonderDiagram: React.FC<OneSheetWonderDiagramProps> = ({
  selectedCard,
  onSelectCard,
}) => {
  const pieces = [
    { id: 1, x: 4, y: 4, w: 96, h: 120, label: '#1', size: '4" × 5¼"', video: 'Vidéo 1' },
    { id: 2, x: 104, y: 4, w: 96, h: 120, label: '#2', size: '4" × 5¼"', video: 'Vidéo 2' },
    { id: 3, x: 204, y: 4, w: 92, h: 120, label: '#3', size: '3¾" × 5¼"', video: 'Vidéo 3' },
    { id: 4, x: 4, y: 128, w: 72, h: 92, label: '#4', size: '3" × 4"', video: 'Vidéo 1' },
    { id: 5, x: 80, y: 128, w: 72, h: 92, label: '#5', size: '3" × 4"', video: 'Vidéo 4' },
    { id: 6, x: 156, y: 128, w: 70, h: 92, label: '#6', size: '3" × 4"', video: 'Vidéo 2' },
    { id: 7, x: 230, y: 128, w: 66, h: 92, label: '#7', size: '2¾" × 4"', video: 'Vidéo 3' },
    { id: 15, x: 4, y: 224, w: 96, h: 72, label: '#15', size: '4" × 2¾"', video: 'Vidéo 5' },
    { id: 16, x: 104, y: 224, w: 96, h: 72, label: '#16', size: '4" × 2¾"', video: 'Vidéo 5' },
    { id: 17, x: 204, y: 224, w: 92, h: 72, label: '#17', size: '3¾" × 2¾"', video: 'Vidéo 5' },
  ];

  return (
    <div className="bg-white border border-[#DADADA] rounded-xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <p className="text-xs font-medium text-[#007580] uppercase tracking-wider">
            Plan de coupe interactif · Feuille 12" × 12"
          </p>
          <h3 className="text-base font-semibold text-[#1A2B2E]">
            Cliquez sur une pièce pour voir ses mesures
          </h3>
        </div>
        <span className="text-xs font-mono tabular-nums text-[#526669]">
          {selectedCard ? `Carte ${pieces.find((p) => p.id === selectedCard)?.label} sélectionnée` : '10 pièces actives (plan miroir)'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        <div className="md:col-span-7">
          <svg
            viewBox="0 0 300 300"
            className="w-full max-w-[340px] mx-auto rounded-lg border border-[#DADADA] bg-[#F8FAFA]"
            role="img"
            aria-label="Plan de coupe One Sheet Wonder 12 par 12 pouces"
          >
            {pieces.map((piece) => {
              const isSelected = selectedCard === piece.id;
              return (
                <g
                  key={piece.id}
                  onClick={() => onSelectCard(piece.id)}
                  className="cursor-pointer transition-opacity"
                >
                  <rect
                    x={piece.x}
                    y={piece.y}
                    width={piece.w}
                    height={piece.h}
                    rx={4}
                    fill={isSelected ? '#007580' : piece.id >= 15 ? '#FAF1D1' : '#E5D4D3'}
                    fillOpacity={isSelected ? 1 : 0.55}
                    stroke={isSelected ? '#007580' : '#7CA7AD'}
                    strokeWidth={isSelected ? 2 : 1}
                    strokeDasharray={isSelected ? undefined : '4 2'}
                  />
                  <text
                    x={piece.x + piece.w / 2}
                    y={piece.y + piece.h / 2 - 4}
                    textAnchor="middle"
                    fill={isSelected ? '#FFFFFF' : '#1A2B2E'}
                    fontSize="13"
                    fontWeight="600"
                    fontFamily="Outfit, sans-serif"
                  >
                    {piece.label}
                  </text>
                  <text
                    x={piece.x + piece.w / 2}
                    y={piece.y + piece.h / 2 + 11}
                    textAnchor="middle"
                    fill={isSelected ? '#FAF1D1' : '#526669'}
                    fontSize="8.5"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {piece.size}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="md:col-span-5 space-y-3">
          {(() => {
            const active = pieces.find((p) => p.id === selectedCard) ?? pieces[0];
            return (
              <div className="bg-[#F6F9F9] border border-[#DADADA] rounded-lg p-4">
                <p className="text-xs text-[#526669]">Pièce sélectionnée</p>
                <p className="text-xl font-semibold text-[#1A2B2E] mt-0.5">
                  Carte {active.label}
                </p>
                <dl className="mt-3 space-y-2 text-sm border-t border-[#DADADA] pt-3">
                  <div className="flex justify-between">
                    <dt className="text-[#526669]">Coupe papier design</dt>
                    <dd className="font-mono tabular-nums font-medium text-[#1A2B2E]">{active.size}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#526669]">Base de carte</dt>
                    <dd className="font-mono tabular-nums font-medium text-[#1A2B2E]">5½" × 8½"</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#526669]">Démonstration</dt>
                    <dd className="font-medium text-[#007580]">{active.video}</dd>
                  </div>
                </dl>
              </div>
            );
          })()}

          <div className="flex flex-wrap gap-1.5">
            {pieces.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectCard(p.id)}
                className={`px-2.5 py-1 text-xs font-mono tabular-nums rounded-md border transition-colors whitespace-nowrap ${
                  selectedCard === p.id
                    ? 'bg-[#007580] text-white border-[#007580]'
                    : 'bg-white text-[#1A2B2E] border-[#DADADA] hover:border-[#007580]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
