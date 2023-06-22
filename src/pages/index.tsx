import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import { EuiSpacer } from '@elastic/eui';
import Wrapper from '../components/starter/wrapper';
import HomeTemplates from '../components/starter/home_templates';
import HomeWhy from '../components/starter/home_why';
import Overview from '../components/Perceptor/Overview';
import Selection from '../components/Perceptor/Selection';
import QA from '../components/Perceptor/Q_and_A';
// import index from 'kibana/index'
const Index: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Wrapper>
        <Overview />

        <EuiSpacer size="xxl" />
        
        <EuiSpacer size="xxl" />

        <Selection />

        <EuiSpacer size="xxl" />
        <EuiSpacer size="xxl" />
        <EuiSpacer size="xxl" />

        <QA/>

      </Wrapper>
    </>
  );
};

export default Index;
