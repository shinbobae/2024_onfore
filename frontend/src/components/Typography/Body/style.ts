import { css } from '@emotion/react';
import { BodyTextLevelType } from './index.tsx';
import { black900 } from '@myThingsKr/emcore-js';

const levelToSize = (level: BodyTextLevelType) => {
  switch (level) {
    case 1:
      return `16px`;
    case 2:
      return '15px';
    case 3:
      return '14px';
    default:
      return '14px';
  }
};

export const BodyTextStyle = (
  level: BodyTextLevelType,
  color: string | null,
  align?: 'left' | 'center' | 'right',
) => css`
  font-weight: 500;
  font-size: ${levelToSize(level)};
  line-height: ${level === 2 ? '23px' : '150%'};
  color: ${color ?? black900};
  ${align && `text-align: ${align}`}
`;
