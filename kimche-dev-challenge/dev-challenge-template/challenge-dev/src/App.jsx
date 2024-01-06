import { obtenerDatosDeAPI, fetchDataByID, fetchDataByNAME, fetchDataByPAGE, fetchDataByFILTERS } from './Api'
import { useState, useEffect  } from 'react'; 
import './App.css'

function App() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detalleVisible, setDetalleVisible] = useState(false);
  const [detalleIndex, setDetalleIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState();
  const [filterSpecies, setFilterSpecies] = useState('');
  const [filterGender, setFilterGender] = useState('');
  
  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);    
      const data = await obtenerDatosDeAPI();
        
        if (data && data.results) {
          setCharacters(data.results);          
          setTotalPages(data.info.pages);
        } else {
          console.error('Datos no válidos:', data);
        }
      
      if(filterStatus || filterGender || filterSpecies) {
        // Si hay un filtro de búsqueda, utiliza fetchDataByFILTERS
        try {
          const data = await fetchDataByFILTERS(filterStatus, filterSpecies, filterGender);
          if (data && data.results) {
            setCharacters(data.results);
            setTotalPages(data.info.pages);
          }
        } catch (error) {
          console.error('Datos no válidos:', data);
        }finally {
          setSearchTerm('');
        }
      }
        
      if(currentPage !== 1){
        const data = await fetchDataByPAGE(currentPage);

        if (data && data.results) {
          setCharacters(data.results);
          setTotalPages(data.info.pages);
        } else {
          console.error('Datos no válidos:', data);
        }
      }   

    } catch (error) {
      console.error('Error al obtener datos:', error);
    } finally {
      setLoading(false);
    }};
    fetchData();
  }, [currentPage, filterStatus, filterSpecies, filterGender, detalleVisible]);

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
  const handlerSearch = async (searchTerm)=>{
    if(searchTerm) {
      setCurrentPage(1);
      try{
        if(isNaN(searchTerm)){ 
          let data = await fetchDataByNAME(searchTerm)
          if (data && data.results) {
            setCharacters(data.results);
            setTotalPages(data.info.pages);
          }
        }
        if(!isNaN(searchTerm)){
          let data = await fetchDataByID(searchTerm)
          if (data) {
            setCharacters([data]);
            setTotalPages(1);}
        }       
      } catch {
        console.error('Datos no válidos:');
      }finally {
        setSearchTerm(''); 
      }
    }
    if(searchTerm.length === 0){
      const data = await obtenerDatosDeAPI();
      if (data && data.results) {
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      }
    }
  }  

  //Filters reset 
  const resetFilters = () => {
    setFilterStatus('');
    setFilterSpecies('');
    setFilterGender('');
  };

  //loading 
  if (loading) {
    return <p>Cargando...</p>;
  }

  //hardwork but honest
  const speciesOptions = ['Amfiddians', 'Arbolian Mentirososians', 'Bepisians', 'Bird People', 'Blamphs', 'Bliznarvians', 'Bluubosians', 'Boobloosians', 'Borpocians', 'Broghs', 'Brosephamons', 'Buttmouth', 'Ciancans', 'Courier Flap', 'Crittendians', 'Cromulons', 'Cronenbergs', 'Crustolomons', 'Dangelians', 'Dinosaurs', 'Drumbloxians', 'Ferkisians', 'Flansians', 'Floovians', 'Garblovians', 'Gazorpians','Gear People', 'Giant Telepathic Spiders', 'Gorpathian Dermaks', 'Greebybobes', 'Gromflomites', 'Grunglokians', 'Hambrosians', 'Hamsters In Butts', 'Hot Dogs', 'Hrinchs', 'Humans', 'Kitlers', 'Klaaxzovians', 'Korblockians', 'Kozbians', 'Krootabulans', 'Laarvians', 'Larvaalians', 'Lizard People', 'Magdalians', 'Mantis-people', 'Mega Gargantuans', 'Memory Parasites', 'Moopians', 'Mr. Frundles', 'Mr. Meeseeks', 'Mr. Meeseeks (Kirkland)', 'Mr. Poopybutthole species', 'Mr. Youseeks', 'Narduarvians',  'Nevanians', 'Nippalians', 'Numbericons', 'Nuptians', 'Observers', 'Partially sighted aliens', 'Penps', 'Photography Cyborgs', 'Pizarians', 'Plutonian', 'Post-Apocalyptic Mutants', 'Pripudlians', 'Promotians', 'Quadropians', 'Robobros', 'Scary People', 'Schlami', 'Scorpion Aliens', 'Scrotians', 'Semosites', 'Sentient Dogs', 'Severnians', 'Shimshamians', 'Shipzuvians', 'Slime Aliens', 'Smarkians', 'Smumpians', 'Splorpians', 'Squanchies', 'Squirrels', 'Stair Goblins', 'The Varix', 'Time Cops', 'Traflorkians', 'Tree People', 'Trunk People', 'Tumblorkians', 'Vampire', 'Vulvorvians', 'Wharborgarbors', 'Xenisians', 'Xorjhans', 'Zerillians', 'Zigerions', 'Zombodians'];


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
        />
        </label>
        <button 
        className='searchButton'
        onClick={()=>handlerSearch(searchTerm)}      
        >Search</button>
      </div>
        
    <div>
      <div className="filterContainer">
        <label>
          Status:
          <select
            value={filterStatus}
            onChange={(e) => {
              const selectedStatus = e.target.value;
              if (selectedStatus === "all") {
                resetFilters();
              } else {
                setFilterStatus(selectedStatus);
              }
            }}
          >
            <option value="all">All</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>            
          </select>
        </label>
      </div>
      <div>
        <label>
          Species:
          <select
            type="text"
            value={filterSpecies}
            onChange={(e) => setFilterSpecies(e.target.value)}
          >
            <option value="">Select Species</option>
    {speciesOptions.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
      ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Gender:
          <select
            value={filterGender}
            onChange={(e) => {
              const selectedStatus = e.target.value;
              if (selectedStatus === "all") {
                resetFilters();
              } else {
                setFilterGender(selectedStatus);
              }
            }}
            >
              <option value="all">All</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="genderless ">Genderless </option> 
              <option value="unknown ">Unknown </option> 
            </select>          
        </label>
      </div>
    <button onClick={resetFilters}>Reset Filters</button> 
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
      )}

        <div>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>

  )
}

export default App
