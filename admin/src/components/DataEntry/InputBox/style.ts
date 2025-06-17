import { css } from '@emotion/react';
import { black20, black300, black50, blue500, red500 } from '@myThingsKr/emcore-js';

export const inputWrapStyle = (error: boolean, focused: boolean) => css`
  display: flex;
  padding: 12px 16px;
  width: 100%;
  max-width: 400px;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  border: 1px solid ${error ? red500 : focused ? blue500 : black50};
  border-radius: 8px;
  background-color: ${black20};
`;

export const inputStyle = css`
  width: 100%;
  height: 22px;
  font-size: 16px;
  font-weight: 500;
  background-color: transparent !important;
  &::placeholder {
    color: ${black300};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: #000;
    -webkit-box-shadow: 0 0 0 1000px ${black20} inset;
    box-shadow: 0 0 0 1000px ${black20} inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  &:autofill,
  &:autofill:hover,
  &:autofill:focus,
  &:autofill:active {
    -webkit-text-fill-color: #000;
    -webkit-box-shadow: 0 0 0 1000px ${black20} inset;
    box-shadow: 0 0 0 1000px ${black20} inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;
