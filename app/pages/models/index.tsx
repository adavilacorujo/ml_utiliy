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
import KibanaLayout from '../layouts/kibana';
import router from 'next/router';

export default () => {

    return (
    <KibanaLayout
      pageHeader={{
        title: 'Visualize',
        rightSideItems: [
        ]
      }}>
    <EuiModal onClose={function (event?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
              throw new Error('Function not implemented.');
          }}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Oops! No model created</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>Head on over to the Inject page to create a model.</EuiModalBody>

        <EuiModalFooter >
          <EuiButton onClick={() =>  router.push('/inject')} fill>
            Inject
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </KibanaLayout>
  )
};