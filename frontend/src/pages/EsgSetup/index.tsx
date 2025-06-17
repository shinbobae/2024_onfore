/** @jsxImportSource @emotion/react */

import { backgroundColor } from '../Organization/style.ts';
import { black0 } from '@myThingsKr/emcore-js';
import { Tab } from '../../components/Tab';
import { useState } from 'react';
import { DataCategoryType } from '../../type';
import EsgCarbon from './Carbon';
import Flex from '../../components/Layout/Flex';
import EsgElectricity from './Electricity';
import EsgWater from './Water';

const ESGSetup = () => {
  const [currentTab, setCurrentTab] = useState<DataCategoryType>('carbon');

  return (
    <div css={backgroundColor(black0)}>
      <div style={{ minHeight: 'calc(100vh - 60px)' }}>
        <Flex direction={'column'} alignSelf={'stretch'} width={'100%'} padding={'20px 40px 156px'}>
          <Tab type={'underline'}>
            <Tab.Button active={currentTab === 'carbon'} withIcon onClick={() => setCurrentTab('carbon')}>
              탄소 절감
            </Tab.Button>
            <Tab.Button active={currentTab === 'electricity'} onClick={() => setCurrentTab('electricity')}>
              재생에너지 생산
            </Tab.Button>
            <Tab.Button active={currentTab === 'water'} onClick={() => setCurrentTab('water')}>
              물 정수
            </Tab.Button>
          </Tab>

          {currentTab === 'carbon' ? <EsgCarbon /> : currentTab === 'electricity' ? <EsgElectricity /> : <EsgWater />}
        </Flex>
      </div>
    </div>
  );
};
export default ESGSetup;
