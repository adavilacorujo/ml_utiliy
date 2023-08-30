import { EuiFlexGrid, EuiFlexItem } from "@elastic/eui";
import { useEffect, useState } from "react"
import { ResultChart } from "./ResultChart";



export default (data : any) => {
    const [graphs, setGraphs] = useState([]);
    
    useEffect(() => {
        let graph = [];
        if (data.length < 1) setGraphs([]);
        else {
            data["data"].forEach(element => {
                let item = [
                    <EuiFlexItem>
                        <ResultChart 
                            data={element}
                        />
                    </EuiFlexItem>
                ]
                if (!graph.includes(item)) graph.push(item);
            setGraphs(graph)
            })
        }
    }, []);

    return (
        <EuiFlexGrid columns={2} gutterSize="s">
            {graphs}
        </EuiFlexGrid>
    )
}