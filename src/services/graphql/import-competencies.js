// const {Lokka} = require('lokka')
// const {Transport} = require('lokka-transport-http')

// const rawCompetencies = require('../../../src/services/competencies/data/allCompetencies.json');

// const client = new Lokka({
//   transport: new Transport('https://api.graph.cool/simple/v1/cj3dui2aa1gjd0197zk5b3lgc')
// })

// const createCompetency = async(competency) => {
//   const result = await client.mutate(`{
//     competency: createCompetency(
//       description: "${competency.description}"
//       name: "${competency.title}"
//     ) {
//       id
//     }
//   }`)

//   return result.competency.id
// }

// const createCompetencies = async(rawCompetencies) => {
//   return await Promise.all(rawCompetencies.map(createCompetency))
// }

// const main = async() => {

//   // create competencies
//   const competencyIds = await createCompetencies(rawCompetencies)
//   console.log(`Created ${competencyIds.length} competencies`)
// }

// main().catch((e) => console.error(e))