import React, { useEffect, useState } from 'react';
import {
  EuiButton,
  EuiGlobalToastList,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiSuperSelect,
  EuiText,
} from '@elastic/eui';
import KibanaLayout from './layouts/kibana';
import VerifyElasticsearch from '../components/utils/VerifyElasticsearch';
import AddElasticServer from '../components/utils/AddElasticServer';

const superSelectOptions = [
  {
    value: 'option_one',
    inputDisplay: 'Option one',
    dropdownDisplay: (
      <>
        <strong>Option one</strong>
        <EuiText size="s" color="subdued">
          <p>Has a short description giving more detail to the option.</p>
        </EuiText>
      </>
    ),
  },
  {
    value: 'option_two',
    inputDisplay: 'Option two',
    dropdownDisplay: (
      <>
        <strong>Option two</strong>
        <EuiText size="s" color="subdued">
          <p>Has a short description giving more detail to the option.</p>
        </EuiText>
      </>
    ),
  },
  {
    value: 'option_three',
    inputDisplay: 'Option three',
    dropdownDisplay: (
      <>
        <strong>Option three</strong>
        <EuiText size="s" color="subdued">
          <p>Has a short description giving more detail to the option.</p>
        </EuiText>
      </>
    ),
  },
];


export default () => {
  const [superSelectvalue, setSuperSelectValue] = useState('option_one');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [toasts, setToasts] = useState([]);

  const onSuperSelectChange = (value: string) => {
    setSuperSelectValue(value);
  };

  useEffect(() => {
    VerifyElasticsearch()
    .then((result) => {
      if (result != true) {
        setIsModalVisible(true);
      }
      else {
        setIsModalVisible(false);
      }
    })

  }, []);

  const removeToast = removedToast => {
    setToasts(toasts.filter(toast => toast.id !== removedToast.id));
  };


  let modal = (
    <>
      <EuiModal onClose={() => setIsModalVisible(false)} initialFocus="[name=popswitch]" style={{ width: 1200, height: 550 }}>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={6000}
      />
      <EuiModalHeader>
        <EuiModalHeaderTitle>No Elasticsearch server connection!</EuiModalHeaderTitle>
      </EuiModalHeader>  
      <EuiModalBody>

        <AddElasticServer 
          setToasts={setToasts} 
        />

      </EuiModalBody>
      <EuiModalFooter>
        <EuiButton type="submit" onClick={() => setIsModalVisible(false)}>
          Exit
        </EuiButton>
      </EuiModalFooter>
      </EuiModal>
    </>
  )

  let page = (
    <>
    {/* <EuiSuperSelect
      options={superSelectOptions}
      valueOfSelected={superSelectvalue}
      onChange={(value) => onSuperSelectChange(value)}
      itemLayoutAlign="bottom"
      hasDividers={true}
    /> */}
    </>
  )

  return (
    <KibanaLayout
      pageHeader={{
        title: 'Visualize',
        rightSideItems: [
          // Add the data type selector
          ]
        }}>
      {isModalVisible ? modal: page} 
    </KibanaLayout>
  )
};