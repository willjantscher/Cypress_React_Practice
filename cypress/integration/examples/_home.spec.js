/*As a chef, I want to be able to add recipes to my collection so that I may have a record of them.

Broken down:
<persona> : Chef.

Given I am on the landing page and there are no recipes, when the page loads, then I should see 'there are no recipes to list' if there

Given I am on the landing page, when the page loads, then I should see a button that says 'Add Recipe' beneath the 'My Recipes' heading.

As a chef, I want to be able to see a recipe that I have added show up under "My Recipes"
*/

describe("Home page", () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it("header contains recipe heading with a message that there are no recipes", () => {
        cy.get('.App-header').should('contain', 'My Recipes')
        cy.get('p').should('contain', 'There are no recipes to list.')

    
    })

    it("contains an add recipe button that when clicked opens a form", () => {
        const addRecipeButton = cy.get('#add-recipe');
        addRecipeButton.click();

        expect(cy.get('#recipe-form')).to.exist     //when button pressed, the form should exist
    })

    it("contains a form with fields 'Recipe Name' and 'Recipe Instructions' after clicking the 'Add Recipe' button", () => {
        const addRecipeButton = cy.get('#add-recipe');
        addRecipeButton.click();

        expect(cy.get('input[name="newRecipeName"]')).to.exist;
        expect(cy.get('textarea[name="newRecipeInstructions"]')).to.exist;
    })

    it("displays a recipe name under the 'my Recipes' heading after it has been added through the 'Add Recipe' form", () => {
        const addRecipeButton = cy.get('#add-recipe');
        const instructions = '1. Two slices of bread. 2. Spread peanut butter and jelly on one side. 3. Fold over on itself + throw other piece of bread away. 4. Eat.'
        const recipeName = 'PB&J'
        addRecipeButton.click().then(() => {
            cy.get('input[name="newRecipeName"]').type(recipeName);
            cy.get('textarea[name="newRecipeInstructions"]').type(instructions)
        })
        cy.get('input[type=submit]').click();
        cy.get('ul').then(() => {
            cy.get('ul').contains(recipeName)
        })
    })





})
