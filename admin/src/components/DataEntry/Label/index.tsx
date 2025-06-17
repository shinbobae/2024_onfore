/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { black700, red500 } from '@myThingsKr/emcore-js';
import { Children } from '../../../type';

type LabelProps = {
  htmlFor?: string;
  required?: boolean;
} & Children;

const Label = ({ htmlFor, required, children }: LabelProps) => (
  <label htmlFor={htmlFor} css={labelStyle}>
    {required && <span>* </span>}
    {children}
  </label>
);

export default Label;

const labelStyle = () => css`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: ${black700};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
    cursor: pointer;
    & > span {color: ${red500}
`;
