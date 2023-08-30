import React, { useState, ReactNode, useEffect } from 'react';
import {
  formatDate,
  Comparators,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableSelectionType,
  EuiTableSortingType,
  Criteria,
  EuiButtonIcon,
  EuiDescriptionList,
  EuiScreenReaderOnly,
  EuiEmptyPrompt,
  EuiLoadingLogo,
  EuiIcon,
  EuiLoadingContent,
} from '@elastic/eui';
import router from 'next/router';

type Model = {
  id            : number;
  modelName     : string;
  recordCount   : number;
  startDate     : string;
  endDate       : string;
  index         : string;
  numAttributes : string;
  dateCreated   : string;
  dataType      : string;
  selectable    : boolean;
};

const models: Model[] = [];

const handleFetcher = async (setModels : any) => {
    let tempData: Model[] = [];
    const result = await fetch('/api/getModels', {
        method: 'GET'
    })
    .then(response => response.json())
    .then((data) => {
      data["models"].forEach(element => {
        tempData.push({
          id            : element["id"],
          modelName     : element["model_name"],
          recordCount   : element["record_count"],
          startDate     : element["start_date"],
          endDate       : element["end_date"],
          index         : element["index"],
          numAttributes : element["num_attributes"],
          dateCreated   : element["date_created"],
          dataType      : element["data_type"],
          selectable    : true
        });
      })
      return true;
    })
    .catch((error) => {
        console.log("Error fetching model table", error);
        return error;
    })
    setModels(tempData);
    return result
};


const columns: Array<EuiBasicTableColumn<Model>> = [
  {
    field: 'modelName',
    name: 'Model Name',
    sortable: true,
    truncateText: true,
    mobileOptions: {
      render: (model: Model) => (
        <span>
          {model.modelName}
        </span>
      ),
      header: false,
      truncateText: false,
      enlarge: true,
      width: '100%',
    },
  },
  {
    field: 'index',
    name: 'Index',
    sortable: true,
    truncateText: true,
    mobileOptions: {
      render: (model: Model) => (
        <span>
          {model.index}
        </span>
      ),
      header: false,
      truncateText: false,
      enlarge: true,
      width: '100%',
    },
  },
  {
    field: 'dataType',
    name: 'Data Type',
    sortable: true,
    truncateText: true,
    mobileOptions: {
      render: (model: Model) => (
        <span>
          {model.dataType}
        </span>
      ),
      header: false,
      truncateText: false,
      enlarge: true,
      width: '100%',
    },
  },
  {
    field: 'dateCreated',
    name: 'Date Created',
    sortable: true,
    truncateText: true,
    mobileOptions: {
      render: (model: Model) => (
        <span>
          {model.dateCreated}
        </span>
      ),
      header: false,
      truncateText: false,
      enlarge: true,
      width: '100%',
    },
  },
  {
    field: 'recordCount',
    name: 'Record Count',
    sortable: true,
    truncateText: true,
    mobileOptions: {
      render: (model: Model) => (
        <span>
          {model.recordCount}
        </span>
      ),
      header: false,
      truncateText: false,
      enlarge: true,
      width: '100%',
    },
  },
  {
    name: 'Actions',
    actions: [
      {
        name: 'Visualize',
        description: 'Visualize results',
        type: 'icon',
        icon: 'visualizeApp',
        onClick: (model : Model) => {
          router.push(`/models?router_model=${model.modelName}`)
        },
      },
    ],
  },
];

export const ModelTable = ({refresher}) => {
  /**
   * Expanding rows
   */
  const [refresh, ] = useState(refresher);
  const [isLoading, setIsLoading] = useState(true);

  
  const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState<
    Record<string, ReactNode>
  >({});

  const toggleDetails = (model: Model) => {
    const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };

    if (itemIdToExpandedRowMapValues[model.id]) {
      delete itemIdToExpandedRowMapValues[model.id];
    } else {
      const { id, startDate, endDate, numAttributes } = model;

      const listItems = [
        {
          title: 'ID',
          description: `${id}`,
        },
        {
          title: 'Date Range',
          description: `${startDate}, ${endDate}`,
        },
        {
          title: 'Num Attributes',
          description: `${numAttributes}`,
        },
      ];
      itemIdToExpandedRowMapValues[model.id] = (
        <EuiDescriptionList listItems={listItems} />
      );
    }
    setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
  };

  const columnsWithExpandingRowToggle: Array<EuiBasicTableColumn<Model>> = [
    ...columns,
    {
      align: 'right',
      width: '40px',
      isExpander: true,
      name: (
        <EuiScreenReaderOnly>
          <span>Expand rows</span>
        </EuiScreenReaderOnly>
      ),
      render: (model: Model) => {
        const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };

        return (
          <EuiButtonIcon
            onClick={() => toggleDetails(model)}
            aria-label={
              itemIdToExpandedRowMapValues[model.id] ? 'Collapse' : 'Expand'
            }
            iconType={
              itemIdToExpandedRowMapValues[model.id] ? 'arrowDown' : 'arrowRight'
            }
          />
        );
      },
    },
  ];

  /**
   * Selection
   */
  const [, setSelectedItems] = useState<Model[]>([]);

  const onSelectionChange = (selectedItems: Model[]) => {
    setSelectedItems(selectedItems);
  };

  /**
   * Pagination & sorting
   */
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [models, setModels] = useState<Array<Model>>([]);
  const [sortField, setSortField] = useState<keyof Model>('modelName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Query API
  useEffect(() => {
    setIsLoading(true);
    handleFetcher(setModels)
    .then(() => {
      setIsLoading(false);
    })
  }, [refresh]);

  const onTableChange = ({ page, sort }: Criteria<Model>) => {
    if (page) {
      const { index: pageIndex, size: pageSize } = page;
      setPageIndex(pageIndex);
      setPageSize(pageSize);
    }
    if (sort) {
      const { field: sortField, direction: sortDirection } = sort;
      setSortField(sortField);
      setSortDirection(sortDirection);
    }
  };

  const selection: EuiTableSelectionType<Model> = {
    selectable: (model: Model) => model.selectable,
    selectableMessage: (selectable: boolean) =>
      !selectable ? 'User is currently offline' : '',
    onSelectionChange,
  };

  // Manually handle sorting and pagination of data
  const findModels = (
    models: Model[],
    pageIndex: number,
    pageSize: number,
    sortField: keyof Model,
    sortDirection: 'asc' | 'desc'
  ) => {
    let items;

    if (sortField) {
      items = models
        .slice(0)
        .sort(
          Comparators.property(sortField, Comparators.default(sortDirection))
        );
    } else {
      items = models;
    }

    let pageOfItems;

    if (!pageIndex && !pageSize) {
      pageOfItems = items;
    } else {
      const startIndex = pageIndex * pageSize;
      pageOfItems = items.slice(
        startIndex,
        Math.min(startIndex + pageSize, models.length)
      );
    }

    return {
      pageOfItems,
      totalItemCount: models.length,
    };
  };

  const { pageOfItems, totalItemCount } = findModels(
    models,
    pageIndex,
    pageSize,
    sortField,
    sortDirection
  );

  const pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: totalItemCount,
    pageSizeOptions: [3, 5, 8],
  };

  const sorting: EuiTableSortingType<Model> = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  let table = (
    <EuiBasicTable
      tableCaption="Model List"
      items={pageOfItems}
      itemId="id"
      itemIdToExpandedRowMap={itemIdToExpandedRowMap}
      isExpandable={true}
      hasActions={true}
      columns={columnsWithExpandingRowToggle}
      pagination={pagination}
      sorting={sorting}
      isSelectable={true}
      selection={selection}
      onChange={onTableChange}   
    />
  )

  let loading = (
    <EuiEmptyPrompt
      icon={<EuiLoadingLogo logo="visTable" size="xl" />}
      title={<h3>Loading Models</h3>}
    />
  )

  return (
    <>
    {isLoading ? loading : table}
    </>
  );
};

