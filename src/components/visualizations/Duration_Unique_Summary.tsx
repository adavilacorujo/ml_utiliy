import { EuiFlexItem, EuiEmptyPrompt } from "@elastic/eui";
import React, { FunctionComponent } from "react";


const DUSummary: FunctionComponent = () => {
    const start = Date.now()
    const end = Date.now()
    return (
        <EuiFlexItem>
        <EuiEmptyPrompt
            body = {
                <>
                    <h1>Duration of Snapshot</h1>
                    <p>{end-start}</p>
                    <h1>Unique Source IPs</h1>
                    <p>10</p>
                    <h1>Unique Ports</h1>
                    <p>8</p>
                </>
            }
            color = "plain"
        />
        </EuiFlexItem>
    );
};

export default DUSummary