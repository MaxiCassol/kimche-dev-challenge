import { fetchDataByNAME, fetchDataByID, fetchDataWithOptions } from '../Api';

export const searchHandler = async (searchTerm, setCharacters, setTotalPages, setSearchTerm, setCurrentPage) => {
  if (searchTerm) {
    setCurrentPage(1);
    try {
      let data;
      if (isNaN(searchTerm)) {
        data = await fetchDataByNAME(searchTerm);
        console.log('data: ' + data);
      } else {
        data = await fetchDataByID(searchTerm);
        console.log('serach x num');
        console.log(data);
      }

      if (data.results) {
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      }
      if (data) {
        setCharacters([data]);
        setTotalPages(1);
      }
    } catch {
      console.error('Datos no válidos:');
    } finally {
      setSearchTerm('');
    }
  }

  // if (searchTerm.length === 0) {
  //   const data = await fetchDataWithOptions();
  //   if (data && data.results) {
  //     setCharacters(data.results);
  //     setTotalPages(data.info.pages);
  //   }
  // }
};
