import './App.css';
import { Component } from 'react';

class App extends Component{
  constructor() {
    super();
    this.state = {
      isAddRecipeFormDisplayed: false,
      recipes: [],
      recipeName: "",
    }
  }

  //toggleAddRecipeForm method
  toggleAddRecipeForm = () => {
    this.setState({ isAddRecipeFormDisplayed : !this.state.isAddRecipeFormDisplayed })
  }

  // handleRecipeNameChange = (e) => {
  //   const value = e.target.value;
  //   this.setState({ 
  //     newRecipeName : value,
  //   })
  // }

  // handleRecipeInstructionsChange = (e) => {
  //   const value = e.target.value;
  //   this.setState({
  //     newRecipeInstructions : value
  //   })
  // }

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    this.setState({
      [name]: target.value,
    })
  }

  //submit recipe method
  //arrow functions are implicitly bound to the context they are ing
  submitRecipe = (e) => {
    e.preventDefault();
    let tempRecipes = this.state.recipes;
    tempRecipes.push({
      name: this.state.newRecipeName,
      instructions: this.state.newRecipeInstructions, //note this only works in the test since 'this' has the state of the wrapper
    })
    this.setState({
      recipes: tempRecipes
    })
  }

  renderRecipes = () => {
    // console.log(this.state.recipes)
    // console.log(this.state.recipes[0].name)
    let output = this.state.recipes.map( recipe => <li key={recipe.name}>{recipe.name}</li>);
    return(
      <ul>
        {output}
      </ul>
    )
  }

  render() {
    const addNewRecipeForm = 
      <form id="recipe-form" onSubmit={this.submitRecipe}>
        <label htmlFor="newRecipeName">Recipe name: </label>
        <input type="text" name="newRecipeName" onChange={this.handleChange}/>
        <label htmlFor="newRecipeInstructions">Instructions: </label>
        <textarea name="newRecipeInstructions" placeholder="write the recipe instructions here..." onChange={this.handleChange}/>
        <input type="submit" />
      </form>
    const addRecipeButton = <button id="add-recipe" onClick={this.toggleAddRecipeForm}>Add Recipe</button>

    return (
      <div className="App">
        <header className="App-header">
          My Recipes
        </header>
{/* use ternary statement for this conditional rendering */}
        {
          this.state.isAddRecipeFormDisplayed
          ? addNewRecipeForm
          : addRecipeButton          
        }
        {
          this.state.recipes !== undefined && this.state.recipes.length > 0
          ? this.renderRecipes()
          : <p> There are no recipes to list.</p>
        }
      </div>
    );
  }
}

export default App;
