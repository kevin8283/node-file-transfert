const router = require('express').Router()
const { getFilesInDirectory, downloadFile, downloadFileMobile, uploadFile} = require('../controllers/file.controller').fileController

router.post('/', getFilesInDirectory)
router.post('/download', downloadFile)
router.post('/upload', uploadFile)
router.post('/download/flutter', downloadFile)

module.exports = router