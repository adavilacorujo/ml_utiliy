import React, { useEffect, useState } from 'react';
import {
  EuiBasicTableColumn,
  EuiEmptyPrompt,
  EuiLoadingLogo,
  EuiInMemoryTable,
  EuiSearchBarProps,
} from '@elastic/eui';

type Features = {
  field: string;
  data: string;
};

const handleFetcher = async (setFeatures : any, modelName : string) => {
    let tempData: Features[] = [];
    const result = await fetch('/api/getFeatures', {
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
    setFeatures(tempData);
    return result
};


export const FeaturesTab = (modelName) => {
    const [data, setData] = useState<Array<Features>>([]);

    const [isLoading, setIsLoading] = useState(true);

  // Query API
  useEffect(() => {
    setIsLoading(true);
    handleFetcher(setData, modelName)
    .then(() => {
      setIsLoading(false);
    })
  }, []);

  const columns: Array<EuiBasicTableColumn<Features>> = [
    {
      field: 'field',
      name: 'Model',
      mobileOptions: {
        render: (features: Features) => (
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
          render: (features: Features) => (
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
        <EuiInMemoryTable
        tableCaption="Feature Array"
        items={data}
        columns={columns}
        search={search}
        pagination={true}
        sorting={true}
        />
    )

   let loading = (
    <EuiEmptyPrompt
      icon={<EuiLoadingLogo logo="visTable" size="xl" />}
      title={<h3>Loading Features</h3>}
    />
  )

  return (
    <>
    {isLoading ? loading : table}
    </>
  );
};
