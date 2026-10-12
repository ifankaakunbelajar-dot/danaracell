import React, { useState } from 'react';
import { Store } from 'lucide-react';

interface StoreLogoProps {
  className?: string;
  iconClassName?: string;
}

const STORE_IMAGE_CANDIDATES = [
  '/file/toko.jpg',
  '/file/toko.jpeg',
  '/file/gambar1.jpg',
  '/file/gambar1.jpeg',
  '/file/logo.jpg',
  '/file/logo.jpeg',
  '/file/danara.jpg',
  '/file/danara.jpeg',
  '/file/profil.jpg',
  '/file/toko.png',
  '/file/gambar1.png',
  '/file/logo.png',
  '/file/danara.png',
  '/file/profil.png',
];

export const StoreLogo: React.FC<StoreLogoProps> = ({
  className = 'w-full h-full',
  iconClassName = 'w-6 h-6 text-sky-600',
}) => {
  const [candidateIdx, setCandidateIdx] = useState(0);

  const currentSrc = candidateIdx < STORE_IMAGE_CANDIDATES.length
    ? STORE_IMAGE_CANDIDATES[candidateIdx]
    : null;

  if (currentSrc) {
    return (
      <img
        key={currentSrc}
        src={currentSrc}
        alt="Danara Cell"
        onError={() => setCandidateIdx((prev) => prev + 1)}
        className={`${className} object-cover`}
      />
    );
  }

  return <Store className={iconClassName} />;
};
