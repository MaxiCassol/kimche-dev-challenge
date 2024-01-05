import { obtenerDatosDeAPI } from './Api'
import { useState, useEffect  } from 'react'; 
import './App.css'

function App() {
  const [characters, setCharacters] = useState([]);
  const [detalleVisible, setDetalleVisible] = useState(false);
  const [detalleIndex, setDetalleIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('');
  const [filterGender, setFilterGender] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const charactersData = await obtenerDatosDeAPI();
        console.log('Personajes obtenidos:', charactersData);
        setCharacters(charactersData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
  
    fetchData();
  }, [searchTerm]);
    

  const mostrarDetalle = (index) => {
    setDetalleIndex(index);
    setDetalleVisible(true);
  };
  const cerrarDetalle = () => {
    setDetalleVisible(false);
  };


  const onSearch = async () => {
    // Verifica si el término de búsqueda es un número (para buscar por ID)
    const isSearchById = !isNaN(searchTerm);
  
    try {
      let data;
  
      if (isSearchById) {
        // Si el término es un número, busca por ID
        data = await obtenerDatosDeAPI(`https://rickandmortyapi.com/api/character/${searchTerm}`);
      } else {
        // Si el término no es un número, busca por nombre
        data = await obtenerDatosDeAPI(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`);
      }
  
      if (data && data.length > 0) {
        // Si se encuentra al menos un personaje, actualiza el estado con los resultados
        setCharacters((oldChars) => [...oldChars, ...data]);
      } else {
        alert('No se encontraron resultados.');
      }
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
      alert('Algo salió mal al buscar.');
    }
  };
  

  const filterCharacters = async () => {
    try {
      const filteredData = characters.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterStatus ? character.status === filterStatus : true) &&
        (filterSpecies ? character.species === filterSpecies : true) &&
        (filterGender ? character.gender === filterGender : true)
      );
  
      return setCharacters(filteredData);
      
    } catch (error) {
      console.error('Error al filtrar personajes:', error);
      return [];
    }
  };

  const resetFilters = () => {
    setFilterStatus('');
    setFilterSpecies('');
    setFilterGender('');
  };

  return (
    <div>
      <div>
        <label>
        Search:
        <input
          type="text"
          className='search' 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
      <button onClick={() => onSearch(searchTerm)}>Buscar</button>

      </div>
        
    <div>
        <label>
          Status:
          <input
            type="text"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Species:
          <input
            type="text"
            value={filterSpecies}
            onChange={(e) => setFilterSpecies(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Gender:
          <input
            type="text"
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
          />
        </label>
      </div>
    <button onClick={resetFilters}>Reset Filters</button> 
 
      <div className="container">
        {characters.length > 0 ? (
          characters.map((character, index) => (
          <div className="card" key={index} onClick={() => mostrarDetalle(index)}>
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
          </div>
        ))
        ): (
          <p>Cargando...</p>
        )}
      </div> 

      {characters.length > 0 ? (
        detalleVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={cerrarDetalle}>&times;</span>
            <img src={characters[detalleIndex].image} alt={characters[detalleIndex].name} />
            <h2>{characters[detalleIndex].name}</h2>
            <p>Status: {characters[detalleIndex].status}</p>
            <p>Gender: {characters[detalleIndex].gender}</p>
            <p>Species: {characters[detalleIndex].species}</p>
            <p>Type: {characters[detalleIndex].type}</p>
            <p>Location: {characters[detalleIndex].location}</p>
            <p>Origin: {characters[detalleIndex].origin}</p>
            <p>Dimension: {characters[detalleIndex].dimension}</p>

          </div>
        </div>
      ))
      : false} 
      </div>
  )
}

export default App
