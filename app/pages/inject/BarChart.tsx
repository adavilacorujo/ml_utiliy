import { Axis, BarSeries, Chart, DARK_THEME, Position, ScaleType, Settings } from "@elastic/charts";
import "@elastic/charts/dist/theme_dark.css";
import { EuiLoadingSpinner } from "@elastic/eui";
import { useEffect, useState } from "react";

const handleFetcher = async({ index, startDate, endDate, attribute, setData}) => {
  await fetch('/api/histogram', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      index: index,
      field: attribute,
      startDate: startDate,
      endDate: endDate
    })
  })
  .then(response => response.json())
  .then((data) => {
    setData(data.hist.aggregations.fields.buckets);
    return data;
  })
  .catch((error) => {
    console.log("Error fetching date histogram", error);
    return error;
  })
}

// TODO: Implement the call to the API for the aggregations
export default ({startDate, endDate, attribute, index, title} : any) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleFetcher({ index, startDate, endDate, attribute, setData});
    setIsLoading(false);
  }, [startDate, endDate, index]);
  let xScale = ScaleType.Ordinal;

  if (attribute.includes('.keyword')) {
    xScale = ScaleType.Ordinal
  }

  let chart = (
    <Chart title={title} size={{height: 300}}>
          <Settings baseTheme={DARK_THEME} />
          <Axis id="bottom" position={Position.Bottom} title="Bottom axis" showOverlappingTicks />
          <Axis id="left2" title="Left axis" position={Position.Left} tickFormat={(d: any) => Number(d).toFixed(2)} />
          <BarSeries
            id="bars"
            xScaleType={xScale}
            yScaleType={ScaleType.Linear}
            xAccessor="key"
            yAccessors={['doc_count']}
            data={data}
          />
        </Chart>
  )

  let loading = (
    <EuiLoadingSpinner size="xxl"/>
  )
  return (
    <>
      {isLoading ? loading : chart}
    </>
    )
  }