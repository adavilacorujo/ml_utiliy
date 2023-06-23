import React, { } from 'react';
import {
  EuiTitle,
  EuiFlexItem,
  EuiPanel,
  EuiFlexGroup,
} from '@elastic/eui';
import {faker} from '@faker-js/faker'

// import { ThemeContext } from '../../components';
import { Chart, Settings, Partition, LIGHT_THEME, PartitionLayout, Datum, defaultPartitionValueFormatter } from '@elastic/charts';

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
console.log(data)

  function indexInterpolatedFillColor(arg0: any) {
    throw new Error('Function not implemented.');
  }

  return (
    <>
    <EuiFlexGroup direction='column' justifyContent='spaceAround'   alignItems='center'>
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
              // valueFormatter={() => ''}
              valueAccessor={(d: number) => Number(d.count)}
              valueFormatter={(d: number) => `$${defaultPartitionValueFormatter(Math.round(d / 1000000000))}\u00A0Bn`}
              layers={[
                {
                  groupByRollup: (d: Datum) => d.sitc1,
                  nodeLabel: (d: Datum) => d.port,
                  shape: {
                    fillColor: data => euiChartTheme.colors.vizColors['port'],
                  },
                },
              ]}
              // emptySizeRatio={0.4}
              // circlePadding={4}

              clockwiseSectors={false}
            />
          </Chart>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
    </>

  );
};