/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes } from 'react';
import Flex from '../Layout/Flex';
import { tabInnerStyle, tabMenuDotStyle, tabMenuUnderlineStyle, tabMenuWrapStyle } from './style.ts';
import { Children } from '../../type';
import TabContext, { useTabContext } from './context.ts';

export type TabType = 'dot' | 'underline';

type TabProps = {
  type: TabType;
  extra?: React.ReactNode;
  padding?: string;
} & Children;

export type TabButtonProps = {
  active: boolean;
  onClick: () => void;
} & Children &
  HTMLAttributes<HTMLButtonElement>;

export const Tab = ({ type, extra, padding, children }: TabProps) => {
  return (
    <TabContext.Provider value={{ type: type }}>
      <div id={'tab-header'} css={tabMenuWrapStyle(type)}>
        <Tab.Inner padding={padding ?? '0'}>
          <Flex justify={'space-between'} align={'center'}>
            <Flex className={'tab-items'} align={'center'} gap={type === 'dot' ? '4px' : '24px'}>
              {children}
            </Flex>

            <div>{extra}</div>
          </Flex>
        </Tab.Inner>
      </div>
    </TabContext.Provider>
  );
};

Tab.Button = ({ children, onClick, ...props }: TabButtonProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { type } = useTabContext();

  return (
    <button
      css={type === 'dot' ? tabMenuDotStyle(props.active) : tabMenuUnderlineStyle(props.active)}
      onClick={onClick}>
      {children}
    </button>
  );
};

Tab.Inner = ({ padding, children }: { padding: string } & Children) => (
  <div css={tabInnerStyle(padding)}>{children}</div>
);
