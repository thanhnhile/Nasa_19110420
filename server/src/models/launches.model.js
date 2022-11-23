const LaunchMongo = require('./launches.mongo')
const launches = new Map()
let latestNumber = 100

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 25, 2022'),
  target: 'Kepler-1410 b',
  customer: ['Nasa', 'Thanh Nhi'],
  upcoming: true,
  success: true,
}
launches.set(launch.flightNumber, launch)

// function getAllLaunches() {
//     return Array.from(launches.values());
// }

// function addNewLaunch(launch) {
//     latestNumber++;
//     launches.set(
//         latestNumber,
//         Object.assign(launch, {
//             flightNumber: latestNumber,
//             customer: ['NASA', 'THANH NHI'],
//             upcoming: true,
//             success: true
//         }));
// }
// function existsLaunchById(id) {
//     return launches.has(id);
// }
// function abortLaunchById(id) {
//     const aborted = launches.get(id);
//     aborted.upcoming = false;
//     aborted.success = false;
//     return aborted;
// }

async function addNewLaunch(launch) {
  try {
    latestNumber++
    const newLaunch = new LaunchMongo({
      flightNumber: latestNumber,
      customer: ['NASA', 'THANH NHI'],
      ...launch,
    })
    const response = await newLaunch.save()
    return response
  } catch (error) {
    console.log(error.message)
  }
}
async function getAllLaunches() {
  try {
    const response = await LaunchMongo.find()
    return response
  } catch (error) {
    console.log(error.message)
  }
}
async function existsLaunchById(id) {
  const existedLaunch = await LaunchMongo.findOne({ flightNumber: id }).exec()
  return !!existedLaunch
}
async function abortLaunchById(id) {
  try {
    const launch = await LaunchMongo.findOne({ flightNumber: id }).exec()
    launch.upcoming = false
    launch.success = false
    const reponse = await launch.save().exec()
    return response
  } catch (error) {
    console.log(error.message)
  }
}
module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchById,
  abortLaunchById,
}
