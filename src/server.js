
// a lightweight node server
var express = require('express')
var cors = require('cors')

const app = express()
const port = process.env.PORT || 4000

app.use(express.json());
app.use(cors());

// wild card for this project. Normally it is the origin url.
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `*`)
    next()
})

const MANAGER = 'manager'
const BIKER = 'biker'

// ideally created using jwt
const accessToken = 'hashedJwtToken'

// all hardcoded bikers
const allBikers = ['Biker1', 'Biker2', 'Biker3', 'Biker4', 'Biker5', 'Biker6', 'Biker7', 'Biker8', 'Biker9', 'Biker10']

app.post('/login', function (req, res) {
    const { userRole, username } = req.body
    if (userRole === MANAGER) {
        return res.json({
            accessToken,
            userRole
        })
    }
    else if (userRole === BIKER) {
        if (allBikers.includes(username)) {
            return res.json({
                accessToken,
                userRole,
                username
            })
        }
        else {
            return res.json({
                error: 'User with this username does not exist'
            })
        }
    }
    return res.json({
        error: 'User does not exist'
    })
})

// creating a parcel
const getParcel = id => {
    let assignedBiker = null
    let status = Math.random() > 0.5 ? 'WAITING' : 'ASSIGNED'
    if (status === 'ASSIGNED') {
        assignedBiker = `Biker${Math.ceil(Math.random() * 10)}`
    }
    return {
        id,
        name: `Package #${id}`,
        status,
        deliveryTime: null,
        pickupTime: null,
        assignedBiker
    }
}

app.get('/parcels', function (req, res) {
    if (req.headers.authorization.includes(accessToken)) {
        let parcels = []
        for (let i = 0; i < 50; i++) {
            parcels.push(getParcel(i + 1))
        }
        return res.json(parcels)
    }
    else {
        return res.json({ error: 'Not authorized' })
    }
})


app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}`)
);