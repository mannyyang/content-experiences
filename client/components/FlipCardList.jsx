import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Button, Form, FormGroup, Label, Input, FormText, Card } from 'reactstrap';

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
    }
  }
`;

function FlipCardList() {
  // const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
  //   variables: { skip: 0, first: POSTS_PER_PAGE },
  //   notifyOnNetworkStatusChange: true
  // });
  const [formVals, setFormVals] = useState({});
  const [addFlipCard, { data: mutatedData }] = useMutation(ADD_FLIP_CARD);

  const handleClick = () => {
    addFlipCard({ variables: { 
      front: formVals.front,
      back: formVals.back,
      description: '',
    }});
    error && console.log(error);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleChange = (e) => {
    setFormVals({
      ...formVals,
      [e.target.name]: e.target.value,
    })
  }

  const {
    loading, error, data, fetchMore,
  } = useQuery(GET_FLIP_CARDS, {
    notifyOnNetworkStatusChange: true, 
  });

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="frontText">Email</Label>
          <Input name="front" id="frontText" placeholder="Front Text" onChange={handleChange} value={formVals.front} />
        </FormGroup>
        <FormGroup>
          <Label for="backText">Email</Label>
          <Input name="back" id="backText" placeholder="Back Text" onChange={handleChange} value={formVals.back} />
        </FormGroup>
        <Button>Add Flip Card</Button>
      </Form>
      {
        data && data.allFlipCards.map(card => {
          return (
            <Card 
              className="my-4 p-4"
            >
              {card.front}
              //
              {card.back}
            </Card>
          ) ;
        })
      }
    </div>
  );
}

// function loadMorePosts(data, fetchMore) {
//   return fetchMore({
//     variables: {
//       skip: data.length
//     },
//     updateQuery: (previousResult, { fetchMoreResult }) => {
//       if (!fetchMoreResult) {
//         return previousResult;
//       }
//       return Object.assign({}, previousResult, {
//         // Append the new posts results to the old one
//         allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts]
//       });
//     }
//   });
// }

export default FlipCardList;
