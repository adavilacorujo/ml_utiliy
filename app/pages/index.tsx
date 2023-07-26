import React, { useState } from 'react';
import {
  EuiButton,
  EuiButtonEmpty,
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
import KibanaLayout from './layouts/kibana';

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

  const onSuperSelectChange = (value: string) => {
    setSuperSelectValue(value);
  };

  return (
    <KibanaLayout
      pageHeader={{
        title: 'Visualize',
        rightSideItems: [
          // Add the data type selector
          <EuiSuperSelect
            options={superSelectOptions}
            valueOfSelected={superSelectvalue}
            onChange={(value) => onSuperSelectChange(value)}
            itemLayoutAlign="bottom"
            hasDividers={true}
        />
        ]
        
      }}>

    </KibanaLayout>
  )
};