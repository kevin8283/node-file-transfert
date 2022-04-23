const fs = require('fs')
const net = require('net')
const path = require('path')

const fileController = {
    getFilesInDirectory: (req, res) => {
        const path = req.body.path || "D:/"

        fs.readdir(path, (error, files) => {
            if (error) {
                return res.json({ error: `Error reading path ${path}` })
            }
            return res.json(files)
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
            if(error) {
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
    }
}

module.exports = { fileController }