// React.
import React from 'react';

// React Components.
import NewRecipeWidget from 'components/NewRecipeWidget';

// Component definition.
const ViewRecipePage = () => (
  <div className="container-page">

    <h1 className="text-center">View Recipe</h1>

    <NewRecipeWidget mode="ViewRecipe" />

  </div>
);

// Component export.
export default ViewRecipePage;
