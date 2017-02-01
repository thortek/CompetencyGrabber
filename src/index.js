
const Request = require('request');
const fs = require('fs');
const dotenv = require('dotenv');

//import dotenv from 'dotenv';
dotenv.load();

//function getCompetencies() {
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
      fs.appendFile('descriptions.json', decodeCharRefs(data.description) + ',\n', err => {
        if (err) {
          console.log("Could not decode characters");
        }
      })
    });
  }

function decodeCharRefs(string) {
    return string
        .replace(/&#(\d+);/g, function(match, num) {
            return String.fromCharCode(num);
        })
        .replace(/&#x([A-Za-z0-9]+);/g, function(match, num) {
            return String.fromCharCode(parseInt(num, 16));
        });
}
