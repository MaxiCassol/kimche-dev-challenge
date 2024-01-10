import dataHandler from './components/utils/dataHandler';
import { ApolloProvider } from '@apollo/client';
import client from './components/graphql/graphqlClient';
import { useState, useEffect  } from 'react';
import uniqueSpecies from './components/getSpecies'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detalleVisible, setDetalleVisible] = useState(false);
  const [detalleIndex, setDetalleIndex] = useState(0);
  const [inputSearch, setInputSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');  
  const [allSpecies, setAllSpecies] = useState([]);
  const [changedFilters, setChangedFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('');
  const [filterGender, setFilterGender] = useState('');

  useEffect(() => {    
    const fetchDataAndSpecies = async () => {
      try {
      // Get Species list
      await uniqueSpecies(setAllSpecies);
      // Get data of cards with options
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
          setChangedFilters,
          searchTerm)   
      } catch (error) {
        console.error('Error fetching data:', error);
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
    if(isNaN(inputSearch)) {
      setSearchTerm(inputSearch);
    }
  };

  //Button home
  const handleHomeButtonClick = async () => {
    setSearchTerm('');
    setCurrentPage(1);  
    resetFilters(); 
    setInputSearch('')
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
    return <div>
      <p className="searchContainer">Loading...</p>      
      <iframe src="https://giphy.com/embed/vFtGDTXTNr4Z3uG4St" alt="Loading" width="100%" />
      </div>;
  }
  

  return (
    <ApolloProvider client={client}>
      <div className="headerContainer">
        <div >
        <button 
        className='homeButton'
        onClick={handleHomeButtonClick}
      >
        🏠 Home 🏠
        </button>
        </div>      

        
          <div className="search">
            <label className="searchLabel">        
            <input
              type="text"
              className='searchTerm' 
              placeholder='Search by Name or ID'
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
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
            >🔍</button>
          </div>
        
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
            <div className="modalImage"><img src={characters[detalleIndex].image} alt={characters[detalleIndex].name} /></div>    
            <div className="info">
              <h2>{characters[detalleIndex].name}</h2>
            {characters[detalleIndex].status &&
            <p>
              <span className="label">Status:</span>
              <span>{characters[detalleIndex].status}</span>
            </p>}
            {characters[detalleIndex].gender && 
            <p>
              <span className="label">Gender:</span>
              <span>{characters[detalleIndex].gender}</span>
            </p>}
            {characters[detalleIndex].species && 
            <p>
              <span className="label">Species:</span>
              <span>{characters[detalleIndex].species}</span>
              </p>}
            {characters[detalleIndex].type && 
            <p>
              <span className="label">Type:</span> 
              <span>{characters[detalleIndex].type}</span>
              </p>}
            {characters[detalleIndex].location.name && 
            <p>
              <span className="label">Location:</span> 
              <span>{characters[detalleIndex].location.name}</span>
              </p>}
            {characters[detalleIndex].origin.name && 
            <p>
              <span className="label">Origin:</span> 
              <span>{characters[detalleIndex].origin.name}</span>
              </p>}
            {characters[detalleIndex].dimension && 
            <p>
              <span className="label">Dimension:</span>
              <span>{characters[detalleIndex].dimension}</span>
              </p>}
              </div>        
            
          </div>
        </div>
      )}

        <div className='paginationContainer'>
          <button 
          className='paginationButton'
          onClick={() => handlePageChange(currentPage - 1)} 
          hidden={currentPage === 1} >
            Prev
          </button>
          <span>Page: {currentPage} / {totalPages}</span>
          <button 
          className='paginationButton'
          onClick={() => handlePageChange(currentPage + 1)} 
          hidden={currentPage === totalPages}>
            Next
          </button>
        </div>
      </ApolloProvider>
  );
}

export default App
