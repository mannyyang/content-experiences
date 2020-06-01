/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useRouter } from 'next/router';
import withData from '../../lib/apollo';
import FlipCardSingle from '../../components/FlipCardSingle';
import Layout from '../../components/Layout';

export default withData(() => {
  const router = useRouter();

  console.log(router?.query);

  return (
    <Layout title="All Flip Cards">
      <FlipCardSingle />
    </Layout>
  );
});
