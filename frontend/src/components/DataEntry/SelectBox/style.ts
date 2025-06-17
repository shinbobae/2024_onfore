import { css } from '@emotion/react';
import { black0, black20, black50 } from '@myThingsKr/emcore-js';

export const dropdownWrap = css`
  position: relative;
  width: 100%;
`;
export const dropdownTrigger = (ghost: boolean) => css`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  align-items: center;
  gap: 6px;
  border: 1px solid ${black50};
  border-radius: 6px;
  background: ${ghost ? 'transparent' : black20};
  cursor: pointer;

  & span {
    width: 1px;
    height: 19px;
    background-color: ${black50};
  }
`;

export const dropdownOptions = css`
  display: flex;
  position: absolute;
  left: 0;
  top: calc(100% + 1px);

  overflow-y: auto;
  width: 100%;
  max-height: 320px;
  padding: 8px 0;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 6px;
  background: ${black0};
  z-index: 999;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
`;

export const dropdownOption = (disabled: boolean) => css`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  ${disabled && `background-color: ${black20};`};
  cursor: pointer;
  &:hover {
    background-color: ${black20};
  }
`;
