const { lines } = require("japan-train-data");

const trains = [
  ...lines.map((line) => ({
    trainId: `${line.id}`,
    name: line.name,
  })),
];
// get rid of duplicates
const uniqueTrains = trains.filter(
  (train, index, self) =>
    index === self.findIndex((t) => t.trainId === train.trainId)
);

module.exports = {
  user: [],
  password: [],
  note: [],
  train: [...uniqueTrains],
  interested: [],
};
