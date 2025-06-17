import { black700 } from '@myThingsKr/emcore-js';

const ChartAxisTick = (props: any) => {
  const { x, y, payload, yAxis } = props;
  if (yAxis) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          y={4}
          x={0}
          fill={black700}
          textAnchor="end"
          style={{ fontSize: '12px', fontWeight: '400', textAlign: 'right', textAnchor: 'end' }}>
          {payload.value}
        </text>
      </g>
    );
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={20}
        textAnchor="middle"
        fill={black700}
        fontSize={'inherit'}
        style={{ fontSize: '12px', fontWeight: '400' }}>
        {payload.value}
      </text>
    </g>
  );
};
export default ChartAxisTick;
