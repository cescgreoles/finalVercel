const express = require("express");
const Disease = require("./diseases.model");
const router = express.Router();
const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { deleteFile } = require("../../middlewares/deleteFile");

router.get("/", async (req, res, next) => {
  try {
    const allDiseases = await Disease.find();
    return res.status(200).json(allDiseases);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const diseaseToFind = await Disease.findById(id);
    return res.status(200).json(diseaseToFind);
  } catch (error) {
    return next(error);
  }
});

router.get("/getbyname/:name", async (req, res, next) => {
  try {
    const name = req.params.name;
    const diseaseToFind = await Disease.findOne({ name: name });
    return res.status(200).json(diseaseToFind);
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
      const disease = req.body;
      if (req.file) {
        disease.img = req.file.path;
      }
      const newDisease = new Disease(disease);
      const created = await newDisease.save();
      return res.status(201).json(created);
    } catch (error) {
      return next(error);
    }
  }
);

router.delete("/delete/:id", [isAdmin], async (req, res, next) => {
  try {
    const id = req.params.id;
    const disease = await Disease.findById(id);
    if (disease.img) {
      deleteFile(disease.img);
    }
    const diseaseToDelete = await Disease.findByIdAndDelete(id);
    return res
      .status(200)
      .json(`Se ha conseguido borrar la enfermedad ${diseaseToDelete.name}`);
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
      const disease = req.body;
      const diseaseOld = await Disease.findById(id);
      const diseaseModify = new Disease(disease);
      if (req.file) {
        if (diseaseOld.img) {
          deleteFile(diseaseOld.img);
        }
        diseaseModify.img = req.file.path;
      }
      diseaseModify._id = id;
      const diseaseUpdated = await Disease.findByIdAndUpdate(id, diseaseModify);
      return res.status(200).json({
        mensaje: "Se ha conseguido editar la enfermedad",
        diseaseModificado: diseaseUpdated,
      });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
