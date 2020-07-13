/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useRouter } from 'next/router';
import FlipCardSingle from 'client/components/projects/ProjectDetailsView';
import withData from 'client/lib/apollo';

export default withData(() => {
  const router = useRouter();

  return (
    <FlipCardSingle id={router?.query?.pid} />
  );
});
