/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, {
  useEffect,
} from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import {
//   makeStyles,
// } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import FlipCard from 'client/components/FlipCard';

import styles from './FlipCardSingle.module.scss';

const GET_FLIP_CARD = gql`
  query FlipCard($id: ID! ) {
    FlipCard(where: { id: $id }) {
      id
      title
      frontTitle
      frontImage
      backTitle
      backImage
      description
      createdAt
    }
  }
`;

// const useStyles = makeStyles(() => ({
//   root: {},
// }));

function FlipCardFetch({
  id,
  // className,
  // ...rest
}) {
  // const classes = useStyles();
  const {
    // eslint-disable-next-line no-unused-vars
    loading, error, data, fetchMore,
  } = useQuery(GET_FLIP_CARD, {
    // notifyOnNetworkStatusChange: true,
    variables: { id },
  });

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [error]);

  return (
    <div className={styles['flip-card-wrapper']}>
      <FlipCard
        card={data.FlipCard}
      />
    </div>
  );
}

FlipCardFetch.propTypes = {
  // className: PropTypes.string,
};

export default FlipCardFetch;
