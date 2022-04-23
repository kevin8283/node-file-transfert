const express = require('express')
const cors = require('cors')
const port = process.env.API_PORT || 4000

const fileRouter = require('./routers/file.router')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/files', fileRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
