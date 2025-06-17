import { css } from '@emotion/react';
import { black0 } from '@myThingsKr/emcore-js';

export const drawerWrap = (open: boolean) => css`
  position: fixed;
  overflow: hidden;
  top: 63px;
  bottom: 0;
  right: ${open ? '0' : '-100%'};
  width: 500px;
  background-color: ${black0};
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);

  transition: right 0.2s ease;
  z-index: 10;
`;

export const drawerContentsStyle = css`
  height: calc(100% - 86px);
  background-color: ${black0};
  overflow-y: auto;
`;
