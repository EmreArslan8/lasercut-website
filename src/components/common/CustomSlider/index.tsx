import Icon from '../Icon';

import { useRef } from 'react';
import Slider, { Settings as ReactSlickSliderSettings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from './styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface CustomSliderProps extends ReactSlickSliderSettings {}

const CustomSlider = ({
  children,
  slidesToShow = 5,
  infinite = true,
  speed = 500,
  slidesToScroll = 1,
  swipe = true,
  touchMove = true,
  ...rest
}: CustomSliderProps) => {
  const sliderRef = useRef<Slider>(null);

  const goToNextSlide = () => sliderRef.current?.slickNext();
  const goToPrevSlide = () => sliderRef.current?.slickPrev();

  return (
    <Stack sx={styles.sliderContainer}>
      <Slider
        ref={sliderRef}
        {...{ slidesToShow, infinite, speed, slidesToScroll, swipe, touchMove }}
        {...rest}
      >
        {children}
      </Slider>
      <Button
  onClick={goToPrevSlide}
  sx={styles.prevButton}
>
  <Icon name="chevron_left" fontSize={30} />
</Button>
<Button
  onClick={goToNextSlide}
  sx={styles.nextButton}
>
  <Icon name="chevron_right" fontSize={30} />
</Button>
    </Stack>
  );
};

export default CustomSlider;
