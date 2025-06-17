/** @jsxImportSource @emotion/react */
import { renderCategoryText } from '../../renderCategoryText.ts';
import { DataCategoryType } from '../../../../../../type';
import { shadow, stickyColumn, tableWrap } from './style.ts';
import { SiteDrawerAnalysisType } from '../../../../../../store/dashboard/type.ts';
import BodyText from '../../../../../../components/Typography/Body';
import { black700, blue500, red500 } from '@myThingsKr/emcore-js';

const ColumnStickyTable = ({
  dataCategory,
  data,
}: {
  dataCategory: DataCategoryType;
  data: SiteDrawerAnalysisType;
}) => {
  return (
    <div css={tableWrap}>
      <div css={shadow}>
        <div />
        <div />
      </div>
      <table>
        <thead>
          <tr>
            <th css={stickyColumn(true)}>
              <BodyText level={3} color={black700}>
                구분
              </BodyText>
            </th>
            {data.period.map((col, index) => (
              <th key={index}>
                <BodyText level={3} color={black700}>
                  {col}
                </BodyText>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td css={stickyColumn(false)}>
              <BodyText level={3} color={black700}>
                {renderCategoryText(dataCategory)}량
              </BodyText>
            </td>
            {data.amount.map((item, index) => (
              <td key={index}>
                {' '}
                <BodyText level={3} color={black700}>
                  {item.toLocaleString()}
                </BodyText>
              </td>
            ))}
          </tr>
          <tr>
            <td css={stickyColumn(false)}>
              <BodyText level={3} color={black700}>
                누적 {renderCategoryText(dataCategory)}량
              </BodyText>
            </td>
            {data.accumulate.map((item, index) => (
              <td key={index}>
                <BodyText level={3} color={black700}>
                  {item.toLocaleString()}
                </BodyText>
              </td>
            ))}
          </tr>
          <tr>
            <td css={stickyColumn(true)}>
              <BodyText level={3} color={black700}>
                성장률
              </BodyText>
            </td>
            {data.growth_rate.map((item, index) => (
              <td key={index}>
                <BodyText level={3} color={Math.sign(item) === -1 ? blue500 : red500}>
                  {item}%
                </BodyText>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ColumnStickyTable;
