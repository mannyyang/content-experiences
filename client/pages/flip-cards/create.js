/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import withData from 'client/lib/apollo';
import FlipCardCreate from 'client/components/projects/ProjectCreateView';

export default withData(() => (
  <FlipCardCreate />
));
