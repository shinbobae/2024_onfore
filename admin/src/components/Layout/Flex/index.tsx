/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes } from 'react';
import { css } from '@emotion/react';

type JustifyType = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
type AlignType = 'start' | 'end' | 'stretch' | 'flex-start' | 'center' | 'flex-end';
type FlexWrapType = 'nowrap' | 'wrap' | 'wrap-reverse';
type FlexDirectionType = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type AlignSelfType =
  | 'auto'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'center'
  | 'start'
  | 'end'
  | 'self-start'
  | 'self-end';
type FlexProps = {
  children?: React.ReactNode;
  justify?: JustifyType;
  align?: AlignType;
  direction?: FlexDirectionType;
  gap?: string;
  wrap?: FlexWrapType;
  width?: string;
  padding?: string;
  alignSelf?: AlignSelfType;
} & HTMLAttributes<HTMLDivElement>;

const Flex = ({
  children,
  justify = 'flex-start',
  align = 'flex-start',
  direction = 'row',
  gap = '0px',
  wrap = 'nowrap',
  width,
  padding = '0',
  alignSelf = 'auto',
  ...props
}: FlexProps) => (
  <div css={flexStyle(justify, align, direction, alignSelf, gap, wrap, width, padding)} style={props.style}>
    {children && children}
  </div>
);

export default Flex;

const flexStyle = (
  justify?: JustifyType,
  align?: AlignType,
  direction?: FlexDirectionType,
  alignSelf?: AlignSelfType,
  gap?: string,
  wrap?: FlexWrapType,
  width?: string,
  padding?: string,
) => css`
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
  flex-direction: ${direction};
  align-self: ${alignSelf};
  gap: ${gap};
  flex-wrap: ${wrap};
  padding: ${padding};

  ${width && `width: ${width};`};
`;
