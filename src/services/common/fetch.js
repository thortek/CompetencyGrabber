import Fetch from 'node-fetch';
import Boom from 'boom';

const CANVAS_API_KEY = process.env.CANVAS_API_KEY || '';
const DEFAULT_OPTIONS = { auth: { bearer: CANVAS_API_KEY } };

const configure = (options = {}) => Object.assign({}, DEFAULT_OPTIONS, options);

const fetch = async (uri, method = 'GET', options = {}) => {
  return await new Promise((resolve, reject) => {
    return Fetch(uri, Object.assign({}, configure({ method }), options)).then(response => {
      const { ok, status, statusText } = response;

      if (!ok || (status > 399)) return reject(Boom.create(status, statusText, { createdAt: Date.now(), response }));
      return resolve(response);
    });
  });
};

export default {

  async get(uri, options) {
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
