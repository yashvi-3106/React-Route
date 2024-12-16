// import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Meal from './Components/Meal/Meal'
import Home from './Components/Home'
import { Navbar } from './Components/Navbar'
import Cocktail from './Components/Cocktail/Cocktail'
import Cocktailsearch from './Components/Cocktail/Cocktailsearch'
import FoodList from './Components/Meal/FoodList'
import MealDetail from './Components/Meal/MealDetail'
import HomePage from './Components/Books/HomePage'
import Bank from './Components/Bank/Bank'


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Cocktail" element={<Cocktail />} />
      <Route path="/cocktail/:id" element={<Cocktailsearch />} />
      <Route path="/Meal" element={<Meal />} />
      <Route path="/category/:category" element={<FoodList />} />
      <Route path="/meal/:id" element={<MealDetail />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/Bank" element={<Bank/>}/>
    </Routes>
   
    </>
  )
}

export default App

