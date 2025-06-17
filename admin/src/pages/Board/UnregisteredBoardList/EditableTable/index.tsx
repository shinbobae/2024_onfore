import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { GetRef, InputRef, notification, TableProps } from 'antd';
import { Form, Input, Table } from 'antd';
import useBoardStore, { UnregiBoardDataType } from '../../../../store/board';
import BodyText from '../../../../components/Typography/Body';
import { black0, black300, black500, Button } from '@myThingsKr/emcore-js';
import SubTitle from '../../../../components/Typography/SubTitle';
import { RegisterBoardRequest } from '../../../../api/board/type.ts';
import Flex from '../../../../components/Layout/Flex';
import SvgIcoCloseLine24 from '../../../../assets/icon/IcoCloseLine24.tsx';
import SvgIcoConfirm from '../../../../assets/icon/IcoConfirm.tsx';
import Dialog from '../../../../components/Dialog';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  id: string;
  no: number;
}

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
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
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
  // const inputRef = useRef<HTMLInputElement>(null);
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
    handleSave({ ...record });
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
          gap={'8px'}>
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

type ColumnTypes = Exclude<TableProps<UnregiBoardDataType>['columns'], undefined>;

const EditableTable: React.FC = () => {
  const {
    selectedOrgaId,
    organizationData,
    unregiBoardDataSource,
    unregiListLoading,
    registerBoard,
    registerLoading,
    registerSuccess,
  } = useBoardStore();

  const [dataSource, setDataSource] = useState<UnregiBoardDataType[]>([]);
  const [regiConfirmOpen, setRegiConfirmOpen] = useState(false);
  const [regiColumnData, setRegiColumData] = useState<UnregiBoardDataType | null>(null);

  useEffect(() => {
    setDataSource(unregiBoardDataSource);
  }, [unregiBoardDataSource]);

  const register = useCallback(() => {
    if (!selectedOrgaId) {
      notification['warning']({
        message: '좌측 조직 목록에서 보드를 등록할 조직을 선택해주세요.',
      });
      return;
    }
    if (!regiColumnData) return;
    if (!regiColumnData.name || regiColumnData.name.trim().length === 0) {
      notification['warning']({
        message: '보드명을 입력해주세요.',
      });
      return;
    }
    const data: RegisterBoardRequest = {
      organizationId: selectedOrgaId,
      name: regiColumnData.name,
      id: regiColumnData.id,
    };

    registerBoard(data);
  }, [selectedOrgaId, regiColumnData]);

  useEffect(() => {
    if (registerSuccess) setRegiConfirmOpen(false);
  }, [registerSuccess]);

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: ' ',
      dataIndex: 'no',
      width: '60px',
      align: 'center',
      render: (_) => <SubTitle level={2}>{_}</SubTitle>,
    },
    {
      title: '보드명',
      dataIndex: 'name',
      width: '240px',
      editable: true,
      render: (_) => <SubTitle level={2}>{_}</SubTitle>,
    },
    {
      title: '보드 시리얼 번호',
      dataIndex: 'id',
      render: (_) => <SubTitle level={2}>{_}</SubTitle>,
    },
    {
      title: ' ',
      dataIndex: 'operation',
      width: '120px',
      align: 'right',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Flex
            style={{ position: 'absolute', right: 0, left: 0, top: 0, bottom: 0 }}
            align={'center'}
            justify={'center'}>
            <Button
              color={'primary'}
              fontSize={14}
              disabled={!record.name || record.name === ''}
              onClick={() => {
                if (!selectedOrgaId) {
                  notification['warning']({
                    message: '좌측 조직 목록에서 보드를 등록할 조직을 선택해주세요.',
                  });
                  return;
                }
                setRegiColumData(record);
                setRegiConfirmOpen(true);
              }}>
              등록하기
            </Button>
          </Flex>
        ) : null,
    },
  ];

  const handleSave = (row: UnregiBoardDataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: UnregiBoardDataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <>
      <Table<UnregiBoardDataType>
        size={'small'}
        loading={unregiListLoading}
        rowClassName={() => 'editable-row'}
        pagination={false}
        components={components}
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        style={{ paddingBottom: '40px' }}
      />

      <Dialog
        open={regiConfirmOpen}
        title={'보드 등록하기'}
        message={
          <>
            이 보드를 [{organizationData.find((item) => item.id === selectedOrgaId)?.name}] 조직에 등록할까요?
            <br />
            보드를 등록한 후에 조직 변경이 불가합니다.
            <br />
            등록하려는 조직 정보를 다시 한 번 확인해주세요.
          </>
        }
        close={() => setRegiConfirmOpen(false)}
        okText={'등록하기'}
        okLoading={registerLoading}
        ok={register}
      />
    </>
  );
};

export default EditableTable;
