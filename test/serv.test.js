const cds = require('@sap/cds/lib')

describe('cap/samples - Fiori APIs - v2', function() {

  const { GET, expect, axios } = cds.test (__dirname+'/..')
  axios.defaults.auth = { username: 'joe', password: 'joe' }

  // if (this.timeout) this.timeout(1e6)
/*
  it('serves $metadata documents in v2', async () => {
    const { headers, data } = await GET `/odata/v2/browse/$metadata`
    expect(headers).to.contain({
      'content-type': 'application/xml',
      'dataserviceversion': '2.0',
    })
    //expect(data).to.contain('<EntitySet Name="GenreHierarchy" EntityType="CatalogService.GenreHierarchy"/>')
  })*/

  it('Sales data ', async () => {
    const { data } = await GET `/catalog/Sales`
   // expect(data).to.containSubset({d:{results:[]}})
    expect(data.value.length).to.be.greaterThanOrEqual(11000)
  })

})