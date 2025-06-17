import { css } from '@emotion/react';
import { black0, black100, black20, black700, black900 } from '@myThingsKr/emcore-js';

export const shadow = css`
  position: absolute;
  inset: 0;
  //z-index: 0;
  & > div {
    position: absolute;
    left: 0;
    right: 0;
    height: 38px;
  }
  & > div:first-of-type {
    top: 0;
    background-color: ${black20};
    border-bottom: 1px solid ${black100};
  }
  & > div:last-of-type {
    bottom: 0;
    background-color: ${black20};
  }
`;
export const tableWrap = css`
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  border-top: 1px solid ${black900};
  margin-bottom: 20px;
  margin-top: 20px;

  & table {
    border-collapse: collapse;
    border-spacing: 0;
    text-align: center;
    & th,
    td {
      position: relative;
      padding: 8px 16px;
      height: 37px;
      color: ${black700};
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;

      &:first-of-type {
        text-align: left;
      }
    }

    & thead {
      border-bottom: 1px solid ${black100};
      background-color: ${black20};
    }
    & tbody > tr:last-of-type > td {
      background-color: ${black20};
    }
  }
`;

export const stickyColumn = (point: boolean) => css`
  position: sticky;
  left: 0;
  max-width: 160px !important;
  background-color: ${point ? black20 : black0};
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    left: -6px;
    top: 0;
    bottom: -1px;
    width: 5px;
    border-right: 1px solid ${black100};
    background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.08) 100%);
    z-index: 2;
  }
  &:after {
    content: '';
    position: absolute;
    right: -6px;
    top: 0;
    bottom: -1px;
    width: 5px;
    border-left: 1px solid ${black100};
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0) 100%);
    z-index: 2;
  }
`;
