/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import SubTitle from '../../../../../components/Typography/SubTitle';
import { black0, black100, black700, blue500, green500, mandarin500 } from '@myThingsKr/emcore-js';
import Flex from '../../../../../components/Layout/Flex';
import Caption from '../../../../../components/Typography/Caption.tsx';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { TooltipProps } from 'recharts';

const ChartTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  const dataKeyToColor = (key: string | number | undefined) => {
    switch (key) {
      case 'carbon':
        return green500;
      case 'water':
        return blue500;
      case 'electricity':
        return mandarin500;
      default:
        return green500;
    }
  };
  if (active && payload && payload.length) {
    return (
      <div css={tooltipWrap}>
        <SubTitle level={4} color={black700}>
          {label}
        </SubTitle>
        {payload.map((item) => (
          <Flex key={item.dataKey} align={'center'} gap={'6px'} alignSelf={'stretch'}>
            <span css={circle(dataKeyToColor(item.dataKey))} />
            <Caption color={black700}>{item.name}</Caption>
            <SubTitle level={3} color={dataKeyToColor(item.dataKey)}>
              {item.value} {item.unit}
            </SubTitle>
          </Flex>
        ))}
      </div>
    );
  }
  return null;
};

export default ChartTooltip;

const tooltipWrap = css`
  display: inline-flex;
  padding: 8px 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;

  border-radius: 8px;
  border: 1px solid ${black100};
  background: ${black0};
`;

const circle = (color: string) => css`
  display: flex;
  width: 6px;
  height: 6px;
  background-color: ${color};
  border-radius: 50%;
`;
