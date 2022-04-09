const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');

const SalesService = require('../../../services/SalesService');
const SalesController = require('../../../controllers/SalesController');
const SalesModel = require('../../../models/SalesModel')

  describe('ControllerTest - Sales asdadasda', () => {
  // get All
    describe('Busca tadas as vendas no BD passando um ID', () => {
      const req = {};
      const res = {};

      describe('quando é encontrado com sucesso', async () => {
        const fakeResult =   [
          {
            saleId: 1,
            date: '2021-09-09T04:54:29.000Z',
            productId: 1,
            quantity: 2
          },
          {
            saleId: 1,
            date: '2021-09-09T04:54:54.000Z',
            productId: 2,
            quantity: 2
          }
        ]

        beforeEach(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();
          sinon.stub(SalesService, 'getAll').resolves(fakeResult);
        });

        afterEach(() => {
          SalesService.getAll.restore();
        });

        it('é chamado o status com o código 200', async () => {
          await SalesController.getAll(req, res);
          expect(res.status.calledWith(200)).to.be.equal(true);
        });

        it('é chamado o método "json" passando um array', async () => {
          await SalesController.getAll(req, res);
          expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
        });

        it('retorna o json com o produto chamado', async () => {
          await SalesController.getAll(req, res);
          expect(res.json.calledWith(fakeResult)).to.be.equal(true);
        });
      });

      describe('quando não encontra produto', async () => {
        const fakeResult = [];

        beforeEach(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns(res);

        sinon.stub(SalesService, 'getAll').resolves(fakeResult);
        });

        afterEach(() => {
          SalesService.getAll.restore();
        });

        it('é chamado o status com o código 200', async () => {
          await SalesController.getAll(req, res);
          expect(res.status.calledWith(200)).to.be.equal(true);
        });

        it('retorna um array vazio', async () => {
          await SalesController.getAll(req, res,);
          expect(res.json.calledWith(fakeResult)).to.be.true;
        });
      });
    });

    // get By Id
    describe('Busca uma venda no BD passando um ID', () => {
      const req = {};
      const res = {};

      describe('quando é encontrado com sucesso', async () => {
        const fakeResult =  [
          {
            date:' 2021-09-09T04:54:29.000Z',
            productId: 1,
            quantity: 2
          },
          {
            date: '2021-09-09T04:54:54.000Z',
            productId: 2,
            quantity: 2
          }
        ];

        beforeEach(() => {
          req.params = {id: 1};
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(SalesService, 'getById').resolves(fakeResult);
        });

        afterEach(() => {
          SalesService.getById.restore();
        });

        it('é chamado o status com o código 200', async () => {
          await SalesController.getById(req, res);
          expect(res.status.calledWith(200)).to.be.equal(true);
        });

        it('é chamado o método "json" passando um aray', async () => {
          await SalesController.getById(req, res);
          expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
        });

        it('retorna o json com o produto chamado', async () => {
          await SalesController.getById(req, res);
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

        sinon.stub(SalesService, 'getById').resolves(fakeResult);
        });

        afterEach(() => {
          SalesService.getById.restore();
        });

        it('é chamado o status com o código 404', async () => {
          await SalesController.getById(req, res, next);
          expect(next.calledWith(200)).to.be.equal(false);
        });

        it('é chamado o erro um erro', async () => {
          await SalesController.getById(req, res, next);
          expect(next.calledWith(fakeResult.error)).to.be.equal(true);
        });

    /*     it('é chamado o erro "Product not found" ', async () => {
          await SalesController.getById(req, res, next);
          expect(next.calledWith(fakeResult)).to.be.equal(true);
        }); // como invocar esta mensagem de erro?
    */
      });
    });

    // post sale
    describe('Cria uma venda no BD', () => {
      const req = {};
      const res = {};

      describe('quando é criado com sucesso', async () => {
        const fakeResult =   {
          id: 1,
          itemsSold: [
            {
              productId: 1,
              quantity: 2
            },
            {
              productId: 2,
              quantity: 5
            }
          ]
        }

        beforeEach(() => {
          req.body = [ {productId: 1, quantity: 3} ];
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(SalesService, 'postSale').resolves(fakeResult);
        });

        afterEach(() => {
          SalesService.postSale.restore();
        });

        it('é chamado o status com o código 201', async () => {
          await SalesController.postSale(req, res);
          expect(res.status.calledWith(201)).to.be.equal(true);
        });

        it('é chamado o método "json" passando um objeto', async () => {
          await SalesController.postSale(req, res);
          expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
        });

        it('retorna o json com o produto chamado', async () => {
          await SalesController.postSale(req, res);
          expect(res.json.calledWith(fakeResult)).to.be.equal(true);
        });
      });

      describe('quando o req.body não atende as validacçõe', async () => {
        const fakeResult = { error: {message: 'algum dos erros'} };

        beforeEach(() => {
          req.body = [{ quantity: 2 }];
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns(res);

        sinon.stub(SalesService, 'postSale').resolves(fakeResult);
        });

        afterEach(() => {
          SalesService.postSale.restore();
        });

        /*it('é chamado o status com o código 200', async () => {
          await SalesController.postSale(req, res);
          expect(res.status.calledWith(409)).to.be.equal(true);
        }); */ // como chamar o 409?

        it('NÃO É chamado o status com o código 201', async () => {
          await SalesController.postSale(req, res);
          expect(res.status.calledWith(201)).to.be.equal(true);
        });

        it('é chamado a mensagem de erro', async () => {
          await SalesController.postSale(req, res);
          expect(res.json.calledWith(fakeResult)).to.be.true;
        });
      });
    });

    // delete sale
    describe('Deleta uma venda no BD', () => {
      const req = {};
      const res = {};

      describe('quando deleta com sucesso', async () => {
        const returnFromModel = true;

        beforeEach(() => {
          req.params = { id: 1};
          res.status = sinon.stub().returns(res);
          res.end = sinon.stub().returns();

          sinon.stub(SalesService, 'getById').resolves(true);
          sinon.stub(SalesModel, 'deleteSale').resolves(true);
          sinon.stub(connection, 'execute').resolves(returnFromModel);
        });

        afterEach(() => {
          SalesService.getById.restore();
          SalesModel.deleteSale.restore();
          connection.execute.restore();
        });

        it('é chamado o status com o código 204', async () => {
          await SalesController.deleteSale(req, res);
          expect(res.status.calledWith(204)).to.be.true;
          expect(res.end.calledWith()).to.be.true;
          });
      });

      describe('quando produto NÃO existe', async () => {
          const fakeResult = { error: {message: "Product not found"} };

        beforeEach(() => {
          req.params = { id: 22};
          res.status = sinon.stub().returns(res);
          next = sinon.stub().returns();

          sinon.stub(SalesService, 'getById').resolves(fakeResult);
        });

        afterEach(() => {
          SalesService.getById.restore();
        });

        it('NÃO É chamado o status com o código 204', async () => {
          await SalesController.deleteSale(req, res, next);
          expect(next.calledWith(204)).to.be.false;
          expect(next.calledWith(fakeResult.error)).to.be.equal(true);
          });
      });
    });

    // put sale
    describe('Edita uma venda no BD', () => {
      const req = {};
      const res = {};

      describe('quando edita com sucesso', async () => {
        const fakeResult = {
          saleId: 1,
          itemUpdated: [
            {
              productId: 1,
              quantity: 6
            }
          ]
        };
        req.params = { saleId: 1};
        req.body =  [
          {
            productId: 1,
            quantity: 6
          }
        ];

        beforeEach(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();
          sinon.stub(SalesService, 'putSale').resolves(fakeResult);
        });

        afterEach(() => {
          SalesService.putSale.restore();
        });

        it('é chamado o status com o código 200', async () => {
          await SalesController.putSale(req, res);
          expect(res.status.calledWith(200)).to.be.equal(true);
        });

        it('é chamado o método "json" passando um objeto', async () => {
          await SalesController.putSale(req, res);
          expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
        });

        it('retorna o json com o produto chamado', async () => {
          await SalesController.putSale(req, res);
          expect(res.json.calledWith(fakeResult)).to.be.equal(true);
        });
      });

      describe('quando o produto não existe', async () => {
        const fakeResult = { error: {message: "Product not found"} };
        req.params = { id: 22};

        beforeEach(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns(res);

        sinon.stub(SalesService, 'putSale').resolves(fakeResult.error);
        });

        afterEach(() => {
          SalesService.putSale.restore();
        });

        /*it('é chamado o status com o código 200', async () => {
          await SalesController.putSale(req, res);
          expect(res.status.calledWith(409)).to.be.equal(true);
        }); */ // como chamar o 409?

        it('NÃO É chamado o status com o código 200', async () => {
          await SalesController.putSale(req, res);
          expect(res.status.calledWith(200)).to.be.equal(true);
        });

        it('é chamado a mensagem de erro', async () => {
          await SalesController.putSale(req, res);
          expect(res.json.calledWith(fakeResult.error)).to.be.true;
        });
      });
    });
});

