import React, { useEffect, useState } from 'react';

import Image, { ImageProps } from 'next/image';

interface IImageWithFallbackProps extends ImageProps {
  src: string;
  alt?: string
}

const ImageWithFallback: React.FC<IImageWithFallbackProps> = ({ src, alt, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc ? imgSrc : '/assets/images/logo-focus-educacional.png'}
      onError={() => {
        setImgSrc('/assets/images/logo-focus-educacional.png')
      }}
    />
  );
};

export default ImageWithFallback;