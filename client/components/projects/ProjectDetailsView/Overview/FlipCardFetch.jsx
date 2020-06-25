/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, {
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  // Chip,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
// import { Flex } from 'reflexbox';
import FlipCard from 'client/components/FlipCard';

const GET_FLIP_CARD = gql`
  query FlipCard($id: ID! ) {
    FlipCard(where: { id: $id }) {
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

const useStyles = makeStyles((theme) => ({
  root: {},
  markdown: {
    fontFamily: theme.typography.fontFamily,
    '& p': {
      marginBottom: theme.spacing(2),
    },
  },
}));

function FlipCardFetch({
  id,
  project,
  className,
  ...rest
}) {
  const classes = useStyles();
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
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Typography
              variant="subtitle2"
              color="textSecondary"
            >
              Project Name
            </Typography>
            <Typography
              variant="h6"
              color="textPrimary"
            >
              {project.title}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
          >
            Description
          </Typography>
        </Box>
        {
          data ? (
            <FlipCard
              card={data.FlipCard}
            />
          ) : null
        }
      </CardContent>
    </Card>
  );
}

FlipCardFetch.propTypes = {
  project: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default FlipCardFetch;
