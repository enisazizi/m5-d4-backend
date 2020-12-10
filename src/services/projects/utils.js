const fs = require("fs");
const path = require("path");
const fileRead = (fileName) => {
  const buffer = fs.readFileSync(path.join(__dirname, fileName));
  const fileContent = buffer.toString();
  return JSON.parse(fileContent);
};

const studentsArray = fileRead("../students/students.json");
const projectsArray = fileRead("projects.json");

const findByID = (id) => {
  const checkID = studentsArray.some((student) => student.ID === id);
  return checkID;
};

const addPropertyNoProject = (id) => {
  let student = studentsArray.find((student) => student.ID === id);
  console.log("student: ", student);
  console.log("studentArray: ", studentsArray);
  if (student.hasOwnProperty("numberOfProjects")) {
    student.numberOfProjects += 1;
  } else {
    student.numberOfProjects = 1;
  }
  fs.writeFileSync(
    path.join(__dirname, "../students/students.json"),
    JSON.stringify(studentsArray)
  );
};

const studentProjects = (id) => {
  const projects = projectsArray.filter(
    (projects) => projects.studentID === id
  );
  return projects;
};

module.exports = { findByID, addPropertyNoProject, studentProjects };