const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const SaleModel = require('../../../models/SalesModel');
const ProductModel = require('../../../models/ProductModel');

describe('ModelTest - Sales', () => {
    // get All
  describe(' Sales: Busca todos as vendas no BD', () => {
    const expectResult = [
      {
        saleId: 1,
        date: '2022-04-02T22:20:37.000Z',
        productId: 1,
        quantity: 5
      },
      {
        saleId: 1,
        date: '2022-04-02T22:20:37.000Z',
        productId: 2,
        quantity: 10
      },
      {
        saleId: 2,
        date: '2022-04-02T22:20:37.000Z',
        productId: 3,
        quantity: 15
      }
    ];

    describe('quando é encontrado com sucesso', async () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([expectResult]); // simula a funcao anterior que o modulo do teste esta usando
      });
      after(async () => {
        connection.execute.restore();
      });

      it('retorna um array de objetos', async () => {
        const response = await SaleModel.getAll();
        expect(response).to.be.an('array'); // resposta esperada
      });

      it('o objeto não esta vazio.', async () => {
        const response = await SaleModel.getAll();
        expect(response).to.be.not.empty;
      });

      it('retorna o todas as propriedades de um sale listado no array.', async () => {
        const response = await SaleModel.getAll();
        expect(response[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity')
      });

      it('retorna o 4 elementos listados no array.', async () => {
        const response = await SaleModel.getAll();
        expect(response).to.have.length('3');
      });
    });

    describe('quando NÃO É encontrado', async () => {
      const expectResult = [];

      before(async () => {
        sinon.stub(connection, 'execute').resolves([expectResult]);
      });
      after(async () => {
        connection.execute.restore();
      });

      it('retorna array vazio', async () => {
        const response = await SaleModel.getAll();
        expect(response).to.be.an('array');
      });
    });
  });

  // get by id
  describe('Busca uma venda no BD passando um ID', () => {
    const expectResult = [
      {
        date: "2022-04-02T22:20:37.000Z",
        productId: 3,
        quantity: 15
      }
    ];

    describe('quando é encontrado com sucesso', async () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves(expectResult);
      });
      after(async () => {
        connection.execute.restore();
      });

      it('retorna um objeto', async () => {
        const response = await SaleModel.getById(1);
        expect(response).to.be.an('object');
      });

      it('o objeto não esta vazio.', async () => {
        const response = await SaleModel.getById(1);
        expect(response).to.be.not.empty;
      });

      it('retorna o objeto com todas as propriedades do sale.', async () => {
        const response = await SaleModel.getById(1);
        expect(response).to.include.all.keys('date', 'productId', 'quantity')
  ;
      });
    });

    describe('quando NÃO É encontrado', async () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });
      after(async () => {
        connection.execute.restore();
      });

      it('retorna null', async () => {
        const response = await SaleModel.getById(11);
        expect(response).to.be.equal(null); // resposta esperada
      });
    });
  });

  // post venda
  describe('Insere uma nova venda no BD', () => {
    const soldItems =   [
      {
        productId: 1,
        quantity: 2
      },
      {
        productId: 2,
        quantity: 5
      }
    ]
    const expectResult = [
      {
      id: 12,
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
    ];

   /*  describe('quando obtém sucesso', async () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves(expectResult);
      });
      after(async () => {
        connection.execute.restore();
      });

      it('retorna um objeto', async () => {
        const response = await SaleModel.postSale([soldItems]);
        expect(response).to.be.an('object');
      });

      it('o objeto não esta vazio.', async () => {
        const response = await SaleModel.postSale([soldItems]);
        expect(response).to.be.not.empty;
      });

      it('retorna o objeto com todas as propriedades do sale.', async () => {
        const response = await SaleModel.postSale([soldItems]);
        expect(response).to.include.all.keys('id', 'itemsSold')
      });
    });
 */
  });

  // put product
  describe('Edita uma venda no BD', () => {
    const expectResult = [{
      saleId: 1,
      itemUpdated: [
        {
          productId: 1,
          quantity: 6
        }
      ]
    }];

    describe('quando obtém sucesso', async () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves(expectResult);
      });
      after(async () => {
        connection.execute.restore();
      });

      it('retorna um objeto', async () => {
        const response = await SaleModel.putSale(1, { productId: 1, quantity: 6});
        expect(response).to.be.an('object');
      });

      it('retorna o objeto com todas as propriedades do sale.', async () => {
        const response = await SaleModel.putSale(1, { productId: 1, quantity: 6});
        expect(response).to.include.all.keys('saleId', 'itemUpdated')
      });
    });
  });

  // delete product ????
  describe('Deleta uma venda no BD', () => {
    const fakeSale =   [
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
    const fakeResult = [{ affectedRows: 1 }]

      before(async () => {
        sinon.stub(SaleModel, 'getById').resolves(fakeSale);
        sinon.stub(ProductModel, 'putProductAfterSale').resolves(null);
        sinon.stub(connection, 'execute').resolves([fakeResult]);
      });

      after(async () => {
        SaleModel.getById.restore();
        ProductModel.putProductAfterSale.restore();
        connection.execute.restore();
      });

      it('quando sucesso', async () => {
        const response = await SaleModel.deleteSale(1);
        expect(response).to.deep.equal([fakeResult]);
      });
    });

  describe('ModelTest: Deleta uma venda no BD', () => {
      const expectResult = [{ affectedRows: 0 }]

      beforeEach(async () => {
        sinon.stub(connection, 'execute').resolves([expectResult]);
      });

      afterEach(async () => {
        connection.execute.restore();
      });

      it('quando falha', async () => {
        const response = await SaleModel.deleteSale(1);
        expect(response).to.deep.equal([expectResult]);
      });
  });
});
