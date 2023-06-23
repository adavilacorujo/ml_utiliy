import Link from 'next/link';
import { EuiFlexGrid, EuiLink, EuiText, EuiButton, EuiSpacer, EuiFlexItem } from '@elastic/eui';
import KibanaLayout from '../../layouts/kibana';
import FiltersAndQueries from '../../components/Discovery/FiltersAndQueries';
import TRSummary from '../../components/visualizations/Time_Record_Summary';
import DUSummary from '../../components/Discovery/Duration_Unique_Summary';
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
            color="success"
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

      <EuiFlexGrid columns = {3} gutterSize='m' >
        <EuiFlexItem>
        <TRSummary />
        </EuiFlexItem>

        <EuiFlexItem>
        <DUSummary />
        </EuiFlexItem>

        <EuiFlexItem>
        <SummaryTable/>
        </EuiFlexItem>
        <EuiFlexItem>
        <PieChart />
        </EuiFlexItem>
        <EuiFlexItem>
        <DateHistogram />
        </EuiFlexItem>

        
      </EuiFlexGrid>
    </KibanaLayout>
  );
};
export default Discover;
