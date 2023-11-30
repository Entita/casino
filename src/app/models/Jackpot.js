const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jackpotSchema = new Schema(
  {
    jackpot: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const declareModel = () => {
  try {
    const model = mongoose.model('jackpots');
    return model;
  } catch {
    return mongoose.model('jackpots', jackpotSchema);
  }
};

module.exports = declareModel();
