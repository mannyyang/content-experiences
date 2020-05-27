import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
// import cx from 'classnames';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
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

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setFormVals({
        ...formVals,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormVals({
        ...formVals,
        [e.target.name]: null,
      });
    }
  };

  const uploadImage = (image, type) => {
    const data = new FormData();
    data.append('file', image);

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
        console.log(formVals);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [error]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="frontTitle">Front</Label>
          <Input
            name="frontTitle"
            id="frontTitle"
            placeholder="the flip card title - typically a question"
            onChange={handleChange}
            value={formVals.frontTitle}
          />
          <Label for="frontImage">Background Image</Label>
          <Input
            name="frontImage"
            onChange={handleChangeImage}
            type="file"
          />
          <button
            type="button"
            onClick={() => uploadImage(formVals.frontImage, 'frontImage')}
          >
            Upload to preview
          </button>
        </FormGroup>
        <FormGroup>
          <Label for="backTitle">Back</Label>
          <Input
            name="backTitle"
            id="backTitle"
            placeholder="the flip card title - typically an answer"
            onChange={handleChange}
            value={formVals.backTitle}
          />
          <Label for="backImage">Background Image</Label>
          <Input
            name="backImage"
            onChange={handleChangeImage}
            type="file"
          />
          <button
            type="button"
            onClick={() => uploadImage(formVals.backImage, 'backImage')}
          >
            Upload to preview
          </button>
        </FormGroup>
        <Button onClick={handleClick}>Add Flip Card</Button>
      </Form>
      <div
        style={{
          flexDirection: 'row',
        }}
      >
        <FlipCardCreateFormPreviewCard
          title={formVals.frontTitle}
          image={
            formVals.frontImage !== null ? formVals.frontImage : null
          }
          type="front"
        />
        <FlipCardCreateFormPreviewCard
          title={formVals.backTitle}
          image={
            formVals.backImage !== null ? formVals.backImage : null
          }
          type="back"
        />
      </div>
    </div>
  );
}

export default FlipCardCreateForm;
