const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.status(200).send("getAll working");
  })
  .post((req, res) => {
    res.status(201).send("post working");
  });

router
  .route("/:id")
  .get((req, res) => {
    res.status(201).send("get working");
  })
  .delete((req, res) => {
    res.status(201).send("delet working");
  })
  .patch((req, res) => {
    res.status(201).send("updated");
  });

module.exports = router;
