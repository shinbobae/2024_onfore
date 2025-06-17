import EditPopup from '../../../../../components/EditPopup';
import { DepartmentDataType, useOrganizationStore } from '../../../../../store/organization';
import { useCallback, useEffect, useState } from 'react';
import useInput from '../../../../../hooks/useInput.tsx';
import Flex from '../../../../../components/Layout/Flex';
import InputBox from '../../../../../components/DataEntry/InputBox';
import Label from '../../../../../components/DataEntry/Label';
import { black20 } from '@myThingsKr/emcore-js';
import Checkbox from '../../../../../components/DataEntry/Checkbox';
import SubTitle from '../../../../../components/Typography/SubTitle';
import { SaveDepartmentRequest } from '../../../../../api/organization/type.ts';
import { notification } from 'antd';

type DepartmentEditPopupProps = {
  isOpen: boolean;
  mode: 'add' | 'edit';
  onClose: () => void;
  columnData: DepartmentDataType | null;
};

const DepartmentEditPopup = ({ isOpen, mode, onClose, columnData }: DepartmentEditPopupProps) => {
  const {
    organizationId,
    siteList,
    getSiteList,
    saveDepartment,
    editDepartment,
    departmentSaveLoading,
    departmentSaveSuccess,
    departmentSaveError,
    resetApiState,
  } = useOrganizationStore();
  const [orgaId, setOrgaId] = useState<string>('');
  const [departId, setDepartId] = useState<string>('');
  const [name, onChangeName, setName] = useInput('');
  const [siteIdList, setSiteIdList] = useState<string[]>([]);
  const [nameError, setNameError] = useState<boolean>(false);

  useEffect(() => {
    if (organizationId) {
      getSiteList(organizationId);
      setOrgaId(organizationId);
    }
  }, [organizationId]);
  useEffect(() => {
    if (!isOpen) resetInput();
  }, [isOpen]);
  useEffect(() => {
    if (mode === 'edit' && columnData) {
      setSiteIdList(columnData?.siteList.map((item) => item.id));
      setName(columnData?.name);
      setDepartId(columnData.id);
    }
  }, [mode, columnData]);

  const onChangeCheckList = useCallback(
    (value: string) => {
      if (siteIdList.some((item) => item === value)) {
        const newList = [...siteIdList];
        setSiteIdList(newList.filter((newItem) => newItem !== value));
      } else {
        const newList = [...siteIdList, value];
        setSiteIdList(newList);
      }
    },
    [siteIdList],
  );

  const onSave = useCallback(async () => {
    const data: SaveDepartmentRequest = {
      organizationId: orgaId,
      name: name,
      site_id_list: siteIdList,
    };
    if (mode === 'add') {
      saveDepartment(data);
    } else {
      editDepartment({ ...data, departmentId: departId });
    }
  }, [mode, orgaId, departId, name, siteIdList, nameError]);

  const resetInput = () => {
    setDepartId('');
    setName('');
    setSiteIdList([]);
    setNameError(false);
  };

  useEffect(() => {
    if (departmentSaveSuccess) {
      notification['success']({
        message: '저장되었습니다.',
      });
      resetInput();
      resetApiState();
      onClose();
    }
  }, [departmentSaveSuccess]);
  useEffect(() => {
    if (departmentSaveError) {
      // notification['warning']({
      //   message: '저장에 실패했습니다.',
      // });
      resetInput();
      resetApiState();
      onClose();
    }
  }, [departmentSaveError]);

  return (
    <EditPopup
      isOpen={isOpen}
      title={mode === 'add' ? '부서 추가' : '부서 정보 수정'}
      description={'부서에 대한 정보를 입력해주세요.'}
      onClose={onClose}
      saveDisabled={name.length < 1 || nameError || siteIdList.length < 1}
      saveLoading={departmentSaveLoading}
      onSave={onSave}>
      <InputBox
        label="부서명"
        required
        value={name}
        status={nameError ? 'error' : 'default'}
        placeholder={'부서명을 입력해 주세요.'}
        errorMessage={'부서명을 입력해 주세요.'}
        onBlur={name.length < 1 ? () => setNameError(true) : () => setNameError(false)}
        onChange={onChangeName}
      />
      <Label required>담당 시설 선택</Label>
      <Flex
        direction={'column'}
        alignSelf={'stretch'}
        padding={'8px 0'}
        gap={'4px'}
        style={{ backgroundColor: black20 }}>
        {siteList
          .map((item) => ({ value: item.id, label: item.name }))
          .map((item: { value: string; label: string }) => {
            return (
              <Flex align={'center'} alignSelf={'stretch'} padding={'8px 32px 8px 20px'} gap={'8px'} key={item.value}>
                <Checkbox
                  id={item.value}
                  checked={siteIdList.some((value) => value === item.value)}
                  onChange={() => onChangeCheckList(item.value)}
                />
                <Label htmlFor={item.value}>
                  <SubTitle level={1}>{item.label}</SubTitle>
                </Label>
              </Flex>
            );
          })}
      </Flex>
    </EditPopup>
  );
};
export default DepartmentEditPopup;
