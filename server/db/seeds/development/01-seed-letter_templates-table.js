module.exports = {
  async seed(knex) {
    await knex('letter_templates').del()

    await knex('letter_templates').insert([
      {
        id: 1,
        name: 'test_template',
        subject: 'To Whom it May Concern',
        merge_variables: {
          representativeName: {
            choices: [],
            label: '',
            display: false
          },
          communityImpact: {
            choices: [
              'my family is affected by the damming of this river',
              'too many children are being forced to work at beaver malls for substandard wages'
            ],
            label: 'How this legislation impacts you',
            display: true
          },
          personalImpact: {
            choices: [
              'I am allergic to the hardwoods used in beaver dam construction',
              'local children are being kidnapped by beavers and indoctrinated into new age beaver spirituality',
              'local children are being kidnapped by beavers and indoctrinated into late stage beaver capitalism'
            ],
            label: 'How this legislation impacts your community',
            display: true
          }
        },
        html: '<html><body><h4>This is a test template!</h4><p>Dear {{representativeName}},<p>This campaign is important because {{communityImpact}}.</p><p>It affects me personally because {{personalImpact}}.</p></body></html>'
      },
      {
        id: 2,
        name: 'rutgers caste equity petition',
        subject: 'To the Administration of Rutgers University',
        merge_variables: {},
        html: '<p>Dear Rutgers Administration,</p><p>I write today to urge Rutgers University to take bold action by adopting all four recommendations from the University Task Force on Caste Discrimination, including adding caste as a protected category within the institution’s anti-discrimination policies. This essential step would reaffirm Rutgers’ commitment to fostering an inclusive and equitable campus for all students, faculty, and staff.</p><p>Caste discrimination is a grave and pervasive form of oppression that transcends borders and affects marginalized communities globally. At Rutgers, caste-oppressed students and staff deserve the same protections afforded to others against bias and harm. Recognizing caste explicitly in Rutgers’ policies will ensure that those impacted have the institutional support needed to seek accountability and justice.</p><p>The inclusion of caste protections is not about targeting any particular group; it is about creating an environment where equity is non-negotiable. Opponents of this policy often use misinformation to sideline the voices of caste-oppressed communities. Rutgers must not allow such narratives to delay progress. Instead, it should set a powerful example by prioritizing the voices of those most impacted and centering their lived experiences in its decision-making.</p><p>As a university that prides itself on diversity, equity, and inclusion, Rutgers has an opportunity to demonstrate what those values look like in practice. By taking immediate steps to implement the Task Force’s recommendations, Rutgers can establish itself as a leader in addressing caste oppression in higher education.</p><p>This is a pivotal moment for Rutgers to be on the right side of history. I urge you to act now and adopt caste protections, ensuring that all members of your community can thrive with dignity, safety, and equality.</p><p>In solidarity,</p><p>{{ firstName }} {{ lastName }}</p>'
      },
      {
        id: 3,
        name: 'Pueblo Action Alliance Los Alamos Campaign',
        subject:
          'Halt Los Alamos National Lab’s Flanged Tritium Waste Container (FTWC) Venting in Pueblo Communities',
        merge_variables: {},
        html: '<p class="p1">Dear Mr. Hoffman,</p> \
              <p class="p1">&nbsp;</p> \
              <p class="p1">I\'m submitting a public comment to express my concern regarding the NNSA/LANL\'s draft Site-Wide Environmental Impact Statement.&nbsp;(EPCU) project outline still poses adverse threats to the Caja del Rio\'s sensitive ecosystem, cultural resources utilized by surrounding Pueblos, and land-based learning opportunities for Pueblo youth and other community members.</p> \
              <p class="p1">&bull; The NNSA and DOE need to engage in Free, Prior and Informed Consent practices that ensure meaningful consultation with tribal leadership.</p> \
              <p class="p1">Increasing plutonium pit production to grow the nuclear weapons arsenal is in direct contradiction to the wishes of concerned Pueblo community members to stop plutonium pit production altogether.</p> \
              <p class="p1">&bull; There must be comprehensive cleanup efforts of existing radioactive nuclear waste which continues to threaten groundwater sources and soil health.</p> \
              <p class="p1">&bull; LANL\'s permit to vent tritium as another means to expand and continue operations has already faced heavy opposition due to the radioactive exposure to the surrounding landscapes and community. This is also in violation of the Clean Water Act.</p> \
              <p class="p1">Modifying and expanding LAN\'s facilities would put an additional strain on the region\'s water supply issues. Our water must be protected and preserved sustainably for our future generations.</p> \
              <p class="p1">Addressing the concerns outlined in this email/letter will allow impacted Pueblo communities to voice opposition on the Los Alamos National Lab\'s expanded nuclear weapons programs and the violent legacy of environmental degradation to the land, air, and water.</p> \
              <p class="p1">Sincerely,</p> \
              <p class="p2">&nbsp;</p> \
              <p class="p1">{{ firstName }} {{ lastName }}</p> \
              <p class="p2">&nbsp;</p> \
              <p class="p1">&nbsp;</p>'
      }
    ])
  }
}
