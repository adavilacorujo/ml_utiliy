// Craete model to show changeIP
import {
    EuiFormRow,
    EuiFlexGroup,
    EuiFlexItem,
    EuiText,
    EuiPanel,
    EuiFieldText,
    EuiCheckbox,
    EuiFieldPassword,
    EuiCard,
    EuiAccordion,
    EuiSpacer,
    EuiButton,
    EuiFlexGrid
  } from '@elastic/eui';
import { useEffect, useState } from 'react';

const getCreds = async () => {
    let returnValue;

    await fetch('api/getCreds', {
        method: "GET"
    })
    .then(response => response.json())
    .then(data =>   returnValue = data)
    .catch(error => returnValue = null)

    return returnValue;
};

const testConnection = (esUsername, esPassword, esHost, esSecurity) => {

    const result = fetch('/api/verifyConnection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            esUsername: esUsername,
            esPassword: esPassword,
            esHost: esHost,
            esSecurity: esSecurity,
        })
    })
    .then(result => result.json())
    .then((data) => {
        if (data != true) {
            return false;
        }
        else {
            return true;
        }
    })

    return result;
};

const setConnection = (esUsername, esPassword, esHost, esSecurity) => {

    const result = fetch('/api/setCredentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            esUsername: esUsername,
            esPassword: esPassword,
            esHost: esHost,
            esSecurity: esSecurity,
        })
    })
    .then(result => result.json())
    .then((data) => {
        if (data != true) {
            return false;
        }
        else {
            return true;
        }
    })

    return result;
};

const AddElasticServer = ({setToasts}) => {
    const [ingestUser, setUser] = useState('');
    const [ingestPass, setPass] = useState('');
    const [ingestNode, setNode] = useState('');
    const [securityFlag, setSecurity] = useState(1);

    const [displayUser, setDisplayUser] = useState('');
    const [displayPass, setDisplayPass] = useState('');
    const [displayNode, setDisplayNode] = useState('');

    const [dualU, setDualU] = useState(true);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        getCreds()
        .then((data) => {
            if (data !=  null) {
                setDisplayNode(data.esHost);
                setDisplayUser(data.esUsername);
                setDisplayPass(data.esPassword);
            }
        })
    }, []);

    const onChange = e => {
        setChecked(e.target.checked);
        
        if (checked === true) {
            setSecurity(1);
        }
        else {
            setSecurity(0);
        }
      };

    const verifyConnection = () => {
        testConnection(ingestUser, ingestPass, ingestNode, securityFlag)
        .then((result) => {
            if (result === true) {
                //  add conneciton suucessfull to modal
                setToasts([].concat({
                    title: 'Connection verified!',
                    color: 'success',
                }));
            }
            else {
                setToasts([].concat({
                    title: 'Connection failed.',
                    color: 'danger',
                }));
            }
        })
    }

    const setCreds = () => {
        if (setConnection(ingestUser, ingestPass, ingestNode, securityFlag)) {
            // add conneciton suucessfull to modal
            setToasts([].concat({
                title: 'Connection verified!',
                color: 'success',
            }));
            setDisplayNode(ingestNode);
            setDisplayUser(ingestUser);
            setDisplayPass(ingestPass);
        }
        else {
            setToasts([].concat({
                title: 'Connection failed.',
                color: 'danger',
            }));
        }
    }

    return (
        <EuiPanel paddingSize="l">

        <EuiFlexGroup>
            <EuiFlexItem>
            <EuiFormRow
                label="Change IP Address"
                fullWidth
                helpText="Use this field to change IP address to connect to elasticsearch database"
            >
                <EuiFieldText
                    placeholder="192.168.0.1"
                    value={ingestNode}
                    onChange={(e) => setNode(e.target.value)}
                    aria-label="Use aria labels when no actual label is in use"
                    // fullWidth={true}
                    />
            </EuiFormRow>
            <EuiFormRow label="Username" fullWidth>
            <EuiFieldText
                    placeholder="Elasticsearch username"
                    value={ingestUser}
                    type={dualU ? 'dualU' : undefined}
                    onChange={(e) => setUser(e.target.value)}
                    aria-label="Use aria labels when no actual label is in use"
                />
            </EuiFormRow>

            <EuiFormRow label="Password" fullWidth>
            <EuiFieldPassword
                placeholder="Elasticsearch password"
                type='dual'
                value={ingestPass}
                onChange={(e) => setPass(e.target.value)}
                aria-label="Use aria labels when no actual label is in use"
            />
            </EuiFormRow>

            <EuiSpacer size='s'/>
            <EuiCheckbox
                id={'checkbox-passwd'}
                label="No password needed"
                checked={checked}
                onChange={e => onChange(e)}
            />
            

            <EuiSpacer size='s'/>
            <EuiFormRow>
            <EuiFlexGrid columns={1} gutterSize='s'>
                <EuiFlexItem grow={false}>
                <EuiButton size='s' onClick={verifyConnection} >Test Connection</EuiButton>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                <EuiButton size='s' color='success' onClick={setCreds} >Set IP</EuiButton>
                </EuiFlexItem>
            </EuiFlexGrid>
            </EuiFormRow>
            
            </EuiFlexItem>
            <EuiFlexItem>
            <EuiAccordion id={''} buttonContent="View Elasticsearch settings">

                <EuiText>
                    {/* <EuiFormRow
                        label="Current Elasticsearch Settings"
                        fullWidth
                        // helpText="Use this field to change IP address"
                    > */}
                     <EuiCard title={undefined} 
                        // title="Current Elasticsearch Settings"
                        textAlign='left'
                        description={
                            <div>
                                <EuiText size="m">
                                    <h4>
                                        IP address
                                    </h4>
                                    <p>
                                        http://{displayNode}:9200
                                    </p>
                                    <h4>
                                        Username
                                    </h4>
                                    <p>
                                        {displayUser}
                                    </p>
                                    <h4>
                                        Password
                                    </h4>
                                    <p>
                                        {displayPass}
                                    </p>
                                </EuiText>
                            </div>
                        }
                    /> 
                </EuiText>
            </EuiAccordion>
            </EuiFlexItem>
        </EuiFlexGroup>
        
   
        </EuiPanel>
    )
};


export default AddElasticServer;
