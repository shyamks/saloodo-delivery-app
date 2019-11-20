var express = require('express')
var parcels = require('./parcels.json')
var cors = require('cors')

const app = express()

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

const MANAGER = 'manager'
const BIKER = 'biker'

const accessToken = 'hashedJwtToken'

const allBikers = ['Biker1','Biker2','Biker3','Biker4','Biker5','Biker6','Biker7','Biker8','Biker9','Biker10']

app.post('/login', function (req, res) {
    const { userRole, username } = req.body
    console.log(req.body,'role')
    if (userRole === MANAGER){
        return res.json({
            accessToken,
            userRole
        })
    }
    else if(userRole === BIKER){
        if(allBikers.includes(username)){
            return res.json({
                accessToken,
                userRole,
                username
            })
        }
        else{
            return res.json({
                error: 'User with this username does not exist'
            })
        }
    }
    return res.json({
        error: 'User does not exist'
    })
})

app.get('/parcels', function (req, res) {
    if (req.headers.authorization.includes(accessToken))
        return res.json(parcels)
    else{
        return res.json({ error: 'Not authorized' })
    }
})

const port = process.env.PORT || 4000
app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}`)

);