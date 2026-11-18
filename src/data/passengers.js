

export const createPassengers = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Passenger ${index + 1}`,
    seatId: null,
    meal: "none",
  }));
};
