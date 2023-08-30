import React, { useEffect, useState } from 'react';
import { EuiBreadcrumb, EuiButton, EuiIcon, EuiPage, EuiPageTemplate, EuiTab } from '@elastic/eui';
import { useRouter } from 'next/router';
import { ModelTable } from './ModelTable';
import { handleTabSelector } from './utils/handleTabs';
import { handleTabContent } from './utils/handleContent';
import { SummaryTab } from './tabs/summary/SummaryTab';
import { FeaturesTab } from './tabs/features/FeaturesTab';
import { ModelDetails } from './tabs/modelDetails/modelDetails';
import { ExplainabilityTab } from './tabs/explainability/ExplainabilityTab';
import { ResultsTab } from './tabs/results/ResultsTab';
import { ModelPerformanceTab } from './tabs/modelPerformance/ModelPerformanceTab';

export const ModelPage = () => {
  const [showBottomBar, setshowBottomBar] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [model, setModelName] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [isTableLoading, setTableLoading] = useState(true);
  const [content, setContent] = useState<React.Component>();
  const [summary, setSummaryVisible] = useState(true);
  const [results, setResultsVisible] = useState(false);
  const [explainability, setExplainability] = useState(false);
  const [subPopulationAnalysis, setSubPopulationAnalysis] = useState(false);
  const [modelPerformance, setModelPerformance] = useState(false);
  const [features, setFeatures] = useState(false);
  const [modelDetails, setModelDetails] = useState(false);

  const handleTabs = (tabId : string) => {
    handleTabSelector(tabId,
      setSummaryVisible,
      setResultsVisible,
      setExplainability,
      setSubPopulationAnalysis,
      setModelPerformance,
      setFeatures,
      setModelDetails
      );
  }


  const router = useRouter();

  useEffect(() => {
    const { router_model } = router.query;
    
    if (typeof router_model !== 'undefined') {
      setShowModel(true);
      setModelName(router_model.toString());
    }
    else {
      setShowModel(false);
    }
  }, [router.query]);

  let tableViewer = (
    <>
    <EuiPageTemplate
      template='centeredContent'
      paddingSize='m'
      pageHeader={{
        pageTitle: 'List of models',
        children: [
          <p>Use this page to select a model to visualize results.</p>
        ],
        rightSideItems: [
          <EuiButton iconType={'refresh'} onClick={() => setRefresh(!refresh)}>
            Refresh list
          </EuiButton>
        ]
      }}
    >
    <ModelTable refresher={refresh} />
    </EuiPageTemplate>
    </>

  )

  let modelViewer = (
    <EuiPageTemplate
    template="default"
    paddingSize="m"
    bottomBar={showBottomBar ? 'Bottom bar' : undefined}
    pageHeader={{
      iconType: 'dataVisualizer',
      pageTitle: `${model}`,
      rightSideItems: [
        <EuiButton iconType={'arrowLeft'} onClick={() => router.push('/models')}>
          Model List
        </EuiButton>
        ],
      tabs: [
        // Refer to this page for intuition https://knowledge.dataiku.com/latest/ml-analytics/model-results/concept-visual-model-summary.html
        /**
         * Summary tab will have model id, type, classes (anomaly/benign), backend info,
         * algorithm, trained on, columns used, model parameters
         */
        { label: 'Summary', isSelected: summary, onClick: (e) => handleTabs('summary')}, // Test API
        /**
         * Results page will have the graphs to visualize the results
         */
        { label: 'Results', isSelected: results, onClick: (e) => handleTabs('results')},
        /**
         * Explainability tab will have feature importance graph
         */
        { label: 'Explainability', isSelected: explainability, onClick: (e) => handleTabs('explainability')}, // Feature importance graph
        /**
         * Sub Population Analysis will produce insights per attribute
         */
        { label: 'Sub Population Analysis', isSelected: subPopulationAnalysis, onClick: (e) => handleTabs('subPopulationAnalysis')}, // results per attributes
        /**
         * Model Performance tab will produce metrics for unsupervised learning
         */
        { label: 'Model Performance', isSelected: modelPerformance, onClick: (e) => handleTabs('modelPerformance')}, // TODO: idenify methods for unsup metrics
        /**
         * Features tab will produce a list of the features used and their data type
         * Categorical vs Numerical
         */
        { label: 'Features', isSelected: features, onClick: (e) => handleTabs('features')}, // Test API
        /**
         * Model Details will have algorithm, number of trees, hyper-parameters,
         * and training data used
         */
        {
          label: 'Model Details', isSelected: modelDetails, onClick: (e) => handleTabs('modelDetails') //Test API
        },
      ],
    }}
  >
    {/* <ModelTable /> */}

    {/* const [summary, setSummaryVisible] = useState(true);
  const [results, setResultsVisible] = useState(false);
  const [explainability, setExplainability] = useState(false);
  const [subPopulationAnalysis, setSubPopulationAnalysis] = useState(false);
  const [modelPerformance, setModelPerformance] = useState(false);
  const [features, setFeatures] = useState(false);
  const [modelDetails, setModelDetails] = useState(false); */}
    {
    summary ? <SummaryTab modelName={model} /> : 
    features ? <FeaturesTab modelName={model} /> :
    modelDetails ? <ModelDetails modelName={model}/> :
    explainability ? <ExplainabilityTab modelName={model} /> :
    results ? <ResultsTab modelName={model} /> :
    modelPerformance ? <ModelPerformanceTab modelName={model} /> :
      ''
    }
  </EuiPageTemplate>
  )

  return (
   <>
      {showModel ? modelViewer : tableViewer}
   </>
  );
};