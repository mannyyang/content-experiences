/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import withData from '../../lib/apollo';
import FlipCardCreateForm from '../../components/FlipCardCreateForm';

export default withData(() => (
  <div className="container">
    <div className="title">Create New Flip Card</div>
    <FlipCardCreateForm />
  </div>
));
