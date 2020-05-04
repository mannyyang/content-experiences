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
  mutation AddFlipCard($front: String, $back: String, $description: String) {
    createFlipCard(data: { 
      front: $front,
      back: $back,
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

function FlipCardList() {
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
        front: formVals.front,
        back: formVals.back,
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
        <Label for="frontText">Front</Label>
        <Input name="front" id="frontText" placeholder="Front Text" onChange={handleChange} value={formVals.front} />
      </FormGroup>
      <FormGroup>
        <Label for="backText">Back</Label>
        <Input name="back" id="backText" placeholder="Back Text" onChange={handleChange} value={formVals.back} />
      </FormGroup>
      <Button onClick={handleClick}>Add Flip Card</Button>
    </Form>
  );
}

export default FlipCardList;
