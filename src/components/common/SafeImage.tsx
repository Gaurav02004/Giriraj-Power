import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackText?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  fallbackText,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  return (
    <img
      src={hasError ? fallbackSrc : (src || fallbackSrc)}
      alt={alt || 'Giriraj Power electrical material'}
      referrerPolicy="no-referrer"
      onError={handleError}
      className={className}
      loading="lazy"
      {...props}
    />
  );
};
