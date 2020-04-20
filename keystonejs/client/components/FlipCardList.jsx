import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
// import PostUpvoter from "../PostUpvoter";

// import ErrorMessage from "../ErrorMessage";
// import {
//   Container,
//   List,
//   ListItem,
//   ListItemContainer,
//   Num,
//   A,
//   Button
// } from "./styles";

const POSTS_PER_PAGE = 10;

const GET_POSTS = gql`
  query allPosts($first: Int!, $skip: Int!) {
    allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      title
      votes
      url
      createdAt
    }
    _allPostsMeta {
      count
    }
  }
`;

const GET_TODOS = gql`
  query allTodos {
    allTodos {
      id
    }
    _allTodosMeta {
      count
    }
  }
`;

function PostList() {
  // const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
  //   variables: { skip: 0, first: POSTS_PER_PAGE },
  //   notifyOnNetworkStatusChange: true
  // });

  const { loading, error, data, fetchMore } = useQuery(GET_TODOS, {
    notifyOnNetworkStatusChange: true
  });

  return (
    <div>
      <pre>
        { JSON.stringify(data, null, 2) }
      </pre>
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

export default PostList;