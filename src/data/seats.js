
// Aircraft seat configuration

export const aircraftLayouts = {
  "3-2": {
    name: "Economy 3-2",
    rows: 10,
    columns: ["A", "B", "C", "D", "E"],
    aisleAfter: 3,
  },
  "2-3-2": {
    name: "Economy 2-3-2",
    rows: 10,
    columns: ["A", "B", "C", "D", "E", "F", "G"],
    aisleAfter: [2, 5],
  },
};

// Generate aircraft seats with different prices
export const generateSeats = (layout = "3-2") => {
  const config = aircraftLayouts[layout];

  return Array.from({ length: config.rows }, (_, rowIndex) =>
    config.columns.map((column, columnIndex) => {
      const row = rowIndex + 1;

      let price = 0;
      let type = "standard";

      if (row === 1) {
        price = 1500;
        type = "premium";
      } else if (row <= 3) {
        price = 800;
        type = "preferred";
      } else if (row >= 9) {
        price = 500;
        type = "extra-legroom";
      }

      return {
        id: `${row}${column}`,
        row,
        column,
        price,
        type,
      };
    })
  ).flat();
};
