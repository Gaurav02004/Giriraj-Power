import React, { useState } from 'react';

export const GIRIRAJ_POWER_LOGO_URL = 'https://i.imgur.com/iUPaeEd.jpeg';

interface GirirajPowerLogoProps {
  className?: string;
  size?: number | string;
  withBg?: boolean;
  alt?: string;
}

export const GirirajPowerLogo: React.FC<GirirajPowerLogoProps> = ({
  className = 'w-10 h-10',
  size,
  withBg = false,
  alt = 'Giriraj Power Logo',
}) => {
  const [hasError, setHasError] = useState(false);
  const style = size ? { width: size, height: size } : undefined;

  if (hasError) {
    // Fallback SVG if image fails to load for any reason
    return (
      <svg
        viewBox="0 0 500 500"
        className={`${className} shrink-0`}
        style={style}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gpCableGrad" x1="60" y1="90" x2="440" y2="420" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00f2fe" />
            <stop offset="25%" stopColor="#00c6ff" />
            <stop offset="60%" stopColor="#0072ff" />
            <stop offset="100%" stopColor="#7928ca" />
          </linearGradient>
          <linearGradient id="gpBoltLight" x1="350" y1="50" x2="190" y2="470" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <linearGradient id="gpBoltDark" x1="350" y1="50" x2="270" y2="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#713f12" />
          </linearGradient>
        </defs>
        <circle cx="250" cy="250" r="242" fill="#090d16" />
        <path
          d="M 148 195 C 120 135 170 70 250 68 C 345 66 422 142 422 240 C 422 328 358 402 270 412 C 190 420 115 365 95 285 C 82 230 105 170 148 135 C 195 95 270 90 325 118 C 385 148 420 215 415 280"
          stroke="url(#gpCableGrad)"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M 350 48 L 245 240 L 285 240 L 190 468 L 265 272 L 210 272 Z" fill="url(#gpBoltLight)" />
        <path d="M 350 48 L 285 240 L 355 240 L 265 272 L 190 468 L 265 272 L 355 240 Z" fill="url(#gpBoltDark)" />
      </svg>
    );
  }

  return (
    <img
      src={GIRIRAJ_POWER_LOGO_URL}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      style={style}
      className={`object-cover ${withBg ? 'bg-black p-0.5' : ''} ${className} shrink-0`}
      loading="eager"
    />
  );
};
