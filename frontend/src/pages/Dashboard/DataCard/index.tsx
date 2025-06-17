/** @jsxImportSource @emotion/react */
import { dataCartDividerStyle, dataWrapStyle } from './style.ts';
import BodyText from '../../../components/Typography/Body';
import Headline from '../../../components/Typography/Headline';
import { black600, black900, blue500, red500 } from '@myThingsKr/emcore-js';
import SvgIcoArrowFilledUp16 from '../../../assets/icon/IcoArrowFilledUp16.tsx';
import Flex from '../../../components/Layout/Flex';
import { dashboardCardWrapStyle } from '../style.ts';
import { useDashboardStore } from '../../../store/dashboard';
import SvgIcoArrowFilledDown16 from '../../../assets/icon/IcoArrowFilledDown16.tsx';

const DashboardSumCard = () => {
  const { accumulate } = useDashboardStore();

  return (
    <div css={dashboardCardWrapStyle('12px 20px')}>
      <Flex align="center" justify="space-between" gap={'12px'}>
        <DashboardData
          title={'전체 누적 탄소 절감량'}
          sum={accumulate.carbon.amount}
          unit={accumulate.carbon.unit}
          yesterday={accumulate.carbon.increase}
        />
        <div css={dataCartDividerStyle} />
        <DashboardData
          title={'전체 누적 재생에너지 생산량 '}
          sum={accumulate.electricity.amount}
          unit={accumulate.electricity.unit}
          yesterday={accumulate.electricity.increase}
        />
        <div css={dataCartDividerStyle} />
        <DashboardData
          title={'전체 누적 정수량'}
          sum={accumulate.water.amount}
          unit={accumulate.water.unit}
          yesterday={accumulate.water.increase}
        />
      </Flex>
    </div>
  );
};

export default DashboardSumCard;

type DashboardDataProps = {
  title: string;
  sum?: number;
  unit?: string;
  yesterday?: number;
};

const DashboardData = ({ title = '', sum = 0, unit = '', yesterday = 0 }: DashboardDataProps) => {
  return (
    <div css={dataWrapStyle}>
      <BodyText level={2} color={black600}>
        {title}
      </BodyText>

      <Flex align={'flex-end'} gap={'12px'}>
        <Headline level={4} color={black900}>
          {sum ? sum.toLocaleString() : '-'}
          &nbsp;
          {unit}
        </Headline>

        <Flex align={'flex-end'} gap={'4px'}>
          <BodyText level={2} color={black600}>
            어제보다
          </BodyText>

          <Flex align={'center'}>
            {Math.sign(yesterday) === -1 ? (
              <SvgIcoArrowFilledDown16 color={blue500} width={16} height={16} />
            ) : (
              <SvgIcoArrowFilledUp16 color={red500} width={16} height={16} />
            )}
            <BodyText level={2} color={Math.sign(yesterday) === -1 ? blue500 : red500}>
              {Math.abs(yesterday).toLocaleString()}
            </BodyText>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};
