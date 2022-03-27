const util = require("util");
const fs = require("fs");
const mysql = require("mysql2");

const { CONNECTION_CONFIG } = require("./config.js");

async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const readFile = util.promisify(fs.readFile);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    const data = await readFile("../dev-data/coe.json", "utf8");
    const coes = JSON.parse(data);
    const promises = coes.map((coe) => execQuery("INSERT INTO coe SET ?", coe));
    await Promise.all(promises);
    console.log("Data Added Successfully!");
    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}

seedDatabase();
