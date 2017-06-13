import Fetch from '../common/fetch';

export default {

  async all() {
    const courseIds = [1,4,5,7,8,10];
    let assessments = [];
    for (let course of courseIds) {
      console.log(`Fetching assessments for course id=${course}`);
      try {
        let assessment = await Fetch.get(`https://lms.heliotraining.com/api/v1/courses/${course}/quizzes`);
        assessments.push(JSON.stringify(assessment));
      }
      catch (ex) {
        console.error(ex.message);
      }
    }
    return await assessments;
  }

}
