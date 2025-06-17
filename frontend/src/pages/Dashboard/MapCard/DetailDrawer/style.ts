import { css } from '@emotion/react';
import { black20 } from '@myThingsKr/emcore-js';

export const mapDetailInnerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
`;

export const mapDetailRankCardStyle = css`
  display: flex;
  align-items: center;
  flex: 1 0 0;
  margin-top: 20px;
  background-color: ${black20};
  border-radius: 12px;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    padding: 16px 12px;

    &:first-of-type {
      width: 140px;
    }
    &:last-of-type {
      width: calc(100% - 140px);
    }
  }
`;

export const rankChangeStyle = css`
  display: flex;
  align-items: center;
`;

export const mapDetailCompanyInfoStyle = css`
  //flex-basis: auto;
  //width: 50%;
`;

export const mapDetailSiteTimeStyle = css``;
