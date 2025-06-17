/** @jsxImportSource @emotion/react */
import { orgaSectionStyle } from '../../style.ts';
import { black10, black600, blue500, Button, useConfirm } from '@myThingsKr/emcore-js';
import BodyText from '../../../../components/Typography/Body';
import Flex from '../../../../components/Layout/Flex';
import SearchBox from '../../../../components/DataEntry/SearchBox';
import useInput from '../../../../hooks/useInput.tsx';
import { Table, TableColumnsType, TableProps } from 'antd';
import { SiteDataType, useOrganizationStore } from '../../../../store/organization';
import React, { useCallback, useEffect, useState } from 'react';
import SubTitle from '../../../../components/Typography/SubTitle';
import { divider } from '../../../../components/Layout/style.ts';
import SvgIcDelete from '../../../../assets/icon/IcDelete.tsx';
import SvgIcEdit from '../../../../assets/icon/IcEdit.tsx';
import { DeleteSiteRequest } from '../../../../api/organization/type.ts';
import SiteEditPopup from './SiteEditPopup';
import { TableParams } from '../../../../type';

const siteColumn: TableColumnsType<SiteDataType> = [
  {
    title: '시설명',
    dataIndex: 'name',
    key: 'name',
    width: '240px',
    sorter: (a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0),
  },
  {
    title: '시설주소',
    dataIndex: 'fullAddress',
    key: 'fullAddress',
    render: (_, record) => (
      <>
        {record.state} {record.city} {record.addressDetail}
      </>
    ),
  },
  {
    title: '공개 여부',
    dataIndex: 'publicYn',
    key: 'publicYn',
    width: '100px',
    render: (_) => (_ === 'Y' ? <>공개</> : <>비공개</>),
  },
];

const SiteTable = () => {
  const {
    organizationId,
    siteDataSource,
    organizationLoading,
    siteSaveSuccess,
    deleteSite,
    siteDeleteSuccess,
    siteDeleteLoading,
  } = useOrganizationStore();

  const [searchInput, onChangeSearchInput, setSearchInput] = useInput('');
  const [tableParams, setTableParams] = useState<TableParams<SiteDataType>>({
    pagination: { current: 1, pageSize: 10 },
  });
  const [tableData, setTableData] = useState<SiteDataType[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<SiteDataType[]>([]);
  const [editPopup, setEditPopup] = useState<{ open: boolean; mode: 'add' | 'edit' }>({ open: false, mode: 'add' });
  const { openConfirm } = useConfirm();

  // 테이블 초기값 입력
  useEffect(() => {
    setTableData(siteDataSource);
  }, [siteDataSource]);
  // 검색어 입력
  useEffect(() => {
    if (searchInput.length > 0) {
      const searchedList = [...siteDataSource].filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase()),
      );
      setTableData(searchedList);
    } else {
      setTableData(siteDataSource);
    }
  }, [siteDataSource, searchInput]);

  // 페이지네이션, 정렬 등
  const onChangeTable: TableProps<SiteDataType>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
    });
  };

  // 테이블 select
  const rowSelection: TableProps<SiteDataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: SiteDataType[]) => {
      console.log(selectedRowKeys);
      setSelectedColumn(selectedRows);
    },
    selectedRowKeys: selectedColumn.map((item) => item.id),
  };

  // 저장,수정, 삭제 완료 후 selection 초기화
  useEffect(() => {
    if (siteSaveSuccess || siteDeleteSuccess) setSelectedColumn([]);
  }, [siteSaveSuccess, siteDeleteSuccess]);

  // 삭제 버튼 클릭
  const onDeleteConfirm = useCallback(() => {
    openConfirm({
      title: '시설 삭제 ',
      content: <>조직에서 시설을 삭제하면 데이터 수집에 문제가 생길 수 있습니다. 정말 삭제할까요?</>,
      ok: onDelete,
      okText: '삭제하기',
      okLoading: siteDeleteLoading,
      okColor: 'danger',
    });
  }, [selectedColumn]);
  const onDelete = useCallback(async () => {
    const data: DeleteSiteRequest = {
      organizationId: organizationId,
      id_list: selectedColumn.map((item) => item.id),
    };
    deleteSite(data);
  }, [organizationId, selectedColumn]);

  return (
    <>
      <div css={orgaSectionStyle(black10)}>
        <Flex justify={'space-between'} align={'center'} alignSelf={'stretch'} padding={'9px 40px'}>
          <BodyText level={2} color={black600}>
            시설 목록
          </BodyText>
        </Flex>
      </div>

      <Flex direction={'column'} gap={'12px'} alignSelf={'stretch'} padding={'20px 40px'}>
        <Flex justify={'space-between'} align={'center'} alignSelf={'stretch'}>
          <SearchBox
            placeholder={'시설명 검색'}
            width={'340px'}
            value={searchInput}
            clear
            setValue={setSearchInput}
            onChange={onChangeSearchInput}
            extend={false}
          />
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
                <Button variant={'text'} icon={<SvgIcDelete width={18} />} onClick={onDeleteConfirm}>
                  삭제
                </Button>
                <span css={divider} />
              </Flex>
            )}

            <Button onClick={() => setEditPopup({ open: true, mode: 'add' })}>시설 추가</Button>
          </Flex>
        </Flex>
        <div style={{ width: '100%' }}>
          <Table
            size={'small'}
            loading={organizationLoading}
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            columns={siteColumn}
            dataSource={tableData}
            locale={{
              triggerDesc: undefined,
              triggerAsc: undefined,
              cancelSort: undefined,
            }}
            pagination={{
              ...tableParams.pagination,
              total: siteDataSource.length,
              pageSizeOptions: ['10', '20', '30'],
              showSizeChanger: true,
              onShowSizeChange: (current, pageSize) => {
                setTableParams({ ...tableParams, pagination: { current: current, pageSize: pageSize } });
              },
            }}
            onChange={onChangeTable}
            footer={() => <SubTitle level={2}>총 {siteDataSource.length}개의 시설</SubTitle>}
          />
        </div>
      </Flex>

      <SiteEditPopup
        isOpen={editPopup.open}
        mode={editPopup.mode}
        onClose={() => setEditPopup({ open: false, mode: 'add' })}
        columnData={editPopup.mode === 'edit' ? selectedColumn[0] : null}
      />
    </>
  );
};

export default SiteTable;
