import { Axis, BrushEndListener, Chart, DARK_THEME, HistogramBarSeries, Position, ScaleType, Settings } from "@elastic/charts";
import "@elastic/charts/dist/theme_dark.css";
import { now } from "moment";
import Error from "next/error";
import { useEffect, useState } from "react";


const handleFetcher = async({ index, startDate, endDate, dataType }) => {
  if (index === null || startDate === null || endDate === null) {
    throw Error
  }

  let data_r;

  await fetch('/api/fetchDateHist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      index: index,
      startDate: startDate,
      endDate: endDate,
      dataType: dataType
    })
  })
  .then(response => response.json())
  .then(data => data_r = data)
  .catch((error) => {
    console.log("Error fetching date histogram", error);
    return error;
  })

  return data_r;
}


const DateHistogram = ({startDate, endDate, index, title, dataType, chart_size} : any) => {

  const [data, setData] = useState([
            {"from_as_string": "no data", "key": 0}
          ]);

  useEffect(() => {
    handleFetcher({ index, startDate, endDate, dataType})
    .then((response) => {
      setData(response.hist.aggregations.range.buckets);
    })
    .catch((error) => {
      console.log("Error fetching hist", error);
    })
    
  }, [startDate, endDate, index, dataType]);

  const brushEndListener: BrushEndListener = ({ x }) => {
    console.log('Listener', x);
  };

    return (
      <Chart title={title} description={'description'} size={chart_size}>
      <Settings
        baseTheme={DARK_THEME}
        onBrushEnd={brushEndListener}
        allowBrushingLastHistogramBin={true}
        />

        <Axis
          id="bottom"
          position={Position.Bottom}
          title=""
          showOverlappingTicks
          tickFormat={(d: any) => d}
        />

        <Axis id="left" title="count" position={Position.Left} tickFormat={(d: any) => Number(d).toFixed(2)} />

      <HistogramBarSeries
        id="bars"
        xScaleType={ScaleType.Time}
        yScaleType={ScaleType.Linear}
        xAccessor="key"
        yAccessors={['doc_count']}
        data={data}
      />

    </Chart>
    )
    
}

export default DateHistogram;