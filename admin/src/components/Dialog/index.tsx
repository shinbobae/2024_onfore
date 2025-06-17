/** @jsxImportSource @emotion/react */
import { black700, Button, Portal } from '@myThingsKr/emcore-js';
import React, { useMemo } from 'react';
import { modalBackground, modalContent, modalWrap } from './style.ts';
import Headline from '../Typography/Headline';
import BodyText from '../Typography/Body';
import Flex from '../Layout/Flex';

type DialogPropsType = {
  open: boolean;
  title: string;
  icon?: React.ReactNode;
  message?: React.ReactNode;
  close: () => void;
  closeText?: string;
  closeColor?: 'primary' | 'danger' | 'default';
  ok?: () => void;
  okLoading?: boolean;
  okText?: string;
  okColor?: 'primary' | 'danger';
};
const Dialog = ({
  open,
  title,
  icon,
  message,
  closeText = '취소',
  close,
  closeColor = 'default',
  ok,
  okText = '확인',
  okLoading,
  okColor = 'primary',
}: DialogPropsType) => {
  const zIndex = useMemo(() => new Date().getTime(), []);

  if (!open) return null;

  return (
    <Portal>
      <div css={modalBackground(zIndex)} />
      <div css={modalWrap(zIndex)}>
        <div css={modalContent}>
          {icon && icon}
          <Headline level={5}>{title}</Headline>
          {message && (
            <BodyText level={2} color={black700} align={'center'} style={{ wordBreak: 'break-word' }}>
              {message}
            </BodyText>
          )}
        </div>
        <Flex gap={'12px'} alignSelf={'stretch'}>
          <Button block padding={'md'} color={closeColor} onClick={close}>
            {closeText}
          </Button>
          {ok && (
            <Button block padding={'md'} color={okColor ? okColor : 'primary'} loading={okLoading} onClick={ok}>
              {okText}
            </Button>
          )}
        </Flex>
      </div>
    </Portal>
  );
};

export default Dialog;
