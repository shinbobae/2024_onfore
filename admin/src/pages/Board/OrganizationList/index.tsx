/** @jsxImportSource @emotion/react */
import Flex from '../../../components/Layout/Flex';
import Headline from '../../../components/Typography/Headline';
import { black10, black600, blue500 } from '@myThingsKr/emcore-js';
import BodyText from '../../../components/Typography/Body';
import SubTitle from '../../../components/Typography/SubTitle';
import SearchBox from '../../../components/DataEntry/SearchBox';
import useInput from '../../../hooks/useInput.tsx';
import { useEffect, useState } from 'react';
import OrganizationItem from './OrganizationItem';
import useBoardStore from '../../../store/board';
import { scrollHeight } from '../style.ts';
import SortButton from '../../../components/DataEntry/SortButton';

const OrganizationList = () => {
  const { getOrganizationList, organizationList } = useBoardStore();
  const [orgaList, setOrgaList] = useState<{ id: string; name: string; fullAddress: string }[]>([]);
  const [searchInput, onChangeSearchInput, setSearchInput] = useInput('');
  const [sort, setSort] = useState<'asc' | 'desc' | 'reset'>('reset');

  useEffect(() => {
    getOrganizationList();
  }, []);
  useEffect(() => {
    setOrgaList(organizationList.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)));
  }, [organizationList]);
  // 조직 목록 검색어, 정렬 필터
  useEffect(() => {
    let searchedList = [...organizationList];
    if (searchInput.length > 0) {
      searchedList = [...searchedList].filter((item) => item.name.toLowerCase().includes(searchInput.toLowerCase()));
    }
    if (sort === 'reset') {
      searchedList = [...searchedList];
    } else if (sort === 'asc') {
      searchedList = [...searchedList].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    } else {
      searchedList = [...searchedList].sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0));
    }

    setOrgaList(searchedList);
  }, [organizationList, searchInput, sort]);

  return (
    <Flex direction={'column'} alignSelf={'stretch'}>
      <Flex align={'center'} padding={'20px 24px 12px 24px'} alignSelf={'stretch'} gap={'8px'}>
        <Headline level={4}>조직을 선택해주세요.</Headline>
      </Flex>
      <Flex
        align={'center'}
        alignSelf={'stretch'}
        padding={'9px 24px'}
        gap={'6px'}
        style={{ backgroundColor: black10, borderTop: '1px solid #d9d9d9' }}>
        <BodyText level={2} color={black600}>
          조직 목록
        </BodyText>
        <SubTitle level={2} color={blue500}>
          {orgaList.length}
        </SubTitle>
      </Flex>
      <Flex align={'center'} padding={'8px 20px 8px 12px'} gap={'12px'} alignSelf={'stretch'}>
        <SearchBox
          placeholder={'조직명 검색'}
          clear
          value={searchInput}
          setValue={setSearchInput}
          onChange={onChangeSearchInput}
          extend={false}
        />
        <SortButton
          sort={sort}
          onClick={() => setSort((state) => (state === 'reset' ? 'asc' : state === 'asc' ? 'desc' : 'reset'))}>
          가나다순
        </SortButton>
      </Flex>
      <div css={scrollHeight('calc(100vh - 68px - 68px - 37px - 55px)')}>
        <Flex direction={'column'} alignSelf={'stretch'}>
          {orgaList.map((item) => (
            <>
              <OrganizationItem key={item.id} item={item} />
            </>
          ))}
        </Flex>
      </div>
    </Flex>
  );
};
export default OrganizationList;
