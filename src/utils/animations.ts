import { keyframes } from "@mui/material";

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const slideRight = keyframes`
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
`;

export const slideLeft = keyframes`
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
`;

export const ripple = keyframes`
  from {
    transform: scale(1);
    opacity: 0.6;
  }
  to {
    transform: scale(2.5);
    opacity: 0;
  }
`;
