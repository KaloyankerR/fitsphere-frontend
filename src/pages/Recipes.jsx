import { useState } from 'react';
import useGetRecipes from '../services/external/useGetRecipesList';
import '../css/Recipes.css'

function Recipes() {
    const { recipes, isLoading, error } = useGetRecipes();
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading recipes: {error.message}</div>;

    return (
        <div>
            {recipes.map(recipe => (
                <div key={recipe.id} onClick={() => handleRecipeClick(recipe)} className="recipe-item">
                    {recipe.name}
                </div>
            ))}

            {selectedRecipe && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{selectedRecipe.name}</h2>
                        <p>Description: {selectedRecipe.description || "No description available."}</p>
                        <button onClick={() => setSelectedRecipe(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Recipes;
