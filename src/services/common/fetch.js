import Fetch from 'node-fetch';
import Boom from 'boom';
import dotenv from 'dotenv';

dotenv.load();

const CANVAS_API_KEY = process.env.CANVAS_API_KEY || '';
const DEFAULT_OPTIONS = { headers: { authorization: CANVAS_API_KEY } };

const configure = (options = {}) => Object.assign({}, DEFAULT_OPTIONS, options);

const fetch = async(uri, method = 'GET', options = {}) => {
  return await new Promise((resolve, reject) => {
    const configuration = Object.assign({}, configure({ method }), options);
    return Fetch(uri, Object.assign({}, configure({ method }), options))
      .then(response => {
        const { ok, status, statusText } = response;

        if (!ok || (status > 399)) return reject(Boom.create(status, statusText, { createdAt: Date.now(), response }));
        return resolve(response.json());
      });
  });
};

export default {

  async get(uri, options) {
    console.log(uri);
    return await fetch(uri, 'GET', options);
  },

  async post(uri, body, options) {
    return await fetch(uri, 'POST', Object.assign({}, { body }, options));
  },

  async put(uri, body, options) {
    return await fetch(uri, 'PUT', Object.assign({}, { body }, options));
  },

  async patch(uri, body, options) {
    return await  fetch(uri, 'PATCH', Object.assign({}, { body }, options));
  },

  async delete(uri, body, options) {
    return await  fetch(uri, 'DELETE', Object.assign({}, { body }, options));
  }
}
