const { json } = require('express');
const { getAllLaunches, addNewLaunch, abortLaunchById, existsLaunchById } = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}
function httpPostLaunch(req, res) {
    const launch = req.body;
    console.log(launch)
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property'
        });
    }
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date'
        });
    }
    addNewLaunch(launch);
    return res.status(201).json(launch);
}
function httpAbortLaunch(req, res) {
    const launchID = Number.parseInt(req.params.id);

    if (!existsLaunchById(launchID)) {
        return res.status(404).json({
            error: `Not found launch with id ${launchID}`
        });
    }
    const aborted = abortLaunchById(launchID);
    return res.status(200).json(aborted);

}
module.exports = {
    httpGetAllLaunches,
    httpPostLaunch,
    httpAbortLaunch,
}