const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { Product } = require('../../../database/models')
const app = require('../../../api/app');

const { tokenMock, jwtVerifyMock } = require('../../unit/mocks/token.mock');
const { productsMock } = require('../../unit/mocks/product.mock');
const jwt = require('jsonwebtoken');


const { expect } = chai;
chai.use(chaiHttp);
 
describe('Testes de integração que utilizam Product', () => {
  afterEach(sinon.restore);

  describe('Teste de integração para recuperar os produtos', () => {
    beforeEach(sinon.restore)

    it('É possível recuperar todos os produtos existentes no Db', async () => {
      sinon.stub(Product, 'findAll').resolves(productsMock);
      sinon.stub(jwt, 'verify').resolves(jwtVerifyMock);

      const { body, status } = await chai.request(app).get('/customer/products').set({ authorization: tokenMock});

      expect(body).to.deep.equal(productsMock);
      expect(status).to.equal(200);
    });

    it('Não é possível recuperar todos os produtos existentes no Db com token inválido', async () => {

      const { body, status } = await chai.request(app).get('/customer/products').set({ authorization: 'lalala' });

      expect(body).to.deep.equal({ message: 'Invalid token'});
      expect(status).to.equal(401);
    });
  });
});