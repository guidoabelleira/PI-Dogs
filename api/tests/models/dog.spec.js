const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });

    describe('height', () => {
      it('should throw an error if height is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid height')))
          .catch(() => done());
      });
      it('should work when its a valid height', () => {
        Dog.create({ height: '1 - 10' });
      });
    });

    describe('weight_min', () => {
      it('should throw an error if weight_min is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid weight_min')))
          .catch(() => done());
      });
      it('should work when its a valid weight_min', () => {
        Dog.create({ weight_min: '1' });
      });
    });

    describe('weight_max', () => {
      it('should throw an error if weight_max is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid weight_max')))
          .catch(() => done());
      });
      it('should work when its a valid weight_max', () => {
        Dog.create({ weight_max: '10' });
      });
    });

    



  });
});
