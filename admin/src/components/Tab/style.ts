import { css } from '@emotion/react';
import { black300, black50, black900, blue500 } from '@myThingsKr/emcore-js';

export const tabMenuWrapStyle = (type: 'dot' | 'underline') => css`
  border-bottom: 1px solid ${black50};
  ${type === 'dot' &&
  `
        padding: 4px 0 4px 4px;
        border-top: 1px solid ${black50};
    `}

  & .tab-items button {
    ${type === 'dot' ? tabMenuDotStyle(true) : tabMenuUnderlineStyle(false)}
  }
`;

export const tabMenuDotStyle = (active: boolean) => css`
  position: relative;
  align-items: center;
  gap: 10px;
  padding: 4px 8px 4px 18px;
  color: ${active ? blue500 : black300};
  font-size: 15px;
  font-weight: 600;

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${active ? blue500 : black300};
  }
`;

export const tabMenuUnderlineStyle = (active: boolean) => css`
  position: relative;
  padding: 12px 0;
  color: ${active ? black900 : black300};
  font-size: 15px;
  font-weight: 600;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: ${active ? black900 : 'transparent'};
  }
`;

export const tabContentsWrapStyle = (height?: string) => css`
  padding: 8px 0;

  ${height &&
  `
        overflow-y: auto;
        height: ${height};
    `};
`;

export const tabContentsStyle = (active: boolean) => css`
  ${!active && `display: none;`}
`;

export const tabInnerStyle = (padding?: string) => css`
  padding: ${padding ?? `0`};
`;
