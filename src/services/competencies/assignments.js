import Fetch from '../common/fetch';

export default {

  async all() {
    const courseIds = [1,4,5,7,8,10];
    let assignments = [];
    for (let course of courseIds) {
    //for (let i = 0; i < 200; i++) {
      console.log(`Fetching assignments for course id=${course}`);
      try {
        let assignment = await Fetch.get(`https://lms.heliotraining.com/api/v1/courses/${course}/assignments`);
        assignments.push(JSON.stringify(assignment));
      }
      catch (ex) {
        console.error(ex.message);
      }
    }
    return await assignments;
  }

}
