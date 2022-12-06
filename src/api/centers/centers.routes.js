const express = require("express");
const Center = require("./centers.model");
const router = express.Router();
const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { deleteFile } = require("../../middlewares/deleteFile");

router.get("/", async (req, res, next) => {
  try {
    const allCenters = await Center.find();
    return res.status(200).json(allCenters);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const centerToFind = await Center.findById(id);
    return res.status(200).json(centerToFind);
  } catch (error) {
    return next(error);
  }
});

router.get("/getbyname/:name", async (req, res, next) => {
  try {
    const name = req.params.name;
    const centerToFind = await Center.findOne({ name: name });
    return res.status(200).json(centerToFind);
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
      const center = req.body;
      if (req.file) {
        center.img = req.file.path;
      }
      const newCenter = new Center(center);
      const created = await newCenter.save();
      return res.status(201).json(created);
    } catch (error) {
      return next(error);
    }
  }
);

router.delete("/delete/:id", [isAdmin], async (req, res, next) => {
  try {
    const id = req.params.id;
    const center = await Center.findById(id);
    if (center.img) {
      deleteFile(center.img);
    }
    const centerToDelete = await Center.findByIdAndDelete(id);
    return res
      .status(200)
      .json(`Se ha conseguido borrar la enfermedad ${centerToDelete.name}`);
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
      const center = req.body;
      const centerOld = await Center.findById(id);
      const centerModify = new Center(center);
      if (req.file) {
        if (centerOld.img) {
          deleteFile(centerOld.img);
        }
        centerModify.img = req.file.path;
      }
      centerModify._id = id;
      const centerUpdated = await Center.findByIdAndUpdate(id, centerModify);
      return res.status(200).json({
        mensaje: "Se ha conseguido editar la enfermedad",
        centerModificado: centerUpdated,
      });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
