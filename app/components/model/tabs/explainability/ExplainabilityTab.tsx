import React, { useEffect, useState } from 'react';
import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiEmptyPrompt,
  EuiFlexItem,
  EuiLoadingLogo,
  EuiSpacer,
} from '@elastic/eui';
import "@elastic/charts/dist/theme_dark.css";
import { Axis, BarSeries, Chart, DARK_THEME, Position, ScaleType, Settings } from '@elastic/charts';

type Parameters = {
  field: string;
  data: number;
};


const handleFetcher = async (setData : any, modelName : string) => {
    let tempData: Parameters[] = [];
    const result = await fetch('/api/getExplainability', {
        method: 'POST',
        body: JSON.stringify({
            modelName       : modelName,
        })
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data["explainability"].forEach(element => {
        tempData.push({
          field         : element["field"],
          data          : Number(element["data"]),
        });
      })
      return true;
    })
    .catch((error) => {
        console.log("Error fetching model table", error);
        return error;
    })
    setData(tempData);
    return result
};


export const ExplainabilityTab = (modelName) => {
    const [data, setData] = useState<Array<Parameters>>([]);

    const [isLoading, setIsLoading] = useState(true);

  // Query API
  useEffect(() => {
    setIsLoading(true);
    handleFetcher(setData, modelName)
    .then(() => {
      setIsLoading(false);
    })
  }, []);

  const columns: Array<EuiBasicTableColumn<Parameters>> = [
    {
      field: 'field',
      name: 'Feature Importance',
      mobileOptions: {
        render: (features: Parameters) => (
          <span>
            {features.field}
          </span>
        ),
        header: false,
        truncateText: false,
        enlarge: true,
        width: '100%',
      },
    },
    {
        field: 'data',
        name: '',
      },
  ];

    let graph = (
    <EuiFlexItem>
        <Chart title={"Feature Importance"} description={"The higher its value, the more indicative of a record being an anomaly."} size={{height: 300}} renderer='canvas'>
        <Settings baseTheme={DARK_THEME} rotation={90}/>
        <Axis id="bottom" position={Position.Left} title={"Feaure Importance"} showOverlappingTicks />
        <Axis id="left2" title="SHAP (SHapley Additive exPlanations) values" position={Position.Bottom} tickFormat={(d: any) => Number(d).toFixed(2)} />

        <BarSeries
        id="feature_importance"
        xScaleType={ScaleType.Ordinal}
        yScaleType={ScaleType.Linear}
        xAccessor={"field"}
        yAccessors={["data"]}
        data={data}
        //   minBarHeight={minBarHeight}
        />
    </Chart>
  </EuiFlexItem>
  ) 
  
    let table = (
        <>
        <EuiFlexItem>
        <Chart title={"Feature Importance"} description={"The higher its value, the more indicative of a record being an anomaly."} size={{height: 300}} renderer='canvas'>
        <Settings baseTheme={DARK_THEME} rotation={90}/>
        <Axis id="bottom" position={Position.Left} title={"Feaure Importance"} showOverlappingTicks />
        <Axis id="left2" title="SHAP (SHapley Additive exPlanations) values" position={Position.Bottom} tickFormat={(d: any) => Number(d).toFixed(2)} />

        <BarSeries
        id="feature_importance"
        xScaleType={ScaleType.Ordinal}
        yScaleType={ScaleType.Linear}
        xAccessor={"field"}
        yAccessors={["data"]}
        data={data}
        //   minBarHeight={minBarHeight}
        />
        </Chart>
    </EuiFlexItem>
    <EuiSpacer />
      <EuiBasicTable
        tableCaption="Explainability"
        items={data}
        rowHeader="data"
        columns={columns}
      />
        </>
    )

   let loading = (
    <EuiEmptyPrompt
      icon={<EuiLoadingLogo logo="visTable" size="xl" />}
      title={<h3>Loading Feature Importance</h3>}
    />
  )

  return (
    <>
    {isLoading ? loading : table}
    </>
  );
};
