/** @jsxImportSource @emotion/react */

import { Children } from '../../../type';
import { drawerContentsStyle, drawerWrap } from './style.ts';
import Flex from '../Flex';
import Headline from '../../Typography/Headline';
import SvgIcoCloseLine24 from '../../../assets/icon/IcoCloseLine24.tsx';
import { black300 } from '@myThingsKr/emcore-js';

/** @jsxImportSource @emotion/react */
export type DrawerPropsType = {
  open: boolean;
  onClose: () => void;
  title?: string;
} & Children;

const Drawer = ({ open, onClose, title, children }: DrawerPropsType) => {
  return (
    <div css={drawerWrap(open)}>
      <Flex gap={'8px'} align={'flex-start'} justify={'space-between'} padding={'24px 20px 20px 20px'}>
        {title ? (
          <Headline level={3}>{title}</Headline>
        ) : (
          <Headline level={3} color={'transparent'}>
            TITLE
          </Headline>
        )}
        <button onClick={onClose}>
          <SvgIcoCloseLine24 color={black300} width={24} />
        </button>
      </Flex>

      <div css={drawerContentsStyle}>{children}</div>
    </div>
  );
};

export default Drawer;
