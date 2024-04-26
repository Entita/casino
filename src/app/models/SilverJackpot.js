const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const silverJackpotSchema = new Schema(
  {
    jackpot: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    }
  },
  { timestamps: true },
);

const declareModel = () => {
  try {
    const model = mongoose.model('silverJackpots');
    return model;
  } catch {
    return mongoose.model('silverJackpots', silverJackpotSchema);
  }
};

module.exports = declareModel();
