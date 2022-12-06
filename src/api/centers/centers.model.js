const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const centersShema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true },
    ubication: { type: String, required: true, trim: true },
    direction: { type: String, required: true, trim: true },
    number: { type: Number },
    schedule: { type: String },
  },

  {
    timestamps: true,
  }
);

const Center = mongoose.model("centers", centersShema);

module.exports = Center;
