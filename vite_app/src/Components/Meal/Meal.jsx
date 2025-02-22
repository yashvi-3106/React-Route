import { Link } from 'react-router-dom';
import './Meal.css';  // Make sure to import the CSS file

const CategoryList = () => {
  const categories = [
    { name: 'Seafood', image: 'https://www.themealdb.com/images/category/seafood.png' },
    { name: 'Beef', image: 'https://www.themealdb.com/images/category/beef.png' },
    { name: 'Chicken', image: 'https://www.themealdb.com/images/category/chicken.png' },
    { name: 'Vegetarian', image: 'https://www.themealdb.com/images/category/vegetarian.png' },
    { name: 'Dessert', image: 'https://www.themealdb.com/images/category/dessert.png' },
    { name: 'Lamb', image: 'https://www.themealdb.com/images/category/lamb.png' },
    { name: 'Miscellaneous', image: 'https://www.themealdb.com/images/category/miscellaneous.png' },
    { name: 'Pasta', image: 'https://www.themealdb.com/images/category/pasta.png' },
    { name: 'Pork', image: 'https://www.themealdb.com/images/category/pork.png' },
    { name: 'Side', image: 'https://www.themealdb.com/images/category/side.png' },
    { name: 'Starter', image: 'https://www.themealdb.com/images/category/starter.png' },
    { name: 'Vegan', image: 'https://www.themealdb.com/images/category/vegan.png' },
    { name: 'Breakfast', image: 'https://www.themealdb.com/images/category/breakfast.png' },
    { name: 'Goat', image: 'https://www.themealdb.com/images/category/goat.png' },
  ];

  return (
    <div>
      <p className='meal'>MealMaven</p>
      <p className='welcome1'>Your ultimate destination for delicious recipes and meal inspiration. Welcome to MealMaven!</p>
      <div className='meal-poaster'></div>
      
      <p className='category1'>Meal Categories</p>
      <ul className="category-list">
        {categories.map((category) => (
          <li key={category.name} className="category-item">
            <Link to={`/category/${category.name}`} className="category-link">
              <div>
                <img 
                  src={category.image} 
                  className="category-image"
                />
                <h3>{category.name}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;

