/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import useOrganizationStore from '../../store/organization';
import Flex from '../../components/Layout/Flex';
import Headline from '../../components/Typography/Headline';
import BodyText from '../../components/Typography/Body';
import { black0, black700 } from '@myThingsKr/emcore-js';
import { backgroundColor, orgaLogoWrap } from './style.ts';
import { Tab } from '../../components/Tab';
import OrganizationContent from './OrganizationContent';
import MemberContent from './MemberContent';
import SvgProfile from '../../assets/icon/Profile.tsx';

const Organization = () => {
  const {
    getOrganization,
    infoSaveSuccess,
    organizationInfo,
    departmentSaveSuccess,
    departmentDeleteSuccess,
    siteSaveSuccess,
    siteDeleteSuccess,
  } = useOrganizationStore();
  const [currentTab, setCurrentTab] = useState<'organization' | 'member'>('organization');

  useEffect(() => {
    getOrganization();
  }, [currentTab]);

  // 정보 수정 완료 후 목록 갱신
  useEffect(() => {
    if (infoSaveSuccess || departmentSaveSuccess || departmentDeleteSuccess || siteSaveSuccess || siteDeleteSuccess)
      getOrganization();
  }, [infoSaveSuccess, departmentSaveSuccess, departmentDeleteSuccess, siteSaveSuccess, siteDeleteSuccess]);

  return (
    <div css={backgroundColor(black0)}>
      <Flex align={'center'} alignSelf={'stretch'} padding={'40px 0px 20px 40px'} gap={'20px'}>
        <div css={orgaLogoWrap}>
          {organizationInfo.imageUrl ? <img src={organizationInfo.imageUrl} alt="logo" /> : <SvgProfile />}
        </div>
        <Flex direction={'column'}>
          <Headline level={3}>{organizationInfo.name}</Headline>
          <BodyText level={2} color={black700}>
            {organizationInfo.address} {organizationInfo.addressDetail}
          </BodyText>
        </Flex>
      </Flex>
      <Tab type={'underline'} padding={'20px 40px 0'}>
        <Tab.Button active={currentTab === 'organization'} onClick={() => setCurrentTab('organization')}>
          조직
        </Tab.Button>
        <Tab.Button active={currentTab === 'member'} onClick={() => setCurrentTab('member')}>
          구성원
        </Tab.Button>
      </Tab>
      {currentTab === 'organization' ? <OrganizationContent /> : <MemberContent />}
    </div>
  );
};

export default Organization;
