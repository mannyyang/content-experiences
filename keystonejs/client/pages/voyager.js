import React, {
  useEffect,
  useState,
} from 'react';
import fetch from 'isomorphic-fetch';
import dynamic from 'next/dynamic';

const Voyager = dynamic(
  () => import('graphql-voyager').then(app => app.Voyager),
  {
    ssr: false
  }
)

import withData from '../lib/apollo';

function introspectionProvider(query) {
  return fetch(window.location.origin + '/admin/api', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query }),
  }).then(response => response.json());
}

export default withData(() => {
  return (
    <div className="container">
      <Voyager introspection={introspectionProvider} />
    </div>
  )
});
