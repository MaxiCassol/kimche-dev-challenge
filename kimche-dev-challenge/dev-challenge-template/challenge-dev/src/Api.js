// Datos de la API externa

export async function fetchDataWithOptions(currentPage, filterStatus, filterSpecies, filterGender) {
    let url = `https://rickandmortyapi.com/api/character/?page=${currentPage}&status=${filterStatus}&species=${filterSpecies}&gender=${filterGender}`

    const response = await fetch(url);
    const datos = await response.json();
    
    return datos;
}

export async function fetchDataByID(id){
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        
        if (!response.ok) {
            throw new Error('No se pudo obtener datos de la API externa');
        }
        const datos = await response.json();
        return datos;
}

export async function fetchDataByNAME(searchTerm) {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`);

        if (!response.ok) {
            throw new Error('No se pudo obtener datos de la API externa');
        }
  
      const data = await response.json();
      console.log(data);
  
      if (data.results) {
        const characters = data.results.map(character => ({
          id: character.id,
          name: character.name,
          status: character.status,
          species: character.species,
          gender: character.gender,
          origin: character.origin.name,
          location: character.location.name,
          image: character.image,
        }));
  
        return characters;
      } else {
        throw new Error('No se encontró ningún personaje con ese nombre');
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error; 
    }
  }
// export async function fetchDataByNAME(searchTerm){
//     const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`);
        
//         if (!response.ok) {
//             throw new Error('No se pudo obtener datos de la API externa');
//         }
//         const datos = await response.json();
//         return datos;
// }

// export async function fetchDataByFILTERS(filterStatus, filterSpecies, filterGender){
//     let url = `https://rickandmortyapi.com/api/character/?status=${filterStatus}&species=${filterSpecies}&gender=${filterGender}`;

//     const response = await fetch(url);

//     if (!response.ok) {
//         throw new Error('No se pudo obtener datos de la API externa');
//     }
//         const datos = await response.json();
//         return datos;
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
    // console.log(speciesList);
    return speciesList;

}





// export async function obtenerDatosDeAPI(currentPage, searchTerm, filterStatus) {
//     if(currentPage !== 1){
//         let response = await fetch('https://rickandmortyapi.com/api/character'+ '?page=${currentPage}');
//         if (!response.ok) {
//             throw new Error('No se pudo obtener datos de la API externa');}}

//       // Verifica si el término de búsqueda es un número (para buscar por ID) sino busca por name        
//     if(!isNaN(searchTerm)){
//         let response = await fetch('https://rickandmortyapi.com/api/character'+ searchTerm);
//         if (!response.ok) {
//             throw new Error('No se pudo obtener datos de la API externa');}
//     }else{        
//         let response = await fetch('https://rickandmortyapi.com/api/character'+ '&name=${searchTerm}');
//         if (!response.ok) {
//             throw new Error('No se pudo obtener datos de la API externa');}}

//     if(filterStatus){
//         let response = await fetch('https://rickandmortyapi.com/api/character'+ '?page=${currentPage}');
//         if (!response.ok) {
//             throw new Error('No se pudo obtener datos de la API externa');}        


//     }else{
//         let response = await fetch('https://rickandmortyapi.com/api/character');
//         if (!response.ok) {
//         throw new Error('No se pudo obtener datos de la API externa');
//     }
    
//     const datos = await response.json();
//     return datos;

//     }
// }