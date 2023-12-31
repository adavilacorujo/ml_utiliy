import { ReactElement, useContext } from 'react';
import { Html, Head, Main, NextScript } from 'next/document'
import { defaultTheme, Theme, themeConfig } from '../lib/theme';

const pathPrefix = process.env.PATH_PREFIX;

function themeLink(theme: Theme): ReactElement {
  let disabledProps = {};

  if (theme.id !== defaultTheme) {
    disabledProps = {
      disabled: true,
      'aria-disabled': true,
    };
  }

  return (
    <link
      rel="stylesheet"
      href={`${pathPrefix}/${theme.publicPath}`}
      data-name="eui-theme"
      data-theme-name={theme.name}
      data-theme={theme.id}
      key={theme.id}
      {...disabledProps}
    />
  );
}

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {themeConfig.availableThemes.map(each => themeLink(each))}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
