/** @jsxImportSource @emotion/react */
import Flex from '../../Layout/Flex';
import SvgIcoSearch from '../../../assets/icon/IcoSearch.tsx';
import { black300, black500, black900 } from '@myThingsKr/emcore-js';
import React, { HTMLAttributes, useState } from 'react';
import { clearPosition, filterInputWrap, searchInput, searchItem, searchListWrap } from './style.ts';
import BodyText from '../../Typography/Body';
import SvgIcoCloseLine24 from '../../../assets/icon/IcoCloseLine24.tsx';

type SearchBoxProps<T> = {
  value: string;
  // setValue?: (value: string) => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  width?: string;
  // searchList: Array<T>;
  // resultRender: (item: T) => React.ReactNode;
  clear?: boolean;
  shadow?: boolean;
} & (
  | { extend?: true; searchList: Array<T>; resultRender: (item: T) => React.ReactNode }
  | { extend?: false; searchList?: never; resultRender?: never }
) &
  ({ clear?: true; setValue: (value: string) => void } | { clear?: false; setValue?: never }) &
  HTMLAttributes<HTMLDivElement>;

const SearchBox = <T extends { [key: string]: any }>({
  value,
  onChange,
  placeholder,
  extend = true,
  searchList,
  resultRender,
  clear,
  width,
  setValue,
  shadow,
}: SearchBoxProps<T>) => {
  const [searchInputFocused, setSearchInputFocused] = useState<boolean>(false);

  return (
    <div>
      <div css={filterInputWrap(searchInputFocused, width, shadow || false)}>
        <Flex align={'center'} gap={'8px'} padding={'8px 12px'}>
          <SvgIcoSearch color={black300} width={24} />
          <input
            css={searchInput((clear && value.length > 0) ?? false)}
            type="text"
            value={value}
            onFocus={() => setSearchInputFocused(true)}
            onBlur={() => value.length === 0 && setSearchInputFocused(false)}
            onChange={onChange}
            placeholder={placeholder}
          />
          {clear && setValue && value.length > 0 && (
            <div css={clearPosition}>
              <SvgIcoCloseLine24
                color={black300}
                width={24}
                onClick={() => {
                  setValue('');
                  setSearchInputFocused(false);
                }}
              />
            </div>
          )}
        </Flex>
      </div>
      {extend && searchList && searchInputFocused && (
        <div css={searchListWrap}>
          {value === '' ? (
            <div css={searchItem}>
              <BodyText level={1} color={black500}>
                검색어를 입력해 주세요.
              </BodyText>
            </div>
          ) : searchList.length < 1 ? (
            <div css={searchItem}>
              <BodyText level={1} color={black900}>
                검색 결과가 없습니다.
              </BodyText>
            </div>
          ) : (
            searchList.map((item, index) => (
              <div key={index} onClick={() => setSearchInputFocused(false)}>
                {resultRender(item)}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default SearchBox;
