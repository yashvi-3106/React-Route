import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Meal.css'; // Make sure to import the CSS file

const FoodList = () => {
  const { category } = useParams();  // Get the category from the URL
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          setFoods(data.meals);
          setFilteredFoods(data.meals); 
        } else {
          setError('No meals found');
        }
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching meals', error);
        setLoading(false);
      });
  }, [category]);

  // Handle search term change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter foods based on search term
    if (term) {
      const filtered = foods.filter((food) =>
        food.strMeal.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredFoods(filtered);
    } else {
      setFilteredFoods(foods); // Reset to all foods if search term is cleared
    }
  };

  if (loading) return <p>Loading meals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
  

  <div className="page-container">
  <h1 className="category-title">{category} Meals</h1>

  {/* Search Input */}
  <div className="search-container">
    <input
      type="text"
      placeholder="Search meals..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="search-input"
    />
  </div>

  {filteredFoods && filteredFoods.length > 0 ? (
    <div className="food-list-container">
      {filteredFoods.map((food) => (
        <div key={food.idMeal} className="food-item">
          <Link to={`/meal/${food.idMeal}`} className="food-item-link">
            <img
              src={food.strMealThumb}
              alt={food.strMeal}
              className="food-image"
            />
            <h3 className="food-item-title">{food.strMeal}</h3>
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <p>No meals found</p>
  )}
</div>

       
      
    
    </div>
  );
};

export default FoodList;
