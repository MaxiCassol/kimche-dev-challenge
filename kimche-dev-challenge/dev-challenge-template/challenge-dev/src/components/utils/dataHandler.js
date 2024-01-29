import fetchDataWithOptions from "../../Api";

const dataHandler = async (
  currentPage,
  filterStatus,
  filterSpecies,
  filterGender,
  setCharacters,
  setTotalPages,
  setLoading,
  setCurrentPage,
  changedFilters,
  setChangedFilters,
  searchTerm
) => {
  try {
    setLoading(true);
    let data;

    if (changedFilters) {
      data = await fetchDataWithOptions(
        1,
        filterStatus,
        filterSpecies,
        filterGender,
        searchTerm
      );
      setCurrentPage(1);
      setChangedFilters(false);
    } else {
      data = await fetchDataWithOptions(
        currentPage,
        filterStatus,
        filterSpecies,
        filterGender,
        searchTerm
      );
    }

    if (data) {
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } else {
      console.error("Datos no válidos:", data);
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
  } finally {
    setLoading(false);
  }
};

export default dataHandler;

//     const { characters, totalPages } = CharacterList({
//       currentPage,
//       searchTerm,
//       filterStatus,
//       filterSpecies,
//       filterGender,
//     });

//     setCharacters(characters);
//     setTotalPages(totalPages);
//   } catch (error) {
//     console.error('Error al obtener datos!:', error);
//   } finally {
//     setLoading(false);
//   }
// };

// export default dataHandler;

// import { fetchDataWithOptions } from '../Api';

// const dataHandler = async (
//   currentPage,
//   filterStatus,
//   filterSpecies,
//   filterGender,
//   setCharacters,
//   setTotalPages,
//   setLoading,
//   setCurrentPage,
//   changedFilters,
//   setChangedFilters,
//   searchTerm
// ) => {
//   try {
//     setLoading(true);
//     let data;

//     if(changedFilters){
//       data = await fetchDataWithOptions(currentPage = 1, filterStatus, filterSpecies, filterGender, searchTerm);
//       setCurrentPage(1);
//       setChangedFilters(false);
//     }else{
//       data = await fetchDataWithOptions(currentPage, filterStatus, filterSpecies, filterGender, searchTerm);
//     }

//     if (data.results) {
//       setCharacters(data.results);
//       setTotalPages(data.info.pages);

//       } else {
//             console.error('Datos no válidos:', data);
//       }

//   } catch (error) {
//     console.error('Error al obtener datos:', error);
//   } finally {
//     setLoading(false);
//   }
// };

// export default dataHandler;
