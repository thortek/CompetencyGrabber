import Fetch from '../common/fetch';
import Groups from './groups'


export default {

  async all() {
    // const groups = await Groups.all();
    // const uris = groups.map(group => `https://lms.heliotraining.com${group.uris.outcomes}?per_page=100`);

    // const promises = uris.map(uri => Fetch.get(uri));
    // return (await Promise.all(promises));
    let outcomes = [];
    for (let i = 0; i < 200; i++) {
      try {
        let outcome = await Fetch.get(`https://lms.heliotraining.com/api/v1/outcomes/${i}`);
        outcomes.push(JSON.stringify(outcome));
      }
      catch (ex) {
        console.error(ex.message);
      }
    }
    return await outcomes;
  }

}
