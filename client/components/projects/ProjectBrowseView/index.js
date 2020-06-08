import React, {
  useCallback,
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Container,
  makeStyles,
} from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Header from './Header';
import Filter from './Filter';
import Results from './Results';

const GET_FLIP_CARDS = gql`
  query allFlipCards {
    allFlipCards {
      id
      frontTitle
      frontImage
      backTitle
      backImage
      description
      createdAt
    }
    _allFlipCardsMeta {
      count
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

function ProjectBrowseView() {
  const classes = useStyles();

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
    <div
      className={classes.root}
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Filter />
        </Box>
        <Box mt={6}>
          <Results projects={data?.allFlipCards ?? []} />
        </Box>
      </Container>
    </div>
  );
}

export default ProjectBrowseView;
