import React, { useEffect, useState } from 'react';
import {
  formatDate,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableFieldDataColumnType,
  EuiLink,
  EuiHealth,
  EuiEmptyPrompt,
  EuiLoadingLogo,
} from '@elastic/eui';
import { faker } from '@faker-js/faker';

type Summary = {
  field: string;
  data: string;
};

const handleFetcher = async (setData : any, modelName : string) => {
    let tempData: Summary[] = [];
    const result = await fetch('/api/getSummary', {
        method: 'POST',
        body: JSON.stringify({
            modelName       : modelName,
        })
    })
    .then(response => response.json())
    .then((data) => {
      data["models"].forEach(element => {
        tempData.push({
          field         : element["field"],
          data          : element["data"],
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


export const SummaryTab = (modelName) => {
    const [data, setData] = useState<Array<Summary>>([]);

    const [isLoading, setIsLoading] = useState(true);

  // Query API
  useEffect(() => {
    setIsLoading(true);
    handleFetcher(setData, modelName)
    .then(() => {
      setIsLoading(false);
    })
  }, []);

  const columns: Array<EuiBasicTableColumn<Summary>> = [
    {
      field: 'field',
      name: 'Model',
      mobileOptions: {
        render: (model: Summary) => (
          <span>
            {model.field}
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
        mobileOptions: {
          render: (model: Summary) => (
            <span>
              {model.data}
            </span>
          ),
          header: false,
          truncateText: false,
          enlarge: true,
          width: '100%',
        },
      },
  ];

    let table = (
    <EuiBasicTable
      tableCaption="Model Summary"
      items={data}
      rowHeader="data"
      columns={columns}
    />
  )

   let loading = (
    <EuiEmptyPrompt
      icon={<EuiLoadingLogo logo="visTable" size="xl" />}
      title={<h3>Loading Summary</h3>}
    />
  )

  return (
    <>
    {isLoading ? loading : table}
    </>
  );
};
