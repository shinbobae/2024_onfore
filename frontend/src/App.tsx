import AppRouter from './Router';
import AppLayout from './components/Layout/AppLayout';
import { ConfigProvider } from 'antd';
import theme from './style/theme.ts';
import GlobalStyle from './style/GlobalStyle.tsx';
import { ModalProvider } from '@myThingsKr/emcore-js';

function App() {
  return (
    <>
      <ConfigProvider theme={theme}>
        <ModalProvider>
          <GlobalStyle />
          <div id="modal" />
          <AppLayout>
            <AppRouter />
          </AppLayout>
        </ModalProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
