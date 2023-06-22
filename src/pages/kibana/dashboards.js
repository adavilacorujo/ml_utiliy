import Link from 'next/link';
import { EuiFlexGrid, EuiLink, EuiText, EuiButton, EuiSpacer } from '@elastic/eui';
import KibanaLayout from '../../layouts/kibana';
import FiltersAndQueries from '../../components/Discover/FiltersAndQueries';
import TRSummary from '../../components/visualizations/Time_Record_Summary';
import DUSummary from '../../components/visualizations/Duration_Unique_Summary';
import SummaryTable from '../../components/visualizations/SummaryTable';
import { PieChart } from '../../components/visualizations/PieCharts';
import { DateHistogram } from '../../components/visualizations/Histrogram';

const Discover = () => {
  return (
    <KibanaLayout
      pageHeader={{
        pageTitle: 'Dashboards',
        rightSideItems: [
          <EuiButton
            color="primary"
            fill
            onClick={() => {
              console.log('Create dashboard');
            }}
            key="create-dashboard">
            Create dashboard
          </EuiButton>,
        ],
      }}>
      <FiltersAndQueries />
      <EuiSpacer />
      <EuiSpacer />
      
      <EuiFlexGrid columns = {3} gutterSize='s' >
        <TRSummary />
        <DUSummary />
        <SummaryTable />
        <PieChart />
        <DateHistogram />
        
      </EuiFlexGrid>


    </KibanaLayout>
  );
};

export default Discover;
