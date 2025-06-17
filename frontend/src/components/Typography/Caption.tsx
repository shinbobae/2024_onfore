/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { css } from '@emotion/react';
import { black900 } from '@myThingsKr/emcore-js';

type CaptionType = {
  color?: string;
  children: ReactNode;
} & React.ClassAttributes<HTMLElement> &
  React.HTMLAttributes<HTMLElement>;

const Caption = ({ color, children }: CaptionType) => <span css={CaptionStyle(color ?? null)}>{children}</span>;

export default Caption;

const CaptionStyle = (color: string | null) => css`
  font-weight: 600;
  font-size: 12px;

  color: ${color ?? black900};
`;
