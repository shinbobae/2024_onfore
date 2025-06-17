import { createContext, useContext } from 'react';
import { TabType } from './index.tsx';

const TabContext = createContext<{ type: TabType } | null>(null);

export const useTabContext = () => {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error('Tab.* 컴포넌트만');
  }
  return context;
};

export default TabContext;