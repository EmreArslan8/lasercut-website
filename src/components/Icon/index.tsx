'use client';

import useLocale from '@/lib/hooks/useLocale';
import { usePalette } from '@/theme/ThemeRegistry';
import { Box, SxProps } from '@mui/material';

export interface IconProps {
  name: string;
  fill?: boolean;
  weight?: number;
  fontSize?: number;
  color?: string;
  sx?: SxProps;
  onClick?: () => void;
  href?: string;
  target?: '_self' | '_blank';
}

const Icon = ({
  name: _name,
  fill = false,
  weight = 400,
  fontSize = 24,
  color = 'inherit',
  sx,
  onClick,
  href,
  target = '_self',
}: IconProps) => {
  const palette = usePalette();
  const fontVariationSettings = `'FILL' ${fill === true ? 1 : 0}, 'wght' ${weight}`;
  const name = _name;
  return (
    <Box
      component={href ? 'a' : 'div'}
      href={href}
      target={target}
      className="material-symbols-rounded"
      sx={{
        userSelect: 'none',
        fontVariationSettings: fontVariationSettings,
        fontSize: `${fontSize}px !important`,
        color: (palette as any)[color]?.main ?? color,
        cursor: onClick || href ? 'pointer' : 'unset',
        textDecoration: 'none',
        ...sx,
      }}
      onClick={onClick}
    >
      {name}
    </Box>
  );
};

const handleRtl = (name: string): string => {
  switch (name) {
    case 'arrow_forward':
      return 'arrow_back';
    case 'arrow_back':
      return 'arrow_forward';
    case 'chevron_right':
      return 'chevron_left';
    case 'chevron_left':
      return 'chevron_right';
    default:
      return name;
  }
};

export default Icon;
