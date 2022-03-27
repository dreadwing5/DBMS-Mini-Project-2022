const util = require("util");
const fs = require("fs");
const mysql = require("mysql2");

const { CONNECTION_CONFIG, getConnection } = require("../db/config");

async function seedDatabase() {
  const readFile = util.promisify(fs.readFile);
  try {
    const dept = await readFile(`${__dirname}/dept.json`, "utf8");
    const coe = await readFile(`${__dirname}/coe.json`, "utf8");
    const departmentList = JSON.parse(dept);
    const coes = JSON.parse(coe);
    const db = await getConnection();
    const promises = departmentList.map((dept) =>
      db.query("INSERT INTO department SET ?", dept)
    );
    const coePromises = coes.map((coe) =>
      db.query("INSERT INTO coe SET ?", coe)
    );
    await Promise.all(promises, coePromises);
    console.log("Department Added Successfully :) ");
    console.log("COE Added Successfully :) ");
    db.close();
    process.exit();
  } catch (err) {
    db.close();
    console.error(err.message);
  }
}

seedDatabase();
