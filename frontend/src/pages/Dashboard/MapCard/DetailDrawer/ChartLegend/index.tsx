/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Caption from '../../../../../components/Typography/Caption.tsx';
import { black700, green500 } from '@myThingsKr/emcore-js';
import Flex from '../../../../../components/Layout/Flex';
import { LegendProps } from 'recharts';

type Props = LegendProps;

const ChartLegend = (props: Props) => {
  const { payload } = props;
  if (payload) {
    return (
      <ul css={ul}>
        {payload.map((item, index) => (
          <li key={`item-${index}`}>
            <Flex padding={'4px 8px'} align={'center'} gap={'8px'}>
              <span css={dot(item.color || green500)} />
              <Caption color={black700}>{item.value}</Caption>
            </Flex>
          </li>
        ))}
      </ul>
    );
  }
};

export default ChartLegend;

const ul = css`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  margin-left: -20px;
  margin-top: 20px;
`;
const dot = (color: string) => css`
  display: flex;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${color};
`;
