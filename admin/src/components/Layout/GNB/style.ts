import { css } from '@emotion/react';
import { black0 } from '@myThingsKr/emcore-js';

export const menuWrapStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
`;

export const menuProfile = css`
  position: fixed;
  right: 30px;
  top: 62px;
  border-radius: 6px;
  background-color: ${black0};
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
`;
