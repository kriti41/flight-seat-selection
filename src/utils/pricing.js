
export const calculateTotal = (passengers, seats) => {
  return passengers.reduce((total, passenger) => {
    const seat = seats.find(
      (item) => item.id === passenger.seatId
    );

    const seatPrice = seat?.price || 0;

    const mealPrices = {
      none: 0,
      vegetarian: 250,
      nonVegetarian: 350,
      vegan: 300,
    };

    const mealPrice = mealPrices[passenger.meal] || 0;

    return total + seatPrice + mealPrice;
  }, 0);
};

export const formatPrice = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};
