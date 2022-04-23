const router = require('express').Router()
const { getFilesInDirectory, downloadFile, getPDF} = require('../controllers/file.controller').fileController

router.get('/pdf', getPDF)

router.post('/', getFilesInDirectory)
router.post('/download', downloadFile)

module.exports = router