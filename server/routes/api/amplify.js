const express = require('express')
const axios = require('axios')
const router = express.Router()
const db = require('../../config/knex')
require('dotenv').config()

const CIVIC_API_KEY = getCivicApiKey()

//Endpoints

// Get
router.get('/:zipCode', (req, res) => {
    var congressMembers = []
    var reps = []
    var zipCode = req.params.zipCode

    axios
        .get('https://www.googleapis.com/civicinfo/v2/representatives', {
            params: {
                key: CIVIC_API_KEY,
                address: zipCode,
            },
        })
        .then(function (response) {
            reps = response.data.officials
            response.data.offices.forEach((repInfo) => {
                repInfo.officialIndices.forEach((position) => {
                    if (position > 1) {
                        var rep = reps[position]
                        var officeInfo = {
                            name: '',
                            title: '',
                            city: '',
                            state: '',
                            email: '',
                            twitter: '',
                            facebook: '',
                            contactPage: '',
                            photoUrl: '',
                        }
                        if (rep.name == undefined || rep.name == '') {
                        } else {
                            officeInfo.name = rep.name
                        }
                        if (repInfo.name == undefined || rep.name == '') {
                        } else {
                            officeInfo.title = repInfo.name
                        }

                        if (rep.address == undefined || rep.address == '') {
                        } else {
                            officeInfo.city = rep.address[0].city
                            officeInfo.state = rep.address[0].state
                        }
                        if (repInfo.email == undefined) {
                            officeInfo.email = 'Has Not Been Made Public'
                        } else {
                            officeInfo.email = rep.email
                        }
                        if (rep.photoUrl == undefined) {
                            officeInfo.photoUrl =
                                'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
                        } else {
                            officeInfo.photoUrl = rep.photoUrl
                        }
                        officeInfo = FlattenChannels(rep, officeInfo)
                        if (officeInfo !== undefined) {
                            congressMembers.push(officeInfo)
                        }
                    }
                })
            })
            res.send(congressMembers)
        })
        .catch(function (error) {
            console.log(error)
        })
})

function FlattenChannels(rep, flattenRepInfo) {
    if (rep.channels == undefined) {
        flattenRepInfo.facebook = 'Not Made Public'
        flattenRepInfo.twitter = 'Not Made Public'
    } else {
        rep.channels.forEach((channel) => {
            if (channel.type == 'Facebook') {
                flattenRepInfo.facebook = channel.id
            }
            if (channel.type == 'Twitter') {
                flattenRepInfo.twitter = channel.id
            }
        })
        return flattenRepInfo
    }
}

function CheckUndefined(itemToCheck, repInfo) {
    if (itemToCheck !== undefined || itemToCheck !== '') {
    } else {
        itemToCheck = repInfo
    }
}

router.get('/', async (req, res) => {
    try {
        const result = await db.select('*').from('user_campaigns');
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Whoops' });
    }
})

module.exports = router

// Temporary implemntation for fallback with deprecation warnings
function getCivicApiKey () {
    const { CIVIC_API_KEY, CivicAPI } = process.env
    const civicApiKey = CIVIC_API_KEY || CivicAPI

    if (CivicAPI) {
        if (CIVIC_API_KEY) {
            console.warn('Using "CIVIC_API_KEY" environment variable.')
            console.warn('Please remove your deprecated "CivicAPI" environment variable!')
        } else {
            console.warn('Expected "CIVIC_API_KEY" environment variable was not found.')
            console.warn('Falling back to deprecated "CivicAPI" environment variable....')
            console.warn('Please update your environment to use the expected key!')
        }
    }

    return civicApiKey
}
