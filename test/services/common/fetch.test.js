import Test from 'ava';
import Fetch from '../../../src/services/common/fetch';


const COMPETENCY_URI = `http://pokeapi.co/api/v2/pokemon/1`;

Test(`get(uri, options)`, async t => {
  const response = await Fetch.get(COMPETENCY_URI);
  t.truthy(response);
  t.is(response.status, 200);
});
