/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import withData from 'client/lib/apollo';
import FlipCardList from 'client/components/projects/ProjectBrowseView';

export default withData(() => (
  <FlipCardList />
));
