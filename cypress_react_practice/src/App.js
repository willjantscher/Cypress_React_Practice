import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component{
  constructor() {
    super();
    this.state = {
      isAddRecipeFormDisplayed: false,
    }
  }

  //toggleAddRecipeForm method
  toggleAddRecipeForm = () => {
    this.setState({ isAddRecipeFormDisplayed : !this.state.isAddRecipeFormDisplayed })
  }

  render() {
    const addNewRecipeForm = <form id="recipe-form"></form>
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
