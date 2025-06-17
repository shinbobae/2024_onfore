/** @jsxImportSource @emotion/react */
import { dropdownOption, dropdownOptions, dropdownTrigger, dropdownTriggerWrap, dropdownWrap } from './style.ts';
import SubTitle from '../../Typography/SubTitle';
import SvgIcoArrowFilledDown24 from '../../../assets/icon/IcoArrowFilledDown24.tsx';
import { black500, blue500 } from '@myThingsKr/emcore-js';
import React, { useEffect, useRef, useState } from 'react';
import Checkbox from '../Checkbox';
import Radio from '../Radio';

type DropdownBaseType<T> = {
  title: string;
  options: { label: string; value: string }[];
  selection?: 'checkbox' | 'radio';
  onChange: (value: T) => void;
  trigger?: React.ReactNode;
};
type DropdownPropsType<T> = DropdownBaseType<T> &
  ({ selection?: 'checkbox'; value: T[] } | { selection?: 'radio'; value: T });

const Dropdown = ({ title, value, selection, options, onChange, trigger }: DropdownPropsType<any>) => {
  const dropdowntRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getSelectOutside = (e: globalThis.MouseEvent) => {
      if (!dropdowntRef.current?.contains(e.target as HTMLDivElement)) {
        setOpen(false);
      }
    };
    window.addEventListener('mouseup', getSelectOutside);
    return () => {
      window.removeEventListener('mouseup', getSelectOutside);
    };
  }, [dropdowntRef]);

  return (
    <div css={dropdownWrap} ref={dropdowntRef}>
      <div css={dropdownTriggerWrap} onClick={() => setOpen((state) => !state)}>
        {trigger ? (
          trigger
        ) : (
          <div css={dropdownTrigger}>
            <SubTitle level={1}>{title}</SubTitle>
            {selection === 'checkbox' && value.length > 0 && (
              <SubTitle level={1} color={blue500}>
                {value.length}
              </SubTitle>
            )}
            <SvgIcoArrowFilledDown24 color={black500} width={24} height={24} />
          </div>
        )}
      </div>
      {open && (
        <div css={dropdownOptions}>
          {options.map((option) => (
            <div
              key={option.value}
              css={dropdownOption}
              onClick={() => {
                onChange(option.value);
                if (selection === 'radio') setOpen(false);
              }}>
              {selection === 'checkbox' && (
                <Checkbox checked={value.some((item) => item === option.value)} onChange={() => {}} />
              )}
              {selection === 'radio' && <Radio checked={value === option.value} onChange={() => {}} />}
              <SubTitle level={1}>{option.label}</SubTitle>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
