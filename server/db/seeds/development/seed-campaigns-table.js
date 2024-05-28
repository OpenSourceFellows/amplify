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
          'California water policy is complex; competing interests, lawsuits, and antiquated laws inhibit progressive management on the Tuolumne.\nWe’ve been working on policy issues since our inception 40 years ago, and have no plans to stop. Through various policy proceedings happening at the state and federal level, we are working to reverse past damage by increasing the amount of water flowing down the river and into the San Francisco Bay-Delta.',
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
      }
    ])
  }
}
