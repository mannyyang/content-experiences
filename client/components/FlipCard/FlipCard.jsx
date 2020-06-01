import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import cx from 'classnames';
// eslint-disable-next-line import/no-named-as-default
import Flippy, { FrontSide, BackSide } from '../Flippy';

import styles from './FlipCard.module.scss';

const DELETE_FLIP_CARD = gql`
  mutation deleteFlipCard($id: ID!) {
    deleteFlipCard(id: $id) {
      id
      front
      back
      description
      createdAt
    }
  }
`;

const GET_FLIP_CARDS = gql`
  query allFlipCards {
    allFlipCards {
      id
      front
      frontTitle
      back
      backTitle
      description
      createdAt
    }
    _allFlipCardsMeta {
      count
    }
  }
`;

function FlipCard({ card }) {
  const [deleteFlipCard, { error }] = useMutation(
    DELETE_FLIP_CARD,
    {
      // After a new one is added, update the cache to include the newly added
      // flip card.
      update(cache) {
        const { allFlipCards } = cache.readQuery({ query: GET_FLIP_CARDS });

        cache.writeQuery({
          query: GET_FLIP_CARDS,
          data: {
            allFlipCards: allFlipCards.filter(
              (flipCard) => flipCard.id !== card.id,
            ),
          },
        });
      },
    },
  );

  const handleClick = (id) => {
    deleteFlipCard({ variables: { id } });
  };

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [error]);

  return (
    <div
      key={card.id}
      className={cx(styles.flipCard, 'p-2')}
    >
      <button
        onClick={() => handleClick(card.id)}
        type="button"
      >
        Delete
      </button>
      <Flippy
        flipOnHover={false} // default false
        flipOnClick // default false
        flipDirection="horizontal" // horizontal or vertical
        style={{ width: '300px', height: '300px' }}
      >
        <FrontSide
          style={{
            backgroundColor: '#41669d',
            backgroundImage: `url('${card.frontImage}')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          {card.frontTitle}
        </FrontSide>
        <BackSide
          style={{
            backgroundColor: '#175852',
            backgroundImage: `url('${card.backImage}')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          {card.backTitle}
        </BackSide>
      </Flippy>
    </div>
  );
}

FlipCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  card: PropTypes.object.isRequired,
};

export default FlipCard;
