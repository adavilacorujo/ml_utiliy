import React, { } from 'react';
import {
  EuiTitle,
  EuiFlexItem,
  EuiPanel,
} from '@elastic/eui';
import {faker} from '@faker-js/faker'

// import { ThemeContext } from '../../components';
import { Chart, Settings, Partition, LIGHT_THEME, PartitionLayout } from '@elastic/charts';

type dataPie = {
  port: number;
  count: number;
}

const data: dataPie[] =[]

for (let i = 1; i < 6; i++){
  data.push({
    port: faker.internet.port(),
    count: faker.number.int(),
  })
}

export const PieChart = () => {
  const euiChartTheme = LIGHT_THEME;


  return (
    <>
      <EuiFlexItem>
        <EuiPanel>
          {/* <EuiTitle size="xs">
            <h4>{props.prev_stuff.title}</h4>
          </EuiTitle> */}
          <Chart size={{ height: 250 }}>
            <Settings
              onElementClick={(indata) => {
                // props.onElementClick(indata)
              }}
            />
            <Partition
              id={"Port Count"}
              data={data}
              layout={PartitionLayout.sunburst}
              valueFormatter={() => ''}
              valueAccessor={data => Number(data.count)}
              layers={[
                {
                  groupByRollup: data => String(data.port),
                  // shape: {
                  //   fillColor: data => euiChartTheme.colors.vizColors[data.sortIndex],
                  // },
                },
              ]}
              // emptySizeRatio={0.4}
              // circlePadding={4}

              clockwiseSectors={false}
            />
          </Chart>
        </EuiPanel>
      </EuiFlexItem>
    </>

  );
};