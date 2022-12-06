const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const diseasesShema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    // causes: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true },
    symptoms: { type: String, required: true, trim: true },
    treatment: { type: String, required: true, trim: true },
    mortality: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const Disease = mongoose.model("diseases", diseasesShema);

module.exports = Disease;
