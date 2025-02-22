// import  { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const MealDetail = () => {
//   const { id } = useParams();  // Get the food ID from the URL
//   const [meal, setMeal] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch meal details based on the ID
//     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.meals) {
//           setMeal(data.meals[0]);
//         } else {
//           setError('Meal not found');
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError('Error fetching meal details',error);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       {meal && (
//         <div>
//           <h2>{meal.strMeal}</h2>
//           <img src={meal.strMealThumb} alt={meal.strMeal} width="200" />
//           <h3>Ingredients:</h3>
//           <ul>
//             {Object.keys(meal)
//               .filter((key) => key.includes('strIngredient') && meal[key])
//               .map((ingredient, index) => (
//                 <li key={index}>
//                   {meal[ingredient]} - {meal[`strMeasure${ingredient.slice(13)}`]}
//                 </li>
//               ))}
//           </ul>
//           <h3>Instructions:</h3>
//           <p>{meal.strInstructions}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MealDetail;


import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Meal.css';  // Import the updated CSS

const MealDetail = () => {
  const { id } = useParams();  // Get the food ID from the URL
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch meal details based on the ID
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          setMeal(data.meals[0]);
        } else {
          setError('Meal not found');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching meal details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="meal-detail">
      {meal && (
        <div>
          <h2>{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <h3>Ingredients:</h3>
          <ul>
            {Object.keys(meal)
              .filter((key) => key.includes('strIngredient') && meal[key])
              .map((ingredient, index) => (
                <li key={index}>
                  <span>{meal[ingredient]}</span> - {meal[`strMeasure${ingredient.slice(13)}`]}
                </li>
              ))}
          </ul>
          <h3>Instructions:</h3>
          <p>{meal.strInstructions}</p>
        </div>
      )}
    </div>
  );
};

export default MealDetail;
