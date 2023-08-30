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
import Graphs from './Graphs';

type Parameters = {
  field: string;
  data: number;
};


const handleFetcher = async (setData : any, modelName : string) => {
    let tempData: Parameters[] = [];
    const result = await fetch('/api/getResults', {
        method: 'POST',
        body: JSON.stringify({
            modelName       : modelName,
        })
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data["results"];
    })
    .catch((error) => {
        console.log("Error fetching model table", error);
        return error;
    })

    setData(result);
    return result
};


export const ResultsTab = (modelName) => {
    // Data is a list of big dictionaries. For each field in each dictionary we will render a new graph
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

    let table = (
        <>
        <Graphs data={data}/>
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
