const os = require('os')

const osController = {
    getRemoteMachineInfos: (req, res) => {
        const machineOs = os.platform()
        const machineName = os.hostname()

        return res.json({machineOs, machineName})
    }
}

module.exports = { osController }