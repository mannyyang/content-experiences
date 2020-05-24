import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
// import cx from 'classnames';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

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
    $frontTitle: String,
    $frontImage: String,
    $backTitle: String,
    $backImage: String,
    $description: String,
  ) {
    createFlipCard(data: { 
      frontTitle: $frontTitle,
      frontImage: $frontImage,
      backTitle: $backTitle,
      backImage: $backImage,
      description: $description,
    }) {
      id
      front
      back
      description
      createdAt
    }
  }
`;

function FlipCardCreateForm() {
  const [formVals, setFormVals] = useState({});
  const [addFlipCard, { error }] = useMutation(
    ADD_FLIP_CARD,
    {
      // After a new one is added, update the cache to include the newly added
      // flip card.
      update(cache, { data: { createFlipCard } }) {
        const { allFlipCards } = cache.readQuery({ query: GET_FLIP_CARDS });

        cache.writeQuery({
          query: GET_FLIP_CARDS,
          data: { allFlipCards: allFlipCards.concat([createFlipCard]) },
        });
      },
    },
  );

  const handleClick = () => {
    addFlipCard({
      variables: {
        frontTitle: formVals.frontTitle,
        backTitle: formVals.backTitle,
        description: '',
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormVals({
      ...formVals,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [error]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="frontTitle">Front Title</Label>
        <Input name="frontTitle" id="frontTitle" placeholder="Front Title" onChange={handleChange} value={formVals.frontTitle} />
      </FormGroup>
      <FormGroup>
        <Label for="backTitle">Back</Label>
        <Input name="backTitle" id="backTitle" placeholder="Back Title" onChange={handleChange} value={formVals.backTitle} />
      </FormGroup>
      <Button onClick={handleClick}>Add Flip Card</Button>
    </Form>
  );
}

export default FlipCardCreateForm;
