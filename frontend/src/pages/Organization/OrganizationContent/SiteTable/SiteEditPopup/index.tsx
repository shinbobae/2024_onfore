import EditPopup from '../../../../../components/EditPopup';
import { SiteDataType, useOrganizationStore } from '../../../../../store/organization';
import { useCallback, useEffect, useState } from 'react';
import useInput from '../../../../../hooks/useInput.tsx';
import Flex from '../../../../../components/Layout/Flex';
import InputBox from '../../../../../components/DataEntry/InputBox';
import { SaveSiteRequest } from '../../../../../api/organization/type.ts';
import { notification } from 'antd';
import Label from '../../../../../components/DataEntry/Label';
import SubTitle from '../../../../../components/Typography/SubTitle';
import Toggle from '../../../../../components/DataEntry/Toggle';
import useRegionStore from '../../../../../store/region';
import SelectBox from '../../../../../components/DataEntry/SelectBox';

type SiteEditPopupProps = {
  isOpen: boolean;
  mode: 'add' | 'edit';
  onClose: () => void;
  columnData: SiteDataType | null;
};

const SiteEditPopup = ({ isOpen, mode, onClose, columnData }: SiteEditPopupProps) => {
  const {
    organizationId,
    saveSite,
    editSite,
    siteSaveLoading,
    siteSaveSuccess,
    siteSaveError,
    siteDeleteSuccess,
    siteDeleteError,
    resetApiState,
  } = useOrganizationStore();
  const { getRegionState, stateOptions, getRegionCity, cityOptions } = useRegionStore();

  const [orgaId, setOrgaId] = useState<string>('');
  const [siteId, setSiteId] = useState<string>('');
  const [name, onChangeName, setName] = useInput('');
  const [addrDetail, onChangeAddrDetail, setAddrDetail] = useInput<string>('');
  const [latitude, setLatitude] = useState<number | undefined | null>(null);
  const [longitude, setLongitude] = useState<number | undefined | null>(null);
  const [timezone, setTimezone] = useState<string | undefined | null>(null);
  const [publicYn, setPublicYn] = useState<'Y' | 'N'>('N');
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
    if (organizationId) {
      setOrgaId(organizationId);
    }
  }, [organizationId]);
  useEffect(() => {
    if (!isOpen) resetInput();
  }, [isOpen]);
  useEffect(() => {
    if (mode === 'edit' && columnData) {
      setName(columnData.name);
      setSiteId(columnData.id);
      setAddrDetail(columnData.addressDetail || '');
      setLatitude(columnData.latitude || null);
      setLongitude(columnData.longitude || null);
      setTimezone(columnData.timezone || null);
      setPublicYn(columnData.publicYn);
      setCountryCode(columnData.countryCode);
      setCountry(columnData.country);
      setState(columnData.state);
      setCity(columnData.city);
    }
  }, [mode, columnData]);

  const onSave = useCallback(async () => {
    const data: SaveSiteRequest = {
      organizationId: orgaId,
      name: name,
      address: country + ' ' + state,
      address_detail: addrDetail.length > 0 ? addrDetail : null,
      public_yn: publicYn,
      country_code: countryCode,
      country: country,
      state: state,
      city: city,
    };
    if (mode === 'add') {
      // 저장
      saveSite(data);
    } else {
      // 수정
      editSite({ ...data, siteId: siteId });
    }
  }, [
    mode,
    orgaId,
    siteId,
    name,
    addrDetail,
    latitude,
    longitude,
    timezone,
    publicYn,
    countryCode,
    country,
    state,
    city,
  ]);

  const resetInput = () => {
    setSiteId('');
    setName('');
    setSiteId('');
    setAddrDetail('');
    setLatitude(null);
    setLongitude(null);
    setTimezone(null);
    setPublicYn('N');
    setNameError(false);
    setCountryCode('');
    setCountry('');
    setState('');
    setCity('');
  };

  useEffect(() => {
    if (siteSaveSuccess) {
      notification['success']({
        message: '저장되었습니다.',
      });
      resetInput();
      resetApiState();
      onClose();
    }
  }, [siteSaveSuccess]);
  useEffect(() => {
    if (siteSaveError) {
      notification['warning']({
        message: '저장에 실패했습니다.',
      });
      resetApiState();
    }
  }, [siteSaveError]);
  useEffect(() => {
    if (siteDeleteSuccess)
      notification['warning']({
        message: '삭제되었습니다.',
      });
    resetApiState();
  }, [siteDeleteSuccess]);
  useEffect(() => {
    if (siteDeleteError)
      notification['warning']({
        message: '삭제 실패했습니다.',
      });
    resetApiState();
  }, [siteDeleteError]);

  return (
    <EditPopup
      isOpen={isOpen}
      title={mode === 'add' ? '시설 추가' : '시설 정보 수정'}
      description={'시설에 대한 정보를 입력해주세요.'}
      onClose={onClose}
      saveDisabled={name.length < 1 || nameError || state === ''}
      saveLoading={siteSaveLoading}
      onSave={onSave}>
      <InputBox
        label="시설명"
        required
        value={name}
        status={nameError ? 'error' : 'default'}
        placeholder={'시설명을 입력해 주세요.'}
        errorMessage={'시설명을 입력해 주세요.'}
        onBlur={name.length < 1 ? () => setNameError(true) : () => setNameError(false)}
        onChange={onChangeName}
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
        value={addrDetail}
        placeholder={'상세주소를 입력해 주세요.'}
        errorMessage={'상세주소를 입력해 주세요.'}
        onChange={onChangeAddrDetail}
      />
      <Label required>공개 여부</Label>
      <Flex justify={'space-between'} align={'center'} alignSelf={'stretch'} padding={'8px 0px 8px 8px'}>
        <Label>
          <SubTitle level={1}>다른 사용자에게 시설 정보 공개를 허용합니다</SubTitle>
        </Label>
        <Toggle active={publicYn === 'Y'} onChange={() => setPublicYn((state) => (state === 'Y' ? 'N' : 'Y'))} />
      </Flex>
    </EditPopup>
  );
};
export default SiteEditPopup;
