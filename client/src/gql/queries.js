import { gql } from "apollo-boost";

export const getBooksQuery = gql`
  {
    books {
      id
      name
    }
  }
`;
