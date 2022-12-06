const express = require("express");
const Specialist = require("./specialists.model");
const router = express.Router();
const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { deleteFile } = require("../../middlewares/deleteFile");

router.get("/", async (req, res, next) => {
  try {
    const allSpecialists = await Specialist.find();
    return res.status(200).json(allSpecialists);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const specialistToFind = await Specialist.findById(id);
    return res.status(200).json(specialistToFind);
  } catch (error) {
    return next(error);
  }
});

router.get("/getbyname/:name", async (req, res, next) => {
  try {
    const name = req.params.name;
    const specialistToFind = await Specialist.findOne({ name: name });
    return res.status(200).json(specialistToFind);
  } catch (error) {
    return next(error);
  }
});

router.post(
  "/create",
  [isAdmin],
  upload.single("img"),
  async (req, res, next) => {
    try {
      const specialist = req.body;
      if (req.file) {
        specialist.img = req.file.path;
      }
      const newSpecialist = new Specialist(specialist);
      const created = await newSpecialist.save();
      return res.status(201).json(created);
    } catch (error) {
      return next(error);
    }
  }
);

router.delete("/delete/:id", [isAdmin], async (req, res, next) => {
  try {
    const id = req.params.id;
    const specialist = await Specialist.findById(id);
    if (specialist.img) {
      deleteFile(specialist.img);
    }
    const specialistToDelete = await Specialist.findByIdAndDelete(id);
    console.log(specialistToDelete);
    return res
      .status(200)
      .json(
        `Se ha conseguido borrar el especialista ${specialistToDelete.name}`
      );
  } catch (error) {
    return next(error);
  }
});

router.put(
  "/edit/:id",
  [isAdmin],
  upload.single("img"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const specialist = req.body;
      const specialistOld = await Specialist.findById(id);
      const specialistModify = new Specialist(specialist);
      if (req.file) {
        if (specialistOld.img) {
          deleteFile(specialistOld.img);
        }
        specialistModify.img = req.file.path;
      }
      specialistModify._id = id;
      const specialistUpdated = await Specialist.findByIdAndUpdate(
        id,
        specialistModify
      );
      return res.status(200).json({
        mensaje: "Se ha conseguido editar el especialista",
        specialistModificado: specialistUpdated,
      });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
