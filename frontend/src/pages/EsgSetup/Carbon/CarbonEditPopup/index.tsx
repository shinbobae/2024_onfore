import { ESGSetupDataType, useESGSetupStore } from '../../../../store/ESGSetup';
import EditPopup from '../../../../components/EditPopup';
import { useCallback, useEffect, useState } from 'react';
import useInput from '../../../../hooks/useInput.tsx';
import SelectBox from '../../../../components/DataEntry/SelectBox';
import InputBox from '../../../../components/DataEntry/InputBox';
import Flex from '../../../../components/Layout/Flex';
import Label from '../../../../components/DataEntry/Label';
import BodyText from '../../../../components/Typography/Body';
import { black500 } from '@myThingsKr/emcore-js';
import { CARBON_UNIT_OPTIONS, CERTIFIED_OPTIONS } from '../../data.ts';
import { SaveEsgSetupRequest } from '../../../../api/ESGSetup/type.ts';
import { OPTION } from '../../../../type';
import useNumberInput from '../../../../hooks/useNuberInput.tsx';

type CarbonEditPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  columnData: ESGSetupDataType | null;
};

const CarbonEditPopup = ({ isOpen, mode, onClose, columnData }: CarbonEditPopupProps) => {
  const { saveEsgTypeData, editEsgTypeData, getEsgSiteList, esgTypeSiteOptions, getEsgBoardList, esgTypeBoardOptions } =
    useESGSetupStore();
  const [itemId, setItemId] = useState<string>('');
  const [siteId, setSiteId] = useState<string>('');
  const [boardId, setBoardId] = useState<string>('');
  const [itemName, onChangeItemName, setItemName] = useInput('');
  const [certify, setCertify] = useState('');
  const [unit, setUnit] = useState('');
  const [standard, onChangeStandard, setStandard] = useNumberInput('');
  const [per, onChangePer, setPer] = useNumberInput('');
  const [boardOptions, setBoardOptions] = useState<OPTION[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    getEsgSiteList();
    getEsgBoardList('carbon');
  }, [isOpen]);

  useEffect(() => {
    if (columnData) {
      setItemId(columnData.itemId);
      setSiteId(columnData.siteId || '');
      setBoardId(columnData.boardId);
      setItemName(columnData.itemName);
      setCertify(columnData.certifiedBy);
      setUnit(columnData.formulaUnit);
      setStandard(columnData.formulaStandard);
      setPer(columnData.formulaPer);
    }
  }, [columnData]);

  useEffect(() => {
    if (columnData) {
      setBoardOptions(
        esgTypeBoardOptions.map((item) => ({
          ...item,
          disabled: columnData.boardId === item.value ? false : item.useYn === 'Y',
        })),
      );
    } else {
      setBoardOptions(
        esgTypeBoardOptions.map((item) => ({
          ...item,
          disabled: item.useYn === 'Y',
        })),
      );
    }
  }, [boardId, columnData, esgTypeBoardOptions]);

  useEffect(() => {
    if (!isOpen) {
      resetInput();
    }
  }, [isOpen]);

  const resetInput = () => {
    setItemId('');
    setSiteId('');
    setBoardId('');
    setItemName('');
    setCertify('');
    setUnit('');
    setStandard('');
    setPer('');
  };

  const onSave = useCallback(() => {
    const data: SaveEsgSetupRequest = {
      esgType: 'carbon',
      site_id: siteId,
      board_id: boardId,
      certified_by: certify,
      item_name: itemName,
      formula: JSON.stringify({ standard: Number(standard), unit: unit, per: Number(per) }),
    };
    if (mode === 'add') {
      saveEsgTypeData(data);
    } else {
      editEsgTypeData({ ...data, id: itemId });
    }
  }, [itemId, siteId, boardId, itemName, certify, unit, standard, per]);
  return (
    <EditPopup
      isOpen={isOpen}
      title={mode === 'add' ? '탄소 절감 항목 추가' : '탄소 절감 정보 수정'}
      description="탄소 절감 항목에 대한 계산 방법을 입력해주세요."
      onClose={onClose}
      saveDisabled={
        siteId === '' ||
        itemName === '' ||
        boardId === '' ||
        certify === '' ||
        unit === '' ||
        standard === '' ||
        per === ''
      }
      onSave={onSave}>
      <SelectBox
        label={'시설'}
        placeholder={'선택해 주세요'}
        required
        selection={'radio'}
        value={siteId}
        onChange={(value) => setSiteId(value)}
        options={esgTypeSiteOptions}
      />
      <InputBox
        label="항목명"
        required
        value={itemName}
        placeholder={'항목명을 입력해주세요'}
        onChange={onChangeItemName}
      />
      <SelectBox
        label={'데이터 연동 방법'}
        placeholder={'선택해 주세요'}
        required
        selection={'radio'}
        value={boardId}
        onChange={(value) => setBoardId(value)}
        options={boardOptions}
      />
      <SelectBox
        label={'인증 업체'}
        placeholder={'선택해 주세요'}
        required
        selection={'radio'}
        value={certify}
        onChange={(value) => setCertify(value)}
        options={CERTIFIED_OPTIONS}
      />
      <Flex direction={'column'} gap={'8px'} padding={'12px 0x'} width={'100%'}>
        <Label required>계산 기준</Label>
        <Flex alignSelf={'stretch'} gap={'20px'} width={'100%'}>
          <InputBox value={standard} onChange={onChangeStandard} />
          <SelectBox
            placeholder={'선택해 주세요'}
            selection={'radio'}
            value={unit}
            onChange={(value) => setUnit(value)}
            options={CARBON_UNIT_OPTIONS}
          />
        </Flex>
        <BodyText level={3} color={black500}>
          데이터의 소수점 첫째 자리에서 버림하여 적용됩니다.
        </BodyText>
      </Flex>
      <InputBox
        label="단위당 탄소 절감량"
        required
        value={per}
        placeholder={'항목명을 입력해주세요'}
        addonAfter={'kg CO2-eq'}
        onChange={onChangePer}
      />
    </EditPopup>
  );
};
export default CarbonEditPopup;
