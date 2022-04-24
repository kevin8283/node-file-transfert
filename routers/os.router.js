const router = require('express').Router()
const { getRemoteMachineInfos } = require('../controllers/os.controller').osController

router.get('/', getRemoteMachineInfos)

module.exports = router