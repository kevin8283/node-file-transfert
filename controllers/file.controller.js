const fs = require('fs')
const path = require('path')
const multer = require('multer')
const { zip } = require('zip-a-folder')

const fileController = {
    getFilesInDirectory: (req, res) => {
        const path = req.body.path || "D:/"

        fs.readdir(path, (error, files) => {
            let filesList = []

            if (error) {
                return res.json({ error: `Error reading path ${path}` })
            }

            files.forEach((file, index) => {
                let fileObject = {
                    index: index,
                    name: file
                }

                const regex = new RegExp('\.[0-9a-z]+$', 'i', 'g')

                if (file.match(regex) === null) {
                    fileObject = fileObject = { ...fileObject, type: 'dir' }
                }

                else {
                    if (!file.match(regex)[0].includes('.')) {
                        fileObject = { ...fileObject, type: 'dir' }
                    }
                    else {
                        const extension = file.match(regex)[0]

                        const audioExtensions = [".mp3", ".wma", ".ape", ".flac", ".wav"]
                        const videoExtensions = [".mp4", ".mkv", ".webm", ".mov", ".ogg", ".flv", ".avi", ".3gp"]
                        const imageExtensions = [".webp", ".jpeg", ".jpg", ".png", ".gif", ".bmp", ".ico"]
                        const fileImageExtensions = [".iso", ".daa"]
                        const compressedExtensions = [".rar", ".zip", ".7zip"]
                        const executableExtensions = [".exe"]
                        const documentExtensions = [".pdf", ".doc", ".docx", ".txt"]

                        if (audioExtensions.includes(extension.toLocaleLowerCase())) {
                            fileObject = { ...fileObject, type: 'audio' }
                        }
                        else if (videoExtensions.includes(extension.toLocaleLowerCase())) {
                            fileObject = { ...fileObject, type: 'video' }
                        }
                        else if (imageExtensions.includes(extension.toLocaleLowerCase())) {
                            fileObject = { ...fileObject, type: 'image' }
                        }
                        else if (fileImageExtensions.includes(extension.toLocaleLowerCase())) {
                            fileObject = { ...fileObject, type: 'file-image' }
                        }
                        else if (compressedExtensions.includes(extension.toLocaleLowerCase())) {
                            fileObject = { ...fileObject, type: 'compressed' }
                        }
                        else if (executableExtensions.includes(extension.toLocaleLowerCase())) {
                            fileObject = { ...fileObject, type: 'executable' }
                        }
                        else if (documentExtensions.includes(extension.toLocaleLowerCase())) {
                            fileObject = { ...fileObject, type: 'document' }
                        }
                        else {
                            fileObject = { ...fileObject, type: 'file' }
                        }
                    }
                }

                filesList.push(fileObject)
            })

            res.json(filesList)
        })
    },

    downloadFile: (req, res) => {
        const filePath = req.body.path

        if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) {
            zip(filePath, 'zipped/archive.zip')
                .then(() => {
                    res.download('zipped/archive.zip', (error) => {
                        if (error) {
                            console.log(error)
                        }
                        fs.rmSync('zipped/archive.zip')
                    })
                })
                .catch(e => {
                    console.log(e)
                })
        }
        else {
            return res.download(filePath, (error) => {
                if (error) {
                    console.log(error)
                }
            })
        }
    },

    downloadFileMobile: (req, res) => {
        const filePath = req.body.path

        res.sendFile(filePath, (err) => {
            console.log(err)
        })
    },

    uploadFile: (req, res) => {
        const downloadPath = path.relative(__dirname, 'C:/Downloads')

        const storage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, downloadPath)
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname)
            }
        })

        const upload = multer({ storage: storage }).single("file")

        upload(req, res, (err) => {
            if (err) {
                console.log(err)
                res.status(400).send("Something went wrong!")
            }
            res.json({ message: "File uploaded successfully" })
        });
    }
}

module.exports = { fileController }