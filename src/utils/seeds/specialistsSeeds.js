const { mongoose } = require("mongoose");
const Specialist = require("../../api/specialists/specialists.model");
const { DB_URL } = require("../database/db");

const specialists = [
  {
    name: "Julio",
    surname: "Garcia",
    img: "https://media.istockphoto.com/id/1171698091/es/foto/un-hombre-sosteniendo-su-diario.jpg?s=612x612&w=0&k=20&c=BSn6el4qk2O1NE9FOL0X5WVJUGgArS3NxRkiwbdqsnQ=",
    age: "27",
    specialistType: "Fisioterapeuta",
    location: "Barcelona",
    schedule: "Tarde",
  },
  {
    name: "Eric",
    surname: "Menendez",
    img: "https://media.istockphoto.com/id/1406197730/es/foto/retrato-de-un-joven-indio-guapo.jpg?s=612x612&w=0&k=20&c=zmBBGk9nsf8NvLXrr2wm0ML70HobYQmVDU43sHNdsYQ=",
    age: "40",
    specialistType: "Terapeuta",
    location: "Madrid",
    schedule: "Mañana",
  },
  {
    name: "Laura",
    surname: "Lopez",
    img: "https://media.istockphoto.com/id/1327765575/es/foto/retrato-de-una-hermosa-mujer-asi%C3%A1tica-con-el-pelo-largo-y-oscuro-ri%C3%A9ndose-de-la-c%C3%A1mara-con-una.jpg?s=612x612&w=0&k=20&c=jhjVYGUhV3IVqxsPT4XO3BMNo_nJbPpYGf7Vp8ij7XY=",
    age: "31",
    specialistType: "Psicologo especializado",
    location: "Asturias",
    schedule: "Mañana",
  },
  {
    name: "Julia",
    surname: "Muñoz",
    img: "https://media.istockphoto.com/id/1386479313/es/foto/feliz-mujer-de-negocios-afroamericana-millennial-posando-aislada-en-blanco.jpg?s=612x612&w=0&k=20&c=JP0NBxlxG2-bdpTRPlTXBbX13zkNj0mR5g1KoOdbtO4=",
    age: "29",
    specialistType: "Logopeda",
    location: "Sevilla",
    schedule: "Noche",
  },
  {
    name: "Paula",
    surname: "Cerezo",
    img: "https://media.istockphoto.com/id/1323990939/es/foto/un-retrato-de-estudio-de-una-joven-millennial.jpg?s=612x612&w=0&k=20&c=uFo9RNG_VWjc2MSHowZcyQyp8JCxvjMGvr_M9OhLX8U=",
    age: "51",
    specialistType: "Auxiliar de enfermeria",
    location: "Toledo",
    schedule: "Tarde",
  },
];

mongoose
  .connect(DB_URL)
  .then(async () => {
    const allSpecialists = await Specialist.find().lean();

    if (!allSpecialists.length) {
      console.log("[seed]: No se encuentran espcialistas, continuo...");
    } else {
      console.log(
        `[seed]: Encontrados ${allSpecialists.length} especialistas.`
      );
      await Specialist.collection.drop();
      console.log("[seed]: Colección Specialists eliminada correctamente");
    }
  })
  .catch((error) =>
    console.log("[seed]: Error eliminando la colección -->", error)
  )
  .then(async () => {
    await Specialist.insertMany(specialists);
    console.log(
      `[seed]: ${specialists.length} nuevos especialistas añadidos con éxito`
    );
  })
  .catch((error) =>
    console.log("[seed]: Error añadiendo los especialistas", error)
  )
  .finally(() => mongoose.disconnect());

const specialistLog = "Listado de especialistas listo";

module.exports = specialistLog;
