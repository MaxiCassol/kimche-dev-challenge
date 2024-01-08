import dataHandler from './components/dataHandler';
import { useState, useEffect  } from 'react';
import { searchHandler } from './components/searchHandler';
import uniqueSpecies from './components/getSpecies'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detalleVisible, setDetalleVisible] = useState(false);
  const [detalleIndex, setDetalleIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');  
  const [allSpecies, setAllSpecies] = useState([]);
  const [changedFilters, setChangedFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('');
  const [filterGender, setFilterGender] = useState('');

  useEffect(() => {    
    const fetchDataAndSpecies = async () => {
      await uniqueSpecies(setAllSpecies);

      if(searchTerm === ''){
        await dataHandler(
        currentPage,
        filterStatus,
        filterSpecies,
        filterGender,
        setCharacters,
        setTotalPages,
        setLoading,
        setCurrentPage,
        changedFilters,
        setChangedFilters  
      );
      // }else{
      //   await searchHandler(searchTerm, setCharacters, setTotalPages, setSearchTerm, currentPage, setCurrentPage)
      }                  
    }

    fetchDataAndSpecies();
  }, [currentPage, filterStatus, filterSpecies, filterGender, detalleVisible, changedFilters, searchTerm]);

  //pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };    

  //Detail
  const mostrarDetalle = (index) => {
    setDetalleIndex(index);
    setDetalleVisible(true);
  };
  const cerrarDetalle = () => {
    setDetalleVisible(false);
  };

  //Search name or ID
  const handlerSearch = async () => {    
    await searchHandler(
      searchTerm, 
      setCharacters, 
      setTotalPages,  
      currentPage);
    setChangedFilters(false);
  };

  //Filters reset 
  const resetFilters = () => {
    setFilterStatus('');
    setFilterSpecies('');
    setFilterGender('');
    setCurrentPage(1);
    setChangedFilters(false);
  };

  //loading 
  if (loading) {
    return <p>Cargando...</p>;
  }
  

  return (
    <div>
      <div className="searchContainer">
        <label>        
        <input
          type="text"
          className='search' 
          placeholder='Search by Name or ID'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handlerSearch();
            }
          }}
        />
        </label>
        <button 
        className='searchButton'
        onClick={() => handlerSearch()}     
        >🔍search</button>
      </div>
        
    <div className="filterContainer">
      <div >
        <label>
          <select
            className="selectFilter"
            value={filterStatus}
            onChange={(e) => {
              const selectedStatus = e.target.value;
              if (selectedStatus === "all") {
                setFilterStatus('');
              } else {
                setFilterStatus(selectedStatus);
                setChangedFilters(true);
              }
            }}
          >
            <option value="all">Status...</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>            
          </select>
        </label>
      </div>
      <div>
        <label>
          <select
            className="selectFilter"
            type="text"
            value={filterSpecies}
            onChange={(e) => {
              setFilterSpecies(e.target.value)
              setChangedFilters(true)}}
          >
            <option value="">Species...</option>
            {allSpecies.map((option, index) => (
              <option key={index} value={option}>
              {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          <select
            className="selectFilter"
            value={filterGender}
            onChange={(e) => {
              const selectedStatus = e.target.value;
              if (selectedStatus === "all") {
                setFilterGender('');
              } else {
                setFilterGender(selectedStatus);                
                setChangedFilters(true);
              }
            }}
            >
              <option value="all">Gender...</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="genderless ">Genderless </option> 
              <option value="unknown ">Unknown </option> 
            </select>          
        </label>
      </div>
    <button 
    className="resetButton"
    onClick={resetFilters}
    >Reset filters</button> 
      </div>
        

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

      {characters.length > 0 && detalleVisible && (
        <div className="modal" onClick={cerrarDetalle}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={cerrarDetalle}>X</span>
            <img src={characters[detalleIndex].image} alt={characters[detalleIndex].name} />
            <h2>{characters[detalleIndex].name}</h2>
            {characters[detalleIndex].status && <p>Status: {characters[detalleIndex].status}</p>}
            {characters[detalleIndex].gender && <p>Gender: {characters[detalleIndex].gender}</p>}
            {characters[detalleIndex].species && <p>Species: {characters[detalleIndex].species}</p>}
            {characters[detalleIndex].type && <p>Type: {characters[detalleIndex].type}</p>}
            {characters[detalleIndex].location.name && <p>Location: {characters[detalleIndex].location.name}</p>}
            {characters[detalleIndex].origin.name && <p>Origin: {characters[detalleIndex].origin.name}</p>}
            {characters[detalleIndex].dimension && <p>Dimension: {characters[detalleIndex].dimension}</p>}
          </div>
        </div>
      )}

        <div>
          <button onClick={() => handlePageChange(currentPage - 1)} hidden={currentPage === 1} >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} hidden={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>

  )
}

export default App
