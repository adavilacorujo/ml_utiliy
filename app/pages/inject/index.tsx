import { useEffect, useState } from 'react';
import {
  useGeneratedHtmlId,
} from '@elastic/eui';
import KibanaLayout from '../layouts/kibana';
import { FormModal } from './modal';
import Page from './page';


export default () => {

    // state variables
    const [index, setIndex] = useState(null);
    const [indexList, setIndexList] = useState([]);
    const [dataType, setDataType] = useState('');
    const [startDate, setStart] = useState('now-30m');
    const [endDate, setEnd] = useState('now');

    // modal
    const [superSelectvalue, setSuperSelectValue] = useState('DNS');
    const [superIndexValue, setIndexSelectValue] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);


    const onSuperSelectChange = (value: string) => {
        setSuperSelectValue(value);
    };
    const onIndexSelectChange = (value: string) => {
      setIndexSelectValue(value);
      setIndex(value);  // Change parent components value
    };

    const showModal = () => setIsModalVisible(true);
    const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
    const modalFormSwitchId = useGeneratedHtmlId({ prefix: 'modalFormSwitch' });

    // Use Effect to use localStorage
    useEffect(() => {
      let index = JSON.parse(localStorage.getItem('index-selected'));
      
        setIndex(index || null);
        setIndexList(JSON.parse(localStorage.getItem('index-list')) || []);
        setDataType(JSON.parse(localStorage.getItem('data-type')) || '');
        setStart(JSON.parse(localStorage.getItem('start-date')) || 'now-30m');
        setEnd(JSON.parse(localStorage.getItem('start-date')) || 'now');
        setSuperSelectValue(JSON.parse(localStorage.getItem('data-type')) || 'DNS');
        setIndexSelectValue(JSON.parse(localStorage.getItem('index-selected')) || '');

        if (!index) setIsModalVisible(true);

     }, []);



    let modal = (
      <FormModal 
        isModalVisible={isModalVisible}
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
        {isModalVisible ? modal: page} 

    </KibanaLayout>
  )
};