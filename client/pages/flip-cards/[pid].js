/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useRouter } from 'next/router';
import withData from '../../lib/apollo';
import FlipCardSingle from '../../components/FlipCardSingle';

export default withData(() => {
  const router = useRouter();

  console.log(router?.query);

  return (
    <div>
      <FlipCardSingle />
    </div>
  );
});
