import { css } from '@emotion/react';
import { black0, black50, blue500 } from '@myThingsKr/emcore-js';

export const filterInputWrap = (focused: boolean, width?: string, shadow?: boolean) => css`
  position: relative;
  width: ${width ? width : `100%`};
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: ${black0};
  ${focused && `border-color: ${blue500}`};
  ${shadow && `box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);`};
`;
export const searchInput = (clear: boolean) => css`
  display: block;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  ${clear && `padding-right: 32px`}
`;
export const searchListWrap = css`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 2px);
  overflow-y: auto;
  padding: 4px 0 12px;
  max-height: 320px;
  z-index: 3;
  background: ${black0};
  border-radius: 6px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
`;

export const searchItem = css`
  display: flex;
  padding: 8px 32px 8px 20px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  &:hover {
    background-color: ${black50};
  }
`;

export const clearPosition = css`
  position: absolute;
  right: 12px;
  top: 50%;
  margin-top: -12px;
`;
