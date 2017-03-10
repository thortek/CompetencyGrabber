import Fetch from '../common/fetch';
import Groups from './groups'


export default {

  async all() {
    const groups = await Groups.all();
    const uris = groups.map(group => `https://lms.heliotraining.com${group.uris.outcomes}?per_page=100`);

    const promises = uris.map(uri => Fetch.get(uri));
    return (await Promise.all(promises)).reduce((prev, current) => current, []);
  }

}
