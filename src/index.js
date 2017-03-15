const Request = require('request');
const fs = require('fs');
const async = require('async');
const dotenv = require('dotenv');

import Services from './services';
import Files from './services/common/files';
import Path from 'path';

const RELATIVE_PATH = './services/competencies/data/competencies.json';

const getPath = async (directory, relativePath) => Path.join(directory, relativePath);

dotenv.load();

const run = async () => {
  const path = await getPath(__dirname, RELATIVE_PATH);

  Files.save(path, await Services.competencies.outcomes.all(), (err) => {
    if (err) throw err;
    console.log(`Competencies are saved to file ${RELATIVE_PATH}`);
  });
};

run()
  .then(() => console.log('finished'))
  .catch(err => console.log(err));
