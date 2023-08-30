import React, { useEffect, useState } from 'react';

import { FilterRow } from './FilterRow';

export const FilterAdder = ({
    index,
    dataType,
    options,
    operatorFilters,
    setOperatorFilters,
    filterOperators,
    toolTipContent,
    queryAPI
}) => {

    useEffect(() => {

    }, [index]);
    

    return (
        <>
            <FilterRow
                index={index}
                dataType={dataType}
                options={options}
                filters={operatorFilters}
                addFilter={setOperatorFilters}
                operatorParam={filterOperators}
                toolTipContent={toolTipContent}
                queryAPI={queryAPI}
            />
        </>

        )
}
