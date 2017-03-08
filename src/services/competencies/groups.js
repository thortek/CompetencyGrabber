import Path from 'path';
import Files from '../common/files';

const RELATIVE_PATH = './data/groups.json';

const getPath = async(dirname, relativePath) => Path.join(dirname, relativePath);


// { id: 20,
//   title: 'Angular 2',
//   vendor_guid: null,
//   url: '/api/v1/accounts/1/outcome_groups/20',
//   subgroups_url: '/api/v1/accounts/1/outcome_groups/20/subgroups',
//   outcomes_url: '/api/v1/accounts/1/outcome_groups/20/outcomes',
//   can_edit: true }


export default {

  async all() {

    const path = await getPath(__dirname, RELATIVE_PATH);
    return (await Files.load(path)).map(group => (
      {
        id: group.id,
        name: group.title,
        uris: { subgroup: group.subgroups_url, outcomes: group.outcomes_url, uri: group.url },
        isEditable: group.can_edit
      }
    ));
  },


}
