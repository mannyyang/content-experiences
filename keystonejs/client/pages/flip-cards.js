import withData from '../lib/apollo';

import FlipCardList from '../components/FlipCardList';

export default withData(() => {
  return (
    <div className="container">
      <FlipCardList />
    </div>
  )
});
