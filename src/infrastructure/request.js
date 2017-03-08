import Request from 'request';

const CANVAS_API_KEY = process.env.CANVAS_API_KEY;
const requestInstance = Request.defaults({ auth: { bearer: CANVAS_API_KEY } });

export default {

  async get(url, options = {}) {
    return await new Promise((resolve, reject) => {
      return requestInstance.get(url, options, (err, response, payload) => {
        if (err) return reject(err);
        const { statusCode } = response;

        if (statusCode >= 300) {
          const httpError = new Error(payload);
          httpError.statusCode = statusCode;
          return reject(httpError);
        }
        return resolve(payload);
      });

    });
  },

  async getAll(urls, options = {}) {
    return await Promise.all(urls.map(url => this.get(url, options)));
  }
}
