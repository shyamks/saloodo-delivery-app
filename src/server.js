var express = require('express')
var parcels = require('./parcels.json')

const app = express()

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/parcels', function (req, res) {
    return res.json(parcels)
})

const port = process.env.PORT || 4000
app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}`)

);