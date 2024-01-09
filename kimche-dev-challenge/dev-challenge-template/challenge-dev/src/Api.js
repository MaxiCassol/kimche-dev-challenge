// Datos de la API externa

export async function fetchDataWithOptions(currentPage, filterStatus, filterSpecies, filterGender, searchTerm) {
    try {
        let url = `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${searchTerm}&status=${filterStatus}&species=${filterSpecies}&gender=${filterGender}`
        console.log(url);

        const response = await fetch(url);  
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error; 
    }
}

export async function fetchDataByID(id){
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        
        if (!response.ok) {
            throw new Error('No se pudo obtener datos de la API externa');
        }
        const data = await response.json();
        return data;
}

export async function fetchDataByNAME(searchTerm, currentPage) {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}&page=${currentPage}`);

        const data = await response.json();

        console.log(currentPage);
        console.log(data);
        return data;

    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error; 
    }
}

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