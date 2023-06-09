const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const tokenHandler = require('../../../utils/jwt');

const { expect } = chai;
chai.use(sinonChai);

const productController = require('../../../api/Controller/product.controller');
const productService = require('../../../api/Service/product.service');
const { productsMock } = require('../mocks/product.mock');
const { tokenMock, jwtVerifyMock } = require('../mocks/token.mock');
const InvalidToken = require('../../../utils/errors/invalidToken');
const jwt = require('jsonwebtoken');

describe('Product Controller', async function () {
  describe('Testes de produto', function () {

    afterEach(sinon.restore);

    it('Recupera todos os produtos existentes no Db', async function () {
      sinon.stub(jwt, 'verify').resolves(jwtVerifyMock);
      const req = { headers: { authorization: tokenMock } };
      const res = {};
      const next = sinon.stub();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()

      sinon.stub(productService, 'findAllProducts').resolves(productsMock);
      sinon.stub(tokenHandler, 'verifyToken').resolves(true)

      await productController.getAllProducts(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsMock);
    });
  });
});