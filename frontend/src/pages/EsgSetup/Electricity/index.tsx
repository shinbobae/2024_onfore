/** @jsxImportSource @emotion/react */

import Flex from '../../../components/Layout/Flex';
import SearchBox from '../../../components/DataEntry/SearchBox';
import { useCallback, useEffect, useState } from 'react';
import useInput from '../../../hooks/useInput.tsx';
import { blue500, Button, useConfirm } from '@myThingsKr/emcore-js';
import useESGSetupStore, { ESGBaseDataType } from '../../../store/ESGSetup';
import { notification, Spin } from 'antd';
import Collapse from '../../../components/Collapse';
import SubTitle from '../../../components/Typography/SubTitle';
import { divider } from '../../../components/Layout/style.ts';
import SvgIcEdit from '../../../assets/icon/IcEdit.tsx';
import SvgIcDelete from '../../../assets/icon/IcDelete.tsx';
import ElectricityEditPopup from './ElectricityEditPopup';
import ElecTable from './ElecTable';

const EsgElectricity = () => {
  const [searchInput, onChangeSearchInput, setSearchInput] = useInput('');
  const [selectedColumn, setSelectedColumn] = useState<ESGBaseDataType[]>([]);

  const [tableData, setTableData] = useState<
    {
      siteId: string;
      siteName: string;
      dataSource: ESGBaseDataType[];
    }[]
  >([]);
  const [editPopup, setEditPopup] = useState<{ open: boolean; mode: 'add' | 'edit' }>({ open: false, mode: 'add' });
  const { openConfirm } = useConfirm();

  const {
    getEsgTypeData,
    esgTypeDataSource,
    esgTypeLoading,
    saveEsgSuccess,
    editEsgSuccess,
    saveEsgError,
    editEsgError,
    deleteEsgTypeData,
    deleteEsgError,
    deleteEsgSuccess,
    deleteEsgLoading,
    resetApiState,
  } = useESGSetupStore();

  useEffect(() => {
    getEsgTypeData('electricity');
  }, []);

  useEffect(() => {
    setTableData(esgTypeDataSource);
  }, [esgTypeDataSource]);
  // 검색 필터
  useEffect(() => {
    const searchedList = JSON.parse(JSON.stringify(esgTypeDataSource));
    if (searchInput.length > 0) {
      for (let i = 0; i < searchedList.length; i++) {
        searchedList[i].dataSource = searchedList[i].dataSource.filter((item: ESGBaseDataType) =>
          item.boardName.toLowerCase().includes(searchInput.toLowerCase()),
        );
      }
    }
    setTableData(searchedList);
  }, [esgTypeDataSource, searchInput]);

  const onDelete = useCallback(() => {
    deleteEsgTypeData({ esgType: 'electricity', id_list: selectedColumn.map((item) => item.itemId) });
  }, [selectedColumn]);

  useEffect(() => {
    if (saveEsgSuccess || editEsgSuccess) {
      notification['success']({ message: '저장되었습니다.' });
      setEditPopup({ open: false, mode: 'add' });
      setSelectedColumn([]);
      getEsgTypeData('electricity');
    }
    if (deleteEsgSuccess) {
      notification['success']({ message: '삭제되었습니다.' });
      setSelectedColumn([]);
      getEsgTypeData('electricity');
    }
    if (saveEsgError || editEsgError) {
      notification['warning']({ message: '저장 실패했습니다.' });
    }
    if (deleteEsgError) {
      notification['success']({ message: '삭제 실패했습니다.' });
    }
    resetApiState();
  }, [saveEsgSuccess, editEsgSuccess, saveEsgError, editEsgError, deleteEsgSuccess, deleteEsgError]);

  return (
    <>
      <Flex direction="column" justify={'center'} alignSelf={'stretch'} gap={'20px'} padding={'12px 0'}>
        <Flex justify={'space-between'} align={'center'} alignSelf={'stretch'}>
          <Flex align={'center'} gap={'12px'}>
            <SearchBox
              placeholder={'시설명, 보드명 검색'}
              width={'340px'}
              value={searchInput}
              onChange={onChangeSearchInput}
              clear
              setValue={setSearchInput}
            />
          </Flex>
          <Flex justify={'flex-end'} align={'center'} gap={'20px'}>
            {selectedColumn.length > 0 && (
              <Flex align={'center'} alignSelf={'stretch'} gap={'8px'}>
                <SubTitle level={1} color={blue500}>
                  {selectedColumn.length}개 선택됨
                </SubTitle>
                <span css={divider} />
                {selectedColumn.length === 1 && (
                  <Button
                    variant={'text'}
                    icon={<SvgIcEdit width={18} />}
                    onClick={() => setEditPopup({ open: true, mode: 'edit' })}>
                    수정
                  </Button>
                )}
                <Button
                  variant={'text'}
                  icon={<SvgIcDelete width={18} />}
                  onClick={() =>
                    openConfirm({
                      title: '재생에너지 측정량 항목 삭제',
                      content: <>시설에서 보드를 삭제하면 데이터 수집에 문제가 생길 수 있습니다. 정말 삭제할까요?</>,
                      okText: '삭제하기',
                      okColor: 'danger',
                      ok: onDelete,
                      okLoading: deleteEsgLoading,
                    })
                  }>
                  삭제
                </Button>
                <span css={divider} />
              </Flex>
            )}

            <Button onClick={() => setEditPopup({ open: true, mode: 'add' })}>항목 추가하기</Button>
          </Flex>
        </Flex>

        {tableData.map((item) => (
          <Collapse
            key={item.siteId}
            title={item.siteName}
            subtitle={item.dataSource.length.toString()}
            isOpen={true}
            content={
              <div style={{ width: '100%' }}>
                <ElecTable
                  data={item.dataSource}
                  selectedColumn={selectedColumn}
                  setSelectedColumn={setSelectedColumn}
                />
              </div>
            }
          />
        ))}
      </Flex>

      <ElectricityEditPopup
        isOpen={editPopup.open}
        mode={editPopup.mode}
        onClose={() => setEditPopup({ open: false, mode: 'add' })}
        columnData={editPopup.mode === 'add' ? null : selectedColumn[0]}
      />

      <Spin spinning={esgTypeLoading} fullscreen />
    </>
  );
};
export default EsgElectricity;
