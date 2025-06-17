/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import Flex from '../Layout/Flex';
import SvgIcoArrowFilledDown24 from '../../assets/icon/IcoArrowFilledDown24.tsx';
import SvgIcoArrowFilledRight24 from '../../assets/icon/IcoArrowFilledRight24.tsx';
import Headline from '../Typography/Headline';
import { black500 } from '@myThingsKr/emcore-js';
import BodyText from '../Typography/Body';
import { css } from '@emotion/react';

type CollapseProps = {
  title: string;
  subtitle?: string;
  isOpen?: boolean;
  content: React.ReactNode;
};
const Collapse = ({ title, subtitle, isOpen = false, content }: CollapseProps) => {
  const [open, setOpen] = useState<boolean>(isOpen);

  return (
    <div style={{ width: '100%' }}>
      <Flex direction={'column'} alignSelf={'stretch'} gap={'12px'}>
        <div onClick={() => setOpen((state) => !state)} css={collapseWrap}>
          <Flex align={'center'} alignSelf={'stretch'} gap={'8px'} padding={'8px 32px 8px 16px'}>
            {open ? (
              <SvgIcoArrowFilledDown24 color={black500} width={24} height={24} />
            ) : (
              <SvgIcoArrowFilledRight24 color={black500} width={24} height={24} />
            )}
            <Headline level={6}>{title}</Headline>
            {subtitle && (
              <BodyText level={1} color={black500}>
                {subtitle}
              </BodyText>
            )}
          </Flex>
        </div>

        {open && <div style={{ width: '100%' }}>{content}</div>}
      </Flex>
    </div>
  );
};
export default Collapse;

const collapseWrap = css`
  cursor: pointer;
`;
