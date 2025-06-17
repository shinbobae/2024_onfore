/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import Drawer, { DrawerPropsType } from '../../../../components/Layout/Drawer';
import { useDashboardStore } from '../../../../store/dashboard';
import RegionContent from './Region';
import SiteContent from './Site';

type DashboardDrawerProps = {
  type: 'site' | 'region';
} & Pick<DrawerPropsType, 'open' | 'onClose' | 'title'>;
const DetailDrawer = ({ type, open, onClose, title }: DashboardDrawerProps) => {
  // 지도 클릭 Drawer contents

  const { drawerData } = useDashboardStore();

  useEffect(() => {
    if (drawerData.data) {
      // API 호출
    }
  }, [drawerData]);

  return (
    <Drawer open={open} onClose={onClose} title={title}>
      {type === 'region' ? <RegionContent open={open} /> : <SiteContent open={open} />}
    </Drawer>
  );
};

export default DetailDrawer;
