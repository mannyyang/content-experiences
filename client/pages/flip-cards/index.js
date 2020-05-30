/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import withData from '../../lib/apollo';
import FlipCardList from '../../components/FlipCardList';
import Layout from '../../components/Layout';
// import Layout from '../../components/paperbase/Paperbase';

export default withData(() => (
  <Layout>
    <FlipCardList />
  </Layout>
));
