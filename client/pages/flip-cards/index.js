/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import withData from '../../lib/apollo';
import FlipCardList from '../../components/FlipCardList';
import Layout from '../../components/Layout';

export default withData(() => (
  <Layout title="All Flip Cards">
    <FlipCardList />
  </Layout>
));
