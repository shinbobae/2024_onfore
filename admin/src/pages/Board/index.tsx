/** @jsxImportSource @emotion/react */

import Flex from '../../components/Layout/Flex';
import OrganizationList from './OrganizationList';
import { black100, black500 } from '@myThingsKr/emcore-js';
import UnregisteredBoardList from './UnregisteredBoardList';
import Headline from '../../components/Typography/Headline';
import BodyText from '../../components/Typography/Body';
import RegisteredBoardList from './RegisteredBoardList';
import useBoardStore from '../../store/board';
import { css } from '@emotion/react';

const Board = () => {
  const { selectedOrgaId, unregiBoardList } = useBoardStore();
  return (
    <Flex>
      <Flex direction="column" alignSelf={'stretch'} width={'400px'} style={{ borderRight: `1px solid ${black100}` }}>
        <OrganizationList />
      </Flex>
      <Flex direction="column" alignSelf={'stretch'} width={'calc(100% - 400px)'} style={{ flex: '1 0 0' }}>
        <Flex
          align={'center'}
          alignSelf={'stretch'}
          padding={unregiBoardList.length > 0 ? '20px 24px 12px 24px' : '20px 24px 18px 24px'}
          gap={'8px'}>
          <Flex direction={'column'} gap={'4px'}>
            <Headline level={5}>보드 목록</Headline>
            {unregiBoardList.length > 0 && (
              <BodyText level={3} color={black500} style={{ textAlign: 'center' }}>
                새로운 보드를 조직에 등록하려면 등록하기 버튼을 눌러주세요.
              </BodyText>
            )}
          </Flex>
        </Flex>

        <div css={boardListWrap}>
          <UnregisteredBoardList />
          {selectedOrgaId && <RegisteredBoardList />}
        </div>
      </Flex>
    </Flex>
  );
};
export default Board;

const boardListWrap = css`
  overflow-y: auto;
  width: 100%;
  height: calc(100vh - 60px - 87px - 1px);
`;
