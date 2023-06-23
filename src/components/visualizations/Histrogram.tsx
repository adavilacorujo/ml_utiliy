import React from 'react';
import {
  EuiTitle,
  EuiFlexItem,
  EuiPanel,
  EuiFlexGroup,
} from '@elastic/eui';
import {faker} from '@faker-js/faker'

// import { ThemeContext } from '../../components';
import { Chart, Axis, Settings, BarSeries, ScaleType } from '@elastic/charts';

type User = {
  date: string;
  count: number;
}

const users: User[] = [];

for (let i = 1; i <= 6; i++){
  users.push({
    date: faker.date.anytime().toString(),
    count: i*10,
  })
}

export const DateHistogram = () => {
  let titleAlt;
  titleAlt = 'Hits: 6'
  // if (props.prev_stuff.title == 'Hits') {
  //   let count = 0;
  //   for (let data of props.raw_data) {
  //     count += data.doc_count
  //   }
  //   titleAlt = 'Total Hits ' + count;
  // }

  return (
    <>
    <EuiFlexGroup direction ='column' justifyContent='spaceAround'  alignItems='center'>
    <EuiFlexItem>
        <EuiPanel>
          <EuiTitle size="xs">
            <h4>{titleAlt}</h4>
          </EuiTitle>
          <Chart size={{ height: 300 }}>
            <Settings
              showLegend
              showLegendExtra
              onElementClick={(indata) => {
                // props.onElementClick(indata)
              }}
            />
            <BarSeries
              id = "Timeline1"
              name = "Timeline"
              data = {users}
              xAccessor="date"
              yAccessors={["count"]}
              xScaleType={ScaleType.Ordinal}
              yScaleType={ScaleType.Linear}
            />
            <Axis
              id="bottom-axis"
              position={"bottom"}
            //   showGridLines={false}
              title = {"Time"}
            />
            <Axis
              id="left-axis"
              position={"left"}
              title="count"
            //   showGridLines={true}
            />
          </Chart>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
    </>

  );
};