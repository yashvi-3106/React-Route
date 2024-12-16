import "./Cocktail.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cocktail = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cocktails, setCocktails] = useState([]);  // To store the list of cocktails
  const [loading, setLoading] = useState(false);  // To handle loading state
  const [error, setError] = useState(null);       // To handle error state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      setLoading(true);
      setError(null);  // Clear any previous error

      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        
        if (data.drinks) {
          setCocktails(data.drinks);  // Update cocktails list
        } else {
          setError('No cocktails found');
          setCocktails([]);  // Clear cocktails if no matches
        }
      } catch (error) {
        setError('Error fetching data',error);
        setCocktails([]);  // Clear cocktails in case of error
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="body">
      <p className="name">The Cocktail Canvas</p>
      
      
      <form onSubmit={handleSearch}>
        <input className="search"
          type="text"
          placeholder="Enter drink name"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Display search results */}
      <div>
        {cocktails.length > 0 && (
          <ul className="container">
            {cocktails.map((cocktail) => (
              <li className="content" key={cocktail.idDrink}>
                <p className="menu">{cocktail.strDrink}</p>
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width="100" />
                <button onClick={() => navigate(`/cocktail/${cocktail.idDrink}`)}>View Details</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </div>
  );
};

export default Cocktail;
