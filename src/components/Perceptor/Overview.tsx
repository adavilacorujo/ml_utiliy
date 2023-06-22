import { FunctionComponent } from 'react';
import {
  EuiPageHeader,
  EuiSpacer,
  EuiImage,
  EuiFlexItem,
  EuiFlexGroup,
  EuiIcon,
} from '@elastic/eui';
import { homeHeroStyles } from '../starter/home_hero.styles';
import { useEuiTheme } from '@elastic/eui';
import Image from 'next/image';
import Logo from '../../images/a29Shield.svg'
import { imageLoader } from '../../lib/loader';
declare function require(path: string);

const Overview: FunctionComponent = () => {
  // const { euiTheme } = useEuiTheme();
  // const styles = homeHeroStyles(euiTheme);


  return (
    <EuiFlexGroup alignItems='center' 
      // css = {styles.container}
    >  
        <a>
        <Image 
          width = {34}
          height={34}
          src = {Logo}
          alt = ''
          loader = {imageLoader}
        />
        </a>
        
        <EuiSpacer/>
        <EuiPageHeader
        paddingSize = "l"
        pageTitle = "Welcome to Perceptor"
        description = "Something Something Something Something"
        alignItems='center'
        // css={styles.container}
        />

    </EuiFlexGroup>
  );
};

export default Overview;
