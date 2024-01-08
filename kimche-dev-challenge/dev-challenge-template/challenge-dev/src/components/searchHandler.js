import { fetchDataByNAME, fetchDataByID } from '../Api';

export const searchHandler = async (searchTerm, setCharacters, setTotalPages, currentPage) => {
  
    // setCurrentPage(1);
    try {
      let data;
      if (isNaN(searchTerm)) {
        data = await fetchDataByNAME(searchTerm, currentPage);
      } else {
        data = await fetchDataByID(searchTerm);
      }
      
      //Si hay un solo resultado
      if (data) {
        setCharacters([data]);
        setTotalPages(1);
      }
      //Si hay un listado de resultados
      if (data.results) {
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      }
      
    } catch {
      console.error('Datos no válidos:');
    } finally {
      // setSearchTerm('');
    }
};
