/** @jsxImportSource @emotion/react */

import React, { useCallback, useEffect, useState } from 'react';
import { black700, Tag } from '@myThingsKr/emcore-js';
import { Table, TableColumnsType, TableProps } from 'antd';
import BodyText from '../../../../components/Typography/Body';
import useESGSetupStore, { ESGBaseDataType } from '../../../../store/ESGSetup';
import { TableParams } from '../../../../type';
import Flex from '../../../../components/Layout/Flex';
import SvgIcoDashboard from '../../../../assets/icon/svg/IcoDashboard.tsx';
import SubTitle from '../../../../components/Typography/SubTitle';

const electricityColumn: TableColumnsType<ESGBaseDataType> = [
  {
    title: '연결 기기명',
    dataIndex: 'boardName',
    key: 'boardName',
    sorter: (a, b) => (a.boardName < b.boardName ? -1 : a.boardName > b.boardName ? 1 : 0),
    showSorterTooltip: false,
  },
  {
    title: '통신상태',
    dataIndex: 'workYN',
    key: 'workYN',
    width: '100px',
    render: (_) => (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          padding: '5px 16px',
        }}>
        <Tag variant={'borderless'} color={_ === 'Y' ? 'green' : 'mandarin'}>
          <BodyText level={3} color={'inherit'}>
            {_ === 'Y' ? '정상' : '에러'}
          </BodyText>
        </Tag>
      </div>
    ),
  },
];

type ElecTableProps = {
  data: ESGBaseDataType[];
  selectedColumn: ESGBaseDataType[];
  setSelectedColumn: React.Dispatch<React.SetStateAction<ESGBaseDataType[]>>;
};

const ElecTable = ({ data, selectedColumn, setSelectedColumn }: ElecTableProps) => {
  // const [selectedColumn, setSelectedColumn] = useState<ESGBaseDataType[]>([]);
  const [tableParams, setTableParams] = useState<TableParams<ESGBaseDataType>>({
    pagination: { current: 1, pageSize: 10 },
  });
  const [tableData, setTableData] = useState<ESGBaseDataType[]>([]);
  const { esgTypeLoading } = useESGSetupStore();
  useEffect(() => {
    setTableData(data);
  }, [data]);

  // 페이지네이션, 정렬 등
  const onChangeTable: TableProps<ESGBaseDataType>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
    });
  };
  const onSelectColumn = useCallback(
    (record: ESGBaseDataType) => {
      let newSelected: ESGBaseDataType[] = [];
      if (selectedColumn.filter((item) => item.key === record.key).length > 0) {
        newSelected = selectedColumn.filter((item) => item.key !== record.key);
      } else {
        newSelected = [...selectedColumn, record];
      }
      setSelectedColumn(newSelected);
    },
    [selectedColumn],
  );
  const onSelectAll = useCallback(
    (selected: boolean, selectedRows: ESGBaseDataType[], changeRows: ESGBaseDataType[]) => {
      let newSelected: ESGBaseDataType[] = [];
      console.log(selectedRows);
      if (selected) {
        // 전체선택
        if (selectedColumn.length > 0) {
          // 선택된게 있을 때
          newSelected = [...selectedColumn, ...changeRows];
        } else {
          //선택된게 없을때
          newSelected = changeRows;
        }
      } else {
        // 전체선택 해제
        newSelected = selectedColumn.filter((item) => !changeRows.includes(item));
      }
      setSelectedColumn(newSelected);
    },
    [selectedColumn],
  );
  const rowSelection: TableProps<ESGBaseDataType>['rowSelection'] = {
    onSelect: onSelectColumn,
    onSelectAll: onSelectAll,
    selectedRowKeys: selectedColumn.map((item) => item.key),
  };

  return (
    <>
      <Table
        size={'small'}
        loading={esgTypeLoading}
        rowSelection={{ type: 'checkbox', ...rowSelection }}
        columns={electricityColumn}
        dataSource={tableData}
        pagination={{
          ...tableParams.pagination,
          total: tableData.length,
          pageSizeOptions: ['10', '20', '30'],
          showSizeChanger: true,
          onShowSizeChange: (current, pageSize) => {
            setTableParams({ pagination: { current: current, pageSize: pageSize } });
          },
        }}
        onChange={onChangeTable}
        locale={{
          emptyText: (
            <Flex
              direction={'column'}
              justify={'center'}
              align={'center'}
              alignSelf={'stretch'}
              gap={'16px'}
              padding={'60px 0'}>
              <SvgIcoDashboard width={32} />
              <SubTitle level={1} color={black700}>
                목록이 없습니다.
              </SubTitle>
            </Flex>
          ),
        }}
        footer={() => <SubTitle level={2}>총 {tableData.length}개의 항목 </SubTitle>}
      />
    </>
  );
};
export default ElecTable;
