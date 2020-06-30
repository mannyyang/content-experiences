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

  console.log(data);

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
            md={3}
          >
            <Box mb={3}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
              >
                Title
              </Typography>
              <Typography
                variant="h6"
                color="textPrimary"
              >
                {data?.FlipCard.title}
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
              >
                Description
              </Typography>
              <Typography
                variant="h6"
                color="textPrimary"
              >
                {data?.FlipCard.description}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
          >
            <Typography
              variant="subtitle2"
              color="textSecondary"
            >
              Flip Card
            </Typography>
            {
              data ? (
                <FlipCard
                  card={data.FlipCard}
                />
              ) : null
            }
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

FlipCardFetch.propTypes = {
  project: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default FlipCardFetch;
