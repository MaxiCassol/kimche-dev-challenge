import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";

const CharacterList = ({
  currentPage,
  searchTerm,
  filterStatus,
  filterSpecies,
  filterGender,
}) => {
  const { data } = useQuery(GET_CHARACTERS, {
    variables: {
      page: currentPage,
      name: searchTerm,
      status: filterStatus,
      species: filterSpecies,
      gender: filterGender,
    },
  });

  return {
    characters: data?.characters?.results || [],
    totalPages: data?.characters?.info?.pages || 0,
  };
};

export default CharacterList;
