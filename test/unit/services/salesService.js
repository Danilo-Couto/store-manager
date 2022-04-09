const sinon = require('sinon');
const { expect } = require('chai');
const SalesService = require('../../../services/SalesService');
const SalesModel = require('../../../models/SalesModel');
const ProductModel = require('../../../models/ProductModel');

describe('ServiceTest - Sales: Busca todos os produtos no BD', () => {

  // get All
  describe('ServiceTests - Sales: Busca todas as vendas no BD', () => {
    describe('quando é encontrado com sucesso', async () => {
      const expectResult =   [
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
      ];

      beforeEach(async () => {
        sinon.stub(SalesModel, 'getAll').resolves(expectResult);
      });
      afterEach(async () => {
        SalesModel.getAll.restore();
      });

      it('retorna um array de objetos', async () => {
        const response = await SalesService.getAll();
        expect(response).to.be.an('array');
      });

      it('o objeto não esta vazio.', async () => {
        const response = await SalesService.getAll();
        expect(response).to.be.not.empty;
      });

      it('retorna o todas as propriedades de uma venda listado no array.', async () => {
        const response = await SalesService.getAll();
        expect(response[0]).to.include.all.keys('productId', 'quantity', 'quantity')
      });

      it('retorna o 3 elementos listados no array.', async () => {
        const response = await SalesService.getAll();
        expect(response).to.have.length('2');
      });

    describe('quando NÃO É encontrado', async () => {
      const expectResult = [];

      it('retorna array vazio', async () => {
        const response = await SalesService.getAll();
        expect(response).to.be.an('array');
        });
      });
    });
  });

  // get by id
  describe('ServiceTests: Busca uma venda no BD passando um ID', () => {
    describe('quando é encontrado com sucesso', async () => {
      const expectResult =   [
        {
          date: '2021-09-09T04:54:29.000Z',
          productId: 1,
          quantity: 2
        },
        {
          date: '2021-09-09T04:54:54.000Z',
          productId: 2,
          quantity: 2
        }
      ];

      beforeEach(async () => {
        sinon.stub(SalesModel, 'getById').resolves(expectResult);
      });
      afterEach(async () => {
        SalesModel.getById.restore();
      });

      it('retorna um array', async () => {
        const response = await SalesService.getById(1);
        expect(response).to.be.an('array');
      });

      it('o array não esta vazio.', async () => {
        const response = await SalesService.getById(1);
        expect(response).to.be.not.empty;
      });

      it('retorna o um array com todas as propriedades da venda.', async () => {
        const response = await SalesService.getById(1);
        expect(response[0]).to.include.all.keys('productId', 'quantity', 'quantity')
      });
    });

     describe('quando NÃO É encontrado', async () => {
      beforeEach(async () => {
        sinon.stub(SalesModel, 'getById').resolves(false);
      });
      afterEach(async () => {
        SalesModel.getById.restore();
      });

      it('retorna error', async () => {
        const response = await SalesService.getById(11);
        expect(Object.keys(response)).contain("error");
      });
    });
  });

  // post sale
  describe('ServiceTests: Insere uma nova venda no BD', () => {
    describe('quando obtém sucesso', async () => {
      const expectResult = {
        id: 1,
        itemsSold: [
          {
            productId:
            1,
            quantity: 3
          }
        ]
      };

      const fakeGetById = {
          date: '2021-09-09T04:54:29.000Z',
          productId: 1,
          quantity: 3
        };

      const fakeSale = [{ productId: 1, quantity: 3}];

      beforeEach(async () => {
        sinon.stub(ProductModel, 'getById').resolves(fakeGetById);
        sinon.stub(SalesModel, 'postSale').resolves(expectResult);
      });
      afterEach(async () => {
        ProductModel.getById.restore();
        SalesModel.postSale.restore();
      });

      it('retorna um objeto não vazio com as propriedades da nova venda', async () => {
        const response = await SalesService.postSale(fakeSale);
        expect(response).to.be.an('object');
        expect(response).to.be.not.empty;
        expect(response).to.include.all.keys('id', 'itemsSold')
      });
    });
  });

    // edit sale
  describe('ServiceTests: Edita uma venda no BD', () => {

    describe('quando obtém sucesso', async () => {
      const fakeGetById = {
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 3
      };

      const saleId = 1;
      const body = {
        productId: 1,
        quantity: 6
      };

      const expectResult = {
        saleId: 1,
        itemUpdated: [
          {
            productId: 1,
            quantity: 6
          }
        ]
      };

      beforeEach(async () => {
        sinon.stub(SalesModel, 'getById').resolves(fakeGetById);
        sinon.stub(SalesModel, 'putSale').resolves(expectResult);
      });
      afterEach(async () => {
        SalesModel.getById.restore();
        SalesModel.putSale.restore();
      });

      it('retorna um objeto não vazio com as propriedades da nova venda', async () => {
        const response = await SalesService.putSale(saleId, body);
        expect(response).to.be.deep.equal(expectResult);
        expect(response).to.be.not.empty;
        expect(response).to.include.all.keys('saleId', 'itemUpdated');
      });
    });

    describe('da erro', async () => {

      beforeEach(async () => {
        sinon.stub(SalesModel, 'getById').resolves(false);
      });
      afterEach(async () => {
        SalesModel.getById.restore();
      });

      it('quando não é passado o id.', async () => {
        const response = await SalesService.putSale('Martelo de Thor', 15);
        expect(Object.keys(response)).contain("error");
      });

      it('quando a venda não existe', async () => {
        const response = await SalesService.putSale(100, 'Martelo de Thor', 15);
        expect(Object.keys(response)).contain("error");
      });
    });

  });

  // delete sale
  describe('ServiceTests: Deleta uma venda no BD', () => {

    describe('quando tem sucesso', async () => {
      const fakeGetById = {
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 3
      };

      beforeEach(async () => {
        sinon.stub(SalesModel, 'getById').resolves(fakeGetById);
        sinon.stub(SalesModel, 'deleteSale').resolves(true);
      });
      afterEach(async () => {
        SalesModel.getById.restore();
        SalesModel.deleteSale.restore();
      });


      it('retorna true', async () => {
        const response = await SalesService.deleteSale(1);
        expect(response).to.be.equal(true);
      });
    });

    describe('quando falha por não informar o id ou não encontrar a venda', async () => {
      beforeEach(async () => {
        sinon.stub(SalesModel, 'getById').resolves(false);
        sinon.stub(SalesModel, 'deleteSale').resolves(false);
      });
      afterEach(async () => {
        SalesModel.getById.restore();
        SalesModel.deleteSale.restore();
      });

      it('retorn erro', async () => {
      const response = await SalesService.deleteSale();
      expect(Object.keys(response)).contain("code");
      })
    });
  });
});
