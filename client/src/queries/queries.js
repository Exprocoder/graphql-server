import { gql } from 'apollo-boost';

const getBooksQuery = gql(`
  query {
    allBook {
      id
      name
    }
  }
`);

const getAuthorsQuery = gql(`
    query {
        allAuthor {
        id
        name
        }
    }
`);

export { getAuthorsQuery, getBooksQuery };