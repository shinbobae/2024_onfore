import React, { Dispatch, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { GetRef, InputRef, notification, TableProps } from 'antd';
import { Form, Input, Table } from 'antd';
import useBoardStore, { RegiBoardDataType } from '../../../../store/board';
import BodyText from '../../../../components/Typography/Body';
import { black0, black300, black500, black700 } from '@myThingsKr/emcore-js';
import SubTitle from '../../../../components/Typography/SubTitle';
import { EditBoardRequest } from '../../../../api/board/type.ts';
import Flex from '../../../../components/Layout/Flex';
import SvgIcoCloseLine24 from '../../../../assets/icon/IcoCloseLine24.tsx';
import SvgIcoConfirm from '../../../../assets/icon/IcoConfirm.tsx';
import { TableParams } from '../index.tsx';
import SvgIcoDashboard from '../../../../assets/icon/IcoDashboard.tsx';
import Tag from '../../../../components/Tag';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof RegiBoardDataType;
  record: RegiBoardDataType;
  handleSave: (record: RegiBoardDataType) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    setError(false);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      if (!values.name || values.name.length === 0) {
        setError(true);
        return;
      }
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const cancel = async () => {
    setEditing(!editing);
    // handleSave({ ...record });
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <div style={{ position: 'absolute', inset: 0 }} onClick={(e) => e.stopPropagation()}>
        <Form.Item style={{ position: 'absolute', inset: 0, height: '39px' }} name={dataIndex}>
          <Input
            name={dataIndex}
            ref={inputRef}
            status={error ? 'error' : ''}
            placeholder={error ? '보드명은 필수 항목입니다' : '보드명을 설정해주세요'}
            onPressEnter={save}
            style={{
              width: '100%',
              height: '100%',
              padding: '9px 16px',
              fontSize: '15px',
              fontFamily: 'Pretendard',
              fontWeight: '500',
              borderWidth: '2px',
            }}
          />
        </Form.Item>
        <Flex
          style={{ position: 'absolute', right: 0, left: 0, top: 'calc(100% + 2px)', height: '32px', zIndex: 999 }}
          justify={'flex-end'}
          gap={'8px'}
          onClick={() => window.alert('뺴')}>
          <button
            style={{
              padding: '4px',
              backgroundColor: black0,
              borderRadius: '4px',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
            }}
            onClick={save}>
            <SvgIcoConfirm color={black500} width={24} />
          </button>
          <button
            style={{
              padding: '4px',
              backgroundColor: black0,
              borderRadius: '4px',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
            }}
            onClick={cancel}>
            <SvgIcoCloseLine24 color={black500} width={24} />
          </button>
        </Flex>
      </div>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingInlineEnd: 24 }} onClick={toggleEdit}>
        {record[dataIndex] ? (
          children
        ) : (
          <BodyText level={2} color={black300}>
            보드명을 설정해주세요
          </BodyText>
        )}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type ColumnTypes = Exclude<TableProps<RegiBoardDataType>['columns'], undefined>;

const EditableTable = ({
  tableParams,
  setTableParams,
  selectedColumn,
  setSelectedColumn,
  tableDataSource,
}: {
  tableParams: TableParams;
  setTableParams: Dispatch<React.SetStateAction<TableParams>>;
  selectedColumn: RegiBoardDataType[];
  setSelectedColumn: Dispatch<React.SetStateAction<RegiBoardDataType[]>>;
  tableDataSource: RegiBoardDataType[];
}) => {
  const { selectedOrgaId, regiListLoading, editBoard } = useBoardStore();

  const [dataSource, setDataSource] = useState<RegiBoardDataType[]>([]);

  useEffect(() => {
    setDataSource(tableDataSource);
  }, [tableDataSource]);

  const edit = useCallback(
    (record: RegiBoardDataType) => {
      if (!selectedOrgaId) {
        notification['warning']({
          message: '조직이 선택되지 않았습니다.',
        });
        return;
      }
      if (!record.name || record.name.trim().length === 0) {
        notification['warning']({
          message: '보드명을 입력해주세요.',
        });
        return;
      }
      const data: EditBoardRequest = {
        organizationId: selectedOrgaId,
        name: record.name,
        boardId: record.id,
      };
      editBoard(data);
    },
    [selectedOrgaId],
  );

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: '보드명',
      dataIndex: 'name',
      width: '240px',
      editable: true,
      sorter: (a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0),
      render: (_) => <SubTitle level={2}>{_}</SubTitle>,
    },
    {
      title: '보드 시리얼 번호',
      dataIndex: 'id',
      render: (_) => <SubTitle level={2}>{_}</SubTitle>,
    },
    {
      title: '구역 설정',
      dataIndex: 'useYn',
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
              {_ === 'Y' ? '설정됨' : '설정안됨'}
            </BodyText>
          </Tag>
        </div>
      ),
    },
  ];

  const handleSave = (row: RegiBoardDataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    edit(row);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const rowSelection: TableProps<RegiBoardDataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: RegiBoardDataType[]) => {
      console.log(selectedRowKeys);
      setSelectedColumn(selectedRows);
    },
    selectedRowKeys: selectedColumn.map((item) => item.id),
  };

  const onChangeTable: TableProps<RegiBoardDataType>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
    });
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: RegiBoardDataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <Table<RegiBoardDataType>
      size={'small'}
      loading={regiListLoading}
      rowSelection={{ type: 'checkbox', ...rowSelection }}
      rowClassName={() => 'editable-row'}
      pagination={{
        ...tableParams.pagination,
        total: dataSource.length,
        pageSizeOptions: ['10', '20', '30'],
        showSizeChanger: true,
        onShowSizeChange: (current, pageSize) => {
          setTableParams({ ...tableParams, pagination: { current: current, pageSize: pageSize } });
        },
      }}
      onChange={onChangeTable}
      components={components}
      dataSource={dataSource}
      columns={columns as ColumnTypes}
      locale={{
        triggerDesc: undefined,
        triggerAsc: undefined,
        cancelSort: undefined,
        emptyText: (
          <Flex
            direction={'column'}
            justify={'center'}
            align={'center'}
            alignSelf={'stretch'}
            gap={'16px'}
            padding={'120px 0'}>
            <SvgIcoDashboard width={32} />
            <SubTitle level={1} color={black700}>
              목록이 없습니다.
            </SubTitle>
          </Flex>
        ),
      }}
    />
  );
};

export default EditableTable;
