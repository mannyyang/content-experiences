/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { create } from 'jss';
import rtl from 'jss-rtl';
import {
  createStyles,
  jssPreset,
  makeStyles,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/core';
import { THEMES } from 'client/constants';
import { createTheme } from 'client/theme';

import 'graphql-voyager/dist/voyager.css';
import '../components/Flippy/styles.css';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%',
    },
    body: {
      height: '100%',
      width: '100%',
    },
    '#root, #__next': {
      height: '100%',
      width: '100%',
    },
  },
}));

export default function MyApp(props) {
  useStyles();

  const { Component, pageProps } = props;
  const settings = {
    direction: 'ltr',
    responsiveFontSizes: true,
    theme: THEMES.ONE_DARK,
  };

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={createTheme(settings)}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        {/* <CssBaseline /> */}
        <StylesProvider jss={jss}>
          <Component {...pageProps} />
        </StylesProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
