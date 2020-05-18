/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import fetch from 'isomorphic-fetch';
import dynamic from 'next/dynamic';

import withData from '../lib/apollo';

const Voyager = dynamic(
  () => import('graphql-voyager').then((app) => app.Voyager),
  {
    ssr: false,
  },
);

function introspectionProvider(query) {
  return fetch(`${window.location.origin}/admin/api`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  }).then((response) => response.json());
}

export default withData(() => (
  <div className="container">
    <Voyager introspection={introspectionProvider} />
  </div>
));
