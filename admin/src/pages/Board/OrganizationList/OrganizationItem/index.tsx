/** @jsxImportSource @emotion/react */

import useBoardStore from '../../../../store/board';
import { css } from '@emotion/react';
import Flex from '../../../../components/Layout/Flex';
import Headline from '../../../../components/Typography/Headline';
import BodyText from '../../../../components/Typography/Body';
import { black0, black50, black500, black700, blue100, blue50 } from '@myThingsKr/emcore-js';
import SvgIcoArrowSingleRight20 from '../../../../assets/icon/IcoArrowSingleRight20.tsx';

type OrganizationItemProps = {
  item: { id: string; name: string; fullAddress: string };
};

const OrganizationItem = ({ item }: OrganizationItemProps) => {
  // 스토어에서 선택한 조직 id 가져오기
  const { selectedOrgaId, setSelectedOrgaId } = useBoardStore();
  return (
    <div css={itemStyle(item.id === selectedOrgaId)} onClick={() => setSelectedOrgaId(item.id)}>
      <Flex direction={'column'} gap={'4px'}>
        <Headline level={6}>{item.name}</Headline>
        <BodyText level={3} color={black700}>
          {item.fullAddress}
        </BodyText>
      </Flex>
      <Flex>
        <SvgIcoArrowSingleRight20 width={20} color={black500} />
      </Flex>
    </div>
  );
};
export default OrganizationItem;

const itemStyle = (active: boolean) => css`
  display: flex;
  justify-content: space-between;
  align-self: stretch;
  padding: 12px 24px;
  background-color: ${active ? blue100 : black0};
  border-bottom: 1px solid ${black50};
  cursor: pointer;
  &:hover {
    background-color: ${blue50};
  }
`;
