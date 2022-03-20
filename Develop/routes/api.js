const router = require("express").Router();
const Tasks = require("../models/Tasks.js");

router.post("/api/tasks", ({body}, res) => {
  Tasks.create(body)
    .then(dbTask => {
      res.json(dbTask);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post("/api/tasks/bulk", ({body}, res) => {
  Tasks.insertMany(body)
    .then(dbTask => {
      res.json(dbTask);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get("/api/tasks", (req, res) => {
  Tasks.find({}).sort({date: -1})
    .then(dbTask => {
      res.json(dbTask);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;