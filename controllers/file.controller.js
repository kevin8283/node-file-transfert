const fs = require('fs')
const net = require('net')
const path = require('path')
const multer = require('multer')

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

                const regex = new RegExp('\.[0-9a-z]+$', 'i')
                const extension = file.match(regex)[0]

                if (extension === file) {
                    fileObject = {...fileObject, type: 'dir'}
                }
                else {
                    const audioExtensions = [".mp3", ".wma", ".ape", ".flac", ".wav"]
                    const videoExtensions = [".mp4", ".mkv", ".webm", ".mov", ".ogg", ".flv", ".avi", ".3gp"]
                    const imageExtensions = [".webp", ".jpeg", ".jpg", ".png", ".gif", ".bmp", ".ico"]
                    const fileImageExtensions = [".iso", ".daa"]
                    const compressedExtensions = [".rar", ".zip", ".7zip"]
                    const executableExtensions = [".exe"]

                    if (audioExtensions.includes(extension.toLocaleLowerCase())) {
                        fileObject = {...fileObject, type: 'audio'}
                    }
                    else if (videoExtensions.includes(extension.toLocaleLowerCase())) {
                        fileObject = {...fileObject, type: 'video'}
                    }
                    else if (imageExtensions.includes(extension.toLocaleLowerCase())) {
                        fileObject = {...fileObject, type: 'image'}
                    }
                    else if (fileImageExtensions.includes(extension.toLocaleLowerCase())) {
                        fileObject = {...fileObject, type: 'file-image'}
                    }
                    else if (compressedExtensions.includes(extension.toLocaleLowerCase())) {
                        fileObject = {...fileObject, type: 'compressed'}
                    }
                    else if (executableExtensions.includes(extension.toLocaleLowerCase())) {
                        fileObject = {...fileObject, type: 'executable'}
                    }
                    else {
                        fileObject = {...fileObject, type: 'file'}
                    }
                }

                filesList.push(fileObject)
            })

            res.json(filesList)
        })
    },

    getPDF: (req, res) => {
        res.download('sender/SC-02.pdf')
    },

    downloadFile: (req, res) => {
        /* let remote_server = process.argv[2]
        let socket */

        const filePath = req.body.path
        const fileName = path.basename(filePath)

        res.download(filePath, (error) => {
            if (error) {
                console.log(error)
            }
        })

        /* socket = remote_server ? net.connect(8000, remote_server) : net.connect(8000)

        let ostream = fs.createWriteStream(`./receiver/${fileName}`)
        let date = new Date(), size = 0, elapsed

        socket.emit('get-file', fileName)

        socket.on('data', chunk => {
            size += chunk.length
            elapsed = new Date() - date
            socket.write(`\r${(size / (1024 * 1024)).toFixed(2)} MB of data was sent. Total elapsed time is ${elapsed / 1000} s`)
            process.stdout.write(`\r${(size / (1024 * 1024)).toFixed(2)} MB of data was sent. Total elapsed time is ${elapsed / 1000} s`)
            ostream.write(chunk)
        })

        socket.on("end", () => {
            console.log(`\nFinished getting file. speed was: ${((size / (1024 * 1024)) / (elapsed / 1000)).toFixed(2)} MB/s`)
            process.exit()
        }) */
    },

    downloadFileMobile: (req, res) => {
        const filePath = req.body.path

        res.sendFile(filePath, (err) => {
            console.log(err)
        })
    },

    uploadFile: (req, res) => {
        const downloadPath = path.relative(__dirname,  'C:/Downloads')
        console.log(downloadPath)

        const storage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, downloadPath)
            },
            filename: (req, file, cb) => { 
                cb(null , file.originalname)   
            }
        })

        const upload = multer({storage: storage}).single("file")

        upload(req, res, (err) => {
            if (err) {
                console.log(err)
                res.status(400).send("Something went wrong!");
            }
            res.send(req.file);
        });
    }
}

module.exports = { fileController }