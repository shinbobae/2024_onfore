import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import OnliHeader from '../Header';
import { black20 } from '@myThingsKr/emcore-js';
import Flex from '../Flex';

type AppComponentProps = { children: ReactNode };

const { Content } = Layout;

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
    <Layout style={{ height: '100%', minHeight: '100vh', backgroundColor: black20, paddingTop: '60px' }}>
      <OnliHeader />
      <Content id={'onli-contents'}>{children}</Content>
    </Layout>
  );
};

export default AppLayout;
