/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { black900, Button } from '@myThingsKr/emcore-js';
import { menuWrapStyle } from './style.ts';

type GNBItemType = {
  label: string;
  linkTo: string;
  en?: string;
  key: string;
  icon?: React.ReactNode;
};
const GNBList: GNBItemType[] = [
  { label: '온포레 지도', linkTo: '/dashboard', key: 'dashboard' },
  { label: '통계 및 분석', linkTo: '/analysis', key: 'analysis' },
  { label: '데이터 관리', linkTo: '/data', key: 'data' },
  { label: '조직 관리 ', linkTo: '/organization', key: 'organization' },
];

const OnliGNB = () => {
  const location = useLocation();

  return (
    <div css={menuWrapStyle}>
      {GNBList.map((item: GNBItemType) => (
        <Link key={item.linkTo} to={item.linkTo}>
          <Button
            variant={'text'}
            color={location.pathname === item.linkTo ? 'primary' : 'default'}
            fontSize={16}
            style={location.pathname !== item.linkTo ? { color: black900 } : {}}>
            {item.label}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default OnliGNB;
