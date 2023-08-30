import React, { useEffect, useState } from 'react';
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiGlobalToastList,
  EuiPage,
  EuiPageBody,
  EuiPageSideBar,
  EuiPageTemplate,
  EuiResizableContainer,
  EuiSelectableOption,
  EuiSpacer,
  EuiSuperSelect,
} from '@elastic/eui';
import DateHistogram from '../charts/DateHistogram';
import AttributeList from './selectables/AttributeList';
import { DatePicker } from './selectables/dates/DatePicker';
import { DataTypeSelector } from "./selectables/selectOptions";
import Charts from '../charts/Charts';
import { FilterButtons } from './selectables/FilterButtons';
import { InjectFlyout } from './interfaces/injectModal/InjectFlyout';
import ComboBoxAttribute from './interfaces/injectModal/ComboBoxAttribute';

export const Page = ({
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
  
    const [toasts, setToasts] = useState([]);
    const [filters, setFilters] = useState([]);
    const [showInjectModal, setInjectModal] = useState(false);
    // const [options, setOptions] = useState<EuiSelectableOption[]>([]);
    const [options, setSelected] = useState([]);


    useEffect(() => {
      // console.log("refreshing page");
    }, [startDate, endDate, index, dataType]);

    const removeToast = removedToast => {
      setToasts(toasts.filter(toast => toast.id !== removedToast.id));
    };

    let injectModal = (
      <InjectFlyout
        indexList={indexList}
        setIsModalVisible={setInjectModal}
        startDate={startDate}
        endDate={endDate}
        superIndexValue={superIndexValue} 
        superSelectvalue={superSelectValue}
        filters={filters}
        attributeList={options}
        setFilters={setFilters}
      />
    )

    let page = (
      <>
      {showInjectModal ? injectModal : ''}
      <EuiFlexGroup>
          <EuiFlexItem grow={false}>
              <EuiFormRow label="Inject Data">
                <EuiButton onClick={() => setInjectModal(true)}>
                  Inject Data
                </EuiButton>
                </EuiFormRow>
            </EuiFlexItem>
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
        <EuiFlexGroup>

        <EuiPage paddingSize="none" grow={true}>
          <EuiPageSideBar>
          <ComboBoxAttribute
                    index={index}
                    dataType={dataType}
                    selectedOptions={options}
                    setSelected={setSelected}
                    singleSelector={false}
                    queryAPI={true}
                />
          </EuiPageSideBar>
          <EuiPageBody>
            <DateHistogram 
                index={index}
                startDate={startDate}
                endDate={endDate}
                dataType={dataType}
                chart_size={{height: 200}}
              />
              <EuiSpacer/>
              <FilterButtons
                filters={filters} 
                attributeList={options}
                setFilters={setFilters}
              />
              <EuiSpacer/>
              <EuiSpacer/>
              <EuiFlexGroup>
                <EuiFlexItem>
                    <Charts
                        startDate={startDate}
                        endDate={endDate}
                        index={index}
                        attributeList={options}
                        dataType={dataType}
                        filters={filters}
                        setFilters={setFilters}
                    />
                </EuiFlexItem>
              </EuiFlexGroup>
          </EuiPageBody>

        </EuiPage>
        </EuiFlexGroup>

      </>
    )

    return (
        <>
        <EuiGlobalToastList
          toasts={toasts}
          dismissToast={removeToast}
          toastLifeTimeMs={6000}
        />
          {page}
      </>
  )
};