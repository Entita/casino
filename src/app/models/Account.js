const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: false },
);

const declareModel = () => {
  try {
    const model = mongoose.model('accounts');
    return model;
  } catch {
    return mongoose.model('accounts', accountSchema);
  }
};

module.exports = declareModel();
