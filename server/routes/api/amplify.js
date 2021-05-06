const express = require('express')
const axios = require('axios')
const router = express.Router()
require('dotenv').config()

//Endpoints

// Get
router.get('/:zipCode', (req, res) => {
    var congressMembers = []
    var reps = []
    var zipCode = req.params.zipCode

    axios
        .get('https://www.googleapis.com/civicinfo/v2/representatives', {
            params: {
                key: process.env.CivicAPI, //add key here
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

router.get('/', (req, res) => {
    var campaigns = [
        {
            name_of_org: 'M4BL',
            name: 'The Breathe Act',
            cause: 'Civic Rights',
            type: 'Grant',
            page_url: 'www.thebreatheact.org',
            letters_counter: 0,
        },
        {
            name_of_org: 'AAAJ',
            name: 'AAAJ',
            cause: 'Education',
            type: 'Accelerator',
            page_url: 'www.aaaj.org',
            letters_counter: 0,
        },
        {
            name_of_org: 'TheSoapBoxProject',
            name: 'ClimateCare',
            cause: 'Climate Justice',
            type: 'Starter',
            page_url: 'www.thesoapboxproject.org',
            letters_counter: 0,
        },
    ]

    res.send(campaigns)
})

module.exports = router
