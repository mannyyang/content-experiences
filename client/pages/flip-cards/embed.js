/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();

  console.log(router?.query);

  return (
    <div>
      <iframe
        src="/flip-cards/1233"
        title="embed"
        height="500px"
        width="600px"
      />
    </div>
  );
};
