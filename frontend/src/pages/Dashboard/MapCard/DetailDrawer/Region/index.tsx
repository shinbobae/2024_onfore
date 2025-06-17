/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from 'react';
import RankItem, { RankProps } from '../../RankItem';
import { DataCategoryType } from '../../../../../type';
import { DrawerPropsType } from '../../../../../components/Layout/Drawer';
import { useDashboardStore } from '../../../../../store/dashboard';
import Flex from '../../../../../components/Layout/Flex';
import { mapGraphPeriodWrap } from '../../style.ts';
import BodyText from '../../../../../components/Typography/Body';
import {
  black600,
  black800,
  black900,
  blue500,
  Button,
  Empty,
  green500,
  mandarin500,
  red500,
} from '@myThingsKr/emcore-js';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis } from 'recharts';
import Headline from '../../../../../components/Typography/Headline';
import { Tab } from '../../../../../components/Tab';
import { mapDetailInnerStyle, mapDetailRankCardStyle, rankChangeStyle } from '../style.ts';
import SubTitle from '../../../../../components/Typography/SubTitle';
import SvgIcoArrowFilledUp16 from '../../../../../assets/icon/IcoArrowFilledUp16.tsx';
import SvgIcoSortAscending from '../../../../../assets/icon/IcoSortAscending.tsx';
import SvgIcoSortDescending from '../../../../../assets/icon/IcoSortDescending.tsx';
import SvgIcoSortReset from '../../../../../assets/icon/IcoSortReset.tsx';
import { renderCategoryText } from '../renderCategoryText.ts';
import SvgIcoArrowFilledDown16 from '../../../../../assets/icon/IcoArrowFilledDown16.tsx';
import ChartTooltip from '../ChartTooltip';
import ChartLegend from '../ChartLegend';
import ChartAxisTick from '../ChartAxisTick';

const RegionContent = ({ open }: Pick<DrawerPropsType, 'open'>) => {
  // 지도 클릭 Drawer contents
  const [dataCategory, setDataCategory] = useState<DataCategoryType>('carbon');

  const [graphPeriod, setGraphPeriod] = useState<'month' | 'year' | 'all'>('month');
  const [rankPeriod, setRankPeriod] = useState<'sum' | 'week'>('sum');

  const [rankSort, setRankSort] = useState<'asc' | 'desc'>('asc');
  const [detailRankList, setDetailRankList] = useState<RankProps[]>([]);
  const {
    drawerData,
    setDrawerData,
    getRegionDrawerData,
    regionDataCategory,
    regionDrawerRankData,
    regionDrawerGraphData,
  } = useDashboardStore();

  useEffect(() => {
    if (open && drawerData.data) {
      // API 호출
      getRegionDrawerData(drawerData.data.id);
    }
  }, [open, drawerData]);

  useEffect(() => {
    // drawer 닫을 때 초기화
    if (!open) {
      setGraphPeriod('month');
      setRankPeriod('sum');
    }
  }, [open]);
  // 탭에 들어가는 정보 여기서 불러오기
  useEffect(() => {
    if (regionDrawerRankData && regionDrawerRankData[dataCategory]) {
      const rankList = regionDrawerRankData[dataCategory].site_list
        .map((item) => ({
          id: item.id,
          title: item.title,
          sum: rankPeriod === 'sum' ? item.accumulate : item.week,
          unit: item.unit,
          yesterday: item.today,
        }))
        .sort((a, b) => {
          if (rankSort === 'asc') {
            return b.sum - a.sum;
          } else {
            return a.sum - b.sum;
          }
        })
        .map((item, index) => ({ ...item, rank: index + 1 }));
      setDetailRankList(rankList);
    }
  }, [regionDrawerRankData, rankSort, dataCategory, rankPeriod]);

  const onChangeRankSort = useCallback(() => {
    switch (rankSort) {
      case 'asc': {
        setRankSort('desc');
        const newList = detailRankList
          .slice(0)
          .reverse()
          .map((i) => i);
        setDetailRankList(newList);
        break;
      }
      case 'desc': {
        setRankSort('asc');
        const newList = detailRankList
          .slice(0)
          .reverse()
          .map((i) => i);
        setDetailRankList(newList);
        break;
      }
    }
  }, [detailRankList, rankSort]);

  if (regionDrawerRankData === null) return <Empty description={'데이터가 없습니다.'} />;
  return (
    <>
      {/* 그래프 영역 */}
      <Flex gap={'12px'} direction={'column'} padding={'12px 20px'}>
        {/* 그래프 기간 필터 */}
        <div css={mapGraphPeriodWrap}>
          <button onClick={() => setGraphPeriod('month')}>
            <BodyText level={3} color={graphPeriod === 'month' ? blue500 : black900}>
              6개월
            </BodyText>
          </button>
          <button onClick={() => setGraphPeriod('year')}>
            <BodyText level={3} color={graphPeriod === 'year' ? blue500 : black900}>
              1년
            </BodyText>
          </button>
          <button onClick={() => setGraphPeriod('all')}>
            <BodyText level={3} color={graphPeriod === 'all' ? blue500 : black900}>
              전체
            </BodyText>
          </button>
        </div>
        {/* end 그래프 기간 필터 */}
        {/* 그래프 */}
        <div>
          <LineChart
            width={450}
            height={336}
            data={regionDrawerGraphData[graphPeriod]}
            margin={{ top: 20, right: 15, left: 29, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="name" tick={<ChartAxisTick />} />
            {/*<YAxis />*/}
            <Tooltip content={<ChartTooltip />} />
            <Legend content={<ChartLegend />} />
            <Line
              type="linear"
              dataKey="carbon"
              dot={{ strokeWidth: '2px' }}
              strokeWidth={2}
              name={renderCategoryText('carbon') + '량'}
              stroke={green500}
              unit={'g CO2-eq'}
            />
            <Line
              type="linear"
              dataKey="electricity"
              dot={{ strokeWidth: '2px' }}
              strokeWidth={2}
              name={renderCategoryText('electricity') + '량'}
              stroke={mandarin500}
              unit={'kW'}
            />
            <Line
              type="linear"
              dataKey="water"
              dot={{ strokeWidth: '2px' }}
              strokeWidth={2}
              name={renderCategoryText('water') + '량'}
              stroke={blue500}
              unit={'L'}
            />
          </LineChart>
        </div>
        {/* end 그래프 */}
      </Flex>
      {/* end 그래프 영역 */}

      {/* 지역 순위 */}
      <div>
        <Flex direction={'column'} gap={'10px'} padding={'20px 20px 8px 20px'}>
          <Headline level={5} color={black800}>
            시설 순위
          </Headline>
        </Flex>

        {/* 시설 순위 분류 */}
        <Tab type={'underline'} padding={'12px 20px 0'}>
          {regionDataCategory.map((item) => (
            <Tab.Button key={item} active={dataCategory === item} onClick={() => setDataCategory(item)}>
              {renderCategoryText(item)}
            </Tab.Button>
          ))}
        </Tab>
        {/* end 지역 순위 분류 */}
        {/* 지역 순위 카드 */}
        <div css={mapDetailInnerStyle}>
          <div css={mapDetailRankCardStyle}>
            <div>
              <BodyText level={3} color={black600}>
                지역 순위
              </BodyText>
              <Flex justify={'center'} align={'center'} gap={'4px'}>
                <Headline level={5} color={black900}>
                  {regionDrawerRankData[dataCategory].rank.toLocaleString()}위
                </Headline>

                <SubTitle
                  level={3}
                  color={Math.sign(regionDrawerRankData[dataCategory].rank_change) === -1 ? blue500 : red500}>
                  <span css={rankChangeStyle}>
                    {Math.sign(regionDrawerRankData[dataCategory].rank_change) === -1 ? (
                      <SvgIcoArrowFilledDown16 color={blue500} width={16} />
                    ) : (
                      <SvgIcoArrowFilledUp16 color={red500} width={16} />
                    )}
                    {Math.abs(regionDrawerRankData[dataCategory].rank_change).toLocaleString()}
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
                  {regionDrawerRankData[dataCategory].accumulate_total.toLocaleString()}{' '}
                  {regionDrawerRankData[dataCategory].unit}
                </Headline>

                <SubTitle level={3} color={red500}>
                  <span css={rankChangeStyle}>
                    {Math.sign(regionDrawerRankData[dataCategory].accumulate_today) === -1 ? (
                      <SvgIcoArrowFilledDown16 color={blue500} width={16} />
                    ) : (
                      <SvgIcoArrowFilledUp16 color={red500} width={16} />
                    )}
                    {Math.abs(regionDrawerRankData[dataCategory].accumulate_today).toLocaleString()}
                  </span>
                </SubTitle>
              </Flex>
            </div>
          </div>
          {/* end 지역 순위 카드 */}
          {/* 지역 순위표 */}
          <div>
            <Tab
              type={'dot'}
              extra={
                <Button
                  variant={'text'}
                  icon={
                    rankSort === 'asc' ? (
                      <SvgIcoSortAscending width={16} style={{ stroke: 'transparent' }} />
                    ) : rankSort === 'desc' ? (
                      <SvgIcoSortDescending width={16} style={{ stroke: 'transparent' }} />
                    ) : (
                      <SvgIcoSortReset width={16} style={{ stroke: 'transparent' }} />
                    )
                  }
                  iconPositionRight={true}
                  fontSize={15}
                  style={{ color: black900 }}
                  onClick={onChangeRankSort}>
                  {rankSort === 'asc' ? '높은순' : '낮은순'}
                </Button>
              }>
              <Tab.Button active={rankPeriod === 'sum'} onClick={() => setRankPeriod('sum')}>
                누적
              </Tab.Button>
              <Tab.Button active={rankPeriod === 'week'} onClick={() => setRankPeriod('week')}>
                이번주
              </Tab.Button>
            </Tab>
            <div style={{ marginTop: '20px' }}>
              {detailRankList.map((rank, index) => (
                <RankItem
                  key={rank.rank}
                  item={rank}
                  index={index}
                  onClick={() => {
                    // setMainSiteFilter('site');
                    setDrawerData({ open: true, data: { id: rank.id, title: rank.title, type: 'site' } });
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        {/* end 지역 순위표 */}
      </div>
      {/* end 지역 순위 */}
    </>
  );
};

export default RegionContent;
