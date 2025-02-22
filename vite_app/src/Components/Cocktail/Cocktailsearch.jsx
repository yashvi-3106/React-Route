import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Cocktail.css';  // Importing the CSS file

const Cocktailsearch = () => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        
        if (data.drinks) {
          setCocktail(data.drinks[0]);
        } else {
          setError('Cocktail not found');
        }
      } catch (error) {
        setError('Error fetching cocktail details',error);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktailDetails();
  }, [id]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="cocktail-container">
      <h2 className="cocktail-title">{cocktail.strDrink}</h2>
      <img className="cocktail-image" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      
      <div className="cocktail-details">
        <h3 className="section-title">Ingredients:</h3>
        <ul className="ingredient-list">
          {Object.keys(cocktail)
            .filter((key) => key.includes('strIngredient') && cocktail[key])
            .map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                {cocktail[ingredient]} - {cocktail[`strMeasure${ingredient.slice(13)}`]}
              </li>
            ))}
        </ul>

        <h3 className="section-title">Instructions:</h3>
        <p className="instructions-text">{cocktail.strInstructions}</p>
      </div>
    </div>
  );
};

export default Cocktailsearch;
