const { parse } = require('csv-parse')
const fs = require('fs')
const { default: mongoose } = require('mongoose')
const path = require('path')
const PlanetMongo = require('./planets.mongo')

const habitablePlanets = []

function isHabitablePlanet(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  )
}
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', '/data', 'kepler_data.csv')
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data)
        }
      })
      .on('error', (err) => {
        reject(err)
      })
      .on('end', () => {
        // console.log(`${habitablePlanets.length} habitable planets found!`)
        // console.log(habitablePlanets);
        savehabitablePlanetsToMongoDB()
        resolve(habitablePlanets)
      })
  })
}
async function savePlanet(keplerName) {
  try {
    const planet = new PlanetMongo({
      _id: new mongoose.Types.ObjectId(),
      keplerName,
    })
    const response = await planet.save()
    return response
  } catch (error) {
    console.log(error.message)
  }
}
async function getAllPlanets() {
  const planets = await PlanetMongo.find().exec()
  return planets
}
function savehabitablePlanetsToMongoDB() {
  const promises = []
  habitablePlanets.map((planet) => {
    promises.push(savePlanet(planet['kepler_name']))
  })
  console.log(Promise.all(promises))
}
module.exports = {
  getAllPlanets,
  loadPlanetsData,
  savePlanet,
}
