import { EuiText } from '@elastic/eui';


export const DataTypeSelector = [
    {
      value: 'DNS',
      inputDisplay: 'DNS',
      dropdownDisplay: (
        <>
          <strong>DNS</strong>
          <EuiText size="s" color="subdued">
            <p>DNS data collected through Zeek.</p>
          </EuiText>
        </>
      ),
    },
    {
      value: 'CONN',
      inputDisplay: 'CONN',
      dropdownDisplay: (
        <>
          <strong>CONN</strong>
          <EuiText size="s" color="subdued">
            <p>CONN data collected through Zeek.</p>
          </EuiText>
        </>
      ),
    },
    {
      value: 'HTTP',
      inputDisplay: 'HTTP',
      dropdownDisplay: (
        <>
          <strong>HTTP</strong>
          <EuiText size="s" color="subdued">
              <p>HTTP data collected through Zeek.</p>
          </EuiText>
        </>
      ),
    },
  ];
