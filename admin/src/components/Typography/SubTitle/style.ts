import { css } from '@emotion/react';
import { SubTitleLevelType } from './index.tsx';
import { black900 } from '@myThingsKr/emcore-js';

const levelToSize = (level: SubTitleLevelType) => {
  switch (level) {
    case 1:
      return `16px`;
    case 2:
      return '15px';
    case 3:
      return '14px';
    case 4:
      return '12px';
    default:
      return '15px';
  }
};

export const subTitleStyle = (level: SubTitleLevelType, color: string | null) => css`
  font-weight: 600;
  font-size: ${levelToSize(level)};
  line-height: ${level === 2 ? '23px' : '150%'};

  color: ${color ?? black900};
`;
