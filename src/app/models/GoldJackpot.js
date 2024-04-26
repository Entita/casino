const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goldJackpotSchema = new Schema(
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
    const model = mongoose.model('goldJackpots');
    return model;
  } catch {
    return mongoose.model('goldJackpots', goldJackpotSchema);
  }
};

module.exports = declareModel();
