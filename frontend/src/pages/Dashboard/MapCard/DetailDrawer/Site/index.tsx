/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { DataCategoryType } from '../../../../../type';
import { DrawerPropsType } from '../../../../../components/Layout/Drawer';
import { useDashboardStore } from '../../../../../store/dashboard';
import Flex from '../../../../../components/Layout/Flex';
import { mapGraphPeriodWrap } from '../../style.ts';
import BodyText from '../../../../../components/Typography/Body';
import {
  black500,
  black600,
  black700,
  black900,
  blue300,
  blue500,
  Empty,
  green300,
  green500,
  mandarin300,
  mandarin500,
  red500,
} from '@myThingsKr/emcore-js';
import { Bar, BarChart, CartesianGrid, Rectangle, Tooltip, XAxis, YAxis } from 'recharts';
import Headline from '../../../../../components/Typography/Headline';
import { Tab } from '../../../../../components/Tab';
import { mapDetailCompanyInfoStyle, mapDetailInnerStyle, mapDetailRankCardStyle, rankChangeStyle } from '../style.ts';
import SubTitle from '../../../../../components/Typography/SubTitle';
import SvgIcoArrowFilledUp16 from '../../../../../assets/icon/IcoArrowFilledUp16.tsx';
import { renderCategoryText } from '../renderCategoryText.ts';
import ColumnStickyTable from './ColumnStickyTable';
import formatTimeStamp from '../../../../../util/formatTimeStamp.ts';
import SvgIcoArrowFilledDown16 from '../../../../../assets/icon/IcoArrowFilledDown16.tsx';
import ChartTooltip from '../ChartTooltip';
import ChartAxisTick from '../ChartAxisTick';

const SiteContent = ({ open }: Pick<DrawerPropsType, 'open'>) => {
  // 지도 클릭 Drawer contents
  const [dataCategory, setDataCategory] = useState<DataCategoryType>('carbon');

  const [graphPeriod, setGraphPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  const { drawerData, getSiteDrawerData, siteDrawerData, siteDrawerTableData, siteDrawerGraphData } =
    useDashboardStore();

  useEffect(() => {
    if (open && drawerData.data) {
      // API 호출
      getSiteDrawerData(drawerData.data.id);
    }
  }, [open, drawerData]);

  useEffect(() => {
    if (siteDrawerData) setDataCategory(siteDrawerData.category[0]);
  }, [siteDrawerData]);

  useEffect(() => {
    // drawer 닫을 때 초기화
    if (!open) {
      setGraphPeriod('month');
    }
  }, [open]);

  if (siteDrawerData === null || siteDrawerData[dataCategory] === null)
    return <Empty description={'데이터가 없습니다.'} />;

  return (
    <>
      {/* 시설 상세 */}
      <Flex gap={'20px'} padding={'0 20px'}>
        {/* 시설 기업 정보 */}
        <div css={mapDetailCompanyInfoStyle}>
          <Flex justify={'space-between'} gap={'8px'} style={{ wordBreak: 'keep-all' }}>
            <BodyText level={3} color={black600}>
              기업명
            </BodyText>
            <SubTitle level={3} color={black900}>
              {siteDrawerData.organization_name}
            </SubTitle>
          </Flex>
        </div>
        <div css={mapDetailCompanyInfoStyle}>
          <Flex justify={'space-between'} gap={'8px'} style={{ wordBreak: 'keep-all' }}>
            <BodyText level={3} color={black600}>
              주소
            </BodyText>
            <SubTitle level={3} color={black900}>
              {siteDrawerData.address}
            </SubTitle>
          </Flex>
        </div>
      </Flex>

      <Tab type={'underline'} padding={'12px 20px 0'}>
        {siteDrawerData.category.map((item) => (
          <Tab.Button key={item} active={dataCategory === item} onClick={() => setDataCategory(item)}>
            {renderCategoryText(item)}
          </Tab.Button>
        ))}
      </Tab>

      <Flex direction={'column'} justify={'center'} gap={'4px'} padding={'32px 32px 12px 32px'}>
        <BodyText level={3} color={black700}>
          이번달 {renderCategoryText(dataCategory)}량
        </BodyText>
        <Flex justify={'space-between'} align={'center'} style={{ alignSelf: 'stretch' }}>
          <Headline level={3} color={black900}>
            {siteDrawerData[dataCategory].amount.toLocaleString()} {siteDrawerData[dataCategory].unit}
          </Headline>
          <BodyText level={3} color={black500}>
            {formatTimeStamp(siteDrawerData[dataCategory].time_at) + '기준'}
          </BodyText>
        </Flex>
        {/* end 시설 기업 정보 */}
      </Flex>

      <div css={mapDetailInnerStyle}>
        <div css={mapDetailRankCardStyle}>
          <div>
            <BodyText level={3} color={black600}>
              지역 순위
            </BodyText>
            <Flex justify={'center'} align={'center'} gap={'4px'}>
              <Headline level={5} color={black900}>
                {siteDrawerData[dataCategory].rank.toLocaleString()} 위
              </Headline>

              <SubTitle level={3} color={Math.sign(siteDrawerData[dataCategory].rank_change) === -1 ? blue500 : red500}>
                <span css={rankChangeStyle}>
                  {Math.sign(siteDrawerData[dataCategory].rank_change) === -1 ? (
                    <SvgIcoArrowFilledDown16 color={blue500} width={16} />
                  ) : (
                    <SvgIcoArrowFilledUp16 color={red500} width={16} />
                  )}
                  {Math.abs(siteDrawerData[dataCategory].rank_change).toLocaleString()}
                </span>
              </SubTitle>
            </Flex>
          </div>

          <div>
            <BodyText level={3} color={black600}>
              누적 {renderCategoryText(dataCategory)}량
            </BodyText>
            <Flex justify={'center'} align={'center'} gap={'4px'}>
              <Headline level={5} color={black900}>
                {siteDrawerData[dataCategory].accumulate_total.toLocaleString()} {siteDrawerData[dataCategory].unit}
              </Headline>

              <SubTitle level={3} color={red500}>
                <span css={rankChangeStyle}>
                  <SvgIcoArrowFilledUp16 color={red500} width={16} />
                  {siteDrawerData[dataCategory].accumulate_today.toLocaleString()}
                </span>
              </SubTitle>
            </Flex>
          </div>
        </div>
        {/* 시설 그래프 영역 */}
        <Flex gap={'12px'} direction={'column'} padding={'12px 0'}>
          <div css={mapGraphPeriodWrap}>
            <button onClick={() => setGraphPeriod('month')}>
              <BodyText level={3} color={graphPeriod === 'month' ? blue500 : black900}>
                월간
              </BodyText>
            </button>
            <button onClick={() => setGraphPeriod('quarter')}>
              <BodyText level={3} color={graphPeriod === 'quarter' ? blue500 : black900}>
                분기
              </BodyText>
            </button>
            <button onClick={() => setGraphPeriod('year')}>
              <BodyText level={3} color={graphPeriod === 'year' ? blue500 : black900}>
                연간
              </BodyText>
            </button>
          </div>
        </Flex>

        {siteDrawerGraphData && siteDrawerGraphData[dataCategory] && (
          <div>
            <BarChart
              width={460}
              height={300}
              data={siteDrawerGraphData[dataCategory][graphPeriod]}
              margin={{
                top: 5,
                right: 30,
                left: -24,
                bottom: 5,
              }}
              barSize={24}>
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="name" fontSize={12} color={black700} tick={<ChartAxisTick />} />
              <YAxis fontSize={12} color={black700} tick={<ChartAxisTick yAxis={true} />} />
              <Tooltip content={<ChartTooltip />} />
              {/*<Legend />*/}
              <Bar
                dataKey={dataCategory}
                name={renderCategoryText(dataCategory)}
                fill={dataCategory === 'carbon' ? green300 : dataCategory === 'electricity' ? mandarin300 : blue300}
                radius={4}
                activeBar={
                  <Rectangle
                    fill={dataCategory === 'carbon' ? green500 : dataCategory === 'electricity' ? mandarin500 : blue500}
                  />
                }
                unit={dataCategory === 'carbon' ? 't' : dataCategory === 'water' ? 'L' : 'MWh'}
              />
            </BarChart>
          </div>
        )}
        {siteDrawerTableData && siteDrawerTableData[dataCategory] && (
          <ColumnStickyTable dataCategory={dataCategory} data={siteDrawerTableData[dataCategory][graphPeriod]} />
        )}
      </div>
    </>
  );
};

export default SiteContent;
