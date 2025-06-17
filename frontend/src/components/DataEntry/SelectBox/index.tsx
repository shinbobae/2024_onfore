/** @jsxImportSource @emotion/react */
import { dropdownOption, dropdownOptions, dropdownTrigger, dropdownWrap } from './style.ts';
import SubTitle from '../../Typography/SubTitle';
import SvgIcoArrowFilledDown24 from '../../../assets/icon/IcoArrowFilledDown24.tsx';
import { black300, black500, black900 } from '@myThingsKr/emcore-js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import Label from '../Label';
import Flex from '../../Layout/Flex';
import BodyText from '../../Typography/Body';

type SelectBoxBaseType = {
  placeholder: string;
  label?: string;
  required?: boolean;
  options: { label: string; value: string; disabled?: boolean }[];
  selection?: 'checkbox' | 'radio';
  ghost?: boolean;
  onChange: (value: string) => void;
  blank?: React.ReactNode;
};
type SelectBoxPropsType = SelectBoxBaseType &
  ({ selection: 'checkbox'; value: string[] } | { selection: 'radio'; value: string });

const SelectBox = ({
  placeholder,
  label,
  required,
  value,
  selection,
  options,
  ghost,
  onChange,
  blank,
}: SelectBoxPropsType) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getSelectOutside = (e: globalThis.MouseEvent) => {
      if (!selectRef.current?.contains(e.target as HTMLDivElement)) {
        setOpen(false);
      }
    };
    window.addEventListener('mouseup', getSelectOutside);
    return () => {
      window.removeEventListener('mouseup', getSelectOutside);
    };
  }, [selectRef]);

  const renderCheckboxLabel = useCallback(() => {
    return options
      .filter((option) => value.includes(option.value))
      .map((item) => item.label)
      .toString();
  }, [value, options]);

  const renderRadioLabel = useCallback(() => {
    return options.filter((option) => value === option.value)[0]?.label;
  }, [value, options]);

  return (
    <div style={{ width: '100%' }} ref={selectRef}>
      <Flex direction={'column'} gap={'8px'} padding={label && '12px 0'} width={'100%'}>
        {label && <Label required={required}>{label}</Label>}
        <div css={dropdownWrap}>
          <div css={dropdownTrigger(ghost || false)} onClick={() => setOpen((state) => !state)}>
            {value ? (
              <BodyText level={1}>{selection === 'radio' ? renderRadioLabel() : renderCheckboxLabel()}</BodyText>
            ) : (
              <BodyText level={1} color={black300}>
                {placeholder}
              </BodyText>
            )}
            <Flex justify={'flex-end'} align={'center'} gap={'12px'}>
              <span />
              <SvgIcoArrowFilledDown24 color={black500} width={24} height={24} />
            </Flex>
          </div>
          {open && (
            <div css={dropdownOptions}>
              {options.length > 0 ? (
                options.map((option) => (
                  <div
                    key={option.value}
                    css={dropdownOption(option.disabled || false)}
                    onClick={() => {
                      if (option.disabled) return;
                      onChange(option.value);
                      if (selection === 'radio') setOpen(false);
                    }}>
                    <SubTitle level={1} color={option.disabled ? black300 : black900}>
                      {option.label}
                    </SubTitle>
                    {selection === 'checkbox' && (
                      <Checkbox checked={value.some((item) => item === option.value)} onChange={() => {}} />
                    )}
                    {selection === 'radio' && <Radio checked={value === option.value} onChange={() => {}} />}
                  </div>
                ))
              ) : blank ? (
                blank
              ) : (
                <div css={dropdownOption(false)}>
                  <SubTitle level={1} color={black300}>
                    목록이 없습니다
                  </SubTitle>
                </div>
              )}
            </div>
          )}
        </div>
      </Flex>
    </div>
  );
};

export default SelectBox;
