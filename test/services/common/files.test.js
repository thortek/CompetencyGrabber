import Test from 'ava';
import Fetch from '../../../src/services/common/fetch';

const COMPETENCY_URI = `https://lms.heliotraining.com/api/v1/accounts/1/outcome_groups/20/outcomes?per_page=100`;

Test(`get(uri, options)`, async t => {
  const response = await Fetch.get(COMPETENCY_URI);
  t.truthy(response);
});
