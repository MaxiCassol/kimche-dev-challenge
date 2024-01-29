import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters(
    $page: Int = 1
    $name: String = ""
    $status: String = ""
    $species: String = ""
    $gender: String = ""
  ) {
    characters(
      page: $page
      filter: {
        name: $name
        status: $status
        species: $species
        gender: $gender
      }
    ) {
      info {
        pages
      }
      results {
        id
        name
        status
        species
        gender
        image
        location {
          name
        }
        origin {
          name
        }
      }
    }
  }
`;
