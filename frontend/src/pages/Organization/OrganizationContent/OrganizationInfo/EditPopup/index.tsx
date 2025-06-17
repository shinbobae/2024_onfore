/** @jsxImportSource @emotion/react */
import useOrganizationStore from '../../../../../store/organization';
import useInput from '../../../../../hooks/useInput.tsx';
import { useCallback, useEffect, useState } from 'react';
import EditPopup from '../../../../../components/EditPopup';
import InputBox from '../../../../../components/DataEntry/InputBox';
import { EditOrgaInfoRequest } from '../../../../../api/organization/type.ts';
import { notification } from 'antd';
import useRegionStore from '../../../../../store/region';
import Label from '../../../../../components/DataEntry/Label';
import Flex from '../../../../../components/Layout/Flex';
import SelectBox from '../../../../../components/DataEntry/SelectBox';
import { Button, FilePicker } from '@myThingsKr/emcore-js';
import SvgProfile from '../../../../../assets/icon/Profile.tsx';
import { orgaLogoWrap } from '../../../style.ts';

const InfoEditPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const {
    organizationInfo,
    editOrganization,
    infoSaveSuccess,
    infoSaveLoading,
    infoSaveError,
    uploadOrgaImage,
    uploadOrgaImageSuccess,
    uploadOrgaImageError,
    orgaImageUrl,
    resetApiState,
  } = useOrganizationStore();
  const { getRegionState, stateOptions, getRegionCity, cityOptions } = useRegionStore();

  const [imgUrl, setImageUrl] = useState<string | null>('');
  const [name, onChangeName, setName] = useInput<string>('');
  const [subName, setSubName] = useState<string>('');
  const [bizNumber, setBizNumber] = useState<string>('');
  const [addressDetail, onChangeAddressDetail, setAddressDetail] = useInput<string>('');
  const [phone, setPhone] = useState<string>('');
  const [nameError, setNameError] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');

  useEffect(() => {
    getRegionState();
  }, []);
  useEffect(() => {
    if (state !== '') getRegionCity(state);
  }, [state]);
  useEffect(() => {
    if (isOpen) {
      setImageUrl(organizationInfo.imageUrl || null);
      setName(organizationInfo.name);
      setSubName(organizationInfo.subName);
      setBizNumber(organizationInfo.businessNumber);
      setAddressDetail(organizationInfo.addressDetail);
      setPhone(organizationInfo.phone);
      setCountryCode(organizationInfo.countryCode);
      setCountry(organizationInfo.country);
      setState(organizationInfo.state);
      setCity(organizationInfo.city);
    } else {
      setImageUrl(null);
      setName('');
      setSubName('');
      setBizNumber('');
      setAddressDetail('');
      setPhone('');
      setCountryCode('');
      setCountry('');
      setState('');
      setCity('');
      setNameError(false);
    }
  }, [isOpen, organizationInfo]);

  const onChangeBizNumber = (value: any) => {
    const regValue = value.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3').slice(0, 12);
    setBizNumber(regValue);
  };

  const onChangeFile = (files: File[]) => {
    if (files.length > 0) {
      const formData = new FormData();
      formData.append('image', files[0]);
      const values = formData.values();
      for (const pair of values) {
        console.log(pair);
      }

      uploadOrgaImage({ organizationId: organizationInfo.id, image: formData });
    }
  };
  useEffect(() => {
    if (orgaImageUrl) {
      setImageUrl(orgaImageUrl);
    }
  }, [orgaImageUrl]);

  const onEditOrgaInfo = useCallback(async () => {
    const editRequest: EditOrgaInfoRequest = {
      organizationId: organizationInfo.id,
      name: name,
      sub_name: subName,
      address: state + ' ' + city,
      address_detail: addressDetail,
      phone: phone,
      business_number: bizNumber,
      country_code: countryCode,
      country: country,
      state: state,
      city: city,
      img_url: imgUrl,
    };
    editOrganization(editRequest);
  }, [imgUrl, name, subName, bizNumber, addressDetail, phone, countryCode, country, state, city]);

  useEffect(() => {
    if (infoSaveSuccess) {
      notification['success']({
        message: '저장되었습니다.',
      });
      onClose();
      resetApiState();
    }
    if (infoSaveError) {
      notification['warning']({
        message: '저장에 실패했습니다.',
      });
      onClose();
      resetApiState();
    }
    if (uploadOrgaImageError || uploadOrgaImageSuccess) {
      resetApiState();
    }
  }, [infoSaveSuccess, infoSaveError, uploadOrgaImageError, uploadOrgaImageSuccess]);
  return (
    <EditPopup
      isOpen={isOpen}
      title={'조직 정보 수정'}
      description={'조직에 대한 정보를 입력해주세요.'}
      onClose={onClose}
      saveDisabled={name.length < 1 || nameError || state === ''}
      saveLoading={infoSaveLoading}
      onSave={onEditOrgaInfo}>
      <Flex padding={'12px 0'} direction={'column'} gap={'8px'}>
        <Label>프로필 이미지</Label>
        <Flex align={'center'} gap={'20px'}>
          <div css={orgaLogoWrap}>{imgUrl ? <img src={imgUrl} alt="logo" /> : <SvgProfile />}</div>

          {/*<input type="file" onChange={onChangeFile} />*/}
          <FilePicker onChange={onChangeFile} preview={false} buttonText={'이미지 변경'} />
          <Button variant={'text'} onClick={() => setImageUrl(null)}>
            제거하기
          </Button>
        </Flex>
      </Flex>
      <InputBox
        label="조직명"
        required
        value={name}
        status={nameError ? 'error' : 'default'}
        placeholder={'조직명을 입력해 주세요.'}
        errorMessage={'조직명을 입력해 주세요.'}
        onBlur={name.length < 1 ? () => setNameError(true) : () => setNameError(false)}
        maxLength={30}
        onChange={onChangeName}
      />
      <InputBox
        label="사업자 등록 번호"
        value={bizNumber}
        placeholder={'숫자만 입력해주세요.'}
        onChange={(e: any) => onChangeBizNumber(e.target.value)}
      />

      <Flex direction={'column'} gap={'8px'} padding={'12px 0x'} width={'100%'}>
        <Label required>주소</Label>
        <Flex alignSelf={'stretch'} gap={'20px'} width={'100%'}>
          <SelectBox
            placeholder={'도 선택'}
            selection={'radio'}
            value={
              countryCode === '' && country === '' && state === ''
                ? ''
                : JSON.stringify({ countryCode: countryCode, country: country, state: state })
            }
            onChange={(value) => {
              const parseValue = JSON.parse(value) as { countryCode: string; country: string; state: string };
              setCountryCode(parseValue.countryCode);
              setCountry(parseValue.country);
              setState(parseValue.state);
              setCity('');
            }}
            options={stateOptions}
          />
          <SelectBox
            placeholder={'시/군/구 선택'}
            selection={'radio'}
            value={city}
            onChange={(value) => setCity(value)}
            options={cityOptions}
          />
        </Flex>
      </Flex>
      <InputBox
        label="상세주소"
        value={addressDetail}
        placeholder={'상세 주소를 입력해 주세요'}
        onChange={onChangeAddressDetail}
      />
      {/*<InputBox label="연락처" value={phone} placeholder={'연락처를 입력해 주세요'} onChange={onChangePhone} />*/}
    </EditPopup>
  );
};
export default InfoEditPopup;
