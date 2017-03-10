import Test from 'ava';
import Services from '../../../src/services';


Test(`all()`, async t => {
  const groups = await Services.competencies.groups.all();
  t.truthy(groups.length > 0);
});
