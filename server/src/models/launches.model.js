const launches = new Map();
let latestNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 25, 2022'),
    target: 'Kepler-1410 b',
    customer: ['Nasa', 'Thanh Nhi'],
    upcoming: true,
    success: true
}
launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestNumber++;
    launches.set(
        latestNumber,
        Object.assign(launch, {
            flightNumber: latestNumber,
            customer: ['NASA', 'THANH NHI'],
            upcoming: true,
            success: true
        }));
}
function existsLaunchById(id) {
    return launches.has(id);
}
function abortLaunchById(id) {
    const aborted = launches.get(id);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchById,
    abortLaunchById,
}