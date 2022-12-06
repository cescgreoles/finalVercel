const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const specialistShema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true },
    age: { type: String, required: true, trim: true },
    specialistType: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Fisioterapeuta",
        "Auxiliar de Enfermeria",
        "Terapeuta",
        "Psicologo Especializado",
        "Logopeda",
      ],
    },
    location: { type: String, trim: true },
    schedule: { type: String, trim: true, enum: ["Mañana", "Tarde", "Noche"] },
  },
  {
    timestamps: true,
  }
);

const Specialist = mongoose.model("specialist", specialistShema);

module.exports = Specialist;
