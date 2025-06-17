/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import SvgIcoSortAscending from '../../../assets/icon/IcoSortAscending.tsx';
import SvgIcoSortDescending from '../../../assets/icon/IcoSortDescending.tsx';
import SvgIcoSortReset from '../../../assets/icon/IcoSortReset.tsx';

type SortButtonPropsType = {
  children: React.ReactNode;
  sort: 'asc' | 'desc' | 'reset';
  onClick: () => void;
};

const SortButton = ({ children, sort, onClick }: SortButtonPropsType) => {
  return (
    <button css={style} onClick={onClick}>
      {children}
      {sort === 'asc' ? (
        <SvgIcoSortAscending width={16} />
      ) : sort === 'desc' ? (
        <SvgIcoSortDescending width={16} />
      ) : (
        <SvgIcoSortReset width={16} />
      )}
    </button>
  );
};

export default SortButton;

const style = css`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;
