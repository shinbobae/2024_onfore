import { css } from '@emotion/react';
import { black0, black20 } from '@myThingsKr/emcore-js';

// ex[prt]
export const dropdownWrap = css`
  position: relative;
`;
export const dropdownTriggerWrap = css`
  cursor: pointer;
`;
export const dropdownTrigger = css`
  display: flex;
  padding: 6px 8px 6px 12px;
  align-items: center;
  gap: 6px;
  border-radius: 6px;
  background: ${black0};
  z-index: 99;
`;

export const dropdownOptions = css`
  display: flex;
  position: absolute;
  left: 0;
  top: calc(100% + 1px);

  width: 240px;
  padding: 8px 0;
  overflow-y: auto;
  max-height: 268px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 6px;
  background: ${black0};
  z-index: 99;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
`;

export const dropdownOption = css`
  display: flex;
  padding: 8px 32px 8px 20px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  cursor: pointer;

  &:hover {
    background-color: ${black20};
  }
`;
