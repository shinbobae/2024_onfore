import { css } from '@emotion/react';
import { black100, black50 } from '@myThingsKr/emcore-js';

export const backgroundColor = (color: string) => css`
  background-color: ${color};
`;
export const orgaLogoWrap = css`
  overflow: hidden;
  width: 80px;
  height: 80px;
  border: 1px solid ${black100};
  border-radius: 16px;
  & > img {
    display: flex;
    width: 80px;
    height: 80px;
    object-fit: scale-down;
  }
`;
export const orgaSectionStyle = (color: string) => css`
  ${backgroundColor(color)};
  border-top: 1px solid ${black50};
`;
