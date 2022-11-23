const { json } = require('express')
const {
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
  existsLaunchById,
} = require('../../models/launches.model')

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches())
}
async function httpPostLaunch(req, res) {
  const launch = req.body
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: 'Missing required launch property',
    })
  }
  launch.launchDate = new Date(launch.launchDate)
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date',
    })
  }
  const response = await addNewLaunch(launch)
  return res.status(201).json(response)
}
async function httpAbortLaunch(req, res) {
  const launchID = Number.parseInt(req.params.id)

  if (!(await existsLaunchById(launchID))) {
    return res.status(404).json({
      error: `Not found launch with id ${launchID}`,
    })
  }
  const aborted = await abortLaunchById(launchID)
  return res.status(200).json(aborted)
}
module.exports = {
  httpGetAllLaunches,
  httpPostLaunch,
  httpAbortLaunch,
}
