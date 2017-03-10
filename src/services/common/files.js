import FS from 'fs';

export default {

  async load(absolutePath, options) {
    return await new Promise((resolve, reject) => {
      return FS.readFile(absolutePath, options, (err, data) => {
        if (err) return reject(err);

        const raw = data.toString();
        if (raw instanceof String || !(raw instanceof Object)) return resolve(JSON.parse(raw));

        return resolve(raw);
      })
    });
  },

  async save(absolutePath, data, options) {
    return await new Promise((resolve, reject) => {
      return FS.writeFile(absolutePath, data, options, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      })
    })
  }


}
