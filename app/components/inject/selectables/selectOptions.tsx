import { EuiText } from '@elastic/eui';


export const DataTypeSelector = [
    {
      value: '/data/zeek/dns.log',
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
      value: '/data/zeek/conn.log',
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
      value: '/data/zeek/http.log',
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
