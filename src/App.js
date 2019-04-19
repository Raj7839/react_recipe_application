import React, {useEffect, useState } from 'react';
import './App.css';
import Recipe from "./Recipe"

const App = () => {
  const APP_ID = "75ae9eb5";
  const APP_KEY = "be049df214c6d127695e88d71abe701d";

  //const example = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`
  const [recipes,setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("paneer")


  useEffect( () => {
    getReceipes();
  }, [query])

  const getReceipes = async () => {
    const response = await fetch (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
  }
   
  const onInputChange=(e) => {
    setSearch(e.target.value);
  }

  const getInputChange=(e)=>{
    e.preventDefault();
    setQuery(search);
    setSearch(""); 
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getInputChange}>
        <input className="search-bar" type="text" value={search} onChange={onInputChange} />
        <button className="search-button" typeof="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe key={recipe.recipe.calories} title={recipe.recipe.label } calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />
      ))}
      </div>
    </div>
)
}

export default App;
