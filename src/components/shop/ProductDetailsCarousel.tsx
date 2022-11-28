import { useState, useRef, useEffect, useCallback } from 'react';

import Carousel, { CarouselArrowIndex } from '@/components/carousel';
import Image from '@/components/image';
import Lightbox from '@/components/lightbox';

import { bgGradient } from '@/utils/cssStyles';

import { Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const SPEED = 160;

const THUMB_SIZE = 64;

type StyledThumbnailsContainerProps = {
  length: number;
};

const StyledThumbnailsContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'length',
})<StyledThumbnailsContainerProps>(({ length, theme }) => ({
  margin: theme.spacing(0, 'auto'),
  position: 'relative',
  '& .slick-slide': {
    opacity: 0.48,
    '&.slick-current': {
      opacity: 1,
    },
    '& > div': {
      padding: theme.spacing(0, 0.75),
    },
  },

  ...(length === 1 && {
    maxWidth: THUMB_SIZE * 1 + 16,
  }),
  ...(length === 2 && {
    maxWidth: THUMB_SIZE * 2 + 32,
  }),
  ...((length === 3 || length === 4) && {
    maxWidth: THUMB_SIZE * 3 + 48,
  }),
  ...(length >= 5 && {
    maxWidth: THUMB_SIZE * 6,
    '&:before, &:after': {
      ...bgGradient({
        direction: 'to left',
        startColor: `${alpha(theme.palette.background.default, 0)} 0%`,
        endColor: `${theme.palette.background.default} 100%`,
      }),
      top: 0,
      zIndex: 9,
      content: "''",
      height: '100%',
      position: 'absolute',
      width: (THUMB_SIZE * 2) / 3,
    },
    '&:after': {
      right: 0,
      transform: 'scaleX(-1)',
    },
  }),
  ...(length >= 2 && {
    '&:before, &:after': {
      ...bgGradient({
        direction: 'to left',
        startColor: `${alpha(theme.palette.background.default, 0)} 0%`,
        endColor: `${theme.palette.background.default} 100%`,
      }),
      top: 0,
      zIndex: 9,
      content: "''",
      height: '100%',
      position: 'absolute',
      width: (THUMB_SIZE * 2) / 3,
    },
    '&:after': {
      right: 0,
      transform: 'scaleX(-1)',
    },
  }),
}));

interface IProps {
  images: string[];
}

export default function ProductDetailsCarousel({ images }: IProps) {

  const carousel1 = useRef<Carousel | null>(null);

  const carousel2 = useRef<Carousel | null>(null);

  const [nav1, setNav1] = useState<Carousel>();

  const [nav2, setNav2] = useState<Carousel>();

  const [currentIndex, setCurrentIndex] = useState(0);

  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState<number>(0);

  const imagesLightbox = images.map((_image) => _image);
  const [key, setKey] = useState(0);


  const handleOpenLightbox = useCallback((url: string) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);


    setSelectedImage(selectedImage);
  }, [openLightbox])

  const handleCloseLightbox = () => {
    setOpenLightbox(false);
  };

  useEffect(() => { setTimeout(() => setKey(key + 1)); }, [openLightbox]);

  const carouselSettings1 = {
    speed: SPEED,
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };

  const carouselSettings2 = {
    speed: SPEED,
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: images.length > 3 ? 3 : images.length,
  };

  useEffect(() => {
    if (carousel1.current) {
      setNav1(carousel1.current);
    }
    if (carousel2.current) {
      setNav2(carousel2.current);
    }
  }, []);

  const handlePrev = () => {
    carousel2.current?.slickPrev();
  };

  const handleNext = () => {
    carousel2.current?.slickNext();
  };

  const renderLargeImg = (
    <Box sx={{ mb: 3, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
      <Carousel {...carouselSettings1} asNavFor={nav2} ref={carousel1}>
        {
          images.length > 0 && (
            images.map((img) => (
              <Image
                key={img}
                alt="product"
                src={`${img}`}
                ratio="1/1"
                onClick={() => handleOpenLightbox(img)}
                sx={{ cursor: 'zoom-in' }}
              />
            ))

          )
        }
        {
          images.length === 0 && (
            <Image
              alt="product"
              src={`/sem-imagem.png`}
              ratio="1/1"
              sx={{ cursor: 'zoom-in' }}
            />
          )
        }
      </Carousel>

      {
        images.length > 0 && (
          <CarouselArrowIndex
            index={currentIndex}
            total={images.length}
            onNext={handleNext}
            onPrevious={handlePrev}
          />
        )
      }
    </Box>
  );

  const renderThumbnails = (
    <StyledThumbnailsContainer length={images.length}>
      <Carousel {...carouselSettings2} asNavFor={nav1} ref={carousel2}>
        {images.map((img, index) => (
          <Image
            key={img}
            disabledEffect
            alt="thumbnail"
            src={`${img}`}
            sx={{
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: 1.5,
              cursor: 'pointer',
              ...(currentIndex === index && {
                border: (theme) => `solid 2px ${theme.palette.primary.main}`,
              }),
            }}
          />
        ))}
      </Carousel>
    </StyledThumbnailsContainer>
  );

  return (
    <>
      <Box
        sx={{
          '& .slick-slide': {
            float: 'left',
          },
        }}
      >
        {renderLargeImg}

        {renderThumbnails}
      </Box>

      <Lightbox
        key={key}
        animationDuration={SPEED}
        images={imagesLightbox}
        nextSrc={imagesLightbox[(selectedImage + 1) % imagesLightbox.length]}
        prevSrc={imagesLightbox[(selectedImage + imagesLightbox.length - 1) % imagesLightbox.length]}
        mainSrc={imagesLightbox[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        open={openLightbox}
        onCloseRequest={handleCloseLightbox}
        onMovePrevRequest={() => {
          handlePrev();
          setSelectedImage((selectedImage + imagesLightbox.length - 1) % imagesLightbox.length);
        }}
        onMoveNextRequest={() => {
          handleNext();
          setSelectedImage((selectedImage + 1) % imagesLightbox.length);
        }}
      />
    </>
  );
}
