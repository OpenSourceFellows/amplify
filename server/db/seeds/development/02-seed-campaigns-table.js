module.exports = {
  async seed(knex) {
    // Deletes ALL existing entries
    await knex('campaigns').del()

    // Inserts seed entries
    await knex('campaigns').insert([
      {
        id: 1,
        organization: 'BeaverHalters',
        name: 'Stopping PNW Beavers',
        cause: 'Civic Rights',
        type: 'Grant',
        page_url: 'https://example.com',
        letter_template_id: 1,
        campaign_tagline:
          'Protecting our Woodlands and Rivers from the Big Beaver Menace',
        campaign_text:
          '<p>For years, Beavers in the Pacific Northwest have been getting more aggressive about damming rivers and gentrifying our beautiful rivers.</p><p>In recent years, they have started erecting large beaver shopping centers and abducting human children to use as low wage labor in their beaver malls!</p><p>With your help, we can stop the further encroachment of beavers into human habitats.</p>',
        supplemental_text:
          '<p>Did you know that PNW beavers are also all communists? Only with your help can we turn the tide and live in freedom and prosperity.</p>',
        representatives: JSON.stringify([
          {
            name: 'Velma Dinkley',
            title: 'District 1 Supervisor',
            photoUrl: 'https://placehold.co/250',
            address_line1: '123 Fake St.',
            address_line2: 'Suite 8B',
            address_city: 'Portland',
            address_state: 'OR',
            address_zip: '12345',
            address_country: 'US',
            email: 'noreply@example.com'
          },
          {
            name: 'Jar Jar Binks',
            title: 'District 2 Supervisor',
            photoUrl: 'https://placehold.co/250',
            address_line1: '123 Fake St.',
            address_line2: 'Suite 9B',
            address_city: 'Portland',
            address_state: 'OR',
            address_zip: '12345',
            address_country: 'US',
            email: 'noreply@example.com'
          },
          {
            name: 'Fei Fong Wong',
            title: 'District 3 Supervisor',
            photoUrl: 'https://placehold.co/250',
            address_line1: '123 Fake St.',
            address_line2: 'Suite 8B',
            address_city: 'Portland',
            address_state: 'OR',
            address_zip: '12345',
            address_country: 'US',
            email: 'noreply@example.com'
          },
          {
            name: 'Buccee Beaver',
            title: 'District 1 Supervisor',
            photoUrl: 'https://placehold.co/250',
            address_line1: '123 Fake St.',
            address_line2: 'Suite 7F',
            address_city: 'Portland',
            address_state: 'OR',
            address_zip: '12345',
            address_country: 'US',
            email: 'noreply@example.com'
          },
          {
            name: 'Hatsune Miku',
            title: 'District 1 Supervisor',
            photoUrl:
              'https://preview.redd.it/bucsune-miku-v0-niqz9xavfz3d1.png?auto=webp&s=c7291ff1aa26b98cac36f9a759de823f1d294bc3',
            address_line1: '123 Fake St.',
            address_line2: 'Suite 8B',
            address_city: 'Portland',
            address_state: 'OR',
            address_zip: '12345',
            address_country: 'US',
            email: 'noreply@example.com'
          }
        ]),
        assets: JSON.stringify({
          campaign_logo: 'https://placehold.co/600x400',
          campaign_background: 'https://placehold.co/1500x600',
          'campaign-img-1': 'https://placehold.co/600x400',
          'campaign-img-2': 'https://placehold.co/600x400',
          'campaign-img-3': 'https://placehold.co/600x400'
        })
      },
      {
        id: 2,
        organization: 'Equality Labs',
        name: 'Protect Caste Equity at Rutgers University',
        cause: 'Civic Rights',
        type: 'Grant',
        page_url:
          'https://rutgersaaup.org/wp-content/uploads/2024/08/Rutgers-Caste-Report-August-2024.pdf',
        letter_template_id: 2,
        campaign_tagline: 'URGE RUTGERS TO PRIORITIZE CASTE EQUITY',
        campaign_text:
          '<p>We applaud Rutgers University for taking a crucial step toward addressing caste inequity through the recent <strong><a href="https://rutgersaaup.org/wp-content/uploads/2024/08/Rutgers-Caste-Report-August-2024.pdf">University Task Force Report on Caste Discrimination in Higher Education and at Rutgers</strong> Global caste systems enforce discrimination through inherited social status. They are a systemic injustice that has long been overlooked in the United States, despite its prevalence in many American institutions including higher education. That is why the findings of this report are so crucial. By recommending to add caste as a protected category, Rutgers has an opportunity to lead the way in creating equitable spaces for all, especially for caste-oppressed faculty, students, and workers who experience this bias.</p><p>The testimonies presented in Rutgers’ task force report are a powerful reminder of the urgent need to address caste-based exclusion, harassment, and inequities in higher education. Caste is not an abstract concept; it is a harsh reality for millions. Caste discrimination spans across industries and includes bullying, harassment, bias, wage theft, sexual harassment, and even trafficking. Caste-oppressed individuals have also been denied rental housing upon the discovery of their caste identity. This issue has gained significant attention in New Jersey following <a href="https://www.npr.org/2021/06/03/1002547517/human-trafficking-allegations-thrust-caste-into-spotlight-for-american-hindus">human trafficking allegations</a> against the BAPS temples, where caste-oppressed workers were held against their will and paid just a dollar an hour under <a href="https://www.nytimes.com/2021/05/11/nyregion/nj-hindu-temple-india-baps.html">inhumane conditions</a></p><p>In New Jersey there are many communities who suffer caste discrimination in their communities from Africa, South Asia, Asia, and Indigenous residents of the state. Students, faculty and staff from these backgrounds must be able to access the campus as a place of learning and as a workplace free from discrimination and harm.</p><p>From workplace discrimination to campus bullying, the insidious impacts of caste privilege have been well-documented by marginalized communities, In our own 2016 report <a href="https://equalitylabs.wpengine.com/wp-content/uploads/2023/10/Caste_in_the_United_States_Report2018.pdf">Caste in the United States</a> we have found caste oppressed people face alarming discrimination and harassment with 1 in 4 facing physical and verbal assault, 1 in 3 education discrimination and 2 out 3 workplace discrimination.</p><p>As a U.S.-based civil rights group we urge Rutgers’ administration **to fully adopt the task force’s recommendations and implement robust enforcement mechanisms.** This includes education on caste equity for students, staff, and faculty and meaningful support for those who come forward with experiences of caste-based harm.</p><p>As Rutgers advances this work, we caution against narratives that dismiss caste protections as “anti-Hindu” or as targeting specific communities. Such arguments weaponize bad faith arguments and privilege to silence Dalit voices and maintain systems of oppression. Caste is found across multiple geographies and faiths and it must be addressed as its own system of exclusion. We believe in fostering dialogue that centers the experiences of the most vulnerable while rejecting extremist  rhetoric that masquerades falsely as a defense of cultural identity.</p><p>Rutgers’ initiative is part of a broader, necessary movement to confront caste oppression in the United States. We look forward to standing alongside other universities and institutions in their journey toward caste equity. Together, we can build communities where everyone can thrive with dignity and equal opportunity.</p><p>In solidarity,</p><p>Equality Labs</p>',
        supplemental_text:
          '<p>Caste-oppressed students and staff deserve protection—yet Rutgers University continues to delay adopting crucial caste protections in its anti-discrimination policy. This hesitation comes after pressure from far-right nationalist groups that aim to erase the realities of caste-based harm.</p><p>In August 2024, the Rutgers Task Force on Caste Discrimination recommended adding caste as a protected category after collecting powerful testimony from affected community members. These recommendations are a critical step toward equity but remain stalled.</p><p>It’s time to demand action! Let’s ensure Rutgers doesn’t back down in the face of opposition. Flood the administration’s inboxes today and call for the immediate adoption of caste protections. Together, we can build a campus where no one has to endure caste discrimination.</p>',
        representatives: JSON.stringify([
          {
            name: 'President Jonathan Holloway',
            title: 'President, Rutgers University',
            photoUrl:
              'https://www.rutgers.edu/sites/default/files/styles/3x4_one_third_full_1024_1x/public/2020-07/pro_NR20HollowayJonathan1819.jpg?h=ef631461&itok=uRWXEI4G',
            address_line1: '7 College Avenue',
            address_line2: '2nd Floor',
            address_city: 'New Brunswick',
            address_state: 'NJ',
            address_zip: '08901',
            address_country: 'US',
            email: 'president@rutgers.edu'
          },
          {
            name: 'Anna (Enobong) Branch',
            title: 'Senior Vice President for University Equity and Inclusion',
            photoUrl:
              'https://www.rutgers.edu/sites/default/files/styles/3x4_one_third_full_1024_1x/public/2020-09/pro_Ann_Branch.jpg?h=3dfac914&itok=rA6GxwC_',
            address_line1: '106 Sommerset Street',
            address_line2: '7th Floor',
            address_city: 'New Brunswick',
            address_state: 'NJ',
            address_zip: '08901',
            address_country: 'US',
            email: 'enobong.branch@rutgers.edu'
          },
          {
            name: 'Prabhas Moghe',
            title: 'Executive Vice President for Academic Affairs at Rutgers',
            photoUrl:
              'https://www.rutgers.edu/sites/default/files/styles/max_width_embed_default_2x/public/2020-09/pro_Prabhas_Moghe.jpg?itok=dLd3TLhW',
            address_line1: '7 College Avenue',
            address_line2: '2nd Floor',
            address_city: 'New Brunswick',
            address_state: 'NJ',
            address_zip: '08901',
            address_country: 'US',
            email: 'nbprovost@rutgers.edu.'
          }
        ]),
        assets: JSON.stringify({
          campaign_logo: 'https://i.imgur.com/0I80XGh.png',
          campaign_background:
            'https://media.assettype.com/freepressjournal/2024-09-04/i722yxsy/lg_NR15OldQueensGate0889_edit.jpg?rect=0%2C0%2C3900%2C2194&w=1200&auto=format%2Ccompress&ogImage=true',
          infographic: 'https://i.imgur.com/I7E3J5Q.png',
          'campaign-img-1':
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-yngrxizvU5kAZ3CP9-iQnn1OD14eXkpeXUYo96KOL6sg19Icwoes_JYlm_a61pzAcRE&usqp=CAU',
          'campaign-img-2':
            'https://images-prod.gothamist.com/images/GettyImages-1481222828.width-1000.jpg',
          'campaign-img-3':
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2X0OYEKhzrxmyMymuEaqDUIq0jDakYX4i4jaqRI3AUs0svGfcNDbpdatY4WUD6LMPRqg&usqp=CAU'
        })
      },
      {
        id: 3,
        organization: 'Pueblo Action Alliance',
        name: 'Pueblo Action Alliance',
        cause: 'Civic Rights',
        type: 'Grant',
        page_url:
          'https://rutgersaaup.org/wp-content/uploads/2024/08/Rutgers-Caste-Report-August-2024.pdf',
        letter_template_id: 3,
        campaign_tagline:
          'Halt Los Alamos National Lab’s Flanged Tritium Waste Container (FTWC) Venting in Pueblo Communities',
        campaign_text:
          '<p>Los Alamos National Labs (LANL) has proposed the Flanged Tritium Waste Container venting, four containers, near LANL and neighboring Pueblos. [Tewa Women United](https://tewawomenunited.org/) (TWU) took a position alongside many other concerned citizens and organizations opposing the FTWC venting and started a petition on Change.org called [“Protect Vulnerable New Mexico Communities: Halt Radioactive Tritium Release from LANL,”](https://www.change.org/p/protect-vulnerable-nm-communities-halt-radioactive-tritium-release-from-lanl) that accumulated 3,112 signatures that helped postpone the proposed venting on April 1st 2020. The All Pueblo Council of Governors also released a <a href="https://www.apcg.org/uncategorized/pueblos-concerned-about-los-alamos-national-laboratories-planned-release-of-radioactive-vapors/?fbclid=IwAR0h-aoTtDGSk9a2QSEuPFG1qfihzhc5JuITswVBFk0Ku66xh8aG7-J9ygs">press release<a/> on March, 30th in opposition that alluded to the lack of tribal consultation as well as the lack of capacity in tribal governments due to COVID19.</p><p>The All Pueblo Council of Governers is set to give public comment to the NM Hazardous Waste Committee Meeting on September, 9th. It’s been stated that the New Mexico Environmental Department (NMED) and NM Hazardous Waste Board (NM HWB) do not oversee radiological contamination from LANL and that all radiological contamination remediation and radiological release approvals are under the regulatory authority of the Department of Energy (DOE). Even though it is the responsibility of NMED to ensure safety regulations for New Mexico citizens. In 2009 DOE enacted a policy, [Order 144.1](https://www.energy.gov/sites/prod/files/DOE%20O%20144.1.pdf), to ensure responsible interactions and consultation with sovereign tribal nations that we believe aren\'t being upheld.</p>',
        supplemental_text:
          '<p>Caste-oppressed students and staff deserve protection—yet Rutgers University continues to delay adopting crucial caste protections in its anti-discrimination policy. This hesitation comes after pressure from far-right nationalist groups that aim to erase the realities of caste-based harm.</p><p>In August 2024, the Rutgers Task Force on Caste Discrimination recommended adding caste as a protected category after collecting powerful testimony from affected community members. These recommendations are a critical step toward equity but remain stalled.</p><p>It’s time to demand action! Let’s ensure Rutgers doesn’t back down in the face of opposition. Flood the administration’s inboxes today and call for the immediate adoption of caste protections. Together, we can build a campus where no one has to endure caste discrimination.</p>',
        representatives: JSON.stringify([
          {
            name: 'Stephen Hoffman',
            title: 'LANL SWEIS Document Manager, DOE/NNSA ',
            photoUrl:
              'https://imgs.search.brave.com/G46oqr3VnummnoFmkqT_NqalvvWvKQxpoX-EJITKqGQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9uYXRp/b25hbG1hZ2xhYi5v/cmcvaW1hZ2VzL2xh/eW91dC9sb3MtYWxh/bW9zLWxvZ28uanBn/P2Q9MjAyMzAyMDc',
            address_line1: '3747 West Jemez Road ',
            address_line2: '',
            address_city: 'Los Alamos',
            address_state: 'NM',
            address_zip: '87544',
            address_country: 'US',
            email: 'lanlsweis@nnsa.doe.gov'
          }
        ]),
        assets: JSON.stringify({
          campaign_logo: 'https://i.imgur.com/0I80XGh.png',
          campaign_background:
            'https://media.assettype.com/freepressjournal/2024-09-04/i722yxsy/lg_NR15OldQueensGate0889_edit.jpg?rect=0%2C0%2C3900%2C2194&w=1200&auto=format%2Ccompress&ogImage=true',
          infographic: 'https://i.imgur.com/I7E3J5Q.png',
          'campaign-img-1':
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-yngrxizvU5kAZ3CP9-iQnn1OD14eXkpeXUYo96KOL6sg19Icwoes_JYlm_a61pzAcRE&usqp=CAU',
          'campaign-img-2':
            'https://images-prod.gothamist.com/images/GettyImages-1481222828.width-1000.jpg',
          'campaign-img-3':
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2X0OYEKhzrxmyMymuEaqDUIq0jDakYX4i4jaqRI3AUs0svGfcNDbpdatY4WUD6LMPRqg&usqp=CAU'
        })
      }
    ])
  }
}
