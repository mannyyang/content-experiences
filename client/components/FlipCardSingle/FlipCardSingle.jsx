import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import FlipCard from '../FlipCard';
import styles from './FlipCardSingle.module.scss';

const GET_FLIP_CARD = gql`
  query FlipCard {
    FlipCard(where: { id: "5ed44ab06bbae4464a2bfd05" }) {
      id
      frontTitle
      frontImage
      backTitle
      backImage
      description
      createdAt
    }
  }
`;

function FlipCardSingle() {
  const {
    // eslint-disable-next-line no-unused-vars
    loading, error, data, fetchMore,
  } = useQuery(GET_FLIP_CARD, {
    // notifyOnNetworkStatusChange: true,
    variables: { id: '5ed44ab06bbae4464a2bfd05' },
  });

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [error]);

  return (
    data ? (
      <div className={styles['flip-card-wrapper']}>
        <FlipCard
          card={data.FlipCard}
        />
      </div>
    ) : null
  );
}

export default FlipCardSingle;
