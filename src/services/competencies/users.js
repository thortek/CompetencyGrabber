import Fetch from '../common/fetch';

export default {

  async all() {
    let users = [];
      try {
        let user = await Fetch.get(`https://lms.heliotraining.com/api/v1/accounts/1/users/?per_page=1000`);
        users.push(JSON.stringify(user));
      }
      catch (ex) {
        console.error(ex.message);
      }
    return await users;
  }

}
