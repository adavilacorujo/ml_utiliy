import { useEffect, useState } from 'react';
import {
  EuiButton,
  EuiFlexGroup,
  EuiGlobalToastList,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  useGeneratedHtmlId,
} from '@elastic/eui';
import KibanaLayout from '../../components/layouts/kibana';
import { FormModal } from '../../components/inject/interfaces/InjectModal';
import { Page } from '../../components/inject/InjectPage';
import { VerifyElasticsearch } from '../../components/utils/VerifyElasticsearch';
import AddElasticServer from '../../components/utils/AddElasticServer';


const Index = () => {

    // state variables
    const [index, setIndex] = useState(null);
    const [indexList, setIndexList] = useState([]);
    const [dataType, setDataType] = useState('');
    const [startDate, setStart] = useState('now-30m');
    const [endDate, setEnd] = useState('now');
    const [isESManagementVisible, setIsESManagementVisible] = useState(false);
    const [toasts, setToasts] = useState([]);
    

    // modal
    const [superSelectvalue, setSuperSelectValue] = useState('DNS');
    const [superIndexValue, setIndexSelectValue] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);


    const onSuperSelectChange = (value: string) => {
        setSuperSelectValue(value);
        setDataType(value);
    };
    const onIndexSelectChange = (value: string) => {
      setIndexSelectValue(value);
      setIndex(value);  // Change parent components value
    };
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
        else {
          setIsESManagementVisible(false);
        }
      })

      
      let index = JSON.parse(localStorage.getItem('index-selected'));
      
      setIndex(index || null);
      setIndexList(JSON.parse(localStorage.getItem('index-list')) || []);
      setDataType(JSON.parse(localStorage.getItem('data-type')) || '');
      setStart(JSON.parse(localStorage.getItem('start-date')) || 'now-30m');
      setEnd(JSON.parse(localStorage.getItem('end-date')) || 'now');
      setSuperSelectValue(JSON.parse(localStorage.getItem('data-type')) || 'DNS');
      setIndexSelectValue(JSON.parse(localStorage.getItem('index-selected')) || '');

      if (!index) setIsModalVisible(true);

     }, []);



    let modal = (
      <FormModal
        indexList={indexList}
        setIsModalVisible={setIsModalVisible}
        setIndex={setIndex}
        setDataType={setDataType}
        setIndexList={setIndexList}
        superSelectvalue={superSelectvalue}
        setSuperSelectValue={setSuperSelectValue}
        superIndexValue={superIndexValue}
        setIndexSelectValue={setIndexSelectValue}
      />
    );

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
      <Page
        indexList={indexList}
        superIndexValue={superIndexValue}
        onIndexSelectChange={onIndexSelectChange}
        superSelectValue={superSelectvalue}
        onSuperSelectChange={onSuperSelectChange}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStart}
        setEndDate={setEnd}
        index={index}
        dataType={dataType}
      />
    )

    return (
    <KibanaLayout
      pageHeader={{
        title: 'Visualize',
        rightSideItems: [
        ]
      }}
      >
        { isESManagementVisible ? esModal : isModalVisible ? modal: page }

    </KibanaLayout>
  )
};

export default Index;