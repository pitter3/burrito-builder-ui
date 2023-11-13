// OrderForm.js

import React, { useState } from "react";

function OrderForm({ addOrder }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [noIngredientsError, setNoIngredientsError] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleIngredientClick = (ingredient) => {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    setNoIngredientsError(false); // Clear the error when an ingredient is added
  };

  const clearInputs = () => {
    setName("");
    setIngredients([]);
    setNoIngredientsError(false); // Clear the error when the form is submitted
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ingredients.length <= 0) {
      setNoIngredientsError(true);
      return;
    }

    const newOrder = {
      id: Date.now(),
      name,
      ingredients,
    };

    // Call the addOrder prop to submit the order
    addOrder(newOrder);

    // Clear form inputs
    clearInputs();
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];

  const ingredientButtons = possibleIngredients.map((ingredient) => (
    <button
      key={ingredient}
      onClick={(e) => {
        e.preventDefault();
        handleIngredientClick(ingredient);
      }}
      className={ingredients.includes(ingredient) ? "selected" : ""}
    >
      {ingredient}
    </button>
  ));

  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleNameChange}
          required
        />

        {ingredientButtons}

        {noIngredientsError && (
          <p className="error">Please select at least 1 ingredient</p>
        )}

        <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}

export default OrderForm;
