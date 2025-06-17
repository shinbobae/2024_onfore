/** @jsxImportSource @emotion/react */

import Flex from '../../../components/Layout/Flex';
import BodyText from '../../../components/Typography/Body';
import { black10, black600, black700, blue500, Button } from '@myThingsKr/emcore-js';
import SubTitle from '../../../components/Typography/SubTitle';
import useBoardStore, { RegiBoardDataType } from '../../../store/board';
import { useCallback, useEffect, useState } from 'react';
import SvgIcoDashboard from '../../../assets/icon/IcoDashboard.tsx';
import Dropdown from '../../../components/DataEntry/Dropdown';
import SearchBox from '../../../components/DataEntry/SearchBox';
import useInput from '../../../hooks/useInput.tsx';
import EditableTable from './EditableTable';
import { GetProp, notification, TablePaginationConfig, TableProps } from 'antd';
import { SorterResult } from 'antd/es/table/interface';
import { divider } from '../../../components/Layout/style.ts';
import SvgIcDelete from '../../../assets/icon/IcDelete.tsx';
import { DeleteBoardRequest } from '../../../api/board/type.ts';
import Dialog from '../../../components/Dialog';

const YNOptions = [
  { label: '설정됨', value: 'Y' },
  { label: '설정 안됨', value: 'N' },
];

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}
const RegisteredBoardList = () => {
  const {
    selectedOrgaId,
    regiBoardDataSource,
    getRegisteredBoardList,
    registerSuccess,
    editSuccess,
    editError,
    deleteBoard,
    deleteLoading,
    deleteSuccess,
    deleteError,
    resetStatus,
  } = useBoardStore();
  const [searchInput, onChangeSearchInput, setSearchInput] = useInput('');
  const [ynfilter, setYnfilter] = useState<string[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<RegiBoardDataType[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({ pagination: { current: 1, pageSize: 10 } });
  const [tableDataSource, setTableDataSource] = useState<RegiBoardDataType[]>([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    if (selectedOrgaId) getRegisteredBoardList(selectedOrgaId);
  }, [selectedOrgaId]);

  useEffect(() => {
    if (selectedOrgaId === null) return;
    if (registerSuccess || editSuccess || deleteSuccess) getRegisteredBoardList(selectedOrgaId);
  }, [selectedOrgaId, registerSuccess, editSuccess, deleteSuccess]);

  const onChangeYnFilter = useCallback(
    (value: string) => {
      let newValue: string[] = [];
      if (ynfilter.some((item) => item === value)) {
        newValue = [...ynfilter].filter((item) => item !== value);
      } else {
        newValue = [...ynfilter, value];
      }
      setYnfilter(newValue);
    },
    [ynfilter],
  );

  useEffect(() => {
    let newData: RegiBoardDataType[] = [];
    if (searchInput.length > 0) {
      newData = [...regiBoardDataSource].filter((item) => item.name.toLowerCase().includes(searchInput.toLowerCase()));
    } else {
      newData = [...regiBoardDataSource];
    }

    if (ynfilter.length > 0) {
      newData = [...regiBoardDataSource].filter((data) => ynfilter.includes(data.useYn));
    }

    setTableDataSource(newData);
  }, [regiBoardDataSource, searchInput, ynfilter]);

  const onDeleteRegisterBoard = useCallback(() => {
    if (selectedOrgaId === null) return;
    if (selectedColumn.length < 1) {
      notification['warning']({
        message: '삭제 할 보드를 선택해주세요',
      });
      return;
    }
    const data: DeleteBoardRequest = {
      organizationId: selectedOrgaId,
      id_list: selectedColumn.map((item) => item.id),
    };
    deleteBoard(data);
    setDeleteConfirmOpen(false);
  }, [selectedOrgaId, selectedColumn]);

  useEffect(() => {
    if (editSuccess) {
      notification['success']({
        message: '보드명이 수정되었습니다.',
      });
    }
    if (editError) {
      notification['warning']({
        message: '보드명 수정에 실패했습니다.',
      });
    }
    if (deleteSuccess) {
      notification['success']({
        message: '보드가 삭제되었습니다.',
      });
      setSelectedColumn([]);
    }
    if (deleteError) {
      notification['warning']({
        message: '보드 삭제에 실패했습니다.',
      });
    }
    resetStatus();
  }, [editSuccess, editError, deleteSuccess, deleteError]);

  return (
    <>
      <Flex
        align={'center'}
        alignSelf={'stretch'}
        padding={'9px 24px'}
        gap={'6px'}
        style={{ backgroundColor: black10, borderTop: '1px solid #d9d9d9' }}>
        <BodyText level={2} color={black600}>
          이 조직에 등록된 보드 목록
        </BodyText>
        <SubTitle level={2} color={blue500}>
          {regiBoardDataSource.length}
        </SubTitle>
      </Flex>
      {regiBoardDataSource.length > 0 ? (
        <>
          <Flex justify={'space-between'} align={'center'} alignSelf={'stretch'} padding={'8px 12px '}>
            <Flex align={'center'} alignSelf={'stretch'} padding={'8px 20px 8px 12px'} gap={'12px'}>
              <Dropdown
                title={'구역 설정'}
                selection={'checkbox'}
                options={YNOptions}
                value={ynfilter}
                onChange={onChangeYnFilter}
              />
              <SearchBox
                placeholder={'보드명 검색'}
                clear
                value={searchInput}
                setValue={setSearchInput}
                onChange={onChangeSearchInput}
              />
            </Flex>
            {selectedColumn.length > 0 && (
              <Flex align={'center'} alignSelf={'stretch'} gap={'8px'}>
                <SubTitle level={1} color={blue500}>
                  {selectedColumn.length}개 선택됨
                </SubTitle>
                <span css={divider} />
                <Button
                  variant={'text'}
                  loading={deleteLoading}
                  icon={<SvgIcDelete width={24} />}
                  onClick={() => setDeleteConfirmOpen(true)}>
                  삭제
                </Button>
              </Flex>
            )}
          </Flex>
          <div style={{ paddingBottom: '40px' }}>
            <EditableTable
              tableParams={tableParams}
              setTableParams={setTableParams}
              selectedColumn={selectedColumn}
              setSelectedColumn={setSelectedColumn}
              tableDataSource={tableDataSource}
            />
          </div>
        </>
      ) : (
        <Flex
          direction={'column'}
          justify={'center'}
          align={'center'}
          alignSelf={'stretch'}
          gap={'16px'}
          padding={'120px 0'}>
          <SvgIcoDashboard width={32} />
          <SubTitle level={1} color={black700}>
            이 구역에 등록된 보드가 없습니다.
          </SubTitle>
        </Flex>
      )}

      <Dialog
        open={deleteConfirmOpen}
        title={'보드 삭제'}
        message={<>조직에서 보드를 삭제하면 데이터 수집에 문제가 생길 수 있습니다. 정말 삭제할까요?</>}
        close={() => {
          setDeleteConfirmOpen(false);
        }}
        ok={onDeleteRegisterBoard}
        okColor={'danger'}
        okLoading={deleteLoading}
      />
    </>
  );
};
export default RegisteredBoardList;
