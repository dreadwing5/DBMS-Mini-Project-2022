const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const mysql = require("mysql2");
const util = require("util");

const CONNECTION_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const CREATE_DATABASE = `Create Database faculty_db`;

const createDBConnection = async () => {
  try {
    const connection = mysql.createConnection(CONNECTION_CONFIG);
    if (!connection) {
      throw new Error("Could not create connection");
    }
    const execQuery = util.promisify(connection.query.bind(connection));

    await execQuery(CREATE_DATABASE);

    console.log("Faculty Database Created Successfully :)");
    connection.end();
  } catch (error) {
    console.error(error);
  }
};

createDBConnection();
