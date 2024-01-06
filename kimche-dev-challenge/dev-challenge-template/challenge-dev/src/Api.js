// Datos de la API externa
export async function obtenerDatosDeAPI(){
        const response = await fetch('https://rickandmortyapi.com/api/character');
    
        if (!response.ok) {
            throw new Error('No se pudo obtener datos de la API externa');
        }
        const datos = await response.json();
        console.log(datos);
        return datos;
}

export async function fetchDataByPAGE(currentPage){
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`);
        
        if (!response.ok) {
            throw new Error('No se pudo obtener datos de la API externa');
        }
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

export async function fetchDataByNAME(name){
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
        
        if (!response.ok) {
            throw new Error('No se pudo obtener datos de la API externa');
        }
        const datos = await response.json();
        return datos;
}

export async function fetchDataByFILTERS(filterStatus, filterSpecies, filterGender){
    let url = `https://rickandmortyapi.com/api/character/?status=${filterStatus}&species=${filterSpecies}&gender=${filterGender}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('No se pudo obtener datos de la API externa');
    }
        const datos = await response.json();
        return datos;
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