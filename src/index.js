const Request = require('request');
const fs = require('fs');
const async = require('async');
const dotenv = require('dotenv');

import Services from './services';
import Files from './services/common/files';
import Path from 'path';

import CompQL from './services/graphql/import-competencies';

dotenv.load();

const COMPETENCY_PATH = './services/competencies/data/allCompetencies.json';
const ASSIGNMENT_PATH = './services/competencies/data/allAssignments.json';
const ASSESSMENT_PATH = './services/competencies/data/allAssessments.json';
const USERS_PATH = './services/competencies/data/allUsers.json';
const GRADES_PATH = './services/competencies/data/allGrades.json';
const getPath = async (directory, relativePath) => Path.join(directory, relativePath);

const writeCompetencies = async () => {
  const path = await getPath(__dirname, COMPETENCY_PATH);
  Files.save(path, await Services.competencies.outcomes.all(), (err) => {
    if (err) throw err;
    console.log(`Competencies are saved to file ${COMPETENCY_PATH}`);
  });
};

const writeAssignments = async () => {
  const path = await getPath(__dirname, ASSIGNMENT_PATH);
  Files.save(path, await Services.competencies.assignments.all(), (err) => {
    if (err) throw err;
    console.log(`Assignments are saved to file ${ASSIGNMENT_PATH}`);
  });
};

const writeAssessments = async () => {
  const path = await getPath(__dirname, ASSESSMENT_PATH);
  Files.save(path, await Services.competencies.assessments.all(), (err) => {
    if (err) throw err;
    console.log(`Assessments are saved to file ${ASSESSMENT_PATH}`);
  });
};

const writeUsers = async () => {
  const path = await getPath(__dirname, USERS_PATH);
  Files.save(path, await Services.competencies.users.all(), (err) => {
    if (err) throw err;
    console.log(`Users are saved to file ${USERS_PATH}`);
  });
};

const writeGrades = async () => {
  const path = await getPath(__dirname, GRADES_PATH);
  Files.save(path, await Services.competencies.grades.all(), (err) => {
    if (err) throw err;
    console.log(`Grades are saved to file ${GRADES_PATH}`);
  });
};

// writeCompetencies()
//   .then(() => console.log('Writing out all Canvas competencies to file is finished'))
//   .catch(err => console.log(err));

// writeAssignments()
//   .then(() => console.log('Writing out all Canvas assignments to file is finished'))
//   .catch(err => console.log(err));

// writeAssessments()
//   .then(() => console.log('Writing out all Canvas assessments to file is finished'))
//   .catch(err => console.log(err));

// writeUsers()
//   .then(() => console.log('Writing out all Canvas users to file is finished'))
//   .catch(err => console.log(err));

// writeGrades()
//   .then(() => console.log('Writing out all Canvas grade historys to file is finished'))
//   .catch(err => console.log(err));


import Lokka from 'lokka';
import Transport from 'lokka-transport-http';

const rawCompetencies = require('./services/competencies/data/allCompetencies.json');

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/cj3dui2aa1gjd0197zk5b3lgc')
})

const createCompetency = async(comp) => {
  const mutation = `($name: String!, $description: String) {
   createCompetency(
      name: $name
      description: $description
      ) {
          id
          name
        }
  }`

let mutateVars = {
    name: comp.title,
    description: comp.description
  }

  return await client.mutate(mutation, mutateVars);
}

const createCompetencies = async(rawCompetencies) => {
  return await Promise.all(rawCompetencies.map(createCompetency))
}

const main = async() => {
  // create competencies
  const competencyIds = await createCompetencies(rawCompetencies)
  console.log(`Created ${competencyIds.length} competencies`)
}

main().catch((e) => console.error(e))
