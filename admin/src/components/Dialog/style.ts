import { css } from '@emotion/react';
import { black0 } from '@myThingsKr/emcore-js';

export const modalWrap = (zIndex: number) => css`
  display: flex;
  width: 340px;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  background-color: ${black0};
  border-radius: 16px;

  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: ${zIndex};
`;

export const modalContent = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;

export const modalBackground = (zIndex: number) => css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: ${zIndex};
`;
