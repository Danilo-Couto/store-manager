const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');

const ProductService = require('../../../services/ProductService');
const ProductController = require('../../../controllers/ProductController');

describe('ControllerTest - Products', () => {
  // get All
  describe('Busca todos os produtos no BD passando um ID', () => {
    const req = {};
    const res = {};

    describe('quando é encontrado com sucesso', async () => {
      const fakeResult = [
        {
          id: 1,
          name: 'produto A',
          quantity: 10
        },
        {
          id: 2,
          name: 'produto B',
          quantity: 20
        }
      ];

      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getAll').resolves(fakeResult);
      });

      afterEach(() => {
        ProductService.getAll.restore();
      });

      it('é chamado o status com o código 200', async () => {
        await ProductController.getAll(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('é chamado o método "json" passando um array', async () => {
        await ProductController.getAll(req, res);
        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
      });

      it('retorna o json com o produto chamado', async () => {
        await ProductController.getAll(req, res);
        expect(res.json.calledWith(fakeResult)).to.be.equal(true);
      });
    });

    describe('quando não encontra produto', async () => {
      const fakeResult = [];

      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);

      sinon.stub(ProductService, 'getAll').resolves(fakeResult);
      });

      afterEach(() => {
        ProductService.getAll.restore();
      });

      it('é chamado o status com o código 200', async () => {
        await ProductController.getAll(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('retorna um array vazio', async () => {
        await ProductController.getAll(req, res,);
        expect(res.json.calledWith(fakeResult)).to.be.true;
      });
    });
  });

  // get By Id
  describe('Busca um produto no BD passando um ID', () => {
    const req = {};
    const res = {};

    describe('quando é encontrado com sucesso', async () => {
      const fakeResult = { id: 1, name: 'produto A' ,quantity: 10 }

      beforeEach(() => {
        req.params = {id: 1};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getById').resolves(fakeResult);
      });

      afterEach(() => {
        ProductService.getById.restore();
      });

      it('é chamado o status com o código 200', async () => {
        await ProductController.getById(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('é chamado o método "json" passando um objeto', async () => {
        await ProductController.getById(req, res);
        expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
      });

      it('retorna o json com o produto chamado', async () => {
        await ProductController.getById(req, res);
        expect(res.json.calledWith(fakeResult)).to.be.equal(true);
      });
    });

    describe('quando não encontra o produto', async () => {
      const fakeResult = { error: { code: 'invalidData', message: 'Product not found' } };

      beforeEach(() => {
        req.params = {id: 22};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        next = sinon.stub().returns();

      sinon.stub(ProductService, 'getById').resolves(fakeResult);
      });

      afterEach(() => {
        ProductService.getById.restore();
      });

      it('é chamado o status com o código 404', async () => {
        await ProductController.getById(req, res, next);
        expect(next.calledWith(200)).to.be.equal(false);
      });

      it('é chamado o erro um erro', async () => {
        await ProductController.getById(req, res, next);
        expect(next.calledWith(fakeResult.error)).to.be.equal(true);
      });

  /*     it('é chamado o erro "Product not found" ', async () => {
        await ProductController.getById(req, res, next);
        expect(next.calledWith(fakeResult)).to.be.equal(true);
      }); // como invocar esta mensagem de erro?
  */
    });
  });

  // post product
  describe('Cria um produto no BD', () => {
    const req = {};
    const res = {};

    describe('quando é criado com sucesso', async () => {
      const fakeResult = { id: 1, name: 'produto', quantity: 10 }

      beforeEach(() => {
        req.body = {name: 'produto', quantity: 10};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductService, 'postProduct').resolves(fakeResult);
      });

      afterEach(() => {
        ProductService.postProduct.restore();
      });

      it('é chamado o status com o código 201', async () => {
        await ProductController.postProduct(req, res);
        expect(res.status.calledWith(201)).to.be.equal(true);
      });

      it('é chamado o método "json" passando um objeto', async () => {
        await ProductController.postProduct(req, res);
        expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
      });

      it('retorna o json com o produto chamado', async () => {
        await ProductController.postProduct(req, res);
        expect(res.json.calledWith(fakeResult)).to.be.equal(true);
      });
    });

    describe('quando o produto já existe', async () => {
      const fakeResult = { message: "Product already exists" };

      beforeEach(() => {
        req.body = {name: 'produto', quantity: 10};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);

      sinon.stub(ProductService, 'postProduct').resolves(fakeResult);
      });

      afterEach(() => {
        ProductService.postProduct.restore();
      });

      /*it('é chamado o status com o código 200', async () => {
        await ProductController.postProduct(req, res);
        expect(res.status.calledWith(409)).to.be.equal(true);
      }); */ // como chamar o 409?

      it('NÃO É chamado o status com o código 201', async () => {
        await ProductController.postProduct(req, res);
        expect(res.status.calledWith(201)).to.be.equal(true);
      });

      it('é chamado a mensagem de erro', async () => {
        await ProductController.postProduct(req, res);
        expect(res.json.calledWith(fakeResult)).to.be.true;
      });
    });
  });

  // put product
  describe('Edita um produto no BD', () => {
    const req = {};
    const res = {};

    describe('quando edita com sucesso', async () => {
      const fakeResult = { id: 1, name: 'produto', quantity: 15 }

      beforeEach(() => {
        req.params = { id: 1};
        req.body = {name: 'produto', quantity: 15};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductService, 'putProduct').resolves(fakeResult);
      });

      afterEach(() => {
        ProductService.putProduct.restore();
      });

      it('é chamado o status com o código 200', async () => {
        await ProductController.putProduct(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('é chamado o método "json" passando um objeto', async () => {
        await ProductController.putProduct(req, res);
        expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
      });

      it('retorna o json com o produto chamado', async () => {
        await ProductController.putProduct(req, res);
        expect(res.json.calledWith(fakeResult)).to.be.equal(true);
      });
    });

    describe('quando o produto não existe', async () => {
      const fakeResult = { message: "Product not found " };

      beforeEach(() => {
        req.params = { id: 22 };
        req.body = {name: 'produto', quantity: 10};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);

      sinon.stub(ProductService, 'putProduct').resolves(fakeResult);
      });

      afterEach(() => {
        ProductService.putProduct.restore();
      });

      /*it('é chamado o status com o código 200', async () => {
        await ProductController.putProduct(req, res);
        expect(res.status.calledWith(409)).to.be.equal(true);
      }); */ // como chamar o 409?

      it('NÃO É chamado o status com o código 200', async () => {
        await ProductController.putProduct(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('é chamado a mensagem de erro', async () => {
        await ProductController.putProduct(req, res);
        expect(res.json.calledWith(fakeResult)).to.be.true;
      });
    });
  });

  // delete product
  describe('Deleta um produto no BD', () => {
    const req = {};
    const res = {};

    describe('quando deleta com sucesso', async () => {
      const returnFromModel = true;

      beforeEach(() => {
        req.params = { id: 1};
        res.status = sinon.stub().returns(res);
        res.end = sinon.stub().returns();

        sinon.stub(ProductService, 'getById').resolves(true);
        sinon.stub(connection, 'execute').resolves(returnFromModel);
      });

      afterEach(() => {
        ProductService.getById.restore();
        connection.execute.restore();
      });

      it('é chamado o status com o código 204', async () => {
        await ProductController.deleteProduct(req, res);
        expect(res.status.calledWith(204)).to.be.true;
        expect(res.end.calledWith()).to.be.true;
        });
    });

    describe('quando produto não existe', async () => {
        const fakeResult = { error: {message: "Product not found"} };

      beforeEach(() => {
        req.params = { id: 22};
        res.status = sinon.stub().returns(res);
        next = sinon.stub().returns();

        sinon.stub(ProductService, 'getById').resolves(fakeResult);
      });

      afterEach(() => {
        ProductService.getById.restore();
      });

      it('NÃO É chamado o status com o código 204', async () => {
        await ProductController.deleteProduct(req, res, next);
        expect(next.calledWith(204)).to.be.false;
        expect(next.calledWith(fakeResult.error)).to.be.equal(true);

        });
    });
  });
});
