const express = require('express')
const planetRouter = express.Router()
const { httpGetAllPlanets, httpPostPlanet } = require('./planets.controller')

planetRouter.get('/', httpGetAllPlanets)
planetRouter.post('/', httpPostPlanet)

module.exports = planetRouter
