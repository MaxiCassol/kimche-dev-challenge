import { fetchAllSpecies } from "../Api";

const uniqueSpecies = async (setAllSpecies) => {
  const data = await fetchAllSpecies();
  if (data) {
    setAllSpecies(data)
  } else {
    console.error('Datos no válidos:', data);
  }
};

export default uniqueSpecies;
