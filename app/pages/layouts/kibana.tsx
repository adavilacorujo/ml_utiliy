import { FunctionComponent } from 'react';
import CollapsibleNav from './kibana_collapsible_nav';
import { kibanaLayoutStyles } from './kibana.styles';
import {
  EuiPageTemplate,
  EuiPageTemplateProps,
  EuiPageHeaderProps,
  EuiSpacer,
} from '@elastic/eui';

const requiredProps = {
  'aria-label': 'aria-label',
  className: 'testClass1 testClass2',
  'data-test-subj': 'test subject string',
};


interface KibanaLayoutProps extends EuiPageTemplateProps {
  pageHeader: EuiPageHeaderProps;
}

const KibanaLayout: FunctionComponent<KibanaLayoutProps> = ({
  children,
  pageHeader,
  ...rest
}) => {
  const styles = kibanaLayoutStyles();
  return (
    <div css={styles.mainWrapper}>
      <CollapsibleNav />
      <EuiSpacer/>
      <EuiSpacer/>
      <EuiSpacer/>
      <EuiSpacer/>
      <EuiSpacer/>
      <div css={styles.contentWrapper}>
        <EuiPageTemplate
          restrictWidth={false}
          // panelled={false}
          bottomBar={true}
          // {...rest}
          pageHeader={{...pageHeader}}
          paddingSize='m'
          // restricWidth = {100}
          >
          {children}
          {/* <EuiPageTemplate.pageHeader {...pageHeader} /> */}
          {/* <EuiPageTemplate.Section>{children}</EuiPageTemplate.Section> */}
        </EuiPageTemplate>
      </div>
    </div>
  );
};

export default KibanaLayout;


// import { FunctionComponent } from 'react';
// import CollapsibleNav from './kibana_collapsible_nav';
// import { kibanaLayoutStyles } from './kibana.styles';
// import {
//   EuiPageTemplate,
//   EuiPageTemplateProps,
//   EuiPageContentHeaderProps,
// } from '@elastic/eui';

// interface KibanaLayoutProps extends EuiPageTemplateProps {
//   pageHeader: EuiPageContentHeaderProps;
// }

// const KibanaLayout: FunctionComponent<KibanaLayoutProps> = ({
//   children,
//   pageHeader,
//   ...rest
// }) => {
//   const styles = kibanaLayoutStyles();
//   return (
//     <div css={styles.mainWrapper}>
//       <CollapsibleNav />

//       <div css={styles.contentWrapper}>
//         <EuiPageTemplate
//           restrictWidth
//           panelled={false}
//           bottomBorder={true}
//           {...rest}>
//           <EuiPageTemplate.Header {...pageHeader} />
//           <EuiPageTemplate.Section>{children}</EuiPageTemplate.Section>
//         </EuiPageTemplate>
//       </div>
//     </div>
//   );
// };

// export default KibanaLayout;
