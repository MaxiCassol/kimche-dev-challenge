import { fetchDataByFILTERS, fetchDataByPAGE } from '../Api';

const handleFilter = async (filterStatus, filterSpecies, filterGender, currentPage, setCharacters, setCurrentPage, setTotalPages, setLoading) => {
  try {
    setLoading(true);

    let data;

    if (filterStatus || filterGender || filterSpecies) {
      data = await fetchDataByFILTERS(filterStatus, filterSpecies, filterGender);
    } else {
      data = await fetchDataByPAGE(currentPage);
    }

    if (data.results) {
      setCharacters(data.results);
      setTotalPages(data.info.pages);
      setCurrentPage(1);
    } else {
      console.error('Datos no válidos:', data);
    }
  } catch (error) {
    console.error('Error al obtener datos:', error);
  } finally {
    setLoading(false);
  }
};

export default handleFilter;
