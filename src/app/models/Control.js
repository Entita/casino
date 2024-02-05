const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const controlSchema = new Schema(
  {
    gold: {
      enable: {
        type: Boolean,
        default: true,
      },
      min: {
        type: Number,
        default: 0,
      },
    },
    silver: {
      enable: {
        type: Boolean,
        default: true,
      },
      min: {
        type: Number,
        default: 0,
      },
    },
    bronze: {
      enable: {
        type: Boolean,
        default: true,
      },
      min: {
        type: Number,
        default: 0,
      },
    },
    red: {
      enable: {
        type: Boolean,
        default: true,
      },
      min: {
        type: Number,
        default: 0,
      },
    },
    green: {
      enable: {
        type: Boolean,
        default: true,
      },
      min: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: false },
);

const declareModel = () => {
  try {
    const model = mongoose.model('controls');
    return model;
  } catch {
    return mongoose.model('controls', controlSchema);
  }
};

module.exports = declareModel();
