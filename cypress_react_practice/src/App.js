import logo from './logo.svg';
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

  handleRecipeNameChange = (e) => {
    const value = e.target.value;
    this.setState({ 
      newRecipeName : value,
    })
  }

  //submit recipe method
  //arrow functions are implicitly bound to the context they are ing
  submitRecipe = (e) => {
    e.preventDefault();
    this.setState({
      recipes: [{
        name: this.state.newRecipeName,
        instructions: this.state.newRecipeInstructions, //note this only works in the test since 'this' has the state of the wrapper
      }]
    })
  }

  render() {
    const addNewRecipeForm = 
      <form id="recipe-form" onSubmit={this.submitRecipe}>
        <label htmlFor="newRecipeName">Recipe name: </label>
        <input type="text" name="newRecipeName" onChange={this.handleRecipeNameChange}/>
        <label htmlFor="newRecipeInstructions">Instructions: </label>
        <textarea name="newRecipeInstructions" placeholder="write the recipe instructions here..."/>
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

        <p>
          There are no recipes to list.
        </p>
      </div>
    );
  }
}

export default App;
