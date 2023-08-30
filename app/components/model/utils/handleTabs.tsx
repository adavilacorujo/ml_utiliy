export const handleTabSelector = (tabId : string, 
    setSummaryVisible : React.Dispatch<React.SetStateAction<boolean>>, 
    setResultsVisible : React.Dispatch<React.SetStateAction<boolean>>,
    setExplainability : React.Dispatch<React.SetStateAction<boolean>>, 
    setSubPopulationAnalysis : React.Dispatch<React.SetStateAction<boolean>>, 
    setModelPerformance : React.Dispatch<React.SetStateAction<boolean>>,
    setFeatures : React.Dispatch<React.SetStateAction<boolean>>,
    setModelDetails : React.Dispatch<React.SetStateAction<boolean>>
    ) => {
    
    switch(tabId) {
        case 'summary':
            setSummaryVisible(true);
            setResultsVisible(false);
            setExplainability(false);
            setSubPopulationAnalysis(false);
            setModelPerformance(false);
            setFeatures(false);
            setModelDetails(false);
            break;
        
        case 'results':
            setSummaryVisible(false);
            setResultsVisible(true);
            setExplainability(false);
            setSubPopulationAnalysis(false);
            setModelPerformance(false);
            setFeatures(false);
            setModelDetails(false);
            break;

        case 'explainability':
            setSummaryVisible(false);
            setResultsVisible(false);
            setExplainability(true);
            setSubPopulationAnalysis(false);
            setModelPerformance(false);
            setFeatures(false);
            setModelDetails(false);
            break;

        case 'subPopulationAnalysis':
            setSummaryVisible(false);
            setResultsVisible(false);
            setExplainability(false);
            setSubPopulationAnalysis(true);
            setModelPerformance(false);
            setFeatures(false);
            setModelDetails(false);
            break;

        case 'modelPerformance':
            setSummaryVisible(false);
            setResultsVisible(false);
            setExplainability(false);
            setSubPopulationAnalysis(false);
            setModelPerformance(true);
            setFeatures(false);
            setModelDetails(false);
            break;

        case 'features':
            setSummaryVisible(false);
            setResultsVisible(false);
            setExplainability(false);
            setSubPopulationAnalysis(false);
            setModelPerformance(false);
            setFeatures(true);
            setModelDetails(false);
            break;

        case 'modelDetails':
            setSummaryVisible(false);
            setResultsVisible(false);
            setExplainability(false);
            setSubPopulationAnalysis(false);
            setModelPerformance(false);
            setFeatures(false);
            setModelDetails(true);
            break;
    
        default:
            setSummaryVisible(false);
            setResultsVisible(false);
            setExplainability(false);
            setSubPopulationAnalysis(false);
            setModelPerformance(false);
            setFeatures(false);
            setModelDetails(false);
            break;
    }
}