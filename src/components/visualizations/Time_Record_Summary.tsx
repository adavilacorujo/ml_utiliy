import { EuiFlexItem, EuiEmptyPrompt, EuiFlexGroup, EuiText } from "@elastic/eui";
import React, { FunctionComponent } from "react";


const TRSummary: FunctionComponent = () => {
    const start = Date.now();
    const end = Date.now();
    return (
        <EuiFlexGroup direction="column" alignItems="center">
        <EuiFlexItem>
        <EuiEmptyPrompt
            body = {
                <EuiText color="default">
                    <>
                    <h3>Time Span</h3>
                    <p>{start.toString()}</p>
                    <p>~</p>
                    <p>{end.toString()}</p>
                    <h3>Record Number</h3>
                    <p>1000</p>
                </>
                </EuiText>
            }
            color = "plain"
        />
        </EuiFlexItem>
        </EuiFlexGroup>
    );
};

export default TRSummary