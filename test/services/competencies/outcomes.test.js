import Test from 'ava';
import Services from '../../../src/services';


Test(`all()`, async t => {
  const outcomes = await Services.competencies.outcomes.all([`https://lms.heliotraining.com/api/v1/accounts/1/outcome_groups/20/outcomes?per_page=100`]);
  t.truthy(outcomes.length > 0);
});
