import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Flex } from 'reflexbox';
import FlipCard from '../FlipCard';

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

function FlipCardGrid() {
  const {
    // eslint-disable-next-line no-unused-vars
    loading, error, data, fetchMore,
  } = useQuery(GET_FLIP_CARDS, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [error]);

  return (
    <Flex
      flexWrap="wrap"
      flex="1"
    >
      {
        data && data.allFlipCards.map((card) => (
          <FlipCard
            key={card.id}
            card={card}
          />
        ))
      }
    </Flex>
  );
}

export default FlipCardGrid;
