import { FunctionComponent } from 'react';
import {
  EuiPageHeader,
  EuiSpacer,
  EuiImage,
  EuiFlexItem,
  EuiFlexGroup,
  EuiBottomBar,
  EuiText,
  EuiBadge,
  EuiCard,
  EuiIcon,
} from '@elastic/eui';
import { homeHeroStyles } from '../starter/home_hero.styles';
import { useEuiTheme } from '@elastic/eui';
import logo from "../../images/a29Shield.png"
import Image from 'next/image';

const QA: FunctionComponent = () => {
  // const { euiTheme } = useEuiTheme();
  // const styles = homeHeroStyles(euiTheme);


  return (
    <EuiFlexGroup alignItems='center' 
      // css = {styles.container}
    >  
        <EuiFlexItem grow = {false}>
            <EuiCard
                icon = {<EuiIcon size ="xxl" type = "questionInCircle" />}
                title = {"Need Help?"}
                onClick = {() => {}}
            />
        </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default QA;
