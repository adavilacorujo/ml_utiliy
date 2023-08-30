import React, { useEffect, useState } from 'react';
import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiEmptyPrompt,
  EuiLoadingLogo,
  EuiSearchBarProps,
} from '@elastic/eui';
import { faker } from '@faker-js/faker';

type Parameters = {
  field: string;
  data: string;
};


const handleFetcher = async (setFeatures : any, modelName : string) => {
    let tempData: Parameters[] = [];
    const result = await fetch('/api/getModelDetails', {
        method: 'POST',
        body: JSON.stringify({
            modelName       : modelName,
        })
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      data["details"].forEach(element => {
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
    setFeatures(tempData);
    return result
};


export const ModelDetails = (modelName) => {
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
      name: 'Algorithm Details',
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
        mobileOptions: {
          render: (features: Parameters) => (
            <span>
              {features.data}
            </span>
          ),
          header: false,
          truncateText: false,
          enlarge: true,
          width: '100%',
        },
      },
  ];

  const search: EuiSearchBarProps = {
    box: {
      incremental: true,
      schema: true,
    },
  };
  
    let table = (
      <EuiBasicTable
        tableCaption="Algorithm Details"
        items={data}
        rowHeader="data"
        columns={columns}
      />
    )

   let loading = (
    <EuiEmptyPrompt
      icon={<EuiLoadingLogo logo="visTable" size="xl" />}
      title={<h3>Loading Details</h3>}
    />
  )

  return (
    <>
    {isLoading ? loading : table}
    </>
  );
};
