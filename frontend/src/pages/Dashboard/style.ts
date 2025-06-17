import { css } from '@emotion/react';
import { black0 } from '@myThingsKr/emcore-js';

export const dashboardWrapStyle = css`
    padding: 20px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    //align-items: flex-start;
    //flex-wrap: wrap;
`;

export const dashboardCardWrapStyle = (padding?: string, height?: string) => css`
    padding: ${padding ?? `20px`};
    width: 100%;
    height: ${height ?? `auto`};
    background-color: ${black0};
    border-radius: 12px;
    
    ${height && `overflow-y: scroll`}
`