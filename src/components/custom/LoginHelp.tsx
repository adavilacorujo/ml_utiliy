import { EuiButton, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { FunctionComponent } from "react";

const LoginHelp: FunctionComponent=()=>{
    return(
        <EuiFlexGroup direction="column" alignItems="center">
        <EuiButton iconType="questionInCircle">
        <strong>Help desk</strong>
        </EuiButton>
        </EuiFlexGroup>
  );
};
export default LoginHelp;