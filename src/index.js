const Request = require('request');
const fs = require('fs');
const async = require('async');
const dotenv = require('dotenv');

import Services from './services';
import Files from './services/common/files';
import Path from 'path';

const RELATIVE_PATH = './services/competencies/data/competencies.json';

const getPath = async(directory, relativePath) => Path.join(directory, relativePath);

//import dotenv from 'dotenv';
dotenv.load();

const sample = { "id": 2, "context_id": 1, "context_type": "Account", "vendor_guid": null, "display_name": "", "title": "Use basic Bash/Terminal commands", "url": "/api/v1/outcomes/2", "can_edit": true, "description": "\u003Cp\u003ELearner is able to use Bash commands to:\u003C/p\u003E\r\n\u003Col\u003E\r\n\u003Cli\u003Elist all files in a directory including hidden files\u003C/li\u003E\r\n\u003Cli\u003Enavigate up and down a directory structure\u003C/li\u003E\r\n\u003Cli\u003Eredirect and pipe output between processes\u003C/li\u003E\r\n\u003Cli\u003Eexecute scripts from the terminal\u003C/li\u003E\r\n\u003Cli\u003Edetermine their network interfaces and IP address\u003C/li\u003E\r\n\u003Cli\u003Eidentify and edit environment and profile (e.g. .bash_profile) settings\u003C/li\u003E\r\n\u003Cli\u003Einstall software packages\u003C/li\u003E\r\n\u003Cli\u003Ewrite and execute a custom script\u003C/li\u003E\r\n\u003C/ol\u003E", "calculation_method": "highest", "points_possible": 5.0, "mastery_points": 3.0, "ratings": [{ "description": "Exceeds Expectations", "points": 5.0 }, { "description": "Meets Expectations", "points": 3.0 }, { "description": "Does Not Meet Expectations", "points": 0.0 }], "assessed": 3 };

function getDescriptions() {
  fs.readFile('competencies.json', (error, data) => {
    if (error) throw err;
    // data.forEach((item) => {
    //   console.log(item);
    // });
    let compArray = JSON.parse(data);

    fs.writeFile('descriptions.json', JSON.stringify(compArray), (err) => {
      if (err) throw err;
      console.log('It\'s saved!');
    })
  });
}

function getCompetencies() {
  for (let i = 1; i < 140; i++) {
    Request.get('https://lms.heliotraining.com/api/v1/outcomes/' + i, {
      auth: {
        bearer: process.env.CANVAS_API_KEY
      }
    }).on('error', function (err) {
      console.log(err);
    }).on('data', function (data) {

      // fs.appendFile('competencies.json', data + ',\n', err => {
      //   if (err) {
      //     throw err;
      //   }
      // });
      let parsedData = JSON.parse(data);
      fs.appendFile('descriptions.json', parsedData.description + ',\n', err => {
        if (err) {
          console.log("Could not decode characters");
        }
      })
    }).on('response', function (response) {
      console.log(response.headers);
    });
  }
}

function decodeCharRefs(string) {
  return string
    .replace(/&#(\d+);/g, function (match, num) {
      return String.fromCharCode(num);
    })
    .replace(/&#x([A-Za-z0-9]+);/g, function (match, num) {
      return String.fromCharCode(parseInt(num, 16));
    });
}

function getFullStackCompetencyGroups() {
  //request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'))
  Request.get('https://lms.heliotraining.com/api/v1/accounts/1/outcome_groups/6/subgroups?per_page=100', {
    auth: {
      bearer: process.env.CANVAS_API_KEY
    }
  }).on('error', function (err) {
    console.log(err);
  }).pipe(fs.createWriteStream(__dirname + '/data/fullStackCompetencyGroups.json')
    .on('error', err => {
      return console.log(err);
    }));
}

function getGroupCompetencies() {
  // const getGroupCompetencies = new Promise(function(resolve, reject) {
  let allCompetencies = [];
  let groupArray = new Promise(function (resolve, reject) {

    fs.readFile(`${__dirname}/data/fullStackCompetencyGroups.json`, (err, data) => {
      if (err) {
        reject(Error(err.message));
      }
      //console.log(JSON.parse(data));
      resolve(JSON.parse(data));
    });
  }).then(function (result) {
    console.log(result);
  }, function (err) {
    console.log(err);
  });
  //console.log(groupArray);

  for (let comp in groupArray) {
    let groupUrl = comp.outcomes_url;
    console.log(groupUrl);
    Request.get(`https://lms.heliotraining.com${groupUrl}?per_page=100`, {
      auth: {
        bearer: process.env.CANVAS_API_KEY
      }
    }).on('error', function (err) {
      console.log(err);
    }).on('data', data => {
      for (let item of data) {
        //console.log(item);
        allCompetencies.push(item);
      }
    })
  }
  console.log(allCompetencies);
  // fs.appendFile(`${__dirname}/data/competencies.json`, allCompetencies, (err) => {
  //   if (err) console.log(err);
  //   console.log("written to file");
  // });
}

//getFullStackCompetencyGroups();
// getGroupCompetencies();

// const GROUP_COMPETENCIES_PATH = Path.join(__dirname, `/data/fullStackCompetencyGroups.json`);
// const groupCompetencies = async (path) => (await Files.load(path)).map(group => `https://lms.heliotraining.com${group.outcomes_url}?per_page=100`);
//
// const COMPETENCIES_PATH = Path.join(__dirname, `/data/competencies.json`);
// const allCompetencies = async (groups = []) => await Requests.getAll(groups);
// const saveCompetencies = async (path, competencies) => await Files.save(path, competencies);


const run = async () => {
  //const outcome_groups = await Services.competencies.outcomes.all();
  //console.log(await Services.competencies.outcomes.all());
  const path = await getPath(__dirname, RELATIVE_PATH);

  Files.save(path, await Services.competencies.outcomes.all(), (err) => {
    if (err) throw err;
    console.log('File is saved!');
  });
};



run()
  .then(() => console.log('finished'))
  .catch(err => console.log(err));
