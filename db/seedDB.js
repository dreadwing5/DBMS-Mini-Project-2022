const mysql = require("mysql2");
const util = require("util");

const {
  CREATE_FACULTY_TABLE,
  CREATE_AWARDS_TABLE,
  CREATE_RESULTS_TABLE,
  CREATE_RESEARCH_PROJECT_TABLE,
  CREATE_PATENT_TABLE,
  CREATE_DEPARTMENT_LIST_TABLE,
  CREATE_COE_TABLE,
  CREATE_CLUB_NAME_TABLE,
} = require("./dbTable.js");

const { CONNECTION_CONFIG } = require("./config.js");

const seedDatabase = async function () {
  try {
    const connection = mysql.createConnection(CONNECTION_CONFIG);
    if (!connection) {
      throw new Error("Could not create connection");
    }
    const execQuery = util.promisify(connection.query.bind(connection));
    await createTable(execQuery);
    // await execQuery(CREATE_FACULTY_TABLE);

    console.log("Created Tables Successfully! :)");
    connection.end();
  } catch (err) {
    console.error(err);
  }
};

const createTable = async function (execQuery) {
  try {
    await execQuery(CREATE_FACULTY_TABLE);
    await execQuery(CREATE_AWARDS_TABLE);
    await execQuery(CREATE_RESULTS_TABLE);
    await execQuery(CREATE_RESEARCH_PROJECT_TABLE);
    await execQuery(CREATE_PATENT_TABLE);
    await execQuery(CREATE_DEPARTMENT_LIST_TABLE);
    await execQuery(CREATE_COE_TABLE);
    await execQuery(CREATE_CLUB_NAME_TABLE);
  } catch (err) {
    throw err;
  }
};

seedDatabase();
