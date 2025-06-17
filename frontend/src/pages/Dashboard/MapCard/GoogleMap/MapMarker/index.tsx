/** @jsxImportSource @emotion/react */
import { MapItemType } from '../../../../../store/dashboard/type.ts';
import { css } from '@emotion/react';
import { black0, black100, black500, blue300, blue500, red500 } from '@myThingsKr/emcore-js';
import SubTitle from '../../../../../components/Typography/SubTitle';
import { useDashboardStore } from '../../../../../store/dashboard';
import Flex from '../../../../../components/Layout/Flex';
import { HTMLAttributes, useEffect, useState } from 'react';
import SvgIcoArrowFilledDown16 from '../../../../../assets/icon/IcoArrowFilledDown16.tsx';
import SvgIcoArrowFilledUp16 from '../../../../../assets/icon/IcoArrowFilledUp16.tsx';

const MapMarker = ({ data }: { data: MapItemType } & HTMLAttributes<HTMLDivElement>) => {
  const { mainDataCategory, mapCharFilter } = useDashboardStore();

  const [mainData, setMainData] = useState<number>(0);

  useEffect(() => {
    if (data[mainDataCategory] === null) return;
    switch (mapCharFilter.main) {
      case 'percent':
        setMainData(data[mainDataCategory].percent);
        break;
      case 'wow_percent':
        setMainData(data[mainDataCategory].wow_percent);
        break;
      default:
        setMainData(0);
        break;
    }
  }, [data, mainDataCategory, mapCharFilter]);

  if (data[mainDataCategory] === null) return <></>;
  else {
    return (
      <div css={markerWrap}>
        <SubTitle level={3}>{data.title}</SubTitle>
        <Flex justify={'center'} align={'center'} gap={'2px'}>
          <Flex justify={'center'} align={'center'}>
            {mapCharFilter.main === 'wow_percent' &&
              (Math.sign(mainData) === -1 ? (
                <SvgIcoArrowFilledDown16 color={blue500} width={16} height={16} />
              ) : (
                <SvgIcoArrowFilledUp16 color={red500} width={16} height={16} />
              ))}
            <SubTitle level={3} color={Math.sign(mainData) === -1 ? blue500 : red500}>
              {Math.abs(mainData).toLocaleString()}%
            </SubTitle>
          </Flex>

          <SubTitle level={4} color={black500}>
            {data[mainDataCategory].amount.toLocaleString()}
            {data[mainDataCategory].unit}
          </SubTitle>
        </Flex>
      </div>
    );
  }
};

export default MapMarker;

const markerWrap = css`
  position: relative;
  border: 1px solid ${black100};
  border-radius: 6px;
  background-color: ${black0};
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

  display: flex;
  padding: 6px 8px;
  justify-content: center;
  align-items: center;
  gap: 6px;

  &:hover {
    border-width: 2px;
    border-color: ${blue300};
  }
`;
