import { EuiFlexItem, EuiIcon } from "@elastic/eui";
import { FunctionComponent } from "react"

const LoginLogo: FunctionComponent=()=>{
    return (
        <EuiFlexItem>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <EuiIcon
            type="logoComp"
            size="xl"
            src="https://i.imgur.com/IrqFnsI.png"
            style={{ width: '100%', height: 'auto' }}
          />
          <EuiIcon
            type="logoComp"
            size="xl"
            src="https://i.imgur.com/IrqFnsI.png"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </EuiFlexItem>
    );
};
export default LoginLogo;