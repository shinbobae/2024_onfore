/** @jsxImportSource @emotion/react */
import Flex from '../../../components/Layout/Flex';
import BodyText from '../../../components/Typography/Body';
import { black10, black600, mandarin500 } from '@myThingsKr/emcore-js';
import SubTitle from '../../../components/Typography/SubTitle';
import useBoardStore from '../../../store/board';
import { useEffect } from 'react';
import EditableTable from './EditableTable';
import { notification } from 'antd';

const UnregisteredBoardList = () => {
  const { unregiBoardList, getUnregisteredBoardList, registerSuccess, registerError, resetStatus } = useBoardStore();
  useEffect(() => {
    getUnregisteredBoardList();
  }, []);

  useEffect(() => {
    if (registerSuccess) {
      notification['success']({
        message: '등록되었습니다.',
      });
      getUnregisteredBoardList();
      resetStatus();
    }
  }, [registerSuccess]);
  useEffect(() => {
    if (registerError) {
      notification['warning']({
        message: '등록 실패했습니다.',
      });
      resetStatus();
    }
  }, [registerError]);

  if (unregiBoardList.length < 1) {
    return null;
  }
  return (
    <>
      <Flex
        align={'center'}
        alignSelf={'stretch'}
        padding={'9px 24px'}
        gap={'6px'}
        style={{ backgroundColor: black10, borderTop: '1px solid #d9d9d9' }}>
        <BodyText level={2} color={black600}>
          미등록 보드 목록
        </BodyText>
        <SubTitle level={2} color={mandarin500}>
          {unregiBoardList.length}
        </SubTitle>
      </Flex>
      <div>
        <EditableTable />
      </div>
    </>
  );
};
export default UnregisteredBoardList;
