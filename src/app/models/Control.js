const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const controlSchema = new Schema(
  {
    practice: {
      type: Boolean,
      default: false,
    },
    animationParticles: {
      type: Number,
      default: 150,
    },
    refreshData: {
      type: Number,
      default: 15,
    },
    lastJackpotsShow: {
      type: Number,
      default: 90,
    },
    lastJackpotsHold: {
      type: Number,
      default: 10,
    },
    lastJackpotsGold: {
      type: Number,
      default: 10,
    },
    lastJackpotsSilver: {
      type: Number,
      default: 10,
    },
    lastJackpotsBronze: {
      type: Number,
      default: 10,
    },
    gold: {
      enableMin: {
        type: Boolean,
        default: true,
      },
      min: {
        type: Number,
        default: 0,
      },
    },
    silver: {
      enableMin: {
        type: Boolean,
        default: true,
      },
      min: {
        type: Number,
        default: 0,
      },
    },
    bronze: {
      enableMin: {
        type: Boolean,
        default: true,
      },
      min: {
        type: Number,
        default: 0,
      },
    },
    red: {
      enableMin: {
        type: Boolean,
        default: true,
      },
      min: {
        type: Number,
        default: 0,
      },
    },
    green: {
      enableMin: {
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
