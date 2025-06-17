/** @jsxImportSource @emotion/react */
import Flex from '../Layout/Flex';
import Headline from '../Typography/Headline';
import BodyText from '../Typography/Body';
import { black300, black500, Button, Popup } from '@myThingsKr/emcore-js';
import SvgIcoCloseLine24 from '../../assets/icon/IcoCloseLine24.tsx';
import { Children } from '../../type';
import { css } from '@emotion/react';

type EditPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  onSave: () => void;
  saveDisabled?: boolean;
  saveLoading?: boolean;
} & Children;

const EditPopup = ({
  isOpen,
  onClose,
  title,
  description,
  onSave,
  saveLoading,
  saveDisabled,
  children,
}: EditPopupProps) => {
  return (
    <Popup isOpen={isOpen} onClose={() => null}>
      <Flex justify={'center'} direction={'column'} gap={'8px'}>
        <Flex justify={'space-between'} alignSelf={'stretch'} padding={'8px'}>
          <Flex direction={'column'} padding={'0 0 0 8px'} gap={'8px'}>
            <Headline level={3}>{title}</Headline>
            {description && (
              <BodyText level={2} color={black500}>
                {description}
              </BodyText>
            )}
          </Flex>
          <Button
            variant={'text'}
            icon={<SvgIcoCloseLine24 color={black300} width={24} />}
            style={{ paddingRight: '0px' }}
            onClick={onClose}
          />
        </Flex>
        <div css={editPopupScrollWrap}>{children}</div>
        <Button block padding={'md'} color={'primary'} loading={saveLoading} disabled={saveDisabled} onClick={onSave}>
          저장하기
        </Button>
      </Flex>
    </Popup>
  );
};

export default EditPopup;

const editPopupScrollWrap = css`
  width: 100%;
  max-height: 450px;
  overflow-y: auto;
`;
