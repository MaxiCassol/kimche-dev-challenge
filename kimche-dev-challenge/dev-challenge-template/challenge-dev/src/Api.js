// Datos de la API externa
// queries.graphql
import client from './components/graphql/graphqlClient';
import {GET_CHARACTERS} from './components/graphql/queries'

export default async function fetchDataWithOptions(
    currentPage,
    filterStatus,
    filterSpecies,
    filterGender,
    searchTerm
    ) {

    try {
        let variables;

    // Verifica si searchTerm es un número o una cadena
    if (isNaN(searchTerm)) {
      // Si es una cadena, busca por nombre
      variables = {
        page: currentPage,
        name: searchTerm,
        status: filterStatus,
        species: filterSpecies,
        gender: filterGender,
      };
    } else {
      // Si es un número, busca por ID
      variables = {
        page: currentPage,
        id: searchTerm,
        status: filterStatus,
        species: filterSpecies,
        gender: filterGender,
      };
    }

    const response = await client.query({
      query: GET_CHARACTERS,
      variables,
    });

        return response.data.characters;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        if (error.response) {
            console.error('Respuesta del servidor:', error.response.data);
        }
        throw error;
    }
}

// export async function fetchDataWithOptions(currentPage, filterStatus, filterSpecies, filterGender, searchTerm) {
//     try {
//         let url = `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${searchTerm}&status=${filterStatus}&species=${filterSpecies}&gender=${filterGender}`

//         const response = await fetch(url);  
//         const data = await response.json();
//         return data;

//     } catch (error) {
//         console.error('Error al obtener datos:', error);
//         throw error; 
//     }
// }

// export async function fetchDataByID(id){
//     const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        
//         if (!response.ok) {
//             throw new Error('No se pudo obtener datos de la API externa');
//         }
//         const data = await response.json();
//         return data;
// }

export async function fetchAllSpecies() {
    let allData = [];
    for (let i = 1; i <= 42; i++) {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${i}`);
        
        if (!response.ok) {
            throw new Error('No se pudo obtener datos de la API externa');
        }
    
        const datos = await response.json();
        allData = allData.concat(datos.results);
    }
    const uniqueSpecies = new Set();
    allData.forEach((character) => {
        if (character.species) {
            uniqueSpecies.add(character.species);
        }
    });
    const speciesList =  Array.from(uniqueSpecies)
    return speciesList;

}