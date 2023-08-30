
export const handleTabContent = (tabId : string, 
    ) => {
    
    let component;

    switch(tabId) {
        case 'summary':
            console.log("Summary")
            // component = (<SummaryTab />);
            break;
        
        case 'results':
          
            break;

        case 'explainability':
            break;

        case 'subPopulationAnalysis':
            break;

        case 'modelPerformance':
            
            break;

        case 'features':
            
            break;

        case 'modelDetails':
            
            break;
    
        default:
           
            break;
    }

    return component;
}