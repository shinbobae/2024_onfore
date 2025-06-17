/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useMemo, useState } from 'react';
import { inputStyle, inputWrapStyle } from './style.ts';
import Flex from '../../Layout/Flex';
import Label from '../Label';
import BodyText from '../../Typography/Body';
import { black500, red500 } from '@myThingsKr/emcore-js';
import SvgIcoEyeOpen from '../../../assets/icon/IcoEyeOpen.tsx';
import SvgIcoEyeClose from '../../../assets/icon/IcoEyeClose.tsx';

type Props = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  placeholder?: string;
  status?: 'default' | 'error' | null;
  maxLength?: number;
  errorMessage?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  readonly?: boolean;
  type?: 'text' | 'password';
  addonAfter?: string;
  onFocus?: () => void;
  onBlur?: () => void;
} & HTMLAttributes<HTMLDivElement>;

const InputBox = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  label,
  required,
  status = 'default',
  icon,
  disabled,
  readonly,
  maxLength,
  errorMessage,
  addonAfter,
  onFocus,
  onBlur,
}: Props) => {
  const inputId = useMemo(() => `${Math.random().toString(36).substring(2)}`, []);
  const [focused, setFocused] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const onFocusAction = () => {
    if (onFocus) onFocus();
    setFocused(true);
  };
  const onBlurAction = () => {
    if (onBlur) onBlur();
    setFocused(false);
  };

  return (
    <Flex direction={'column'} gap={'8px'} padding={label && '12px 0'} width={'100%'} onClick={onFocusAction}>
      {label && (
        <Label htmlFor={inputId} required={required}>
          {label}
        </Label>
      )}

      <div css={inputWrapStyle(status === 'error', focused)}>
        {icon && icon}
        <input
          css={inputStyle}
          id={inputId}
          type={type === 'password' && visible ? 'text' : type}
          disabled={disabled}
          readOnly={readonly}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={onChange}
          onFocus={onFocusAction}
          onBlur={onBlurAction}
        />
        {maxLength && (
          <BodyText level={3} color={black500}>
            {value.length}/{maxLength}
          </BodyText>
        )}
        {type === 'password' && (
          <Flex align={'center'}>
            {visible}
            {visible ? (
              <SvgIcoEyeOpen
                width={16}
                onClick={() => {
                  setVisible(false);
                }}
              />
            ) : (
              <SvgIcoEyeClose
                width={16}
                onClick={() => {
                  setVisible(true);
                }}
              />
            )}
          </Flex>
        )}
        {addonAfter && (
          <BodyText level={3} color={black500}>
            <span style={{ whiteSpace: 'nowrap' }}>{addonAfter}</span>
          </BodyText>
        )}
      </div>
      {status === 'error' && errorMessage && (
        <BodyText level={3} color={red500}>
          {errorMessage}
        </BodyText>
      )}
    </Flex>
  );
};
export default InputBox;
