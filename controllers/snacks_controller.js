const express = require('express');
const router = express.Router();

const snack = require('../models/snack.js');

router.get("/", (req, res) => {
    snack.all((data) => {
      const hbsObject = {
        snacks: data
      };
      res.render("index", hbsObject);
    });
  });
  
router.post('/api/snacks', (req, res) => {
  //create: (table, cols, vals, cb) => {
	snack.create(['category', 'snack', 'devoured'], [req.body.category, req.body.snack, req.body.devoured], (result) => {
    res.json({ id: result.insertId });
	});
});

router.put("/api/snacks/:id", (req, res) => {
    const condition = `id =  ${req.params.id}`;
    snack.update({devoured: req.body.devoured}, condition, (result) => {
        if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
      }
    );
  });
  
module.exports = router;