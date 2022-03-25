exports.CREATE_FACULTY_TABLE = `
CREATE TABLE IF NOT EXISTS faculty(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, facultyId varchar(255), password varchar(255), name varchar(255), department varchar(255), mailId varchar(255), phoneNumber varchar(255), joiningDate Date, role varchar(255))
`;

exports.CREATE_AWARDS_TABLE = `CREATE TABLE IF NOT EXISTS awards (
  id int NOT NULL AUTO_INCREMENT,
  facultyId varchar(255) DEFAULT NULL,
  category varchar(255) DEFAULT NULL,
  department varchar(255) DEFAULT NULL,
  filterDate date DEFAULT NULL,
  level varchar(255) DEFAULT NULL,
  eventName varchar(255) DEFAULT NULL,
  awardedBy varchar(255) DEFAULT NULL,
  sem varchar(255) DEFAULT NULL,
  result varchar(255) DEFAULT NULL,
  status varchar(255) DEFAULT NULL,
  date date DEFAULT NULL,
  description text,
  coe varchar(255) DEFAULT NULL,
  type varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
)`;

exports.RESEARCH_PROJECTS_TABLE = `CREATE TABLE IF NOT EXISTS sponsored_research_projects (
    id int NOT NULL AUTO_INCREMENT,
    facultyId varchar(255) DEFAULT NULL,
    NameofPI varchar(255) DEFAULT NULL,
    COtoPI varchar(255) DEFAULT NULL,
    sanctionDate date DEFAULT NULL,
    submissionDate date DEFAULT NULL,
    rcid varchar(255) DEFAULT NULL,
    status varchar(255) DEFAULT NULL,
    title varchar(255) DEFAULT NULL,
    proposedAmount varchar(255) DEFAULT NULL,
    durationYear varchar(255) DEFAULT NULL,
    amount varchar(255) DEFAULT NULL,
    objectives text,
    benefit text,
    AgencyName varchar(255) DEFAULT NULL,
    received varchar(255) DEFAULT NULL,
    level varchar(255) DEFAULT NULL,
    coe varchar(255) DEFAULT NULL,
    description text,
    filterDate date DEFAULT NULL,
    grantDate date DEFAULT NULL,
    PRIMARY KEY (id)
    )`;

exports.CREATE_PATENT_TABLE = `CREATE TABLE IF NOT EXISTS patent(
        id int NOT NULL AUTO_INCREMENT,
        rcid varchar(255) CHARACTER DEFAULT NULL,
        grantDate date DEFAULT NULL,
        submissionDate date DEFAULT NULL,
        duration varchar(255) DEFAULT NULL,
        topic varchar(255) DEFAULT NULL,
        submissionName varchar(255) DEFAULT NULL,
        amount varchar(255) DEFAULT NULL,
        objectives text,
        benefit text,
        AgencyName varchar(255) DEFAULT NULL,
        earning varchar(255) DEFAULT NULL,
        level varchar(255) DEFAULT NULL,
        specification varchar(255) DEFAULT NULL,
        status varchar(255) DEFAULT NULL,
        commercialised varchar(255) DEFAULT NULL,
        coe varchar(255) DEFAULT NULL,
        description text,
        filterDate date DEFAULT NULL,
        PRIMARY KEY (id)
        )`;

exports.CREATE_RESULTS_TABLE = `CREATE TABLE IF NOT EXISTS results(
                id int NOT NULL AUTO_INCREMENT,
                facultyId varchar(255) DEFAULT NULL,
                academicYear varchar(255) DEFAULT NULL,
                passPercentage varchar(255) DEFAULT NULL,
                fcd varchar(255) DEFAULT NULL,
                firstClass varchar(255) DEFAULT NULL,
                secondClass varchar(255) DEFAULT NULL,
                failures varchar(255) DEFAULT NULL,
                appeared varchar(255) DEFAULT NULL,
                passed varchar(255) DEFAULT NULL,
                resultDate date DEFAULT NULL,
                department varchar(255) DEFAULT NULL,
                sem varchar(255) DEFAULT NULL,
                description text,
                filterDate date DEFAULT NULL,
                PRIMARY KEY (id)
                )`;

exports.CREATE_DEPARTMENT_LIST_TABLE = `CREATE TABLE IF NOT EXISTS department(id int AUTO_INCREMENT , name varchar(255), PRIMARY KEY(id))`;

exports.CREATE_COE_TABLE = `CREATE TABLE IF NOT EXISTS coe(id int AUTO_INCREMENT, name varchar(255), PRIMARY KEY(id))`;

exports.CREATE_CLUB_NAME_TABLE = `CREATE TABLE IF NOT EXISTS club_name(id int AUTO_INCREMENT, name varchar(255), PRIMARY KEY(id))`;
