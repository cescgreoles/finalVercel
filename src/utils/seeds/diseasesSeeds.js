const { mongoose } = require("mongoose");
const Disease = require("../../api/diseases/diseases.model");
const { DB_URL } = require("../database/db");

const diseases = [
  {
    name: "Alzheimer",
    description:
      "La enfermedad de Alzheimer es un trastorno cerebral que destruye lentamente la memoria y la capacidad de pensar y, con el tiempo, la habilidad de llevar a cabo hasta las tareas más sencillas. Las personas con Alzheimer también experimentan cambios en la conducta y la personalidad.",
    img: "https://rochepacientes.es/content/dam/roche-pacientes-2/es/assets/images/Fase-preclinica-del-alzheimer.png",
    symptoms: "Cambios en la forma de pensar, recordar, razonar y comportarse",
    treatment:
      "Los medicamentos actuales para tratar la enfermedad de Alzheimer pueden ayudar durante un tiempo con los síntomas que afectan la memoria y para otros cambios cognitivos. Actualmente, se utilizan dos tipos de medicamentos para tratar los síntomas que afectan el sistema cognitivo: Los inhibidores de la colinesterasa y la Memantina (Namenda)",
    mortality:
      "El Alzheimer no es solo la pérdida de la memoria, el Alzheimer mata. 1 de 3 personas mayores muere con Alzheimer u otra demencia",
  },
  {
    name: "Parkinson",
    description:
      "La enfermedad de Parkinson es un tipo de trastorno del movimiento. Ocurre cuando las células nerviosas (neuronas) no producen suficiente cantidad de una sustancia química importante en el cerebro conocida como dopamina. Algunos casos son genéticos pero la mayoría no parece darse entre miembros de una misma familia.",
    img: "https://i0.wp.com/parapupas.com/wp-content/uploads/2020/03/parkinson-1.png?ssl=1",
    symptoms:
      "Aparecen temblores en las manos, los brazos, las piernas, la mandíbula y la cara. Rigidez en los brazos, las piernas y el tronco, y prblemas de equilibrio y cordinación",
    treatment:
      "La enfermedad de Parkinson no tiene cura, pero los medicamentos pueden ayudar a controlar los síntomas, generalmente en forma notable. En algunos casos más avanzados, se puede aconsejar la cirugía. Se recomiendan algunos cambios en el estilo de vida, especialmente, ejercicios aeróbicos constantes. En algunos casos, la fisioterapia que se centra en el equilibrio y la elongación desempeña un papel importante. Un patólogo del habla y el lenguaje puede ayudar a mejorar los problemas del habla.",
    mortality:
      "La esperanza de vida de una persona con Parkinson puede ser como la de una persona sana. Pueden pasar 15 ó 20 años desde su diagnóstico, en los que la calidad de vida es buena.",
  },
  {
    name: "Esclerosis múltiple",
    description:
      "Es una enfermedad neurológica y autoinmunitaria en la que las propias células del sistema inmunitario atacan al sistema nervioso central, lo que produce lesiones",
    img: "https://www.fem.es/wp-content/uploads/2020/05/aaff_fem_figura-persona-es.png",
    symptoms:
      "Entumecimiento o debilidad en una o más extremidades que se produce típicamente en un lado del cuerpo a la vez, o en las piernas y el tronco, sensaciones de choques eléctricos que se producen con ciertos movimientos del cuello, en especial, al inclinarlo hacia adelante (signo de Lhermitte) y problemas de visión, entre otros síntomas",
    treatment:
      "Para la esclerosis múltiple progresiva primaria, el ocrelizumab (Ocrevus) es la única terapia modificadora de la enfermedad aprobada por la FDA. Las personas que reciben este tratamiento tienen un poco menos probabilidades de progresar que aquellas que no son tratadas",
    mortality:
      "La esclerosis múltiple no es una afección mortal en la mayoría de los casos, y la mayoría de las personas con esclerosis múltiple tienen una esperanza de vida casi normal. Sin embargo, ya que la enfermedad varía mucho según la persona, puede ser difícil que los médicos predigan si la afección empeorará o mejorará.",
  },
  {
    name: "Esclerosis lateral amiotrófica(ELA)",
    description:
      "La esclerosis lateral amiotrófica, o ELA, es una enfermedad progresiva del sistema nervioso que afecta las células nerviosas en el cerebro y la médula espinal, y causa pérdida del control muscular. La ELA a menudo se llama enfermedad de Lou Gehrig, en honor al jugador de béisbol al que se le diagnosticó la enfermedad.",
    img: "https://i2.wp.com/parapupas.com/wp-content/uploads/2020/05/ela.png?ssl=1",
    symptoms:
      "Pérdida de fuerza, atrofia muscular, contracciones musculares, calambres",
    treatment:
      "Actualmente, el principal objetivo del tratamiento de la ELA es prolongar la supervivencia y mejorar la calidad de vida de los pacientes a través de medicamentos y cuidados. Así, el mejor tratamiento es una combinación de agentes neuroprotectores, manejo sintomático, nutricional y soporte ventilatorio.",
    mortality:
      "La esclerosis lateral amiotrófica (ELA) es una enfermedad con muy mal pronóstico, con una mortalidad del 50% a los 18 meses tras el diagnóstico. Las unidades multidisciplinares pretenden mejorar la calidad de vida y la supervivencia de los enfermos de ELA",
  },
];

mongoose
  .connect(DB_URL)
  .then(async () => {
    const allDiseases = await Disease.find().lean();

    if (!allDiseases.length) {
      console.log("[seed]: No se encuentran enfermedades, continuo...");
    } else {
      console.log(`[seed]: Encontrados ${allDiseases.length} enfermedades.`);
      await Disease.collection.drop();
      console.log("[seed]: Colección Diseases eliminada correctamente");
    }
  })
  .catch((error) =>
    console.log("[seed]: Error eliminando la colección -->", error)
  )
  .then(async () => {
    await Disease.insertMany(diseases);
    console.log(
      `[seed]: ${diseases.length} nuevas enfermedades añadidos con éxito`
    );
  })
  .catch((error) =>
    console.log("[seed]: Error añadiendo las enfermedades", error)
  )
  .finally(() => mongoose.disconnect());

const diseaseLog = "Listado de enfermedades listo";

module.exports = diseaseLog;
