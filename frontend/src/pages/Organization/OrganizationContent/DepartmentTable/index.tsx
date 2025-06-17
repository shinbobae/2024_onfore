/** @jsxImportSource @emotion/react */
import { orgaSectionStyle } from '../../style.ts';
import { black10, black600, blue500, Button, useAlert, useConfirm } from '@myThingsKr/emcore-js';
import BodyText from '../../../../components/Typography/Body';
import Flex from '../../../../components/Layout/Flex';
import SearchBox from '../../../../components/DataEntry/SearchBox';
import useInput from '../../../../hooks/useInput.tsx';
import { GetProp, Table, TableColumnsType, TablePaginationConfig, TableProps } from 'antd';
import { DepartmentDataType, useOrganizationStore } from '../../../../store/organization';
import React, { useCallback, useEffect, useState } from 'react';
import SubTitle from '../../../../components/Typography/SubTitle';
import { SorterResult } from 'antd/es/table/interface';
import { divider } from '../../../../components/Layout/style.ts';
import SvgIcDelete from '../../../../assets/icon/IcDelete.tsx';
import SvgIcEdit from '../../../../assets/icon/IcEdit.tsx';
import DepartmentEditPopup from './DepartmentEditPopup';
import { DeleteDepartmentRequest } from '../../../../api/organization/type.ts';
import SvgIcoError from '../../../../assets/icon/IcoError.tsx';

const departmentColumn: TableColumnsType<DepartmentDataType> = [
  {
    title: '부서명',
    dataIndex: 'name',
    key: 'name',
    width: '240px',
    sorter: (a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0),
  },
  { title: '구성원', dataIndex: 'memberCount', key: 'memberCount', width: '180px', render: (_) => <>{_}명</> },
  {
    title: '담당 시설',
    dataIndex: 'siteList',
    key: 'siteList',
    render: (_, record) => {
      return (
        <>
          {record.siteList.map((item, index) => (
            <span key={item.id}>
              {index !== 0 && ', '}
              {item.name}
            </span>
          ))}
        </>
      );
    },
  },
];
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const DepartmentTable = () => {
  const {
    organizationId,
    departmentDataSource,
    organizationLoading,
    departmentSaveSuccess,
    deleteDepartment,
    departmentDeleteSuccess,
    departmentDeleteLoading,
  } = useOrganizationStore();

  const [searchInput, onChangeSearchInput, setSearchInput] = useInput('');
  const [tableParams, setTableParams] = useState<TableParams>({ pagination: { current: 1, pageSize: 10 } });
  const [tableData, setTableData] = useState<DepartmentDataType[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<DepartmentDataType[]>([]);
  const [editPopup, setEditPopup] = useState<{ open: boolean; mode: 'add' | 'edit' }>({ open: false, mode: 'add' });
  const { openConfirm } = useConfirm();
  const { openAlert } = useAlert();

  // 테이블 초기값 입력
  useEffect(() => {
    setTableData(departmentDataSource);
  }, [departmentDataSource]);
  // 검색어 입력
  useEffect(() => {
    if (searchInput.length > 0) {
      const searchedList = [...departmentDataSource].filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase()),
      );
      setTableData(searchedList);
    } else {
      setTableData(departmentDataSource);
    }
  }, [departmentDataSource, searchInput]);

  // 페이지네이션, 정렬 등
  const onChangeTable: TableProps<DepartmentDataType>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
    });
  };

  // 테이블 select
  const rowSelection: TableProps<DepartmentDataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DepartmentDataType[]) => {
      console.log(selectedRowKeys);
      setSelectedColumn(selectedRows);
    },
    selectedRowKeys: selectedColumn.map((item) => item.id),
  };

  // 저장,수정, 삭제 완료 후 selection 초기화
  useEffect(() => {
    if (departmentSaveSuccess || departmentDeleteSuccess) setSelectedColumn([]);
  }, [departmentSaveSuccess, departmentDeleteSuccess]);

  // 삭제 버튼 클릭
  const onDeleteConfirm = useCallback(() => {
    if (selectedColumn.some((item) => item.memberCount > 0)) {
      openAlert({
        title: '부서 삭제 불가',
        content: (
          <>
            구성원이 있는 부서가 포함되어 있습니다.
            <br />
            구성원 목록에서 구성원의 부서를 이동시킨 후, 삭제해주세요.
          </>
        ),
        icon: <SvgIcoError width={32} height={32} />,
        cancelText: '확인',
      });
      return;
    }
    openConfirm({
      title: '부서 삭제 ',
      content: <>조직에서 보드를 삭제하면 데이터 수집에 문제가 생길 수 있습니다. 정말 삭제할까요?</>,
      ok: onDelete,
      okText: '삭제하기',
      okLoading: departmentDeleteLoading,
      okColor: 'danger',
    });
  }, [selectedColumn]);
  const onDelete = useCallback(async () => {
    const data: DeleteDepartmentRequest = {
      organizationId: organizationId,
      id_list: selectedColumn.map((item) => item.id),
    };
    deleteDepartment(data);
  }, [organizationId, selectedColumn]);

  return (
    <>
      <div css={orgaSectionStyle(black10)}>
        <Flex justify={'space-between'} align={'center'} alignSelf={'stretch'} padding={'9px 40px'}>
          <BodyText level={2} color={black600}>
            부서 목록
          </BodyText>
        </Flex>
      </div>

      <Flex direction={'column'} gap={'12px'} alignSelf={'stretch'} padding={'20px 40px'}>
        <Flex justify={'space-between'} align={'center'} alignSelf={'stretch'}>
          <SearchBox
            placeholder={'부서명 검색'}
            width={'340px'}
            clear
            value={searchInput}
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

            <Button onClick={() => setEditPopup({ open: true, mode: 'add' })}>부서 추가</Button>
          </Flex>
        </Flex>
        <div style={{ width: '100%' }}>
          <Table
            size={'small'}
            loading={organizationLoading}
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            columns={departmentColumn}
            dataSource={tableData}
            locale={{
              triggerDesc: undefined,
              triggerAsc: undefined,
              cancelSort: undefined,
            }}
            pagination={{
              ...tableParams.pagination,
              total: departmentDataSource.length,
              pageSizeOptions: ['10', '20', '30'],
              showSizeChanger: true,
              onShowSizeChange: (current, pageSize) => {
                setTableParams({ ...tableParams, pagination: { current: current, pageSize: pageSize } });
              },
            }}
            onChange={onChangeTable}
            footer={() => <SubTitle level={2}>총 {departmentDataSource.length}개의 부서</SubTitle>}
          />
        </div>
      </Flex>

      <DepartmentEditPopup
        isOpen={editPopup.open}
        mode={editPopup.mode}
        onClose={() => setEditPopup({ open: false, mode: 'add' })}
        columnData={editPopup.mode === 'edit' ? selectedColumn[0] : null}
      />
    </>
  );
};

export default DepartmentTable;
