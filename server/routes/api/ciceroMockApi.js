const express = require('express')
const router = express.Router()

router.get('/:searchText', (req, res) => {
  const representatives = [
    {
      id: 343935,
      name: 'Lloyd Austin III',
      title: 'Secretary of Defense',
      address_line1: 'U.S. Department of Defense',
      address_line2: '1000 Defense Pentagon',
      address_city: 'Washington',
      address_state: 'DC',
      address_zip: '20301-1000',
      address_country: 'US',
      email: 'Not Made Public',
      contactPage:
        'https://www.defense.gov/our-story/meet-the-team/secretary-of-defense/',
      photoUrl:
        'https://media.defense.gov/2021/Jan/29/2002592436/825/780/0/210123-A-CN110-0001.JPG',
      socialMediaPages: [
        {
          type: 'facebook',
          url: 'https://facebook.com/DeptofDefense',
          icon: 'fa-brands fa-facebook-f',
          color: '#4267B2'
        },
        {
          type: 'instagram',
          url: 'https://instagram.com/austin_lloy',
          icon: 'fa-brands fa-instagram',
          color: '#C13584'
        },
        {
          type: 'twitter',
          url: 'https://twitter.com/SecDef',
          icon: 'fa-brands fa-twitter',
          color: '#1DA1F2'
        },
        {
          type: 'twitter',
          url: 'https://twitter.com/DeptofDefense',
          icon: 'fa-brands fa-twitter',
          color: '#1DA1F2'
        }
      ],
      photoCroppingCSS: 'center center'
    },
    {
      id: 343936,
      name: 'John Doe',
      title: 'Secretary of State',
      address_line1: 'U.S. Department of State',
      address_line2: '2201 C St NW',
      address_city: 'Washington',
      address_state: 'DC',
      address_zip: '20520',
      address_country: 'US',
      email: 'Not Made Public',
      contactPage: 'https://www.state.gov/secretary/',
      photoUrl: 'https://example.com/photo.jpg',
      socialMediaPages: [
        {
          type: 'facebook',
          url: 'https://facebook.com/StateDept',
          icon: 'fa-brands fa-facebook-f',
          color: '#4267B2'
        },
        {
          type: 'instagram',
          url: 'https://instagram.com/StateDept',
          icon: 'fa-brands fa-instagram',
          color: '#C13584'
        },
        {
          type: 'twitter',
          url: 'https://twitter.com/SecState',
          icon: 'fa-brands fa-twitter',
          color: '#1DA1F2'
        },
        {
          type: 'twitter',
          url: 'https://twitter.com/StateDept',
          icon: 'fa-brands fa-twitter',
          color: '#1DA1F2'
        }
      ],
      photoCroppingCSS: 'center center'
    }
  ]
  res.json(representatives)
})

module.exports = router
