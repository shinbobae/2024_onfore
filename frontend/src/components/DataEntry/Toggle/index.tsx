/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { black0, black20, blue200, blue500 } from '@myThingsKr/emcore-js';

type ToggleProps = {
  active: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

const Toggle = ({ active, disabled, onChange }: ToggleProps) => {
  return (
    <label css={toggleWrapperStyle}>
      <input
        css={toggleInputStyle}
        type="checkbox"
        checked={active}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span css={toggleSliderStyle}></span>
    </label>
  );
}

export default Toggle;

const toggleWrapperStyle = css`
  position: relative;
  display: inline-block;
  width: 46px;
  height: 28px;
`;

const toggleInputStyle = css`
  opacity: 0;
  width: 0;
  height: 0;
`;

const toggleSliderStyle = css`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 14px;
  background-color: #D1D4D9;
  transition: 0.3s;

  &:before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    left: 2px;
    bottom: 2px;
    border-radius: 50%;
    background-color: ${black0};
    transition: 0.3s;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.15);
  }
  
  // disabled 상태일때 스타일
  input:disabled + & {
    background-color: ${black20};
  }
  
  input:disabled:checked + & {
    background-color: ${blue200};
  }

  input:checked + & {
    background-color: ${blue500};
  }

  input:checked + &:before {
    transform: translateX(18px);
  }
`;
