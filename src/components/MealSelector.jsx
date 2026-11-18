
import React from "react";

function MealSelector({ passenger, onMealChange }) {
  return (
    <section className="meal-section">
      <h3>Meal Preference</h3>

      <select
        value={passenger.meal}
        onChange={(e) => onMealChange(e.target.value)}
        aria-label="Select meal preference"
      >
        <option value="none">No Meal - Free</option>
        <option value="vegetarian">Vegetarian - ₹250</option>
        <option value="nonVegetarian">Non-Vegetarian - ₹350</option>
        <option value="vegan">Vegan - ₹300</option>
      </select>
    </section>
  );
}

export default MealSelector;
