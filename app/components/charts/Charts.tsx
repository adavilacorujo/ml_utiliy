import "@elastic/charts/dist/theme_dark.css";
import { EuiFlexGrid, EuiFlexItem } from "@elastic/eui";
import { useEffect, useState } from "react";
import { BarChart } from "./BarChart";

export default  ({startDate, endDate, attributeList, index, dataType, filters, setFilters} : any) => {
    const [graphs, setGraphs] = useState([]);

    useEffect(() => {
        let graph = [];
        if (attributeList.length < 1) setGraphs([]);
        else {
            attributeList.forEach(element => {
                    let item = [
                            <EuiFlexItem>
                            <BarChart
                                startDate={startDate}
                                endDate={endDate} 
                                attribute={element["value"]}
                                index={index}
                                title={element["label"]}
                                dataType={dataType}
                                filters={filters}
                                setFilters={setFilters}

                            />
                        </EuiFlexItem>
                    ]
                    if (!graphs.includes(item)) graph.push(item);
                setGraphs(graph);
            });
        }   
    }, [startDate, endDate, index, dataType, attributeList, filters]);


  return (
        <EuiFlexGrid columns={2} gutterSize="s">
            {graphs}
        </EuiFlexGrid>
    )
  }