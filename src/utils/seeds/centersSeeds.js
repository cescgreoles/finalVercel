const { mongoose } = require("mongoose");
const Center = require("../../api/centers/centers.model");
const { DB_URL } = require("../database/db");

const centers = [
  {
    name: "AFAC Asociación De Familiares De Enfermos De Alzheimer De Cantabria",
    description:
      "AFA Cantabria es la Asociación de Familiares de Enfermos de Alzheimer en Cantabria, que desde 1993 desarrolla una labor social entre todos sus pacientes y familiares de enfermos. Esta labor diaria es posible gracias a todos los socios, amigos, personas y entidades colaboradoras que nos apoyan con su confianza y sacrificio.",
    img: "https://lh3.googleusercontent.com/p/AF1QipMOnb-4JLF1Rr_xkaNxQwyALUk2T0EZ-5MQH8vF=s1360-w1360-h1020",
    ubication: "Cantabria",
    direction: " C. Rosario de Acuña, 7, 39008 Santander, Cantabria",
    number: 942075533,
    schedule: "10:00-18:00",
  },
  {
    name: "Afa Bizkaia Asociación de Familiares de personas enfermas de Alzheimer y otras demencias de Bizkaia",
    description: "La Asociación de Familiares de personas enfermas de Alzheimer y otras demencias de Bizkaia (AFA Bizkaia) surgió en el año 1988 ante la necesidad detectada por un grupo de familiares de reunirse y reivindicar sus derechos. El ámbito y extensión de la Asociación comprende toda Bizkaia y desde el 2003 la Asociación es de utilidad pública.",
    img: "https://lh3.googleusercontent.com/p/AF1QipOXp1TNMrEqHXvyfdybZwvNUIzd6_fdXZGV2grz=s1360-w1360-h1020",
    ubication: "Vizcaya",
    direction: "Enekuri Etorb., 2, entreplanta, 48014 Bilbao, Biscay",
    number: 944167617,
    schedule: "9:00–14:00, 15:00–18:00",
  },
  {
    name: "Alzheimer Catalunya Fundació",
    description: "Alzheimer Catalunya Fundació es una entidad sin ánimo de lucro con más de 30 años de experiencia trabajando para mejorar la calidad de vida de cualquier persona afectada por una demencia.",
    img: "https://forotf.com/wp-content/uploads/2019/12/ALZHEIMER-logo-curt.png",
    ubication: "Barcelona",
    direction: "Via Augusta, 48 - 54, 08006 Barcelona",
    number: 934592294,
    schedule: "8:00-17:00",
  },
  {
    name: "FEVAFA",
    description: "La Federació Valenciana d’ Associacions de Familiars i Amics de Persones amb Alzheimer (FEVAFA), constituida el 22 de Noviembre de 1997, surge como consecuencia del interés de las Asociaciones fundadoras que decidieron unir sus voces para poder ser escuchadas con más fuerza.",
    img: "https://platavoluntariado.org/wp-content/uploads/2022/08/fevafa.jpeg",
    ubication: "Valencia",
    direction: " Av. de les Tres Creus, 67, 46014 València, Valencia",
    number:  961510002,
    schedule: "9:00-14:00",
  },
  {
    name:'Asociación de Enfermos Neurológicos Oscense AENO',
    description: 'La Asociación de enfermos Neurológicos Oscense nació  ante la  necesidad de ofrecer continuidad a la rehabilitación de los pacientes neurológicos una vez diagnosticados o dados de alta en los centros hospitalarios. Sus fundadores, personas con enfermedad neurológica, apostaron en 2013 por unir sinergias y ofrecer un espacio de atención integral al paciente y familiares. ',
    img: 'https://www.cadishuesca.es/images/logos/area_salud/AENO_B.jpg',
    ubication: 'Huesca',
    direction: 'Edifico Castilla Bajos, P.º de las Autonomías, 22004 Huesca',
    number: 974560047,
    schedule: '09:00-17:00'
  },
  {
    name:'Apice',
    description: 'Ápice nace ante la falta de integración de las personas con epilepsia en cualquier ámbito de la vida cotidiana. La epilepsia es la enfermedad neurológica más antigua de la historia y sin embargo sigue siendo una gran desconocida.',
    img: 'https://www.dono.eu/fotos/ap_as_anda_epilep.png',
    ubication: 'Sevilla',
    direction: 'C. Agricultores, 17, 41015 Sevilla',
    number:  955155566,
    schedule: '8:00-16:00'
  }

];

mongoose
  .connect(DB_URL)
  .then(async () => {
    const allCenters = await Center.find().lean();

    if (!allCenters.length) {
      console.log("[seed]: No se encuentran centros, continuo...");
    } else {
      console.log(`[seed]: Encontrados ${allCenters.length} centros.`);
      await Center.collection.drop();
      console.log("[seed]: Colección Centros eliminada correctamente");
    }
  })
  .catch((error) =>
    console.log("[seed]: Error eliminando la colección -->", error)
  )
  .then(async () => {
    await Center.insertMany(centers);
    console.log(`[seed]: ${centers.length} nuevos centros añadidos con éxito`);
  })
  .catch((error) => console.log("[seed]: Error añadiendo los centros", error))
  .finally(() => mongoose.disconnect());

const centerLog = "Centros Listos!!";

module.exports = centerLog;
