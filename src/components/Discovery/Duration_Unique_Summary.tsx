import { EuiFlexItem, EuiEmptyPrompt, EuiFlexGroup, EuiText } from "@elastic/eui";
import React, { FunctionComponent } from "react";


const DUSummary: FunctionComponent = () => {
    const start = Date.now()
    const end = Date.now()
    return (
        <EuiFlexGroup direction="column" alignItems="center">
        <EuiFlexItem>
        <EuiEmptyPrompt
            body = {
                <EuiText color = "default">
                 <>
                    <h3>Duration of Snapshot</h3>
                    <p>{end-start}</p>
                    <h3>Unique Source IPs</h3>
                    <p>10</p>
                    <h3>Unique Ports</h3>
                    <p>8</p>
                </>
                </EuiText>
            }
            color = "plain"
        />
        </EuiFlexItem>
        </EuiFlexGroup>
            );
};

export default DUSummary