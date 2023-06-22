import Link from 'next/link';
import Router from 'next/router';
import { EuiLink, EuiSpacer, EuiText, EuiButton } from '@elastic/eui';
import KibanaLayout from '../../layouts/kibana';
import FiltersAndQueries from '../../components/Discover/FiltersAndQueries';
import { DateHistogram } from '../../components/visualizations/Histrogram';
import { useRouter } from 'next/router';
import DataTable from '../../components/visualizations/DataTable';

const Discover = () => {
  const router = useRouter();

  const handleBack = () => {
    router.replace('/kibana')
  }
  return (
    <KibanaLayout
      pageHeader={{
        pageTitle: 'Discover',
      }}>
        <FiltersAndQueries />
        <EuiSpacer />
        <DateHistogram />
        <EuiSpacer/>
        <DataTable />
        <EuiSpacer/>
        <EuiButton fill size = "m" onClick = {handleBack}> Go Back</EuiButton>
    </KibanaLayout>
  );
};

export default Discover;
