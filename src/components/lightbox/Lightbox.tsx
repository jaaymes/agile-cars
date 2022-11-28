import { useEffect } from 'react';
import ReactLightbox from 'react-image-lightbox';

import { Typography } from '@mui/material';

import StyledLightbox from './styles';
import { LightBoxProps } from './types';

export default function Lightbox({
  images,
  photoIndex,
  setPhotoIndex,
  open,
  ...other
}: LightBoxProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  const showIndex = (
    <Typography>
      <strong> {photoIndex + 1} </strong> {'/'} {images.length}
    </Typography>
  );

  const toolbarButtons = [showIndex];

  const customStyles = {
    overlay: {
      zIndex: 9999,
    },
  };

  return (
    <>
      <StyledLightbox />

      {open && (
        <ReactLightbox
          animationDuration={160}
          toolbarButtons={toolbarButtons}
          reactModalStyle={customStyles}
          wrapperClassName="react-lightbox"
          {...other}
        />
      )}
    </>
  );
}
