import { gql } from "@apollo/client";

export const GET_SECTIONS = gql`
  {
    sections {
      _id
      name
      categories {
        _id
        name
      }
    }
  }
`;
