import Fetch from '../common/fetch';


export default {

  async all(uris = []) {
    const promises = uris.map(uri => Fetch.get(uri));
    return await Promise.all(promises);
  }

}
