const addresses = [
    {
        id: 1,
        street: '123 Satellite Blvd',
        city: 'Space City',
        state: 'TX',
        zip: '12345',
        type: 'satellite'
    },
    {
        id: 2,
        street: '456 Non-Residential Rd',
        city: 'Business Town',
        state: 'CA',
        zip: '67890',
        type: 'non-residential'
    },
    {
        id: 3,
        street: '789 PO Box',
        city: 'Mailville',
        state: 'NY',
        zip: '10112',
        type: 'PO Box'
    }
];

// Edge cases for address verification tests
const addressEdgeCases = [
  {
    type: 'residential_house',
    input: { line1: 'residential house', zip: '11111' },
    expected: {
      deliverable: true,
      warning: null,
      revisedAddress: {
        line1: '1709 BRODERICK ST',
        line2: null,
        city: 'SAN FRANCISCO',
        state: 'CA',
        zip: '94115-2525'
      }
    }
  },
  {
    type: 'residential_highrise',
    input: { line1: 'residential highrise', zip: '11111' },
    expected: {
      deliverable: true,
      revisedAddress: {
        city: 'SAN FRANCISCO',
        line1: '660 KING ST UNIT 305',
        line2: null,
        state: 'CA',
        zip: '94107-1539'
      },
      warning: null
    }
  },
  {
    type: 'department_of_state',
    input: { line1: 'department of state', zip: '11111' },
    expected: {
      deliverable: true,
      revisedAddress: {
        city: 'DPO',
        line1: 'UNIT 8900 BOX 4301',
        line2: null,
        state: 'AE',
        zip: '09831-4301'
      },
      warning: null
    }
  },
  {
    type: 'military',
    input: { line1: 'military', zip: '11111' },
    expected: {
      deliverable: true,
      revisedAddress: {
        city: 'APO',
        line1: 'CMR 409 BOX 145',
        line2: null,
        state: 'AE',
        zip: '09053-0002'
      },
      warning: null
    }
  },
  {
    type: 'unnecessary_unit',
    input: { line1: 'unnecessary unit', zip: '11111' },
    expected: {
      deliverable: true,
      revisedAddress: {
        city: 'SAN FRANCISCO',
        line1: '1709 BRODERICK ST APT 505',
        line2: null,
        state: 'CA',
        zip: '94115-2525'
      },
      warning: 'Address may be deliverable but contains an unnecessary suite number'
    }
  },
  {
    type: 'po_box',
    input: { line1: 'po box', zip: '11111' },
    expected: {
      error: 'Post office boxes are not currently supported'
    }
  },
  {
    type: 'puerto_rico',
    input: { line1: 'puerto rico', zip: '11111' },
    expected: {
      error: 'Puerto Rico addresses are not currently supported'
    }
  },
  {
    type: 'commercial_building',
    input: { line1: 'deliverable', zip: '11111' },
    expected: {
      error: 'Non-residential addresses are not currently supported'
    }
  },
  {
    type: 'commercial_highrise',
    input: { line1: 'commercial highrise', zip: '11111' },
    expected: {
      error: 'Non-residential addresses are not currently supported'
    }
  },
  {
    type: 'undeliverable',
    input: { line1: 'undeliverable block match', zip: '11111' },
    expected: {
      error: 'Address is undeliverable'
    }
  }
];

module.exports = { addresses, addressEdgeCases };