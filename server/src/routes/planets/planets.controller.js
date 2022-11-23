const { getAllPlanets, savePlanet } = require('../../models/planets.model')

async function httpGetAllPlanets(req, res) {
  const response = await getAllPlanets()
  return res.status(200).json(response)
}
async function httpPostPlanet(req, res) {
  const newPlanet = await savePlanet(req.body.keplerName)
  return res.status(200).json(newPlanet)
}
module.exports = {
  httpGetAllPlanets,
  httpPostPlanet,
}
