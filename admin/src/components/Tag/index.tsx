/** @jsxImportSource @emotion/react */

import React from 'react';
import { black, black0, blue, green, mandarin, red, yellow } from '@myThingsKr/emcore-js';
import { css } from '@emotion/react';

export type TagSizeType = 'sm' | 'md' | 'lg';
export type TagVariantType = 'filled' | 'outlined' | 'borderless';
export type TagColorType =
  | 'blue'
  | 'green'
  | 'mandarin'
  | 'red'
  | 'yellow'
  | 'black'
  | 'white'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'info'
  | null
  | undefined;

type TagBaseProps = {
  children: React.ReactNode;
  variant?: TagVariantType;
  color?: TagColorType;
  style?: React.CSSProperties;
};

const getThemeColor = (colorProps: TagColorType): { text: string; background: string; border: string } => {
  switch (colorProps) {
    case 'blue':
    case 'primary':
      return { text: blue[700], background: blue[50], border: blue[500] };
    case 'green':
    case 'secondary':
      return { text: green[700], background: green[50], border: green[500] };
    case 'mandarin':
    case 'warning':
      return {
        text: mandarin[700],
        background: mandarin[50],
        border: mandarin[500],
      };
    case 'red':
    case 'danger':
      return { text: red[700], background: red[50], border: red[500] };
    case 'yellow':
    case 'info':
      return {
        text: yellow[700],
        background: yellow[50],
        border: yellow[500],
      };
    case 'black':
      return { text: black[0], background: black[800], border: black[800] };
    case 'white':
      return { text: black[700], background: black[20], border: black[700] };
    default:
      return { text: blue[700], background: blue[50], border: blue[500] };
  }
};

const Tag = ({ children, variant = 'borderless', color = 'blue', style }: TagBaseProps) => {
  return (
    <div css={tagStyle(color, variant)} style={style}>
      {children}
    </div>
  );
};

const tagStyle = (color: TagColorType, variant: TagVariantType) => css`
  display: inline-flex;
  padding: 3px 7px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: ${variant === 'filled' ? black0 : getThemeColor(color).text};
  background-color: ${variant === 'filled' ? getThemeColor(color).text : getThemeColor(color).background};
  border: 1px solid ${variant === 'borderless' ? getThemeColor(color).background : getThemeColor(color).border};
  border-radius: 4px;
`;

export default Tag;
