import { FunctionComponent } from "react";
import { EuiFlexItem, EuiSpacer, EuiText } from "@elastic/eui";
import React from "react";

const LoginHeader: FunctionComponent = () => {
    return (
        <EuiFlexItem>
        <EuiText textAlign="center">
          <h1>Welcome to Perceptor</h1>
          <strong>A cyber analytical threat hunting application</strong>
          <EuiSpacer size="xl" />
        </EuiText>
      </EuiFlexItem>
    );
};

export default LoginHeader;