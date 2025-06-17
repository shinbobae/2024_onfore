import { css } from '@emotion/react';
import { black0, black100, black50 } from '@myThingsKr/emcore-js';

export const googleMapWrapStyle = css`
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: 6px;
  align-items: stretch;
`;

export const googleMapFilterWrap = css`
  position: absolute;
  left: 20px;
  width: 320px;
  top: 20px;
  z-index: 2;

  display: flex;
  flex-direction: column;
  gap: 10px;

  & > div {
    position: relative;
  }
`;
export const filterItemDrop = css`
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: ${black0};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
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

export const filterCharDrop = css`
  ${filterItemDrop};
  position: absolute;
  left: 0;
  top: calc(100% + 8px);

  display: inline-flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
`;

export const mapChanFilterBar = css`
  width: 1px;
  height: 17px;
  background-color: ${black100};
`;
