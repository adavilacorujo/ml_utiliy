import React, { FunctionComponent, ReactElement, useState } from 'react';
import LoginHeader from '../components/custom/LoginHeader';
import LoginModal from '../components/custom/LoginModal';
import LoginLogo from '../components/custom/LoginLogo';
import LoginHelp from '../components/custom/LoginHelp';
import {
  EuiPageTemplate,
  EuiPageTemplateProps,
  EuiButton,
  EuiSpacer,
  EuiIcon,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from '@elastic/eui';
const LogIn: FunctionComponent = ({panelled,
  offset,
  grow,
  restrictWidth,
  bottomBorder,
}: {
  panelled?: EuiPageTemplateProps['panelled'];
  offset?: EuiPageTemplateProps['offset'];
  grow?: EuiPageTemplateProps['grow'];
  restrictWidth?: EuiPageTemplateProps['restrictWidth'];
  bottomBorder?: EuiPageTemplateProps['bottomBorder'];
}) => {
  return (
    <EuiFlexGroup justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <EuiFlexItem>
        <EuiPageTemplate panelled={panelled} restrictWidth={restrictWidth} bottomBorder={bottomBorder} offset={offset} grow={grow}>
          <EuiPageTemplate.Section grow={true} color="subdued">
              <EuiFlexItem>
                <LoginLogo/>
              </EuiFlexItem>
              <LoginHeader/>
              <EuiFlexItem>
              <LoginModal/>
                <EuiSpacer size="s" />
                <LoginHelp/>
              </EuiFlexItem>
          </EuiPageTemplate.Section>
        </EuiPageTemplate>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

export default LogIn;