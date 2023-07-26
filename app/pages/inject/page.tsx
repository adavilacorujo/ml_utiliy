import React, { useEffect, useState } from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiPageSideBar,
  EuiPageTemplate,
  EuiSelectableOption,
  EuiSpacer,
  EuiSuperSelect,
} from '@elastic/eui';
import DateHistogram from './DateHistogram';
import AttributeList from './AttributeList';
import DatePicker from './DatePicker';
import { DataTypeSelector } from "./selectOptions";
import BarChart from './BarChart';
import Charts from './Charts';

export default ({
    indexList,
    superIndexValue,
    onIndexSelectChange,
    superSelectValue,
    onSuperSelectChange,
    startDate,
    endDate,
    setStartDate, 
    setEndDate,
    index,
    dataType
}: any) => {
    const [options, setOptions] = useState<EuiSelectableOption[]>([]);

    return (
        <>
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiFormRow label="Select index">
                <EuiSuperSelect
                        options={indexList}
                        valueOfSelected={superIndexValue}
                        onChange={(value) => onIndexSelectChange(value)}
                        itemLayoutAlign="top"
                        hasDividers
                />
                </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow label="Select data type">
                <EuiSuperSelect
                      options={DataTypeSelector}
                      valueOfSelected={superSelectValue}
                      onChange={(value) => onSuperSelectChange(value)}
                      itemLayoutAlign="top"
                      hasDividers
                />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow label="Select date">            
                <DatePicker 
                  start={startDate}
                  end={endDate}
                  setStart={setStartDate}
                  setEnd={setEndDate}
                  />
              </EuiFormRow>
            </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />
        <EuiSpacer />
        <EuiPageTemplate pageSideBar={
          <>
          {/* <EuiFlexGroup alignItems="center" >
            <EuiFlexItem grow={true}>
              <EuiPageSideBar>
                
              </EuiPageSideBar>
            </EuiFlexItem>
          </EuiFlexGroup> */}
          <EuiFlexGroup>
            <EuiFlexItem grow={true}>
              <EuiPageSideBar>
                  <AttributeList
                    index={index}
                    dataType={dataType}
                    options={options}
                    setOptions={setOptions}
                  /> 
              </EuiPageSideBar>
            </EuiFlexItem>
          </EuiFlexGroup>
            </>
          }
          // restrictWidth={true}
          // grow={false}
          // fullHeight={true}
        >  
            <DateHistogram 
              index={index}
              startDate={startDate}
              endDate={endDate}
              dataType={dataType}
              chart_size={{height: 200}}
          />
          <EuiSpacer/>
          <EuiFlexGroup>
            <EuiFlexItem>
                <Charts
                    startDate={startDate}
                    endDate={endDate}
                    index={index}
                    attributeList={options}
                    dataType={dataType}
                />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageTemplate>
      </>
  )
};