import {
EuiButton,
EuiButtonEmpty,
EuiFieldText,
EuiFlexGroup,
EuiFlexItem,
EuiForm,
EuiFormRow,
EuiModal,
EuiModalBody,
EuiModalFooter,
EuiModalHeader,
EuiModalHeaderTitle,
EuiSuperSelect,
EuiText,
useGeneratedHtmlId,
} from '@elastic/eui';
import { useEffect, useState } from 'react';
import { DataTypeSelector } from "./selectOptions";

const handleFetcher = async(setIndexList) => {
  await fetch('/api/indices', {
    method: 'GET',
  })
  .then(response => response.json())
  .then((data) => {
    let index = [];
    var indices = data["indices"];

    indices.forEach(element => {
      if (!element.index.startsWith('.') || !element.index.startsWith('_')) {
        // Push non-system indices to the list
        index.push({
          value: element.index,
          inputDisplay: element.index,
          dropDownDisplay: (
            <>
              <strong>{element.index}</strong>
              <EuiText size="s" color='subdued'>
                <p>Count: {element["docs.count"]}</p>
                <p>Size: {element["store.size"]}</p>
              </EuiText>
            </>
          )
        })
      }
      setIndexList(index);
      localStorage.setItem('index-list', JSON.stringify(index));

    });
  })
  .catch((error) => {
    console.log("Error fetching list of indices", error);
    return error
  })
}

export const FormModal = ({ 
  isModalVisible, 
  indexList,
  setIsModalVisible, 
  setIndex,
  setDataType, 
  setIndexList,
  superSelectvalue,
  setSuperSelectValue,
  superIndexValue, 
  setIndexSelectValue
}) => {

    const closeModal = () => {
        // Verify data has been inserted
        // if (index) setIsModalVisible(false);
        setIsModalVisible(false)
    };

    const onSuperSelectChange = (value: string) => {
        setSuperSelectValue(value);
        setDataType(value);   // Change parent components value
        localStorage.setItem('data-type', JSON.stringify(value));
        
    };
    const onIndexSelectChange = (value: string) => {
      setIndexSelectValue(value);
      setIndex(value);  // Change parent components value
      localStorage.setItem('index-selected', JSON.stringify(value));
  };
    

    const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
    const modalFormSwitchId = useGeneratedHtmlId({ prefix: 'modalFormSwitch' });

    useEffect(() => {
      handleFetcher(setIndexList);
    }, [])

    const form = (
        <EuiForm id={modalFormId} component="form">
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
              <EuiFormRow label="Select type of records">
                <EuiSuperSelect
                  options={DataTypeSelector}
                  valueOfSelected={superSelectvalue}
                  onChange={(value) => onSuperSelectChange(value)}
                  itemLayoutAlign="top"
                  hasDividers
                />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiForm>
      );



    return (
        <EuiModal onClose={closeModal} initialFocus="[name=popswitch]" style={{ width: 900, height: 275 }}>
          <EuiModalHeader>
            <EuiModalHeaderTitle>Select data to inject</EuiModalHeaderTitle>
          </EuiModalHeader>  
          <EuiModalBody>{form}</EuiModalBody>
          <EuiModalFooter>
            <EuiButton type="submit" onClick={closeModal}>
              Set
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
    )
};