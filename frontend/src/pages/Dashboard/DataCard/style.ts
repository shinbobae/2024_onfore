import { css } from '@emotion/react';
import { black0, black100 } from '@myThingsKr/emcore-js';

export const dataCardWrapStyle = css`
    display: flex;
    padding: 12px 20px;
    align-items: center;
    gap: 12px;
    flex: 1 0 0;
    background-color: ${black0};
    border-radius: 12px;
    height: auto;
`

export const dataCartDividerStyle = css`
    width: 1px;
    height: 100px;
    background-color: ${black100};
`;

export const dataWrapStyle = css`
    display: flex;
    padding: 12px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex: 1 0 0;
`;