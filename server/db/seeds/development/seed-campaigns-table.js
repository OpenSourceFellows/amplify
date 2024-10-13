module.exports = {
  async seed(knex) {
    // Deletes ALL existing entries
    await knex('campaigns').del()

    // Inserts seed entries
    await knex('campaigns').insert([
      {
        id: 1,
        organization: 'White Mesa Ute Community',
        name: 'White Mesa Concerned Community',
        cause: 'Civic Rights',
        type: 'Grant',
        page_url: 'https://protectwhitemesa.org/',
        campaign_tagline: 'Protecting the Ute Tribal Lands and Peoples from Radioactive Waste',
        campaign_text: '<p>White Mesa Concerned Community is a grassroots group of concerned tribal members of the Ute Mountain Ute Tribe. We work to inform our fellow tribal members and the public about our struggle to protect our community, health, water, air, land, culture, and sacred sites from toxic and radioactive contamination from the uranium mill. We demand that the uranium mill be closed and cleaned up.</p><p>Here are some of the species that continue to be impacted by the uranium mining:</p><p>Mexican Spotted Owl (Strix occidentalis lucida): This owl is found in forested canyons and riparian zones. The tribe works to protect its habitat by managing forest resources and reducing threats such as wildfires and logging.</p><p>Southwestern Willow Flycatcher (Empidonax traillii extimus): Found in riparian areas, this bird\'s protection includes restoring native vegetation, managing water resources, and preventing habitat degradation from livestock grazing and invasive species.</p><p>Gunnison Sage-Grouse (Centrocercus minimus): The tribe participates in habitat restoration and conservation efforts for this species, including managing land use and mitigating threats like overgrazing, invasive plants, and human encroachment.</p><p>Yellow-Billed Cuckoo (Coccyzus americanus): The tribe works to conserve riparian habitats crucial for this bird by managing water flow and restoring native plant communities that provide nesting and foraging opportunities.</p><p>Colorado Pikeminnow (Ptychocheilus lucius): The tribe collaborates with state and federal agencies to protect this endangered fish by managing water quality and flow in river systems, reducing the impact of non-native species, and restoring critical habitat areas.</p><p>Bonytail Chub (Gila elegans) and Humpback Chub (Gila cypha): Both fish species benefit from the tribe\'s efforts to maintain clean and healthy river systems, which include monitoring water quality, controlling non-native species, and advocating for water management practices that support native fish populations.</p>',
        supplemental_text: '<p>The White Mesa Ute Community of the Ute Mountain Ute Tribe is located between Blanding and Bluff in San Juan County in southern Utah. It is near Cedar Mesa, the Bears Ears National Monument, Valley of the Gods, the San Juan River, national parks, and many other beautiful and sacred areas. </p><p>White Mesa, however, is adjacent to the Energy Fuels’ uranium mill, the last such facility in the United States, where uranium tailings and other radioactive materials are sent for “processing” and dumping. Not only was the mill built right next to our community, but it was built right on top of hundreds of our culturally significant sites.</p>',
        representatives: JSON.stringify([
          {
            name: 'Spencer Cox',
            title: 'Governor of Utah',
            photoUrl:
              'https://www.nga.org/wp-content/uploads/2021/01/Governor_Cox_official_square-scaled.jpg',
            address_line1: '350 N STATE ST',
            address_line2: 'STE 200',
            address_city: 'SALT LAKE CITY',
            address_state: 'UT',
            address_zip: '84114',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Phil Lyman',
            title: 'State Representative for District 69',
            photoUrl:
              'https://le.utah.gov/images/legislator/house/LYMANP.jpg',
            address_line1: '333 S MAIN ST',
            address_line2: '',
            address_city: 'BLANDING',
            address_state: 'UT',
            address_zip: '84511',
            address_country: 'US',
            email: ''
          },
        ]),
        assets: JSON.stringify({
            campaign_logo: 'https://i.imgur.com/Lc9fG1y.png',
            campaign_background: 'https://i.imgur.com/WcFdL78.jpeg',
            'campaign-img-1': 'https://i.imgur.com/gpGQxZQ.jpeg',
            'campaign-img-2': 'https://i.imgur.com/5pSUR0q.jpeg',
            'campaign-img-3': 'https://i.imgur.com/0EctJWf.png'
          })
      },
      {
        id: 2,
        organization: 'Hualapai Nation',
        name: 'Protect Hakamwe',
        cause: 'Civic Rights',
        type: 'Grant',
        page_url: 'http://instagram.com/protecthakamwe',
        campaign_tagline: 'Protect Ha’kamwe’ - No Lithium Mine',
        campaign_text: '<h2>What is Ha’Kamwe’?</h2><p>Ha’Kamwe’ means warm spring in the language of the Hualapai people.</p><p>Ha’Kamwe’ is fed by water naturally stored underground in volcanic rocks that seal it off from the land surface above (aka a confined volcanic aquifer). Under pressure, water flows underground along a geologic fault and emerges from the spring.</p><p>This sacred spring is a place for healing. In the words of a Hualapai elder: this is holy ground.</p><h2>Where is Ha’Kamwe’?</h2><p>Ha’Kamwe’ is part of Cholla Canyon Ranch in Wikieup, Arizona, where the Mojave and Sonoran deserts meet within the Big Sandy River basin. The ranch is managed by the Hualapai Tribe, while the ancestral homelands of the Hualapai people surrounding the site are currently managed by the Bureau of Land Management (BLM).</p>',
        supplemental_text: '<p>Hualapai tribal members, local community members, and allies are working to prevent further exploration drilling for the Big Sandy Lithium Project that would desecrate Ha’Kamwe’ and the ancestral homelands of the Hualapai people.</p>',
        representatives: JSON.stringify([
          {
            name: 'Dr. Buu Nygren',
            title: 'President of the Navajo Nation',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2023/12/photo_P_Nygren.jpg?resize=1080%2C1080&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: 'alray.nelson@navajo-nsn.gov'
          },
          {
            name: 'Jasmine Blackwater-Nygren',
            title: 'First Lady of the Navajo Nation',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2023/12/photo_FL_Nygren-Blackwater.jpg?resize=1080%2C1080&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: 'alray.nelson@navajo-nsn.gov'
          },
          {
            name:"Richelle Montoya",
            title:"Vice President of the Navajo Nation",
            photoUrl:"https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2023/12/photo_VP_Montoya.jpg?resize=1080%2C1080&ssl=1",
            address_line1:"PO Box 7440",
            address_line2:"",
            address_city:"Window Rock",
            address_state:"AZ",
            address_zip:"86515",
            address_country:"US",
            email:"josie.bowman@navajo-nsn.gov"
          },
          {
            name: 'Ethel Branch',
            title: 'Department of Justice, Attorney General',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2023/12/attorney_general_Branch.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Sean McCabe',
            title: 'Office of the Controller, Controller',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2023/12/controller_McCabe.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Justin Ahasteen',
            title: 'Navajo Nation Washington Office, Executive Director',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2023/12/director_Ahasteen.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Heather Clah',
            title: 'Department of Justice, Deputy Attorney General',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2024/04/dag_Clah.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Thomas Cody',
            title: 'Division of Social Services, Executive Director',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2023/12/director_Cody.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Sherylene Yazzie',
            title: 'Department of Health, Acting Executive Director',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2023/12/Seal_gray_gradient.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Roy Tracy',
            title: 'Department of Diné Education, Interim Executive Director',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2024/04/director_Tracy.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Tony Skrelunas',
            title: 'Division of Economic Development, Executive Director',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2023/12/director_Skrelunas.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Bobbie Ann Baldwin',
            title: 'Navajo Nation Veterans Administration, Executive Director',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2024/04/director_Baldwin.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Shawnevan Dale',
            title: 'Executive Director, Division of General Services',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2023/12/director_Dale.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Tom Platero',
            title: 'Division of Transportation, Executive Director',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2023/12/director_Platero.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Effie Edsitty',
            title: 'Office of the Navajo Tax Commission, Executive Director',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2023/12/director_Edsitty.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Arbin Mitchell',
            title: 'Division of Community Development, Executive Director',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2023/12/director_Mitchell.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Sarah Slim',
            title: 'Navajo-Hopi Land Commission Office, Executive Director',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2024/04/director_Slim_2.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'W. Mike Halona',
            title: 'Division of Natural Resources, Executive Director',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2023/12/director_Halona.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Byron C. Shorty',
            title: 'Telecommunications Regulatory Commission Office, Acting Executive Director',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2024/09/director_Shorty.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Michael Anderson',
            title: 'Division of Public Safety, Executive Director',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2023/12/director_Anderson-1.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Stephen Etsitty',
            title: 'Navajo Nation Environmental Protection Agency, Executive Director',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2023/12/director_Etsitty.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Dominic Beyal',
            title: 'Office of Management & Budget, Executive Director',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2024/04/director_Beyal.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Lisa Jymm',
            title: 'Navajo Nation Fiscal Recovery Fund Office, Executive Director',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2024/03/director.Jymm_.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Reycita Toddy',
            title: 'Division of Human Resources, Executive Director',
            photoUrl:
              'https://i0.wp.com/opvp.navajo-nsn.gov/wp-content/uploads/2023/12/Seal_gray_gradient.jpg?resize=1080%2C1440&ssl=1',
            address_line1: 'PO Box 7440',
            address_line2: '',
            address_city: 'Window Rock',
            address_state: 'AZ',
            address_zip: '86515',
            address_country: 'US',
            email: ''
          } 
        ]),
        assets: JSON.stringify({
            campaign_logo: 'https://i.imgur.com/o3lxGJD.png',
            campaign_background: 'https://i.imgur.com/qGOHdiP.jpeg',
            'campaign-img-1': 'https://i.imgur.com/h88GBNC.jpeg',
            'campaign-img-2': 'https://i.imgur.com/lcQWK6p.jpeg',
            'campaign-img-3': 'https://i.imgur.com/bnPQVOR.jpeg',
            'infographic': 'https://i.imgur.com/BJCPDCR.jpeg'
          })
      },
      {
        id: 3,
        organization: 'Save California Salmon',
        name: 'Save California Salmon',
        cause: 'Civic Rights',
        type: 'Grant',
        page_url: 'https://www.californiasalmon.org/',
        campaign_tagline:
          'Restoring and Protecting California Salmon and Rivers for Future Generations',
        campaign_text:
          '<p><strong>#UNDAMTHEKLAMATH</strong></p><p>Save California Salmon (SCS) is dedicated to policy change and community advocacy for Northern California’s salmon and fish dependent people. We support the fisheries and water protection work of the local communities, and advocate effective policy change for clean water, restored fisheries and vibrant communities. We aim to help to support Tribes and the general public in engaging with public comments related to water pollution, fisheries, and beneficial use issues.</p><p>Restoration of the Klamath River does not stop with dam removal. Salmon populations are continuing to plummet throughout California, leaving Tribal communities without salmon for subsistence, and ocean fishermen without a season. Restoration of the Klamath’s tributaries, which are often dewatered for animal agriculture, is also critical. We continued to support Tribal efforts to establish both permanent and temporary emergency flows in the Scott and Shasta Rivers through the California Water Resources Control Board. In December, the board passed emergency irrigation curtailments for both rivers, and we are still pushing for permanent instream flow requirements.</p><p>We also continued to fight for Trinity River flows, which are critical to the river, and to stop fish kills in the Klamath River. The Trinity is the Klamath’s largest tributary, but it is also an artificial Sacramento River tributary that feeds the Central Valley Water Project. The federal government is working on a new Biological Opinion for Endangered Species (water operations plan) for the Central Valley and State Water Projects. We are calling for a separate, protective Biological Opinion for the Trinity River, and for flows in the Bay Delta watersheds.</p><p>We are deeply dedicated to dam removal and flow restoration in all the North State’s watersheds. We want salmon back for all Northern California Tribes, which is why we are hopeful about Pacific Gas & Electric’s (PGE) December proposal to fully decommission the Eel River Dams.</p>',
        supplemental_text:
          '<p>At the end of 2020 California, Oregon and Berkshire Hathaway entered a new agreement to undam the Klamath River. This decision came after almost twenty years of organizing, testifying, actions and planning from the native peoples of the Klamath basin, coastal fishermen and their allies. This year we continue our advocacy to make sure these dams come down.<p>',
        representatives: JSON.stringify([
          {
            name: 'Bureau of Reclamation',
            title: '',
            photoUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/USBR_logo_oct_2019.jpg/220px-USBR_logo_oct_2019.jpg',
            address_line1: '2800 Cottage Way',
            address_line2: 'Room W-2820',
            address_city: 'Sacramento',
            address_state: 'CA',
            address_zip: '95825',
            address_country: 'US',
            email: ''
          }
        ]),
        assets: JSON.stringify({
          campaign_logo:
            'https://static.wixstatic.com/media/d97ff6_b61eff2e17cc4511b92752e6af420835~mv2.png/v1/fill/w_96,h_97,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/White%20circle%2C%20Black%20background%20SCS%20Logo.png',
          campaign_background: 'https://i.imgur.com/4OsValj.png',
          'campaign-img-1': 'https://i.imgur.com/fGMy8Wz.png',
          'campaign-img-2': 'https://i.imgur.com/toMnnE0.png',
          'campaign-img-3': 'https://i.imgur.com/wXRXDCd.png'
        })
      }
    ])
  }
}
