import { EuiFlexGroup, EuiFlexItem, EuiCard, EuiIcon, SearchProvider } from '@elastic/eui';
import KibanaLayout from '../../layouts/kibana';
import { useRouter } from 'next/router';
import Connector from "../../services/APIConnector"
const Index = () => {
  const router = useRouter();
  const handleClickDash = () => {
    router.push('/kibana/dashboards');
  }

  const handleClickDiscover = () => {
    router.push('/kibana/discover');
  }
  const handleClickML = () => {
    router.push('/kibana/ML');
  }

  return (
    // <SearchProvider config = {searchConfig}>
      <KibanaLayout
        template="empty"
        pageHeader={{
          pageTitle: 'Welcome to Perceptor',
        }}>
        <EuiFlexGroup gutterSize="l">
        <EuiFlexItem grow = {false}>
            <EuiCard
                icon = {<EuiIcon size ="xxl" type = "dashboardApp" />}
                title = {"Dashboard"}
                description = "Explore and Interogate the Data using various Visualizations."
                onClick = {handleClickDash}
            />
        </EuiFlexItem>
        <EuiFlexItem grow = {false}>
            <EuiCard
                icon = {<EuiIcon size ="xxl" type = "discoverApp" />}
                title = {"Discover"}
                description = "Explore and Interogate the Data"
                onClick = {handleClickDiscover}
            />
        </EuiFlexItem>
        <EuiFlexItem grow = {false}>
            <EuiCard
                icon = {<EuiIcon size ="xxl" type = "machineLearningApp" />}
                title = {"Machine Learning"}
                description = "Analize the data utilizing ML"
                onClick = {handleClickML}
                isDisabled = {true}
            />
        </EuiFlexItem>
        </EuiFlexGroup>
      </KibanaLayout>
    // </SearchProvider>
  );
};

export default Index;
