const util = require("util");
const fs = require("fs");
const mysql = require("mysql2");

const { CONNECTION_CONFIG } = require("./config.js");

async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const readFile = util.promisify(fs.readFile);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    const data = await readFile("../dev-data/dept.json", "utf8");
    const departmentList = JSON.parse(data);
    const promises = departmentList.map((dept) =>
      execQuery("INSERT INTO department SET ?", dept)
    );
    await Promise.all(promises);
    console.log("Department Added Successfully!");
    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}

seedDatabase();
