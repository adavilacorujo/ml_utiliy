import {
EuiButton,
EuiButtonEmpty,
EuiCallOut,
EuiFieldText,
EuiFlexGroup,
EuiFlexItem,
EuiForm,
EuiFormRow,
EuiLink,
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
import { DataTypeSelector } from "../selectables/selectOptions";

const handleFetcher = async(setIndexList, setError) => {
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
    setError(true);
    return error
  })
}

export const FormModal = ({ 
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

    const [isErrorVisible, setError] = useState(false);

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
      handleFetcher(setIndexList, setError);
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

    const errorPage = (
      <EuiModal onClose={() => {}} initialFocus="[name=popswitch]">
          <EuiCallOut title="No ES server has been set!" color="danger" iconType="alert">
            <p>
              Now you have to fix it, but maybe{' '}
              <EuiLink href="/es-management">this link can help</EuiLink>.
              <br/>
              Shoud you choose to continue, know you will have limited funtionality.
            </p>
          </EuiCallOut>
        </EuiModal>
    )

    const modalPage = (
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


    return (
      <>
      {isErrorVisible ? errorPage : modalPage}
      </>
    )
};