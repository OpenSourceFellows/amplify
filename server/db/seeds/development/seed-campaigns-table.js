module.exports = {
  async seed(knex) {
    // Deletes ALL existing entries
    await knex('campaigns').del()

    // Inserts seed entries
    await knex('campaigns').insert([
      {
        id: 1,
        organization: 'M4BL',
        name: 'The Breathe Act',
        cause: 'Civic Rights',
        type: 'Grant',
        page_url: 'breatheact.org'
      },
      {
        id: 2,
        organization: 'Sunrise New York',
        name: 'Climate and Community Investment Act',
        cause: 'Climate Justice',
        type: 'Grant',
        page_url: 'climatecantwait.org'
      },
      {
        id: 3,
        organization: 'Sunrise New York',
        name: 'Energy Efficiency, Equity and Jobs Assembly Bill',
        cause: 'Climate Justice',
        type: 'Grant',
        page_url: 'climatecantwait.org'
      },
      {
        id: 4,
        organization: 'Sunrise New York',
        name: 'Proposed Actions on EJ Communities',
        cause: 'Climate Justice',
        type: 'Grant',
        page_url: 'climatecantwait.org'
      },
      {
        id: 5,
        organization: "Sogorea 'Te Land Trust",
        name: "Sogorea 'Te Land Trust",
        cause: 'Civic Rights',
        type: 'Grant',
        page_url: 'https://sogoreate-landtrust.org/'
      },
      {
        id: 6,
        organization: 'Tuolumne River Trust',
        name: 'Tuolumne River Trust',
        cause: 'Civic Rights',
        type: 'Grant',
        page_url: 'https://www.tuolumne.org/revive-the-tuolumne',
        campaign_tagline: 'For a Healthy and Vibrant River',
        campaign_text:
          '<p><strong>The Tuolumne River is on the verge of ecological collapse. </strong>Historically, the River hosted well over <strong>100,000 salmon</strong>, but in 2020 only <strong>1,000</strong> returned to spawn. And it’s not just about fish. Before dams were constructed to divert water to farms and urban areas, salmon transported millions of pounds of nutrients from the ocean to upland habitats, where they fueled the food web and fertilized forests and meadows. Absent those nutrients, the Tuolumne’s salmon-based ecosystem is in a state of crisis.</p><p>The main cause of the River’s demise is inadequate instream flows. In an average year, <a href=”https://www.tuolumne.org/questions” target=”_blank”>only 21% of the Tuolumne’s unimpaired flow</a> reaches the San Joaquin River. During the recent drought, <a href=”https://www.tuolumne.org/questions” target=”_blank”>unimpaired flow averaged just 12%</a> for five straight years. Meanwhile, more than three years’ worth of water remained impounded behind SFPUC dams, and all that water (and much more) had to be “dumped” back into the River two years later to prevent flooding downstream. The Tuolumne experienced one exceptionally good year at the expense of five terrible years.</p><p>Revive the Tuolumne aims to reverse this negative trend and restore the River. Our <a href=”https://www.tuolumne.org/let-it-flow” target=”_blank”>Let it Flow</a> campaign advocates for higher instream flows through <a href=”https://www.tuolumne.org/ferc” target=”_blank”>federal licensing of dams</a> and by supporting the State Water Board’s update of the <a href=”https://www.tuolumne.org/ferc” target=”_blank”>Bay Delta Water Quality Control Plan.</a> Our <a href=”https://www.tuolumne.org/use-it-wisely” target=”_blank”>Use It Wisely</a> campaign promotes water conservation and alternative water supplies to reduce reliance on Tuolumne River water so that more can be made available for environmental purposes.</p>',
        supplemental_text:
          '<p>SFPUC water policies create unnecessary water scarcity throughout the Tuolumne watershed and skyrocketing water costs for ratepayers. These water woes are the result of dubious “science” and conservative water storage based on an SFPUC-manufactured drought plan called the Design Drought.</p><p>The Design Drought arbitrarily combines two of the worst droughts on record to create a megadrought that might occur once in 25,000 years. The Design Drought has prompted the SFPUC to create an Alternative Water Supply Plan that would double the SFPUC budget (and water rates) to produce expensive water we won’t ever need, while continuing to minimize river flows in the Tuolumne.</p><p>Low flows along the Tuolumne River harm the environment: the wild salmon population is on the brink of collapse and the scarcity of this keystone species negatively impacts riparian, delta, bay, and ocean ecosystems as well; frontline communities experience illness from toxic algae blooms and water scarcity; and Indigenous Tribes and commercial fishing communities that rely on healthy fisheries experience the collapse of lifeways and economies.</p><p>We encourage you to send a letter to the San Francisco Board of Supervisors, demanding science-backed water policies and a financially viable SFPUC budget.</p><p>Let your supervisor know that the citizens call for an independent audit of the SFPUC!</p>',
        representatives: JSON.stringify([
          {
            name: 'Connie Chan',
            title: 'District 1 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Connie_Chan_2023.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'chanstaff@sfgov.org'
          },
          {
            name: 'Catherine Stefani',
            title: 'District 2 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Supervisor_Stefani_2018.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'Catherine.Stefani@sfgov.org'
          },
          {
            name: 'Aaron Peskin',
            title: 'District 3 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Aaron_Peskin_2023.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'Aaron.Peskin@sfgov.org'
          },
          {
            name: 'Joel Engardio',
            title: 'District 4 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Joel_Engardio_2023.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Dean Preston',
            title: 'District 5 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Dean_Preston_2023.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'prestonstaff@sfgov.org'
          },
          {
            name: 'Matt Dorsey',
            title: 'District 6 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Dorsey_2022_lg.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'DorseyStaff@sfgov.org'
          },
          {
            name: 'Myrna Melgar',
            title: 'District 7 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Myrna_Melgar_2023.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'melgarstaff@sfgov.org'
          },
          {
            name: 'Rafael Mandelman',
            title: 'District 8 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Supervisor_Mandelman_2018.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'mandelmanstaff@sfgov.org'
          },
          {
            name: 'Hillary Ronen',
            title: 'District 9 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Supervisor_Ronen_2019.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'RonenStaff@sfgov.org'
          },
          {
            name: 'Shamann Walton',
            title: 'District 10 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Shamann_Walton_2023.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'waltonstaff@sfgov.org'
          },
          {
            name: 'Ahsha Safai',
            title: 'District 11 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Ahsha_Safai_2023.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'Ahsha.Safai@sfgov.org'
          }
        ]),
        assets: JSON.stringify({
          campaign_logo:
            'https://images.squarespace-cdn.com/content/v1/5eebc0039b04b54b2fb0ce52/1598500758914-E5HAIIGCP0ZXKKMN2FT0/TRT+Logo-13.png?format=500w',
          campaign_background:
            'https://images.squarespace-cdn.com/content/v1/5eebc0039b04b54b2fb0ce52/1610135975708-FV42Q30BPWF887M05O51/Poppies-13.jpg?format=1500w',
          'campaign-img-1':
            'https://images.squarespace-cdn.com/content/v1/5eebc0039b04b54b2fb0ce52/1609785926325-63M9MY247ORIL8ON8P5E/tuolumne-camp-960x540.jpg?format=1500w',
          'campaign-img-2':
            'https://images.squarespace-cdn.com/content/v1/5eebc0039b04b54b2fb0ce52/1592586646372-TBY3WC065NJ04KT2B38Z/000091400001.jpg?format=1500w',
          'campaign-img-3':
            'https://images.squarespace-cdn.com/content/v1/5eebc0039b04b54b2fb0ce52/1609781359705-Q5YNFL6DET5ORHW62ZU7/IMG_2249_WEBSITE+copy.jpg?format=1500w'
        })
      },
      {
        id: 7,
        organization: 'Save California Salmon',
        name: 'Save California Salmon',
        cause: 'Civic Rights',
        type: 'Grant',
        page_url: 'https://www.californiasalmon.org/',
        campaign_tagline: 'Restoring and Protecting California Salmon and Rivers for Future Generations',
        campaign_text: '<p><strong>#UNDAMTHEKLAMATH</strong></p><p>Save California Salmon (SCS) is dedicated to policy change and community advocacy for Northern California’s salmon and fish dependent people. We support the fisheries and water protection work of the local communities, and advocate effective policy change for clean water, restored fisheries and vibrant communities. We aim to help to support Tribes and the general public in engaging with public comments related to water pollution, fisheries, and beneficial use issues.</p><p>Restoration of the Klamath River does not stop with dam removal. Salmon populations are continuing to plummet throughout California, leaving Tribal communities without salmon for subsistence, and ocean fishermen without a season. Restoration of the Klamath’s tributaries, which are often dewatered for animal agriculture, is also critical. We continued to support Tribal efforts to establish both permanent and temporary emergency flows in the Scott and Shasta Rivers through the California Water Resources Control Board. In December, the board passed emergency irrigation curtailments for both rivers, and we are still pushing for permanent instream flow requirements.</p><p>We also continued to fight for Trinity River flows, which are critical to the river, and to stop fish kills in the Klamath River. The Trinity is the Klamath’s largest tributary, but it is also an artificial Sacramento River tributary that feeds the Central Valley Water Project. The federal government is working on a new Biological Opinion for Endangered Species (water operations plan) for the Central Valley and State Water Projects. We are calling for a separate, protective Biological Opinion for the Trinity River, and for flows in the Bay Delta watersheds.</p><p>We are deeply dedicated to dam removal and flow restoration in all the North State’s watersheds. We want salmon back for all Northern California Tribes, which is why we are hopeful about Pacific Gas & Electric’s (PGE) December proposal to fully decommission the Eel River Dams.</p>',
        supplemental_text: '<p>At the end of 2020 California, Oregon and Berkshire Hathaway entered a new agreement to undam the Klamath River. This decision came after almost twenty years of organizing, testifying, actions and planning from the native peoples of the Klamath basin, coastal fishermen and their allies. This year we continue our advocacy to make sure these dams come down.<p>',
        representatives: JSON.stringify([
          {
            name: 'Connie Chan',
            title: 'District 1 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Connie_Chan_2023.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'chanstaff@sfgov.org'
          },
          {
            name: 'Catherine Stefani',
            title: 'District 2 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Supervisor_Stefani_2018.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'Catherine.Stefani@sfgov.org'
          },
          {
            name: 'Aaron Peskin',
            title: 'District 3 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Aaron_Peskin_2023.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'Aaron.Peskin@sfgov.org'
          },
          {
            name: 'Joel Engardio',
            title: 'District 4 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Joel_Engardio_2023.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: ''
          },
          {
            name: 'Dean Preston',
            title: 'District 5 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Dean_Preston_2023.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'prestonstaff@sfgov.org'
          },
          {
            name: 'Matt Dorsey',
            title: 'District 6 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Dorsey_2022_lg.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'DorseyStaff@sfgov.org'
          },
          {
            name: 'Myrna Melgar',
            title: 'District 7 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Myrna_Melgar_2023.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'melgarstaff@sfgov.org'
          },
          {
            name: 'Rafael Mandelman',
            title: 'District 8 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Supervisor_Mandelman_2018.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'mandelmanstaff@sfgov.org'
          },
          {
            name: 'Hillary Ronen',
            title: 'District 9 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Supervisor_Ronen_2019.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'RonenStaff@sfgov.org'
          },
          {
            name: 'Shamann Walton',
            title: 'District 10 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Shamann_Walton_2023.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'waltonstaff@sfgov.org'
          },
          {
            name: 'Ahsha Safai',
            title: 'District 11 Supervisor',
            photoUrl:
              'https://sfbos.org/sites/default/files/Ahsha_Safai_2023.jpg',
            address_line1: '1 Dr Carlton B Goodlett Pl',
            address_line2: '#244',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94102',
            address_country: 'US',
            email: 'Ahsha.Safai@sfgov.org'
          }
        ]),
        assets: JSON.stringify({
          campaign_logo: 'https://static.wixstatic.com/media/d97ff6_b61eff2e17cc4511b92752e6af420835~mv2.png/v1/fill/w_96,h_97,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/White%20circle%2C%20Black%20background%20SCS%20Logo.png',
          campaign_background: 'https://i.imgur.com/4OsValj.png',
          'campaign-img-1': 'https://i.imgur.com/fGMy8Wz.png',
          'campaign-img-2': 'https://i.imgur.com/toMnnE0.png',
          'campaign-img-3': 'https://i.imgur.com/wXRXDCd.png'
        })
      }
    ])
  }
}
