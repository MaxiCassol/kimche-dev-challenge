import { fetchDataByID } from '../Api';

export const searchHandler = async (inputSearch, setCharacters, setTotalPages, setCurrentPage) => {
  
    try {
      let data;
        data = await fetchDataByID(inputSearch);
      
        setCharacters([data]);
        setTotalPages(1);
        setCurrentPage(1);
            
    } catch {
      console.error('Datos no válidos:');
    }
};
