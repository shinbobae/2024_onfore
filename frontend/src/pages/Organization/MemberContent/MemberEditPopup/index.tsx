import { useCallback, useEffect, useState } from 'react';
import { notification } from 'antd';
import { MemberDataType, useOrganizationStore } from '../../../../store/organization';
import useInput from '../../../../hooks/useInput.tsx';
import EditPopup from '../../../../components/EditPopup';
import InputBox from '../../../../components/DataEntry/InputBox';
import SelectBox from '../../../../components/DataEntry/SelectBox';
import { ROLE_OPTION } from '../data.ts';
import { SaveMemberRequest } from '../../../../api/organization/type.ts';
import { MemberRoleType } from '../../../../type';

type MemberEditPopupProps = {
  isOpen: boolean;
  mode: 'add' | 'edit';
  onClose: () => void;
  columnData: MemberDataType | null;
};

const MemberEditPopup = ({ isOpen, mode, onClose, columnData }: MemberEditPopupProps) => {
  const {
    organizationId,
    saveMember,
    saveMemberSuccess,
    saveMemberError,
    saveMemberLoading,
    editMember,
    editMemberSuccess,
    editMemberError,
    editMemberLoading,
    departmentList,
    setDuplicateEmail,
    duplicateEmail,
    resetApiState,
  } = useOrganizationStore();
  const [orgaId, setOrgaId] = useState<string>('');
  const [userId, setUserId] = useState('');
  const [name, onChangeName, setName] = useInput('');
  const [phone, onChangePhone, setPhone] = useInput('');
  const [email, onChangeEmail, setEmail] = useInput('');
  const [departmentOptions, setDepartOptions] = useState<{ label: string; value: string }[]>([]);
  const [departmentId, setDepartId] = useState<string>('');
  const [roleId, setRoleId] = useState<string>('');

  const [emailError, setEmailError] = useState<boolean>(false);

  const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  useEffect(() => {
    setOrgaId(organizationId);
    if (mode === 'edit' && columnData) {
      setName(columnData.name);
      setUserId(columnData.id);
      setPhone(columnData.phone);
      setEmail(columnData.email);
      setDepartId(columnData.departmentId);
      setRoleId(columnData.role);
    }
  }, [mode, organizationId, columnData]);

  useEffect(() => {
    setDepartOptions(departmentList.map((item) => ({ label: item.name, value: item.id })));
  }, [departmentList]);

  const onSave = useCallback(async () => {
    const data: SaveMemberRequest = {
      organizationId: orgaId,
      name: name,
      department_id: departmentId,
      role: roleId as MemberRoleType,
      email: email,
      phone: phone,
      user_account: email,
    };
    if (mode === 'add') {
      saveMember(data);
    } else {
      editMember({ ...data, userId: userId });
    }
  }, [mode, orgaId, userId, name, phone, email, departmentId, roleId]);

  const resetInput = () => {
    setName('');
    setUserId('');
    setPhone('');
    setEmail('');
    setDepartId('');
    setRoleId('');
    setDuplicateEmail(false);
    setEmailError(false);
  };

  useEffect(() => {
    if (!isOpen) {
      resetInput();
    }
  }, [isOpen]);
  useEffect(() => {
    if (saveMemberSuccess || editMemberSuccess) {
      notification['success']({
        message: '저장되었습니다.',
      });
      resetInput();
      resetApiState();
      onClose();
    }
  }, [saveMemberSuccess, editMemberSuccess]);
  useEffect(() => {
    if (saveMemberError || editMemberError) {
      notification['warning']({
        message: '저장에 실패했습니다.',
      });
      resetApiState();
    }
  }, [saveMemberError, editMemberError]);

  return (
    <EditPopup
      isOpen={isOpen}
      title={mode === 'add' ? '구성원 추가하기 ' : '구성원 수정하기'}
      description={'구성원에 대한 정보를 입력해주세요.'}
      onClose={onClose}
      saveDisabled={
        name.trim().length === 0 ||
        departmentId === '' ||
        roleId === '' ||
        email.trim().length === 0 ||
        departmentId === '' ||
        departmentId === '' ||
        emailError ||
        duplicateEmail
      }
      saveLoading={saveMemberLoading || editMemberLoading}
      onSave={onSave}>
      <InputBox label="이름" required value={name} placeholder={'이름을 입력해주세요'} onChange={onChangeName} />
      <SelectBox
        label={'소속 부서'}
        required
        selection={'radio'}
        value={departmentId}
        onChange={(value) => setDepartId(value)}
        placeholder={'선택해 주세요.'}
        options={departmentOptions}
      />
      <SelectBox
        label={'권한'}
        required
        selection={'radio'}
        value={roleId}
        onChange={(value) => setRoleId(value)}
        placeholder={'선택해 주세요.'}
        options={ROLE_OPTION}
      />
      <InputBox label="휴대폰 번호" value={phone} placeholder={'휴대폰 번호를 입력해주세요'} onChange={onChangePhone} />
      <InputBox
        label="이메일"
        required
        value={email}
        placeholder={'이메일을 입력해주세요'}
        status={emailError || duplicateEmail ? 'error' : 'default'}
        errorMessage={emailError ? '이메일 형식이 맞지 않습니다.' : duplicateEmail ? '이미 등록된 이메일입니다.' : ''}
        onBlur={() => (emailReg.test(email) || email === '' ? setEmailError(false) : setEmailError(true))}
        onChange={(value) => {
          onChangeEmail(value);
          setDuplicateEmail(false);
        }}
      />
    </EditPopup>
  );
};

export default MemberEditPopup;
