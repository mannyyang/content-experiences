import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  Button, Form, FormGroup, Label, Input, FormText, Card,
} from 'reactstrap';
import Flippy, { FrontSide, BackSide } from '../FlipCard';
import styles from './FlipCardList.module.scss';

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
  const [
    addFlipCard,
    // { data: mutatedData },
  ] = useMutation(
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
    <div>
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
      {
        data && data.allFlipCards.map((card) => (
          <div key={card.id} className={styles.flipCard}>
            <Flippy
              flipOnHover={false} // default false
              flipOnClick // default false
              flipDirection="horizontal" // horizontal or vertical
                // ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                // if you pass isFlipped prop component will be controlled component.
                // and other props, which will go to div
              style={{ width: '200px', height: '200px' }}
            >
              <FrontSide
                style={{
                  backgroundColor: '#41669d',
                }}
              >
                {card.front}
              </FrontSide>
              <BackSide
                style={{ backgroundColor: '#175852' }}
              >
                {card.back}
              </BackSide>
            </Flippy>
          </div>
        ))
      }
    </div>
  );
}

export default FlipCardList;
