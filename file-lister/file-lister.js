const nodeDiskInfo = require('node-disk-info')

try {
    const disks = nodeDiskInfo.getDiskInfoSync()

    disks.forEach(disk => {
        console.log(Math.round(disk.blocks / (Math.pow(1024, 3))) + "go")
    })
} 
catch (e) {
    console.error(e)
}
