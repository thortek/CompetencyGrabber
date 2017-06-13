import Fetch from '../common/fetch';

export default {

  async all() {
    const courseIds = [1,4,5,7,8,10];
    let grades = [];
    for (let course of courseIds) {
      console.log(`Fetching grades for course id=${course}`);
      try {
        let grade = await Fetch.get(`https://lms.heliotraining.com/api/v1/courses/${course}/gradebook_history/feed/?per_page=1000`);
        grades.push(JSON.stringify(grade));
      }
      catch (ex) {
        console.error(ex.message);
      }
    }
    return await grades;
  }

}
