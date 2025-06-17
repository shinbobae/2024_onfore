import { ESGBaseDataType, useESGSetupStore } from '../../../../store/ESGSetup';
import EditPopup from '../../../../components/EditPopup';
import { useCallback, useEffect, useState } from 'react';
import SelectBox from '../../../../components/DataEntry/SelectBox';
import InputBox from '../../../../components/DataEntry/InputBox';
import Flex from '../../../../components/Layout/Flex';
import Label from '../../../../components/DataEntry/Label';
import BodyText from '../../../../components/Typography/Body';
import { black500 } from '@myThingsKr/emcore-js';
import { ELECTRICITY_UNIT_OPTIONS } from '../../data.ts';
import { SaveEsgSetupRequest } from '../../../../api/ESGSetup/type.ts';
import { OPTION } from '../../../../type';
import useNumberInput from '../../../../hooks/useNuberInput.tsx';

type ElectricityEditPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  columnData: ESGBaseDataType | null;
};

const ElectricityEditPopup = ({ isOpen, mode, onClose, columnData }: ElectricityEditPopupProps) => {
  const { saveEsgTypeData, editEsgTypeData, getEsgSiteList, esgTypeSiteOptions, getEsgBoardList, esgTypeBoardOptions } =
    useESGSetupStore();
  const [itemId, setItemId] = useState<string>('');
  const [siteId, setSiteId] = useState<string>('');
  const [boardId, setBoardId] = useState<string>('');
  const [certify, setCertify] = useState('');
  const [unit, setUnit] = useState('');
  const [standard, onChangeStandard, setStandard] = useNumberInput('');
  const [boardOptions, setBoardOptions] = useState<OPTION[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    getEsgSiteList();
    getEsgBoardList('electricity');
  }, [isOpen]);

  useEffect(() => {
    if (columnData) {
      setItemId(columnData.itemId);
      setSiteId(columnData.siteId || '');
      setBoardId(columnData.boardId);
      setUnit(columnData.formulaUnit);
      setStandard(columnData.formulaStandard);
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
    setCertify('');
    setUnit('');
    setStandard('');
  };

  const onSave = useCallback(() => {
    const data: SaveEsgSetupRequest = {
      esgType: 'electricity',
      site_id: siteId,
      board_id: boardId,
      certified_by: certify,
      formula: JSON.stringify({ standard: Number(standard), unit: unit }),
    };
    if (mode === 'add') {
      saveEsgTypeData(data);
    } else {
      editEsgTypeData({ ...data, id: itemId });
    }
  }, [itemId, siteId, boardId, certify, unit, standard]);
  return (
    <EditPopup
      isOpen={isOpen}
      title={mode === 'add' ? '재생에너지 생산량 측정 항목 추가' : '재생에너지 생산량 측정 정보 수정'}
      description="재생에너지 생산량 항목에 대한 계산 방법을 입력해주세요."
      onClose={onClose}
      saveDisabled={siteId === '' || boardId === '' || standard === '' || unit === ''}
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
      <SelectBox
        label={'데이터 연동 방법'}
        placeholder={'선택해 주세요'}
        required
        selection={'radio'}
        value={boardId}
        onChange={(value) => setBoardId(value)}
        options={boardOptions}
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
            options={ELECTRICITY_UNIT_OPTIONS}
          />
        </Flex>
        <BodyText level={3} color={black500}>
          데이터의 소수점 첫째 자리에서 버림하여 적용됩니다.
        </BodyText>
      </Flex>
    </EditPopup>
  );
};
export default ElectricityEditPopup;
