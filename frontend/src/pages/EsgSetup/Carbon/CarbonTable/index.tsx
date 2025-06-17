/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useState } from 'react';
import { black700, Tag } from '@myThingsKr/emcore-js';
import { GetProp, Table, TableColumnsType, TablePaginationConfig, TableProps } from 'antd';
import { ESGSetupDataType, useESGSetupStore } from '../../../../store/ESGSetup';
import BodyText from '../../../../components/Typography/Body';
import SvgIcoPdf from '../../../../assets/icon/IcoPdf.tsx';
import { SorterResult } from 'antd/es/table/interface';
import Flex from '../../../../components/Layout/Flex';
import SvgIcoDashboard from '../../../../assets/icon/svg/IcoDashboard.tsx';
import SubTitle from '../../../../components/Typography/SubTitle';

const carbonColumn: TableColumnsType<ESGSetupDataType> = [
  {
    title: '연결 기기명',
    dataIndex: 'boardName',
    key: 'boardName',
    width: '261px',
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
  {
    title: '인증 항목명',
    dataIndex: 'itemName',
    key: 'itemName',
    width: '261px',
    sorter: (a, b) => (a.boardName < b.boardName ? -1 : a.boardName > b.boardName ? 1 : 0),
    showSorterTooltip: false,
  },
  { title: '기준량', dataIndex: 'formulaStandard', key: 'formulaStandard', width: '100px' },
  { title: '단위', dataIndex: 'formulaUnit', key: 'formulaUnit', width: '100px' },
  { title: '단위당 탄소 절감량(kg CO2-eq)', dataIndex: 'formulaPer', key: 'formulaPer', width: '261px' },
  {
    title: '인증업체',
    dataIndex: 'certifiedBy',
    key: 'certifiedBy',
    width: '140px',
    sorter: (a, b) => (a.certifiedBy < b.certifiedBy ? -1 : a.certifiedBy > b.certifiedBy ? 1 : 0),
  },
  {
    title: '등록증',
    dataIndex: 'certifiedUrl',
    key: 'certifiedUrl',
    width: '72px',
    align: 'center',
    render: (_) => (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          margin: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <a
          href={_}
          download
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', width: '24px', height: '24px', alignItems: 'center', justifyContent: 'center' }}>
          <SvgIcoPdf width={24} height={24} />
        </a>
      </div>
    ),
  },
];
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

type CarbonTableProps = {
  data: ESGSetupDataType[];
  selectedColumn: ESGSetupDataType[];
  setSelectedColumn: React.Dispatch<React.SetStateAction<ESGSetupDataType[]>>;
};

const CarbonTable = ({ data, selectedColumn, setSelectedColumn }: CarbonTableProps) => {
  const [tableParams, setTableParams] = useState<TableParams>({ pagination: { current: 1, pageSize: 10 } });

  const [tableData, setTableData] = useState<ESGSetupDataType[]>([]);

  const { esgTypeLoading } = useESGSetupStore();

  useEffect(() => {
    setTableData(data);
  }, [data]);

  // 페이지네이션, 정렬 등
  const onChangeTable: TableProps<ESGSetupDataType>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
    });
  };
  const onSelectColumn = useCallback(
    (record: ESGSetupDataType) => {
      let newSelected: ESGSetupDataType[] = [];
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
    (selected: boolean, selectedRows: ESGSetupDataType[], changeRows: ESGSetupDataType[]) => {
      let newSelected: ESGSetupDataType[] = [];
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
  const rowSelection: TableProps<ESGSetupDataType>['rowSelection'] = {
    onSelect: onSelectColumn,
    onSelectAll: onSelectAll,
    selectedRowKeys: selectedColumn.map((item) => item?.key) || undefined,
  };

  return (
    <Table
      size={'small'}
      loading={esgTypeLoading}
      rowSelection={{ type: 'checkbox', ...rowSelection }}
      columns={carbonColumn}
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
  );
};
export default CarbonTable;
