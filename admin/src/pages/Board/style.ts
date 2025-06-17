import { css } from '@emotion/react';

export const widthStyle = (width: string) => css`
  width: ${width};
`;

export const scrollHeight = (height: string) => css`
  overflow-y: auto;
  width: 100%;
  height: ${height};
`;
