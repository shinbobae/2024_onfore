import { css } from '@emotion/react';
import { black0, black100 } from '@myThingsKr/emcore-js';

export const headerWrapStyle = css`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 60px;
  padding: 12px 40px 12px 24px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  background: ${black0};
  border-bottom: 1px solid ${black100};
  z-index: 999;
`;

export const gnbWrapStyle = css`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const userMenuWrapStyle = css``;
