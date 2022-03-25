const express = require("express");

const router = express.Router();

const connection = require("../configs/DBConnection");

const { snakeCase } = require("lodash");
const { ensureAuthenticated } = require("../configs/auth");

//Get dropdown list

router.get("/dropdown/:field", ensureAuthenticated, (req, res) => {
  let field = snakeCase(req.params.field);

  let sql = `Select * from ${field}`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);

      res.send({
        code: 400,

        failed: "error ocurred",
      });
    }

    const results = Object.values(JSON.parse(JSON.stringify(result)));

    res.send(results);
  });
});

//Insert dropdwon field

router.post("/dropdown/:field", ensureAuthenticated, (req, res) => {
  let field = snakeCase(req.params.field);

  const { name } = req.body;

  const value = `("${name}")`; //Format name into a string

  connection.query(
    `INSERT INTO ${field} (name) VALUES ${value}`,

    function (error, results) {
      if (error) {
        console.error(error);

        res.send({
          code: 400,

          failed: "error ocurred",
        });
      } else {
        console.log("Data Added Successfully!");

        res.send({
          code: 200,

          message: "Added successfully!!",
        });
      }
    }
  );
});

//Delete Dropdown field

router.delete("/dropdown/:field", ensureAuthenticated, (req, res) => {
  let field = snakeCase(req.params.field);

  const { id } = req.body;

  connection.query(
    `DELETE FROM ${field} WHERE id='${id}';`,

    function (error, results) {
      if (error) {
        console.error(error);

        res.send({
          code: 400,

          failed: "error ocurred",
        });
      } else {
        console.log("Data Deleted Successfully!");

        res.send({
          code: 200,

          message: "Deleted Successfully!!",
        });
      }
    }
  );
});

module.exports = router;
