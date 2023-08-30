import { Axis, BarSeries, Chart, DARK_THEME, Position, ScaleType, Settings } from "@elastic/charts";
import "@elastic/charts/dist/theme_dark.css";

// TODO: Implement the call to the API for the aggregations
export const ResultChart = (data) => {
    let xScale = ScaleType.Ordinal;
  
    if (data["data"]["field"].includes('.keyword')) {
      xScale = ScaleType.Ordinal
    }
  
    const onClickHandler = (e : any) => {
      let value;
      if (data["data"]["field"].includes('.keyword')) {
        value = String(e[0][0]['x']);
      }
  
    //   setFilters([...filters, filter]);
    }
    
    let chart = (
      <Chart title={data["data"]["field"]} size={{height: 300}}>
            <Settings baseTheme={DARK_THEME} onElementClick={onClickHandler}/>
            <Axis id="bottom" position={Position.Bottom} title={data["data"]["field"]} showOverlappingTicks />
            <Axis id="left2" title="count" position={Position.Left} tickFormat={(d: any) => Number(d).toFixed(2)} />
            <BarSeries
              id="count"
              xScaleType={xScale}
              yScaleType={ScaleType.Linear}
              xAccessor="field"
              yAccessors={['count']}
              splitSeriesAccessors={['_pred']}
              data={data["data"]["value"]}
            />
          </Chart>
    )
  
    return (
      <>
        {chart}
      </>
      )
    }