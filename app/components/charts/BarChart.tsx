import { Axis, BarSeries, Chart, DARK_THEME, Position, ScaleType, Settings } from "@elastic/charts";
import "@elastic/charts/dist/theme_dark.css";
import { EuiLoadingSpinner } from "@elastic/eui";
import { useEffect, useState } from "react";

const handleFetcher = async({ index, startDate, endDate, attribute, setData, dataType, filters}) => {
  await fetch('/api/histogram', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      index: index,
      field: attribute,
      startDate: startDate,
      endDate: endDate,
      dataType: dataType,
      filters: filters
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
export const BarChart = ({startDate, endDate, attribute, index, title, dataType, filters, setFilters} : any) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleFetcher({ index, startDate, endDate, attribute, setData, dataType, filters});
    setIsLoading(false);
  }, [startDate, endDate, index, dataType, filters]);
  let xScale = ScaleType.Ordinal;

  if (attribute.includes('.keyword')) {
    xScale = ScaleType.Ordinal
  }

  const onClickHandler = (e : any) => {
    let value;
    if (attribute.includes('.keyword')) {
      value = String(e[0][0]['x']);
    }

    value = e[0][0]['x'];
    let attributeFilter = { "term" : { [attribute] : value} };
    let filter = {
      "active" : true, 
      "filter" : attributeFilter,
      "remove" : false
    };

    setFilters([...filters, filter]);
  }
  
  let chart = (
    <Chart title={title} size={{height: 300}}>
          <Settings baseTheme={DARK_THEME} onElementClick={onClickHandler}/>
          <Axis id="bottom" position={Position.Bottom} title={attribute} showOverlappingTicks />
          <Axis id="left2" title="count" position={Position.Left} tickFormat={(d: any) => Number(d).toFixed(2)} />
          <BarSeries
            id="count"
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