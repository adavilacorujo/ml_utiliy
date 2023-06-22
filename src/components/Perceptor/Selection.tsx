import { FunctionComponent } from 'react';
import React, {useState} from 'react';
import {
  EuiPageHeader,
  EuiSpacer,
  EuiImage,
  EuiFlexItem,
  EuiFlexGroup,
  EuiCard,
  EuiIcon
} from '@elastic/eui';
import { homeHeroStyles } from '../starter/home_hero.styles';
import { useEuiTheme } from '@elastic/eui';
import logo from "../../images/a29Shield.png"
import Image from 'next/image';
import { useRouter } from 'next/router';

const Selection: FunctionComponent = () => {
  // const { euiTheme } = useEuiTheme();
//   const styles = homeHeroStyles(euiTheme);
  const [disabledML, setDisableedML] = useState(true)
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
    <EuiFlexGroup alignItems='center' 
      // css = {styles.container}
    >  
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
                isDisabled = {disabledML}
            />
        </EuiFlexItem>
    </EuiFlexGroup>
   


  );
};

export default Selection;
