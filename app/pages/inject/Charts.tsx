import "@elastic/charts/dist/theme_dark.css";
import { EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { useEffect, useState } from "react";
import BarChart from "./BarChart";



// TODO: Implement the call to the API for the aggregations
export default ({startDate, endDate, attributeList, index, dataType} : any) => {
    const [graphs, setGraphs] = useState([]);

    useEffect(() => {
        let graph = [];
        attributeList.forEach(element => {
            if ('checked' in element) {
                let item = [
                    <EuiFlexGroup>
                        <EuiFlexItem>
                        <BarChart 
                            startDate={startDate}
                            endDate={endDate} 
                            attribute={element["value"]}
                            index={index}
                            title={element["label"]}
                        />
                      </EuiFlexItem>
                  </EuiFlexGroup>

                ]
                if (!graphs.includes(item)) {
                    graph.push(item);
                }
                // console.log(element);
            }
            setGraphs(graph);
        });
    }, [attributeList]);


  return (
        <EuiFlexGroup>
            {graphs}
        </EuiFlexGroup>
    )
  }