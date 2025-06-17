/** @jsxImportSource @emotion/react */

import DashboardSumCard from './DataCard';
import { dashboardWrapStyle } from './style.ts';
import MapCard from './MapCard';
import { useEffect } from 'react';
import { useDashboardStore } from '../../store/dashboard';
import { Spin } from 'antd';

const Dashboard = () => {
  const { getDashboardData, dashboardLoading } = useDashboardStore();

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <>
      <div id={'dashboard'} css={dashboardWrapStyle}>
        <div id={'dashboard-data-card'}>
          <DashboardSumCard />
        </div>
        <MapCard />
      </div>
      <Spin spinning={dashboardLoading} fullscreen />
    </>
  );
};

export default Dashboard;
