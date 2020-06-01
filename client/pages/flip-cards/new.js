/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import withData from '../../lib/apollo';
import Layout from '../../components/Layout';
import FlipCardCreateForm from '../../components/FlipCardCreateForm';

export default withData(() => (
  <Layout title="Create New Flip Card">
    <FlipCardCreateForm />
  </Layout>
));
