/** @jsxImportSource @emotion/react */
import Flex from '../../../components/Layout/Flex';
import { dashboardCardWrapStyle } from '../style.ts';
import { MapCardItem } from './style.ts';
import { useCallback, useEffect, useState } from 'react';
import { black500, black900, Button, Empty } from '@myThingsKr/emcore-js';
import SvgIcoSortDescending from '../../../assets/icon/IcoSortDescending.tsx';
import SvgIcoSortAscending from '../../../assets/icon/IcoSortAscending.tsx';
import SvgIcoSortReset from '../../../assets/icon/IcoSortReset.tsx';
import DetailDrawer from './DetailDrawer';
import { Tab } from '../../../components/Tab';
import { useDashboardStore } from '../../../store/dashboard';
import RankItem, { RankProps } from './RankItem';
import GoogleMapWrapper from './GoogleMap/GoogleMapWrapper';
import Dropdown from '../../../components/DataEntry/Dropdown';
import { DataCategoryType } from '../../../type';
import Headline from '../../../components/Typography/Headline';
import SvgIcoArrowSingleDown20 from '../../../assets/icon/IcoArrowSingleDown20.tsx';

const MapCard = () => {
  const {
    region,
    site,
    mainDataCategory,
    setMainDataCategory,
    mainSiteFilter,
    setMainSiteFilter,
    drawerData,
    setDrawerData,
  } = useDashboardStore();

  // rank
  const [sort, setSort] = useState<'desc' | 'asc'>('asc');
  const [mainRankList, setMainRankList] = useState<RankProps[]>([]);

  const [mapHeight, setMapHeight] = useState<number>(0);

  // 맵 카드 높이 계산
  useEffect(() => {
    const contents = document.getElementById('onli-contents') as HTMLElement;
    const dataCard = document.getElementById('dashboard-data-card') as HTMLElement;
    const rankSort = document.getElementById('dashboard-rank-sort') as HTMLElement;
    const tabHeader = document.getElementById('tab-header') as HTMLElement;
    const height =
      contents.offsetHeight - dataCard.offsetHeight - rankSort.offsetHeight - tabHeader.offsetHeight - 60 - 40;
    setMapHeight(height);
  }, []);

  // 랭킹 목록
  useEffect(() => {
    if (mainSiteFilter === 'region') {
      if (region && region.length > 0) {
        const rankList: RankProps[] = [...region]

          .map((item) => {
            if (item[mainDataCategory] !== null) {
              return {
                id: item.id,
                title: item.title,
                sum: item[mainDataCategory].amount,
                unit: item[mainDataCategory].unit,
                yesterday: item[mainDataCategory].dod_amount,
              };
            }
          })
          .filter((item) => item !== undefined)
          .sort((a, b) => {
            if (sort === 'asc') {
              return b.sum - a.sum;
            } else {
              return a.sum - b.sum;
            }
          })
          .map((item, index) => ({ ...item, rank: sort === 'asc' ? index + 1 : region.length - index }));
        setMainRankList(rankList);
      }
    } else {
      if (site && site.length > 0) {
        const rankList: RankProps[] = [...site]
          .map((item, index) => {
            if (item[mainDataCategory] !== null) {
              return {
                id: item.id,
                title: item.title,
                rank: index + 1,
                sum: item[mainDataCategory].amount,
                unit: item[mainDataCategory].unit,
                yesterday: item[mainDataCategory].dod_amount,
              };
            }
          })
          .filter((item) => item !== undefined)
          .sort((a, b) => {
            if (sort === 'asc') {
              return b.sum - a.sum;
            } else {
              return a.sum - b.sum;
            }
          })
          .map((item, index) => ({ ...item, rank: sort === 'asc' ? index + 1 : site.length - index }));
        setMainRankList(rankList);
      }
    }
  }, [region, site, mainDataCategory, mainSiteFilter, sort]);

  // 랭킹 높은순 낮은순
  const onChangeRankSort = useCallback(() => {
    switch (sort) {
      case 'asc': {
        setSort('desc');
        const newList = mainRankList
          .slice(0)
          .reverse()
          .map((i) => i);
        setMainRankList(newList);
        break;
      }
      case 'desc': {
        setSort('asc');
        const newList = mainRankList
          .slice(0)
          .reverse()
          .map((i) => i);
        setMainRankList(newList);
        break;
      }
    }
  }, [mainRankList, sort]);

  return (
    <>
      <div css={dashboardCardWrapStyle()}>
        <Flex gap={'20px'} style={{ alignItems: 'stretch' }}>
          <div css={MapCardItem('70%')}>
            <GoogleMapWrapper />
          </div>
          <div css={MapCardItem('30%')}>
            <div id={'dashboard-rank-sort'}>
              <Flex padding={'0 0 8px'}>
                <Dropdown
                  title={
                    mainDataCategory === 'carbon'
                      ? '탄소 절감량'
                      : mainDataCategory === 'electricity'
                        ? '재생에너지 생산량'
                        : '정수량'
                  }
                  trigger={
                    <Flex padding={'8px 8px 8px 0px'} align={'center'} gap={'6px'}>
                      <Headline level={5}>
                        {mainDataCategory === 'carbon'
                          ? '탄소 절감량'
                          : mainDataCategory === 'electricity'
                            ? '재생에너지 생산량'
                            : '정수량'}
                      </Headline>
                      <SvgIcoArrowSingleDown20 color={black500} width={20} height={20} />
                    </Flex>
                  }
                  selection={'radio'}
                  options={[
                    { label: '탄소 절감량', value: 'carbon' },
                    { label: '재생에너지 생산량', value: 'electricity' },
                    { label: '정수량', value: 'water' },
                  ]}
                  onChange={(value: DataCategoryType) => setMainDataCategory(value)}
                  value={mainDataCategory}
                />
              </Flex>
            </div>
            <Tab
              type={'dot'}
              extra={
                <Button
                  variant={'text'}
                  icon={
                    sort === 'asc' ? (
                      <SvgIcoSortAscending width={16} style={{ stroke: 'transparent' }} />
                    ) : sort === 'desc' ? (
                      <SvgIcoSortDescending width={16} style={{ stroke: 'transparent' }} />
                    ) : (
                      <SvgIcoSortReset width={16} style={{ stroke: 'transparent' }} />
                    )
                  }
                  iconPositionRight={true}
                  fontSize={15}
                  style={{ color: black900 }}
                  onClick={onChangeRankSort}>
                  {sort === 'asc' ? '높은순' : '낮은순'}
                </Button>
              }>
              <Tab.Button active={mainSiteFilter === 'region'} onClick={() => setMainSiteFilter('region')}>
                지역별
              </Tab.Button>
              <Tab.Button active={mainSiteFilter === 'site'} onClick={() => setMainSiteFilter('site')}>
                시설별
              </Tab.Button>
            </Tab>

            <div style={{ overflowY: 'auto', height: `${mapHeight}px` }}>
              {!mainRankList || mainRankList.length < 1 ? (
                <Empty />
              ) : (
                mainRankList.map((rank, index) => (
                  <RankItem
                    key={rank.rank}
                    item={rank}
                    index={index}
                    onClick={() =>
                      setDrawerData({
                        open: true,
                        data: {
                          id: rank.id,
                          title: rank.title,
                          type: mainSiteFilter,
                        },
                      })
                    }
                  />
                ))
              )}
            </div>
          </div>
        </Flex>
      </div>
      <DetailDrawer
        type={drawerData.data ? drawerData.data.type : 'region'}
        open={drawerData.open}
        onClose={() => setDrawerData({ open: false, data: null })}
        title={drawerData.data?.title || ''}
      />
    </>
  );
};

export default MapCard;
