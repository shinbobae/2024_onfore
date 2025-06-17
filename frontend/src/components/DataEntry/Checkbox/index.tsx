/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useRef } from 'react';
import { black0, black100, blue500 } from '@myThingsKr/emcore-js';
import IcCheck from './IcCheck.png';

type CheckboxProps = {
  id?: string;
  checked: boolean | null;
  onChange: (checked: boolean) => void;
};

const Checkbox = ({ id, checked, onChange }: CheckboxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = checked === null;
    }
  }, [checked]);

  return (
    <input
      ref={inputRef}
      id={id}
      css={CheckboxStyle}
      type="checkbox"
      checked={checked ?? false}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
};

export default Checkbox;

const CheckboxStyle = () => css`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  width: 18px;
  height: 18px;
  accent-color: ${blue500};
  cursor: pointer;
  background-color: transparent;
  border-radius: 4px;
  border: 2px solid ${black100};

  &::before {
    content: '';
    background-image: url(${IcCheck});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 10px 8px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }

  &:checked {
    border-color: ${blue500};
    background-color: ${blue500};
  }

  &:checked::before {
    opacity: 1;
  }

  &:indeterminate {
    width: 18px;
    height: 18px;
    border: none;
    color: ${blue500};
    content: '';

    background-color: ${blue500};
  }

  &:indeterminate::after {
    content: '';
    position: absolute;
    width: 11px;
    height: 2px;
    border-radius: 4px;
    background-color: ${black0};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: rotate(90deg);
  }
`;
