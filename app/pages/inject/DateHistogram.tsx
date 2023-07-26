import { Axis, BarSeries, BrushAxis, BrushEndListener, Chart, DARK_THEME, HistogramBarSeries, Position, ScaleType, Settings } from "@elastic/charts";
import "@elastic/charts/dist/theme_dark.css";
import { now } from "moment";
import Error from "next/error";
import { useEffect } from "react";


const handleFetcher = async({ index, startDate, endDate }) => {
  if (index === null || startDate === null || endDate === null) {
    throw Error
  }

  await fetch('/api/fetchDateHist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      index: index,
      startDate: startDate,
      endDate: endDate
    })
  })
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.log("Error fetching date histogram", error);
    return error;
  })
}


const DateHistogram = ({startDate, endDate, index, title, dataType, chart_size} : any) => {

  useEffect(() => {
    handleFetcher({ index, startDate, endDate })
    .then((response) => {
      console.log("response", response);
    })
    .catch((error) => {
      console.log("Error fetching hist", error);
    })
    
  }, [startDate, endDate, index]);

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
          title="bottom"
          showOverlappingTicks
          tickFormat={(d: any) => Number(d).toFixed(2)}
        />

        <Axis id="left" title="left" position={Position.Left} tickFormat={(d: any) => Number(d).toFixed(2)} />

      <HistogramBarSeries
        id="bars"
        xScaleType={ScaleType.Time}
        yScaleType={ScaleType.Linear}
        xAccessor="x"
        yAccessors={['y']}
        timeZone="Europe/Rome"
        data={[
          { x: now(), y: 2 },
          { x: now(), y: 7 },
          // { x: now() + moment().add(1, 'days') * 2, y: 3 },
          // { x: now() + moment().add(1, 'days') * 5, y: 6 },
        ]}
      />

    </Chart>
    )
    
}

export default DateHistogram;