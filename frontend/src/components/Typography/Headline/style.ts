import { css } from '@emotion/react';
import { HeadlineLevelType } from './index.tsx';
import { black900 } from '@myThingsKr/emcore-js';

const levelToSize = (level: HeadlineLevelType) => {
  switch (level) {
    case 1:
      return `60px`
    case 2:
      return '40px'
    case 3:
      return '28px'
    case 4:
      return '24px'
    case 5:
      return '20px'
    case 6:
      return '18px'
    default:
      return '18px'
  }
}

export const headlineStyle = (level: HeadlineLevelType, color: string | null) => css`
    font-weight: 600;
    font-size: ${levelToSize(level)};
    line-height: 150%;
    color: ${color ?? black900};
    word-break: break-word;
`;