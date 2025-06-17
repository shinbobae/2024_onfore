/** @jsxImportSource @emotion/react */
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDashboardStore } from '../../../../../store/dashboard';
import { MapItemType } from '../../../../../store/dashboard/type.ts';
import { filterCharDrop, filterItemDrop, googleMapFilterWrap, mapChanFilterBar, searchItem } from '../style.ts';
import Flex from '../../../../../components/Layout/Flex';
import { black500, black600, Tag } from '@myThingsKr/emcore-js';
import BodyText from '../../../../../components/Typography/Body';
import { DataSiteType } from '../../../../../type';
import SubTitle from '../../../../../components/Typography/SubTitle';
import SvgIcSetting from '../../../../../assets/icon/IcSetting.tsx';
import SearchBox from '../../../../../components/DataEntry/SearchBox';

const MapFilter = () => {
  const [charFilterOpen, setCharFilterOpen] = useState<boolean>(false);
  const { region, site, mapCharFilter, setMapCharFilter, setMainSiteFilter, setDrawerData } = useDashboardStore();
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [searchResultList, setSearchResultList] = useState<(MapItemType & { category: 'region' | 'site' })[]>([]);

  useEffect(() => {
    if (region && site) {
      const combinedRegion: (MapItemType & { category: 'region' })[] = region.map((item) => ({
        ...item,
        category: 'region',
      }));
      const combinedSite: (MapItemType & { category: 'site' })[] = site.map((item) => ({
        ...item,
        category: 'site',
      }));
      setSearchResultList(
        [...combinedRegion, ...combinedSite].filter((item) =>
          item.title.toLowerCase().includes(searchInputValue.toLowerCase()),
        ),
      );
    }
  }, [region, site, searchInputValue]);

  const onChangeSearchInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInputValue(value);
  }, []);

  const onClickSearchResult = useCallback(
    (item: MapItemType & { category: DataSiteType }) => {
      setSearchInputValue('');
      setMainSiteFilter(item.category);
      setDrawerData({ open: true, data: { id: item.id, title: item.title, type: item.category } });
    },
    [searchResultList],
  );

  return (
    <div css={googleMapFilterWrap}>
      <SearchBox
        css={filterItemDrop}
        clear
        shadow
        value={searchInputValue}
        setValue={setSearchInputValue}
        onChange={onChangeSearchInput}
        searchList={searchResultList}
        placeholder={'지역, 시설 검색'}
        resultRender={(item) => (
          <div css={searchItem} onClick={() => onClickSearchResult(item)}>
            <BodyText level={3} color={black600}>
              {item.category === 'region' ? '지역' : '시설'}
            </BodyText>
            <SubTitle level={3}>{item.title}</SubTitle>
          </div>
        )}
      />
      <div>
        <div css={filterItemDrop} onClick={() => setCharFilterOpen((value) => !value)}>
          <Flex align={'center'} gap={'2px'} padding={'4px 12px 4px 4px'}>
            <SvgIcSetting width={32} />
            <Flex align={'center'} gap={'8px'} style={{ cursor: 'pointer' }}>
              <SubTitle level={3}>
                {mapCharFilter.main === 'percent' ? '전체 대비 비중' : '지난주 대비 증감률'}
              </SubTitle>
              <span css={mapChanFilterBar} />
              <SubTitle level={3} color={black500}>
                누적 데이터
              </SubTitle>
            </Flex>
          </Flex>
        </div>

        {charFilterOpen && (
          <div css={filterCharDrop}>
            <Flex gap={'12px'} direction={'column'}>
              <Flex align={'center'} gap={'8px'}>
                <SubTitle level={4} color={black500}>
                  메인 지표
                </SubTitle>
                <Tag
                  color={mapCharFilter.main === 'percent' ? 'black' : 'white'}
                  onClick={() => setMapCharFilter({ ...mapCharFilter, main: 'percent' })}>
                  전체 대비 비중
                </Tag>
                <Tag
                  color={mapCharFilter.main === 'wow_percent' ? 'black' : 'white'}
                  onClick={() => setMapCharFilter({ ...mapCharFilter, main: 'wow_percent' })}>
                  지난주 대비 증감률
                </Tag>
              </Flex>

              <Flex align={'center'} gap={'8px'}>
                <SubTitle level={4} color={black500}>
                  보조 지표
                </SubTitle>
                <Tag
                  color={mapCharFilter.sub === 'amount' ? 'black' : 'white'}
                  onClick={() => setMapCharFilter({ ...mapCharFilter, sub: 'amount' })}>
                  누적 데이터
                </Tag>
              </Flex>
            </Flex>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapFilter;
