/** @jsxImportSource @emotion/react */

import useOrganizationStore from '../../../../store/organization';
import { backgroundColor } from '../../style.ts';
import { black10, black500, black600, Button } from '@myThingsKr/emcore-js';
import Flex from '../../../../components/Layout/Flex';
import BodyText from '../../../../components/Typography/Body';
import SubTitle from '../../../../components/Typography/SubTitle';
import InfoEditPopup from './EditPopup';
import { useEffect, useState } from 'react';

const OrganizationInfo = () => {
  const { organizationInfo, infoSaveError } = useOrganizationStore();
  const [editOpen, setEditOpen] = useState<boolean>(false);

  useEffect(() => {
    if (infoSaveError) setEditOpen(false);
  }, [infoSaveError]);

  return (
    <>
      <div css={backgroundColor(black10)}>
        <Flex justify={'space-between'} align={'center'} alignSelf={'stretch'} padding={'4px 40px'}>
          <BodyText level={2} color={black600}>
            기본 정보
          </BodyText>
          {organizationInfo.id !== '' && (
            <Button variant={'text'} onClick={() => setEditOpen(true)}>
              정보 수정
            </Button>
          )}
        </Flex>
      </div>
      <Flex direction={'column'} alignSelf={'stretch'} padding={'0px 24px 20px 24px'}>
        <Flex alignSelf={'stretch'}>
          <Flex width={'200px'} padding={'20px 16px'} align={'center'} gap={'10px'}>
            <SubTitle level={1} color={black500}>
              조직명
            </SubTitle>
          </Flex>
          <Flex padding={'20px 16px'} align={'center'} gap={'32px'}>
            <Flex align={'center'} gap={'8px'}>
              {/*<SubTitle level={1} color={black500}>*/}
              {/*  국문*/}
              {/*</SubTitle>*/}
              <SubTitle level={2}>{organizationInfo.name}</SubTitle>
            </Flex>
            {/*<Flex align={'center'} gap={'8px'}>*/}
            {/*  <SubTitle level={1} color={black500}>*/}
            {/*    영문*/}
            {/*  </SubTitle>*/}
            {/*  <SubTitle level={1}>{organizationInfo.subName}</SubTitle>*/}
            {/*</Flex>*/}
          </Flex>
        </Flex>
        <Flex alignSelf={'stretch'}>
          <Flex width={'200px'} padding={'20px 16px'} align={'center'} gap={'10px'}>
            <SubTitle level={1} color={black500}>
              사업자등록번호
            </SubTitle>
          </Flex>
          <Flex padding={'20px 16px'} align={'center'} gap={'10px'}>
            <SubTitle level={2}>{organizationInfo.businessNumber}</SubTitle>
          </Flex>
        </Flex>
        <Flex alignSelf={'stretch'}>
          <Flex width={'200px'} padding={'20px 16px'} align={'center'} gap={'10px'}>
            <SubTitle level={1} color={black500}>
              주소
            </SubTitle>
          </Flex>
          <Flex padding={'20px 16px'} align={'center'} gap={'10px'}>
            <SubTitle level={2}>
              {organizationInfo.address} {organizationInfo.addressDetail}
            </SubTitle>
          </Flex>
        </Flex>
      </Flex>

      <InfoEditPopup isOpen={editOpen} onClose={() => setEditOpen(false)} />
    </>
  );
};

export default OrganizationInfo;
