const net = require("net"), fs = require("fs");
const path = require("path")

const filename = path.basename("./sender/SC-02.pdf")

let server, istream = fs.createReadStream("./sender/SC-02.pdf");

server = net.createServer(socket => {
    socket.pipe(process.stdout);
    istream.on("readable", function () {
        let data;
        while (data = this.read()) {
            socket.write(data);
        }
    })
    istream.on("end", function() {
        socket.end();
    })
    socket.on("end", () => {
        //server.close(() => { console.log("\nTransfer is done!") });
    })
})

server.listen(8000, '0.0.0.0');