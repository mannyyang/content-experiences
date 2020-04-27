import React from 'react';
import withData from '../lib/apollo';
import FlipCardList from '../components/FlipCardList';

export default withData(() => (
  <div className="container">
    <FlipCardList />
  </div>
));
