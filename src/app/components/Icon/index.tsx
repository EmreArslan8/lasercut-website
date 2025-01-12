'use client';

import { Box, SxProps } from '@mui/material';

export interface IconProps {
  name: string;
  fill?: boolean;
  weight?: number;
  fontSize?: number | string;
  color?: string;
  sx?: SxProps;
  onClick?: () => void;
}

const Icon = ({
  name,
  fill = false,
  weight = 400,
  fontSize = 24,
  color = 'inherit',
  sx,
  onClick,
}: IconProps) => {
  const fontVariationSettings = `'FILL' ${fill === true ? 1 : 0}, 'wght' ${weight}`;
  return (
    <Box
      className="material-symbols-rounded"
      sx={{
        fontVariationSettings: fontVariationSettings,
        fontSize: fontSize,
        color: color,
        cursor: onClick ? 'pointer' : 'unset',
        ...sx,
      }}
      onClick={onClick}
    >
      {name}
    </Box>
  );
};

export default Icon;
