import { css } from '@emotion/react';
import { black50 } from '@myThingsKr/emcore-js';

export const MapCardItem = (width: string) => css`
    width: ${width};
    flex-basis: auto;
`;

export const mapDrawerContentStyle = css`
    
`;

export const mapGraphPeriodWrap = css`
    display: inline-flex;
    border: 1px solid ${black50};
    border-radius: 6px;
    
    & > button {
        position: relative;
        padding: 6px 12px;
        
        &:after {
            content: '';
            position: absolute;
            right: 0;
            width: 1px;
            height: 16px;
            background-color: ${black50};
        }
        &:last-of-type {
            &:after {
                width: 0;
            }
        }
    }
`;

export const detailRankStyle = css`
    
`;