const express = require('express')
const port = process.env.API_PORT || 4000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})