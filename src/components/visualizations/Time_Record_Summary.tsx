import { EuiFlexItem, EuiEmptyPrompt } from "@elastic/eui";
import React, { FunctionComponent } from "react";


const TRSummary: FunctionComponent = () => {
    const start = Date.now();
    const end = Date.now();
    return (
        <EuiFlexItem>
        <EuiEmptyPrompt
            body = {
                <>
                    <h1>Time Span</h1>
                    <p>{start.toString()}</p>
                    <p>~</p>
                    <p>{end.toString()}</p>
                    <h1>Record Number</h1>
                    <p>1000</p>
                </>
            }
            color = "plain"
        />
        </EuiFlexItem>
    );
};

export default TRSummary