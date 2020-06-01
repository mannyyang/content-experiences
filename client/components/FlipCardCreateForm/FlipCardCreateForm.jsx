import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
// import cx from 'classnames';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import FlipCardCreateFormPreviewCard from '../FlipCardCreateFormPreviewCard';

const GET_FLIP_CARDS = gql`
  query allFlipCards {
    allFlipCards {
      id
      front
      back
      description
      createdAt
    }
    _allFlipCardsMeta {
      count
    }
  }
`;

const ADD_FLIP_CARD = gql`
  mutation AddFlipCard(
    $frontTitle: String
    $frontImage: String
    $backTitle: String
    $backImage: String
    $description: String
  ) {
    createFlipCard(
      data: {
        frontTitle: $frontTitle
        frontImage: $frontImage
        backTitle: $backTitle
        backImage: $backImage
        description: $description
      }
    ) {
      id
      front
      back
      description
      createdAt
    }
  }
`;

function FlipCardCreateForm() {
  const [formVals, setFormVals] = useState({
    frontTitle: '',
    backTitle: '',
    frontImage: null,
    backImage: null,
  });

  const [addFlipCard, { error }] = useMutation(ADD_FLIP_CARD, {
    // After a new one is added, update the cache to include the newly added
    // flip card.
    update(cache, { data: { createFlipCard } }) {
      const { allFlipCards } = cache.readQuery({
        query: GET_FLIP_CARDS,
      });

      cache.writeQuery({
        query: GET_FLIP_CARDS,
        data: { allFlipCards: allFlipCards.concat([createFlipCard]) },
      });
    },
  });

  const handleClick = () => {
    addFlipCard({
      variables: {
        frontTitle: formVals.frontTitle,
        backTitle: formVals.backTitle,
        frontImage: formVals.frontImage,
        backImage: formVals.backImage,
        description: '',
      },
    });
  };

  const handleChange = (e) => {
    setFormVals({
      ...formVals,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e, type) => {
    if (e.target.files[0]) {
      const data = new FormData();
      data.append('file', e.target.files[0]);

      fetch('/upload', {
        method: 'POST',
        body: data,
      })
        .then((response) => response.json())
        .then((body) => {
          setFormVals({
            ...formVals,
            [type]: body.location,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [error]);

  return (
    <div>
      <div>
        <Typography variant="h6" gutterBottom>
          Front Side
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="frontTitle"
              fullWidth
              label="Title"
              onChange={handleChange}
              value={formVals.frontTitle}
            />
            <Input
              name="frontImage"
              onChange={(e) => handleChangeImage(e, 'frontImage')}
              type="file"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FlipCardCreateFormPreviewCard
              title={formVals.frontTitle}
              image={formVals.frontImage}
              type="front"
            />
          </Grid>
        </Grid>
      </div>
      <div>
        <Typography variant="h6" gutterBottom>
          Back Side
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="backTitle"
              fullWidth
              label="Title"
              onChange={handleChange}
              value={formVals.backTitle}
            />
            <Input
              name="backImage"
              onChange={(e) => handleChangeImage(e, 'backImage')}
              type="file"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FlipCardCreateFormPreviewCard
              title={formVals.backTitle}
              image={formVals.backImage}
              type="back"
            />
          </Grid>
        </Grid>
      </div>
      <Button onClick={handleClick}>Add Flip Card</Button>
    </div>
  );
}

export default FlipCardCreateForm;
