const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app');
const { Temperament, conn } = require('../../src/db.js');

const agent = session(app);

const temperament = {
    name: 'Sweet'
}

describe('temperaments routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  describe('GET /temperaments', () => {
    it('should get 200', () =>
      agent.get('/temperaments').expect(200)
    );
  });

});