/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { headlineStyle } from './style.ts';


export type HeadlineLevelType = 1 | 2 | 3 | 4 | 5 | 6
type HeadlineType = {
  level: HeadlineLevelType,
  color?: string,
  children: ReactNode,
} & React.ClassAttributes<HTMLHeadingElement> & React.HTMLAttributes<HTMLHeadingElement>

const Headline = ({ level, color, children }: HeadlineType) => {
  switch (level) {
    case 1:
      return <h1 css={headlineStyle(level, color ?? null)}>{children}</h1>
    case 2:
      return <h2 css={headlineStyle(level, color ?? null)}>{children}</h2>;
    case 3:
      return <h3 css={headlineStyle(level, color ?? null)}>{children}</h3>;
    case 4:
      return <h4 css={headlineStyle(level, color ?? null)}>{children}</h4>;
    case 5:
      return <h5 css={headlineStyle(level, color ?? null)}>{children}</h5>;
    case 6:
      return <h6 css={headlineStyle(level, color ?? null)}>{children}</h6>;
    default:
      return <h6 css={headlineStyle(level, color ?? null)}>{children}</h6>;
  }
}

export default Headline;