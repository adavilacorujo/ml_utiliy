import {
    EuiAccordion,
    EuiButton,
    EuiButtonEmpty,
    EuiFieldText,
    EuiFlexGroup,
    EuiFlexItem,
    EuiFlyout,
    EuiFlyoutBody,
    EuiFlyoutFooter,
    EuiFlyoutHeader,
    EuiForm,
    EuiFormRow,
    EuiGlobalToastList,
    EuiSpacer,
    EuiSuperSelect,
    EuiSwitch,
    EuiText,
    EuiTitle,
    useGeneratedHtmlId,
    } from '@elastic/eui';
import { useEffect, useState } from 'react';
import { DataTypeSelector } from "../../selectables/selectOptions";
import ComboBoxAttribute from './ComboBoxAttribute';
import { DatePicker } from '../../selectables/dates/DatePicker';
import { FilterAdder } from './FilterAdder';
import { filterOperators, modifyOperators } from './operators';
import _ from "lodash";
import { FilterButtons } from '../../selectables/FilterButtons';
import {v4 as uuidv4} from 'uuid';
    
const handleSetter = async (modelName, 
    index, attributeList, startDate, endDate, dataType, dataFilter, modifyFilter) => {

    let attribteTemp = [];
    attributeList.forEach((value) => {
        attribteTemp.push(value.label);
    })
    const result = await fetch('/api/injectData', {
    method: 'POST',
        body: JSON.stringify({
            id              : uuidv4(),
            modelName       : modelName,
            index           : index,
            attributeList   : attribteTemp,
            startDate       : startDate,
            endDate         : endDate,
            dataType        : dataType,
            dataFilter      : dataFilter,
            modifyFilter    : modifyFilter
        })
    })
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return error;
    })
    
    return result;
}

const handleGetter = async (index, dateType, startDate, endDate, setCount) => {
    const result = await fetch('/api/fetchDateHist', {
    method: 'POST',
        body: JSON.stringify({
            index       : index,
            dataType    : dateType,
            startDate   : endDate,
            endDate     : startDate
        })
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        setCount(data.hist.hits.total.value);
        return data.hist.hits.total.value;
    })
    .catch((error) => {
        return error;
    })
    
    return result;
}

export const InjectFlyout = ({ 
      indexList,
      setIsModalVisible,
      startDate,
      endDate,
      superSelectvalue,
      superIndexValue,
      filters,
      attributeList,
      setFilters
    }) => {
 
    const [end, setEnd] = useState(endDate);
    const [count, setCount] = useState<number>(0);
    const [start, setStart] = useState(startDate);
    const [checked, setChecked] = useState(false);
    const [modelName, setModelName] = useState('');
    const [loading, setIsLoading] = useState(false);
    const [localToast, setLocalToast] = useState([]);
    const [index, setIndex] = useState(superIndexValue);
    const [selectedOptions, setSelected] = useState([]);
    const [modifyFilter, setModifyFilter] = useState({});
    const [operatorFilters, setOperatorFilters] = useState({});
    const [dataType, setDataType] = useState(superSelectvalue);
    const complicatedFlyoutTitleId = useGeneratedHtmlId({
        prefix: 'complicatedFlyoutTitle',
      });

    const [showFilterSwitch, setFilterSwitch] = useState(false);

    // Minimum number of attributes needed to run ML algorithm
    const minAttributesNeeded : number = 2;


    const closeModal = () => {
        // Verify data has been inserted
        setIsModalVisible(false)
    };
    const removeToast = removedToast => {
        setLocalToast(localToast.filter(toast => toast.id !== removedToast.id));
      };
    const onSuperSelectChange = (value: string) => {
        setDataType(value);   // Change parent components value
        localStorage.setItem('data-type', JSON.stringify(value));
        
    };
    const onIndexSelectChange = (value: string) => {
        setIndex(value);  // Change parent components value
        localStorage.setItem('index-selected', JSON.stringify(value));
    };
    const isDisabled =() => {
        if (modelName.length < 1) return true;
        else if (selectedOptions.length < minAttributesNeeded) return true;
        else if (_.isEmpty(modifyFilter)) return true; // if empty
        else if (!_.isEmpty(modifyFilter)) {    // if not empty
            // Verify value has been defined
            if (modifyFilter['options'].length < 1) return true;
            else return false;
        }
        else return false;
    }
    const injectData = () => {
        setIsLoading(true);
        // Add toaster for starting ML
        setLocalToast(localToast.concat({
            title: `Starting ML job ${modelName}`,
            color: 'success',
        }));

        handleSetter(modelName, index, selectedOptions, start, end, dataType, operatorFilters, modifyFilter)
        .then((response) => {
            if (response.ok) {
                // Set local hosts too
                setLocalToast(localToast.concat({
                    title: `ML job ${modelName} started!`,
                    color: 'success',
                }));
            }
        })
        .catch((error) => {
            // Set local hosts too
            setLocalToast(localToast.concat({
                title: `ML job ${modelName} failed.`,
                color: 'danger',
            }));            
        });
        setIsLoading(false);
    }

    useEffect(() => {
        // Check if filters is empty
        if (filters.length > 0) {
            setFilterSwitch(true);
        }
        isDisabled();

    }, [filters, modelName, selectedOptions, modifyFilter]);

    useEffect(() => {
        // Get count of records
        const result = handleGetter(index, dataType, start, end, setCount)
        .then(response => response)
        .catch((error) => {
            console.log("Error fetching record count", error);
        })
    }, [index, dataType, start, end]);

    const filterButtons = (
        <FilterButtons
            filters={filters} 
            attributeList={attributeList}
            setFilters={setFilters}
          />
    )


    const modalPage = (
        <EuiFlyout
            ownFocus
            onClose={closeModal}
            hideCloseButton
            aria-labelledby={complicatedFlyoutTitleId}
        >
        <EuiGlobalToastList
          toasts={localToast}
          dismissToast={removeToast}
          toastLifeTimeMs={2000}
        />
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id={complicatedFlyoutTitleId}>Data Injector</h2>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiText color="subdued">
            <p>
              Use the following options to select the data to run unsupervised ML on.
            </p>
          </EuiText>
          
          </EuiFlyoutHeader>
        <EuiFlyoutBody>
            <EuiFlexItem>
                    <EuiFieldText
                        placeholder="Model name"
                        value={modelName}
                        onChange={(e) => {
                            setModelName(e.target.value);
                        }}
                    />
            </EuiFlexItem>
          <EuiSpacer size="m" />
          <EuiForm component="form">
            <EuiFormRow label="Date selector">
                <DatePicker 
                    start={start}
                    end={end}
                    setStart={setStart}
                    setEnd={setEnd}
                  />
            </EuiFormRow>
            <EuiFormRow label="Index select field">
                <EuiSuperSelect 
                    options={indexList}
                    valueOfSelected={index}
                    onChange={(value) => onIndexSelectChange(value)}
                    itemLayoutAlign="top"
                    hasDividers
                />
            </EuiFormRow>
            <EuiFormRow label="Select type of records">
                <EuiSuperSelect
                    options={DataTypeSelector}
                    valueOfSelected={dataType}
                    onChange={(value) => onSuperSelectChange(value)}
                    itemLayoutAlign="top"
                    hasDividers
                />
            </EuiFormRow>
            <EuiSpacer />
            <EuiTitle>
                <>
                <h1>Record count: {count}</h1>
                </>
            </EuiTitle>
            <EuiSpacer />
            <EuiFormRow label="Attribute selector. Select at least 2 attributes.">
                <ComboBoxAttribute
                    index={index}
                    dataType={dataType}
                    selectedOptions={selectedOptions}
                    setSelected={setSelected}
                    singleSelector={false}
                    queryAPI={true}
                />
            </EuiFormRow>
            <EuiSpacer />
            <EuiSwitch
                label="Use filters from graphs"
                checked={checked}
                onChange={(e) => {
                    setChecked(e.target.checked)
                }}
                disabled={!showFilterSwitch}
            />
          </EuiForm>
          <EuiSpacer />
            {checked === true ? filterButtons : ''}
          <EuiSpacer />
          <EuiAccordion
            id="accordion1"
            buttonContent="Open to add a filter"
            >
            <EuiSpacer />
            <EuiSpacer />
            <FilterAdder
                index={index}
                dataType={dataType}
                options={selectedOptions}
                operatorFilters={operatorFilters}
                setOperatorFilters={setOperatorFilters}
                filterOperators={filterOperators}
                toolTipContent={'If disabled operator cannot be used on attribute'}
                queryAPI={false}
            />
          </EuiAccordion>
          <EuiSpacer/>
          <EuiText>
              Attribute to modify
          </EuiText>
          <EuiSpacer/>
          <FilterAdder
                index={index}
                dataType={dataType}
                options={selectedOptions}
                operatorFilters={modifyFilter}
                setOperatorFilters={setModifyFilter}
                filterOperators={modifyOperators}
                toolTipContent={'If disabled no attribute has been set'}
                queryAPI={false}
            />
        </ EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiFlexGroup justifyContent="spaceBetween">
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                iconType="cross"
                onClick={closeModal}
                flush="left"
              >
                Close
              </EuiButtonEmpty>
            </EuiFlexItem>
                <EuiFlexItem grow={false}>
                <EuiButton onClick={injectData} isLoading={loading} disabled={isDisabled()}>
                    Inject
                </EuiButton>
                </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlyoutFooter>
      </EuiFlyout>
    )

    return (
        <>
        {modalPage}
        </>
    )
};


// TODO:
// Get filters from graph