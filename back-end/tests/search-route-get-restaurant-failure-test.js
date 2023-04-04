var chai = require('chai');
var expect = chai.expect;
const app = require('../app');
describe('GET /search/{locationId}/{restaurantId}/{Id}', ()=>{
    it('failed to respond with search result', async () => {
    const response = await request(app)
    .get('/search/123/456/789');
      expect(response.statusCode).toEqual(404);
      expect(response.body).not.toHaveProperty('name', 'Pizza');
      expect(response.body).not.toHaveProperty('price', 10);
    })
})