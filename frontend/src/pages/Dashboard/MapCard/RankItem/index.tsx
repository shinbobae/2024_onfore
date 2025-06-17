/** @jsxImportSource @emotion/react */
import Flex from '../../../../components/Layout/Flex';
import Headline from '../../../../components/Typography/Headline';
import { black600, black900, blue500, red500 } from '@myThingsKr/emcore-js';
import SubTitle from '../../../../components/Typography/SubTitle';
import BodyText from '../../../../components/Typography/Body';
import SvgIcoArrowFilledUp16 from '../../../../assets/icon/IcoArrowFilledUp16.tsx';
import SvgIcoArrowFilledDown16 from '../../../../assets/icon/IcoArrowFilledDown16.tsx';
import { HTMLAttributes } from 'react';

export type RankProps = {
  id: string;
  rank: number;
  title: string;
  sum: number;
  unit: string;
  yesterday: number;
};

const RankItem = ({
  item,
  index,
  onClick,
}: { item: RankProps; index: number; onClick?: () => void } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <Flex
      padding={'8px 8px 8px 0'}
      justify={'space-between'}
      onClick={onClick && onClick}
      style={onClick && { cursor: 'pointer' }}>
      <Flex align={'center'} gap={'8px'}>
        <SubTitle level={2} color={index === 0 ? blue500 : black600}>
          <span style={{ padding: '0 12px' }}>{item.rank}</span>
        </SubTitle>
        <Headline level={6} color={index === 0 ? blue500 : black900}>
          {item.title}
        </Headline>
      </Flex>

      <Flex direction={'column'} justify={'center'} align={'flex-end'} gap={'4px'}>
        <Flex align={'center'} gap={'4px'}>
          <SubTitle level={1} color={index === 0 ? blue500 : black900}>
            {item.sum.toLocaleString()}
          </SubTitle>
          <BodyText level={3} color={black600}>
            {item.unit}
          </BodyText>
        </Flex>
        <Flex justify={'center'} align={'center'} gap={'4px'}>
          <BodyText level={3} color={black600}>
            어제보다
          </BodyText>
          <SubTitle level={2} color={Math.sign(item.yesterday) === -1 ? blue500 : red500}>
            <Flex justify={'center'} align={'center'}>
              {Math.sign(item.yesterday) === -1 ? (
                <SvgIcoArrowFilledDown16 color={blue500} width={16} height={16} />
              ) : (
                <SvgIcoArrowFilledUp16 color={red500} width={16} height={16} />
              )}
              {Math.abs(item.yesterday).toLocaleString()}
            </Flex>
          </SubTitle>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RankItem;
