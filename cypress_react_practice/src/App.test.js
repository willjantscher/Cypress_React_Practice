import App from './App';
import React from 'react';
import { shallow } from 'enzyme';

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