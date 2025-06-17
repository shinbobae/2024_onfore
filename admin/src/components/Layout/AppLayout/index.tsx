/** @jsxImportSource @emotion/react */
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import OnliHeader from '../Header';
import Flex from '../Flex';
import { AppContentWrap } from './style.ts';

type AppComponentProps = { children: ReactNode };

const AppLayout = ({ children }: AppComponentProps) => {
  const location = useLocation();

  // 로그인 화면 레이아웃
  if (location.pathname === '/login') {
    return (
      <Flex justify={'center'} align={'center'} alignSelf={'stretch'} style={{ minHeight: '100vh' }}>
        {children}
      </Flex>
    );
  }

  // 로그인 이외 페이지 레이아웃
  return (
    <Layout style={{ height: '100vh', paddingTop: '60px' }}>
      <OnliHeader />
      <div id={'onli-contents'} css={AppContentWrap}>
        {children}
      </div>
    </Layout>
  );
};

export default AppLayout;
