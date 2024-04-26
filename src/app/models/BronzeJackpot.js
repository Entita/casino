const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bronzeJackpotSchema = new Schema(
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
    const model = mongoose.model('bronzeJackpots');
    return model;
  } catch {
    return mongoose.model('bronzeJackpots', bronzeJackpotSchema);
  }
};

module.exports = declareModel();
