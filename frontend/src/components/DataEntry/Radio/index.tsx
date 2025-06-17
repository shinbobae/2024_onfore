/** @jsxImportSource @emotion/react */
import { black100, blue500 } from '@myThingsKr/emcore-js';
import { css } from '@emotion/react';

type RadioProps = {
  checked: boolean;
  name?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};

const Radio = ({ checked, name, value, onChange }: RadioProps) => {
  return (
    <input
      css={RadioStyle}
      name={name}
      value={value}
      type="radio"
      checked={checked}
      onChange={(e) => onChange && onChange(e.target.checked)}
    />
  );
};

export default Radio;

const RadioStyle = css`
  & {
    width: 18px;
    height: 18px;
    cursor: pointer;
    outline: none;
    appearance: none;
    border-radius: 50%;
    border: 2px solid ${black100};
    background-color: transparent;
  }
  &:checked {
    border: 5px solid ${blue500};
  }
`;
