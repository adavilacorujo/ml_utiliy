import React, { useEffect, useState } from 'react';
import {
  EuiButton,
  EuiGlobalToastList,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
} from '@elastic/eui';
import { VerifyElasticsearch } from '../../components/utils/VerifyElasticsearch';
import KibanaLayout from '../../components/layouts/kibana';
import { ModelPage } from '../../components/model/ModelPage';
import AddElasticServer from '../../components/utils/AddElasticServer';

const Index = () => {
  const [isESManagementVisible, setIsESManagementVisible] = useState(false);
  const [toasts, setToasts] = useState([]);

  const removeToast = removedToast => {
    setToasts(toasts.filter(toast => toast.id !== removedToast.id));
  };

  // Use Effect to use localStorage
  useEffect(() => {

    VerifyElasticsearch()
    .then((result) => {
      if (result != true) {
        setIsESManagementVisible(true);
      }
    })
    }, []);

  let esModal = (
    <>
      <EuiModal onClose={() => setIsESManagementVisible(false)} initialFocus="[name=popswitch]" style={{ width: 1200, height: 550 }}>
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
        <EuiButton type="submit" onClick={() => setIsESManagementVisible(false)}>
          Exit
        </EuiButton>
      </EuiModalFooter>
      </EuiModal>
    </>
  )

  let page = (
    <ModelPage />
  )

    return (
    <KibanaLayout
      pageHeader={{
        title: 'Visualize',
        rightSideItems: [
        ]
      }}>
      { isESManagementVisible ? esModal : page }
    </KibanaLayout>
  )
};

export default Index;