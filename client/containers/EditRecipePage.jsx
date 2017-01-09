// React.
import React from 'react';

// React components.
import NewRecipeWidget from 'components/NewRecipeWidget';

// Component definition.
const EditRecipePage = () => (
  <div className="container-page">

    <h1 className="text-center">Edit an Existing Recipe</h1>

    <NewRecipeWidget mode="EditRecipe" />

  </div>
);

// Component export.
export default EditRecipePage;
