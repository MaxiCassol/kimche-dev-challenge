// Datos de la API externa


export async function obtenerDatosDeAPI() {
  
    const response = await fetch('https://rickandmortyapi.com/api/character');
  
    if (!response.ok) {
        throw new Error('No se pudo obtener datos de la API externa');
    }

    const datos = await response.json();
    return datos.results;
}