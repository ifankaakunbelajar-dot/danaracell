import React, { useState, useMemo } from 'react';

interface ProviderLogoProps {
  id: string;
  name?: string;
  imageSrc?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProviderLogo: React.FC<ProviderLogoProps> = ({
  id,
  name = '',
  imageSrc,
  className = '',
  size = 'md',
}) => {
  const [candidateIdx, setCandidateIdx] = useState(0);

  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const dim = sizeMap[size];

  // Susun daftar kemungkinan file gambar: prioritas JPG, lalu JPEG, PNG, dsb.
  const candidates = useMemo(() => {
    const list: string[] = [];

    const addPath = (raw: string) => {
      const p = raw.startsWith('/') || raw.startsWith('http') ? raw : `/${raw}`;
      if (!list.includes(p)) list.push(p);
    };

    // 1. Jika ada imageSrc spesifik
    if (imageSrc) {
      addPath(imageSrc);
      if (imageSrc.match(/\.(jpg|jpeg)$/i)) {
        addPath(imageSrc.replace(/\.(jpg|jpeg)$/i, '.png'));
        addPath(imageSrc.replace(/\.(jpg|jpeg)$/i, '.JPG'));
      } else if (imageSrc.match(/\.png$/i)) {
        addPath(imageSrc.replace(/\.png$/i, '.jpg'));
        addPath(imageSrc.replace(/\.png$/i, '.jpeg'));
      }
    }

    // 2. Alias nama file umum (misal indosat / im3, tri / 3, shopeepay / shopee)
    const aliases = [id];
    if (id === 'indosat') aliases.push('im3');
    if (id === 'tri') aliases.push('3', 'three');
    if (id === 'shopeepay') aliases.push('shopee');

    // Ekstensi: prioritaskan JPG karena foto pengguna berformat JPG
    const extensions = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG', 'webp'];

    for (const alias of aliases) {
      for (const ext of extensions) {
        addPath(`file/${alias}.${ext}`);
      }
    }

    return list;
  }, [id, imageSrc]);

  const currentSrc = candidateIdx < candidates.length ? candidates[candidateIdx] : null;

  // Jika ada file kandidat gambar yang sedang dicoba
  if (currentSrc) {
    return (
      <div className={`${dim} rounded-xl overflow-hidden flex items-center justify-center shrink-0 ${className}`}>
        <img
          key={currentSrc}
          src={currentSrc}
          alt={name || id}
          onError={() => setCandidateIdx((prev) => prev + 1)}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // Fallback vector emblems when user hasn't added the file yet:
  switch (id) {
    case 'telkomsel':
      return (
        <div className={`${dim} rounded-xl bg-red-600 flex items-center justify-center p-1 shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            <circle cx="20" cy="20" r="18" fill="#E11927" />
            <path d="M13 14C13 11.8 14.8 10 17 10H23C25.2 10 27 11.8 27 14V17H13V14Z" fill="#FFFFFF" />
            <path d="M13 20H27V26C27 28.2 25.2 30 23 30H17C14.8 30 13 28.2 13 26V20Z" fill="#0B2046" />
            <circle cx="20" cy="18.5" r="3.5" fill="#FFFFFF" />
          </svg>
        </div>
      );

    case 'indosat':
      return (
        <div className={`${dim} rounded-xl bg-amber-400 flex items-center justify-center p-1 shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            <rect width="40" height="40" rx="10" fill="#FFCC00" />
            <path d="M8 20C8 13.4 13.4 8 20 8C26.6 8 32 13.4 32 20C32 26.6 26.6 32 20 32C13.4 32 8 26.6 8 20Z" fill="#E30613" />
            <text x="20" y="24" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="12">
              im3
            </text>
          </svg>
        </div>
      );

    case 'xl':
      return (
        <div className={`${dim} rounded-xl bg-blue-600 flex items-center justify-center p-1 shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            <rect width="40" height="40" rx="10" fill="#002D72" />
            <path d="M11 12L19 24L11 36H17L22 28L27 36H33L25 24L33 12H27L22 20L17 12H11Z" fill="#00B5E2" />
            <polygon points="19,12 25,12 28,16 22,16" fill="#78BE20" />
          </svg>
        </div>
      );

    case 'axis':
      return (
        <div className={`${dim} rounded-xl bg-purple-700 flex items-center justify-center p-1 shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            <rect width="40" height="40" rx="10" fill="#7B1FA2" />
            <circle cx="20" cy="20" r="12" fill="#E040FB" />
            <text x="20" y="24" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="11">
              axis
            </text>
          </svg>
        </div>
      );

    case 'tri':
      return (
        <div className={`${dim} rounded-xl bg-black flex items-center justify-center p-1 shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            <rect width="40" height="40" rx="10" fill="#000000" />
            <text x="20" y="29" textAnchor="middle" fill="#FF6A00" fontFamily="sans-serif" fontWeight="900" fontSize="24">
              3
            </text>
          </svg>
        </div>
      );

    case 'smartfren':
      return (
        <div className={`${dim} rounded-xl bg-rose-600 flex items-center justify-center p-1 shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            <rect width="40" height="40" rx="10" fill="#E91E63" />
            <path d="M12 18C12 14.5 15 12 19 12C23 12 26 14.5 26 17C26 21 16 20 16 24C16 26.5 18 28 21 28C24 28 27 26 27 26" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <circle cx="28" cy="13" r="2.5" fill="#FFEB3B" />
          </svg>
        </div>
      );

    case 'pln':
      return (
        <div className={`${dim} rounded-xl bg-amber-400 flex items-center justify-center p-1 shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            <path d="M8 8H32V24C32 30 20 34 20 34C20 34 8 30 8 24V8Z" fill="#FFD200" stroke="#0066B3" strokeWidth="2" />
            <path d="M21 10L14 22H21L19 30L28 18H20L23 10H21Z" fill="#ED1C24" />
          </svg>
        </div>
      );

    case 'dana':
      return (
        <div className={`${dim} rounded-xl bg-sky-500 flex items-center justify-center p-1 shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            <rect width="40" height="40" rx="10" fill="#118EEA" />
            <text x="20" y="25" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="11">
              DANA
            </text>
          </svg>
        </div>
      );

    case 'gopay':
      return (
        <div className={`${dim} rounded-xl bg-teal-500 flex items-center justify-center p-1 shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            <rect width="40" height="40" rx="10" fill="#00AED6" />
            <circle cx="20" cy="20" r="10" fill="#FFFFFF" />
            <circle cx="20" cy="20" r="5" fill="#00AED6" />
          </svg>
        </div>
      );

    case 'ovo':
      return (
        <div className={`${dim} rounded-xl bg-indigo-900 flex items-center justify-center p-1 shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            <rect width="40" height="40" rx="10" fill="#4C3494" />
            <circle cx="20" cy="20" r="11" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="20" cy="20" r="5" fill="#FFFFFF" />
          </svg>
        </div>
      );

    case 'shopeepay':
      return (
        <div className={`${dim} rounded-xl bg-orange-500 flex items-center justify-center p-1 shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            <rect width="40" height="40" rx="10" fill="#EE4D2D" />
            <path d="M13 16V14C13 10.1 16.1 7 20 7C23.9 7 27 10.1 27 14V16H29C30.1 16 31 16.9 31 18V30C31 31.1 30.1 32 29 32H11C9.9 32 9 31.1 9 30V18C9 16.9 9.9 16 11 16H13ZM16 16H24V14C24 11.8 22.2 10 20 10C17.8 10 16 11.8 16 14V16Z" fill="#FFFFFF" />
            <text x="20" y="26" textAnchor="middle" fill="#EE4D2D" fontFamily="sans-serif" fontWeight="900" fontSize="9">
              S
            </text>
          </svg>
        </div>
      );

    default:
      return (
        <div className={`${dim} rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0 ${className}`}>
          {id.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};
