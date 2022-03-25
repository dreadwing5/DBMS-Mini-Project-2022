const express = require("express");
const router = express.Router();
const connection = require("../configs/DBConnection");
const { snakeCase, startCase } = require("lodash");

const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../configs/auth");

const formatDate = (date, format) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return format === "dd-mm-yyyy"
    ? [day, month, year].join("-")
    : [year, month, day].join("-");
};

function handleRoute(req, res) {
  let { event, fromDate, toDate, department, coe, isDescriptionRequired } =
    req.body;
  console.log(req.body);
  let tables = [];

  const filterData = (res, data) => {
    //Filter the data based on query

    for (let key in res) {
      if (key.includes("date") || key.includes("Date")) {
        res[key] = formatDate(res[key], "dd-mm-yyyy"); //Format data in the form dd-mm-yyyy
      }
    }

    if (res.department == null) {
      res.department = "NULL";
    }

    delete res.filterDate; //Remove filter date from the result

    /* This if condition checks if the department is null or not, basically it's going to filter the result based on department and coe */

    if (
      (res.department == "NULL" ||
        department == "all" ||
        res.department == department) &&
      (coe == "all" || coe == res.coe)
    ) {
      data.push(res);
    }
  };

  const getAllTables = () => {
    let sql = `SELECT table_name FROM information_schema.tables WHERE table_schema = "data_repository"`;

    connection.query(sql, (err, result) => {
      if (err) console.log(err);
      result.forEach(({ TABLE_NAME }) => {
        let table = TABLE_NAME;
        if (
          !(
            table === "faculty" ||
            table === "coe" ||
            table === "club_name" ||
            table === "department"
          )
        )
          tables.push(table);
      }); //filter out table
      let data = [];
      let eventName = [];
      tables.forEach((table, i) => {
        eventName.push(startCase(table).toUpperCase());
        //For each table we are going to fetch the table data and push it into data array
        let sql = `Select * from ${table}`;
        connection.query(sql, (err, result) => {
          if (err) console.log(err);
          let dataTemp = [];
          result.forEach((res) => {
            filterData(res, dataTemp);
          });
          data.push(dataTemp);
          if (i == tables.length - 1) {
            res.render("report/report", {
              data: data,
              event: eventName,
              isDescriptionRequired,
            });
          }
        });
      });
    });
  };

  const getTable = () => {
    let data = [];
    let sql = `Select * from ${event} Where (filterDate BETWEEN ? AND ?)`; //Search for all the data
    connection.query(sql, [fromDate, toDate], (err, result, fields) => {
      if (err) throw err;

      //Filter the data based on query
      result.forEach((res) => {
        filterData(res, data);
      });
      if (data.length == 0) {
        res.json({
          error: "the data is empty based on your search results",
        });
        return;
      }

      //Check for Details req

      // module = [module];

      /* This code is only there to support all filed in the report page,since we are going to create array of array of object */

      event = [startCase(event).toUpperCase()];
      data = [data];

      res.render("report/report", {
        data: data,
        event: event,
        isDescriptionRequired,
      });
    });
  };

  event === "all" ? getAllTables() : getTable();
}

//Filter Data and Print for both Faculty & Student
router.post("/search", ensureAuthenticated, (req, res) => {
  handleRoute(req, res); //Handle search route
});

//@route    GET api/edit?
//@desc     Edit Route
//@access   Public

router.get("/edit?", ensureAuthenticated, (req, res) => {
  let { name, id } = req.query;
  name = snakeCase(name);

  let sql = `Select * from ${name} Where id=${id}`;
  connection.query(sql, (error, result, fields) => {
    if (error) {
      console.error(error);
      res.send({
        code: 400,
        failed: "error ocurred",
      });
    } else {
      result.forEach((res, i) => {
        for (let key in res) {
          if (key.includes("date") || key.includes("Date")) {
            res[key] = formatDate(res[key], "yyyy-mm-dd"); //Format the date in 2020-02-12 so that html can understand the date format and parse it
          }
        }
        delete res.filterDate; //We may need filterDate ifwe don't want to modify the search parameter
      });
    }
    const data = JSON.parse(JSON.stringify(result[0]));
    // console.log("Data to Be Edited", data);
    res.render(`fields/${name}`, {
      title: startCase(name),
      isInsertMode: false,
      Username: "test",
      data: data,
    });
  });
});

module.exports = router;
