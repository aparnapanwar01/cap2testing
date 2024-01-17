const cds = require('@sap/cds/lib')

describe('cap/samples - Fiori APIs - v2', function() {

  const { GET, POST, expect, axios } = cds.test (__dirname+'/..')
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

  it('Sales data pull', async () => {
    const { data } = await GET `/catalog/Sales`
   // expect(data).to.containSubset({d:{results:[]}})
   // expect(data.amount).to.be.greaterThanOrEqual(100)

    expect(data.value).to.containSubset([
      {

        ID: 1,
        amount: 13,
        comments: null,
        country: "France",
        criticality: 1,
        org: "FR01",
        region: "Europe",

      }])
  })

  it('Sales data action testing ', async () => {
    const { data1 } = await POST `/catalog/Sales(1)/CatalogService.boost`

   const { data } = await GET `/catalog/Sales`
    expect(data.value).to.containSubset([
      {

        ID: 1,
        amount: 373,
        comments: "Boosted!",
        country: "France",
        criticality: 2,
        org: "FR01",
        region: "Europe",

      }])
  })

})