// React.
import React from 'react';

// React components.
import NewRecipeWidget from 'components/NewRecipeWidget';

// Component definition.
const NewRecipePage = () => (
  <div className="container-page">

    <h1 className="text-center">Create a New Recipe</h1>

    <NewRecipeWidget mode="NewRecipe" />

  </div>
);

// Component export.
export default NewRecipePage;
