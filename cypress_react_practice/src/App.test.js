import App from './App';
import React from 'react';
import { shallow } from 'enzyme';
// import { wrap } from 'yargs';

test('toggleAddRecipeForm() modifies isAddRecipeFormDisplayed state value to toggle visibility of a form on the page', () => {
  const wrapper = shallow(<App />)
  wrapper.instance().toggleAddRecipeForm();

  wrapper.update();
  expect(wrapper.state().isAddRecipeFormDisplayed).toBeTruthy();
  expect(wrapper.exists('#recipe-form')).toEqual(true);

  wrapper.instance().toggleAddRecipeForm();
  expect(wrapper.state().isAddRecipeFormDisplayed).toBeFalsy();
  expect(wrapper.exists('#recipe-form')).toEqual(false);
});

test('the add recipe button onclick calls the toggleaddrecipeform method', () => {
  const wrapper = shallow(<App />)
  wrapper.instance().toggleAddRecipeForm = jest.fn();   //jest.fn() this is stubbing the function, it is a placeholder, replacing toggleaddrecipeform with an empty method

  wrapper.instance().forceUpdate();   //using force update because we are adding the jest.fn(), makes the wrapper update with new mocked function

  const button = wrapper.find('#add-recipe');

  button.simulate('click');    //simulate different event strings
  expect(wrapper.instance().toggleAddRecipeForm).toHaveBeenCalled();    //we have access to tohavebeencalled because of jest.fn()

});

test('submitting the form calls the submitRecipe method', () => {
  const wrapper = shallow(<App />)
  wrapper.setState({ isAddRecipeFormDisplayed : true})
  wrapper.instance().submitRecipe = jest.fn();
  wrapper.instance().forceUpdate();

  wrapper.find('#recipe-form').simulate("submit");
  expect(wrapper.instance().submitRecipe).toHaveBeenCalled();   //unit testing, only checking if method is called
});

test('submitRecipe() modifies the recipes value in state', () => {
  const wrapper = shallow(<App />)
  const recipeName = "Wings"
  const recipeInstructions = "1. Lemmon pepper on that. 2a. Buffalo";

  wrapper.setState({ 
    isAddRecipeFormDisplayed: true,
    newRecipeName: recipeName,
    newRecipeInstructions: recipeInstructions
  })

  const submittedRecipe = { name: recipeName, instructions: recipeInstructions }
  const mockPreventDefault = jest.fn();     //mock jest function

  wrapper.find('#recipe-form').simulate('submit', {
    preventDefault: mockPreventDefault,       //passing in this object to the simulate, second argument for simulate allows options object
  })

  expect(mockPreventDefault).toHaveBeenCalled();
  // console.log(wrapper.state())
  expect(wrapper.state().recipes).toEqual([submittedRecipe])    //will return array of objects 

 


});

test('typing into the recipe name input updates state', () => {
  const wrapper = shallow(<App />);
  const recipeName = 'White Bread';

  wrapper.setState({
    isAddRecipeFormDisplayed: true,
  })
//Events: event-bubbling
  wrapper.find('input[name="newRecipeName"]').simulate("change", {    //change simulates alteration to input/select/textarea when value is commited by user
    target: {name: 'newRecipeName', value: recipeName}    //target is an object
  })    

  expect(wrapper.state().newRecipeName).toEqual(recipeName);
})

test('typing into the recipe instructions input updates state', () => {
  const wrapper = shallow(<App />);
  const recipeInstructions = 'Flour, water, sugar, salt, yeast';

  wrapper.setState({
    isAddRecipeFormDisplayed: true,
  })

  wrapper.find('textarea[name="newRecipeInstructions"]').simulate("change", {    //change simulates alteration to input/select/textarea when value is commited by user
    target: {name: 'newRecipeInstructions', value: recipeInstructions}    //target is an object
  })    

  expect(wrapper.state().newRecipeInstructions).toEqual(recipeInstructions);
})

test('recipe name from recipe in state appears in unordered list', () => {
  const wrapper = shallow(<App />)
  const recipeName = 'Korean Beef Tacos';
  const recipeInstructions = 'Kimchi + beef + taco shells';
  const submittedRecipe = { name: recipeName, instructions: recipeInstructions }

  wrapper.setState({
    recipes: [submittedRecipe],
  })

  expect(wrapper.find('li')).toHaveLength(1);
  expect(wrapper.find('li').text()).toEqual(recipeName)
})

test('submitting multiple recipes stores them all in an unordered list', () => {
  const wrapper = shallow(<App />)
  const recipeName1 = 'Korean Beef Tacos';
  const recipeName2 = 'Pizze'
  const recipeInstructions1 = 'Kimchi + beef + taco shells';
  const recipeInstructions2 = 'dough, cheese, sauce';

  const submittedRecipe1 = { name: recipeName1, instructions: recipeInstructions1 }
  const submittedRecipe2 = { name: recipeName2, instructions: recipeInstructions2 }

  wrapper.setState({
    recipes: [submittedRecipe1, submittedRecipe2],
  })

  expect(wrapper.find('li')).toHaveLength(2);
  expect(wrapper.find('li').at(0).text()).toEqual(recipeName1)
  expect(wrapper.find('li').at(1).text()).toEqual(recipeName2)
  // console.log(wrapper.find('li').at(0).text())
})












