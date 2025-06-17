/** @jsxImportSource @emotion/react */

import useOrganizationStore, { MemberDataType } from '../../../store/organization';
import Flex from '../../../components/Layout/Flex';
import { TableParams } from '../../../type';
import React, { useCallback, useEffect, useState } from 'react';
import SearchBox from '../../../components/DataEntry/SearchBox';
import useInput from '../../../hooks/useInput.tsx';
import SubTitle from '../../../components/Typography/SubTitle';
import { blue500, Button, useConfirm } from '@myThingsKr/emcore-js';
import { divider } from '../../../components/Layout/style.ts';
import SvgIcEdit from '../../../assets/icon/IcEdit.tsx';
import SvgIcDelete from '../../../assets/icon/IcDelete.tsx';
import { notification, Table, TableColumnsType, TableProps } from 'antd';
import { MemberListRequest } from '../../../api/organization/type.ts';
import { ROLE_OPTION } from './data.ts';
import Dropdown from '../../../components/DataEntry/Dropdown';
import MemberEditPopup from './MemberEditPopup';

const memberColumn: TableColumnsType<MemberDataType> = [
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
    width: '200px',
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: '소속 부서',
    dataIndex: 'departmentName',
    key: 'departmentName',
    width: '200px',
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: '권한',
    dataIndex: 'role',
    key: 'role',
    width: '160px',
    render: (_) =>
      _ === 'ORGANIZATION_ADMIN' ? '조직 관리자' : _ === 'DEPARTMENT_ADMIN' ? '부서 관리자' : '일반 사용자',
  },
  { title: '아이디', dataIndex: 'userAccount', key: 'userAccount', width: '200px' },
  { title: '휴대폰 번호', dataIndex: 'phone', key: 'phone', width: '200px' },
  { title: '이메일', dataIndex: 'email', key: 'email' },
];

const MemberContent = () => {
  const {
    organizationId,
    getDepartmentList,
    departmentList,
    getMemberList,
    memberDataSource,
    memberListLoading,
    memberListTotal,
    saveMemberSuccess,
    editMemberSuccess,
    deleteMember,
    deleteMemberLoading,
    deleteMemberSuccess,
    deleteMemberError,
    resetApiState,
  } = useOrganizationStore();
  const [filterRole, setFilterRole] = useState<string[]>([]);
  const [filterDepart, setFilterDepart] = useState<string[]>([]);
  const [searchInput, onChangeSearchInput, setSearchInput] = useInput('');
  const [tableParams, setTableParams] = useState<TableParams<MemberDataType>>({
    pagination: { current: 1, pageSize: 10 },
  });
  const [tableData, setTableData] = useState<MemberDataType[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<MemberDataType[]>([]);
  const [editPopup, setEditPopup] = useState<{ open: boolean; mode: 'add' | 'edit' }>({ open: false, mode: 'add' });
  const { openConfirm } = useConfirm();

  useEffect(() => {
    getDepartmentList(organizationId);
    getMember();
  }, [organizationId, searchInput, filterRole, filterDepart, tableParams]);

  useEffect(() => {
    if (saveMemberSuccess || editMemberSuccess || deleteMemberSuccess) {
      getMember();
    }
  }, [saveMemberSuccess, editMemberSuccess, deleteMemberSuccess]);

  const getMember = useCallback(() => {
    if (!organizationId || !tableParams.pagination) return;
    const param: MemberListRequest = {
      organizationId: organizationId,
      page: (tableParams.pagination.current || 1) - 1,
      size: tableParams.pagination.pageSize || 10,
    };
    if (tableParams.sorter && !Array.isArray(tableParams.sorter) && tableParams.sorter.order) {
      switch (tableParams.sorter.columnKey) {
        case 'departmentName':
          param.sort = ['department_name', tableParams.sorter.order === 'ascend' ? 'asc' : 'desc'];
          break;
        case 'name':
          param.sort = ['name', tableParams.sorter.order === 'ascend' ? 'asc' : 'desc'];
          break;
        default:
          break;
      }
    }
    if (searchInput.trim().length > 0) param.keyword = searchInput;
    if (filterRole.length > 0) param.role_list = filterRole;
    if (filterDepart.length > 0) param.department_id_list = filterDepart;
    getMemberList(param);
  }, [organizationId, searchInput, filterRole, filterDepart, tableParams]);

  useEffect(() => {
    setTableData(memberDataSource);
  }, [memberDataSource]);

  const onChangeFilterRole = useCallback(
    (value: string) => {
      let newValue: string[] = [];
      if (filterRole.find((role) => role === value)) {
        newValue = [...filterRole].filter((role) => role !== value);
      } else {
        newValue = [...filterRole, value];
      }
      setFilterRole(newValue);
    },
    [filterRole],
  );
  const onChangeFilterDepart = useCallback(
    (value: string) => {
      let newValue: string[] = [];
      if (filterDepart.find((role) => role === value)) {
        newValue = [...filterDepart].filter((role) => role !== value);
      } else {
        newValue = [...filterDepart, value];
      }
      setFilterDepart(newValue);
    },
    [filterDepart],
  );

  const rowSelection: TableProps<MemberDataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: MemberDataType[]) => {
      console.log(selectedRowKeys);
      setSelectedColumn(selectedRows);
    },
    selectedRowKeys: selectedColumn.map((item) => item.id),
  };
  const onChangeTable: TableProps<MemberDataType>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({ pagination, filters, sorter });
  };

  const onDeleteConfirm = useCallback(() => {
    openConfirm({
      title: '구성원 삭제 ',
      content: <>정말 삭제할까요?</>,
      ok: onDelete,
      okText: '삭제하기',
      okLoading: deleteMemberLoading,
      okColor: 'danger',
    });
  }, [selectedColumn]);

  const onDelete = useCallback(() => {
    if (organizationId === null) return;

    deleteMember({
      organizationId: organizationId,
      id_list: selectedColumn.map((item) => item.id),
    });
  }, [organizationId, selectedColumn]);

  useEffect(() => {
    if (deleteMemberSuccess) {
      notification['success']({
        message: '구성원이 삭제되었습니다.',
      });
      setSelectedColumn([]);
    }
    if (deleteMemberError) {
      notification['warning']({
        message: '구성원 삭제에 실패했습니다.',
      });
    }
    resetApiState();
  }, [deleteMemberSuccess, deleteMemberError]);

  return (
    <>
      <Flex direction={'column'} alignSelf={'stretch'} gap={'12px'} padding={'20px 40px'}>
        <Flex justify={'space-between'} align={'center'} alignSelf={'stretch'}>
          <Flex align={'center'} gap={'12px'}>
            <Dropdown
              title={'권한 선택'}
              selection={'checkbox'}
              options={ROLE_OPTION}
              value={filterRole}
              onChange={onChangeFilterRole}
            />
            <Dropdown
              title={'소속 부서'}
              selection={'checkbox'}
              options={departmentList.map((item) => ({ label: item.name, value: item.id }))}
              value={filterDepart}
              onChange={onChangeFilterDepart}
            />
            <SearchBox
              placeholder={'이름, 아이디, 휴대폰번호, 이메일 검색'}
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
                  loading={deleteMemberLoading}
                  onClick={onDeleteConfirm}>
                  삭제
                </Button>
                <span css={divider} />
              </Flex>
            )}

            <Button onClick={() => setEditPopup({ open: true, mode: 'add' })}>구성원 추가하기</Button>
          </Flex>
        </Flex>
        <div style={{ width: '100%' }}>
          <Table
            size={'small'}
            loading={memberListLoading}
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            columns={memberColumn}
            dataSource={tableData}
            pagination={{
              ...tableParams.pagination,
              total: memberListTotal,
              pageSizeOptions: ['10', '20', '30'],
              showSizeChanger: true,
              onShowSizeChange: (current, pageSize) => {
                setTableParams({ pagination: { current: current, pageSize: pageSize } });
              },
            }}
            // locale={{ triggerDesc: undefined, triggerAsc: undefined, cancelSort: undefined }}
            onChange={onChangeTable}
            footer={() => <SubTitle level={2}>총 {memberListTotal}명의 구성원</SubTitle>}
          />
        </div>
      </Flex>

      <MemberEditPopup
        isOpen={editPopup.open}
        mode={editPopup.mode}
        onClose={() => setEditPopup({ open: false, mode: 'add' })}
        columnData={editPopup.mode === 'edit' ? selectedColumn[0] : null}
      />
    </>
  );
};
export default MemberContent;
