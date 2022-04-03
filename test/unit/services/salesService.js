const sinon = require('sinon');
const { expect } = require('chai');
const SaleService = require('../../../services/SalesService');
const SalesModel = require('../../../models/SalesModel');

// get All
describe('ServiceTests - Sales: Busca tadas as vendas no BD', () => {
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
      const response = await SaleService.getAll();
      expect(response).to.be.an('array');
    });

    it('o objeto não esta vazio.', async () => {
      const response = await SaleService.getAll();
      expect(response).to.be.not.empty;
    });

    it('retorna o todas as propriedades de uma venda listado no array.', async () => {
      const response = await SaleService.getAll();
      expect(response[0]).to.include.all.keys('productId', 'quantity', 'quantity')
    });

    it('retorna o 3 elementos listados no array.', async () => {
      const response = await SaleService.getAll();
      expect(response).to.have.length('2');
    });

  describe('quando NÃO É encontrado', async () => {
    const expectResult = [];

    it('retorna array vazio', async () => {
      const response = await SaleService.getAll();
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
      const response = await SaleService.getById(1);
      expect(response).to.be.an('array');
    });

    it('o array não esta vazio.', async () => {
      const response = await SaleService.getById(1);
      expect(response).to.be.not.empty;
    });

    it('retorna o um array com todas as propriedades da venda.', async () => {
      const response = await SaleService.getById(1);
      expect(response[0]).to.include.all.keys('productId', 'quantity', 'quantity')
    });
  });

/*   describe('quando NÃO É encontrado', async () => {
    it('retorna error', async () => {
      const response = await SaleService.getById(11);
      expect(Object.keys(response)).contain("error");
    });
  }); */
});

// post sale
describe('ServiceTests: Insere uma nova venda no BD', () => {
/*   describe('quando obtem com sucesso', async () => {
    const venda = [{ productId: '9', quantity: 100 }];
    it('retorna um objeto não vazio com as propriedades da nova venda', async () => {
      const response = await SaleService.postSale(venda);
      expect(response).to.be.an('object');
      expect(response).to.be.not.empty;
      expect(response).to.include.all.keys('id', 'itemsSold')
    });
  }); */
});

// put sale
describe('ServiceTests: Edita uma venda no BD', () => {
  const editSale = {
    saleId: 1,
    productId: 1,
    quantity: 6
  };

/*   describe('quando obtém sucesso', async () => {
    it('retorna um objeto com as propriedades da venda editada', async () => {
      const response = await SaleService.putSale(saleId, {productId, quantity});
      console.log(console);
      expect(response).to.be.an('object');
      expect(response).to.include.all.keys('id', 'name', 'quantity')
    });
  }); */

  describe('quando não é passado o id para informar a venda a ser editado', async () => {
    it('retorna um erro.', async () => {
      const response = await SaleService.putSale('Martelo de Thor', 15);
      expect(Object.keys(response)).contain("error");
    });
  });

/*   describe('quando a venda não existe', async () => {
    it('retorna null.', async () => {
      const response = await SaleService.putSale(100, 'Martelo de Thor', 15);
      expect(response).to.be.null;
    });
  }); */
});

// delete sale
describe('ServiceTests: Deleta uma venda no BD', () => {

/*   describe('quando tem sucesso', async () => {

    beforeEach(async () => {
      sinon.stub(SalesModel, 'deleteSale').resolves(true);
    });
    afterEach(async () => {
      SalesModel.deleteSale.restore();
    });

    it('retorna true', async () => {
      const response = await SaleService.deleteSale(1);
      expect(response).to.be.equal(true);
    });
  }); */

  describe('quando falha por não informar o id', async () => {
    beforeEach(async () => {
      sinon.stub(SalesModel, 'deleteSale').resolves(true);
    });
    afterEach(async () => {
      SalesModel.deleteSale.restore();
    });

    it('retorn erro', async () => {
    const response = await SaleService.deleteSale();
    expect(Object.keys(response)).contain("error");
    })
  });

/*   describe('quando falha por não encontrar a venda', async () => {
    beforeEach(async () => {
      sinon.stub(SalesModel, 'deleteSale').resolves(true);
    });
    afterEach(async () => {
      SalesModel.deleteSale.restore();
    });
      it('retorna erro', async () => {
      const response = await SaleService.deleteSale(11);
      expect(Object.keys(response)).contain("code");
   });
  }); */

});
