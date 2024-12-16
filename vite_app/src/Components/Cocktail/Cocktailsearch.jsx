// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const Cocktailsearch = () => {
//   const { name } = useParams(); // Extract the cocktail name from the URL
//   const [cocktail, setCocktail] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {

//     if (!name) {
//         setError("Cocktail name is missing.");
//         setLoading(false);
//         return;
//       }
//     // Fetch cocktail details based on the name from the URL
//     fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.strDrink) {
//             console.log(data);
//           setCocktail(data.strDrink[0]); // Get the first drink from the response
//         } else {
//           setError('Cocktail not found');
//         }
//         setLoading(false);
//       })
//       .catch(() => {
//         setError('Error fetching data');
//         setLoading(false);
//       });
//   }, [name]); // Re-fetch when the cocktail name in the URL changes

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       {cocktail && (
//         <div>
//           <h1>{cocktail.strDrink}</h1>
//           <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width="200" />
//           <h3>Ingredients:</h3>
//           <ul>
//             {Object.keys(cocktail)
//               .filter((key) => key.includes('strIngredient') && cocktail[key])
//               .map((ingredient, index) => (
//                 <li key={index}>
//                   {cocktail[ingredient]} - {cocktail[`strMeasure${ingredient.slice(13)}`]}
//                 </li>
//               ))}
//           </ul>
//           <h3>Instructions:</h3>
//           <p>{cocktail.strInstructions}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cocktailsearch;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{cocktail.strDrink}</h2>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width="200" />
      <h3>Ingredients:</h3>
      <ul>
        {Object.keys(cocktail)
          .filter((key) => key.includes('strIngredient') && cocktail[key])
          .map((ingredient, index) => (
            <li key={index}>
              {cocktail[ingredient]} - {cocktail[`strMeasure${ingredient.slice(13)}`]}
            </li>
          ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{cocktail.strInstructions}</p>
    </div>
  );
};

export default Cocktailsearch;

