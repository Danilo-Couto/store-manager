const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const SaleModel = require('../../../models/SalesModel')

// get All
describe('ModelTest: Busca todos os produtos no BD', () => {

  const expectResult = [
  {
    id: 1,
    name: 'Martelo de Thor',
    quantity: 10
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
    quantity: 20
  },
  {
    id: 3,
    name: 'Escudo do Capitão América,',
    quantity: 30
  },
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

    it('retorna o todas as propriedades de um produto listado no array.', async () => {
      const response = await SaleModel.getAll();
      expect(response[0]).to.include.all.keys('id', 'name', 'quantity')
    });

    it('retorna o 3 elementos listados no array.', async () => {
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
describe('ModelTest: Busca um produto no BD passando um ID', () => {
  const expectResult = [{
    id: 1,
    name: 'Martelo de Thor',
    quantity: 10
  }];

  describe('quando é encontrado com sucesso', async () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([expectResult]);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SaleModel.putProduct(1);
      expect(response).to.be.an('object');
    });

    it('o objeto não esta vazio.', async () => {
      const response = await SaleModel.getById(1);
      expect(response).to.be.not.empty;
    });

    it('retorna o objeto com todas as propriedades do produto.', async () => {
      const response = await SaleModel.getById(1);
      expect(response).to.include.all.keys('id', 'name', 'quantity')
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

// post product
describe('ModelTest: Insere um novo produto no BD', () => {
  const produto = { name: 'produto', quantity: 100 };
  const expectResult = { insertId: 4 };

  describe('quando obtém com sucesso', async () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([expectResult]);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SaleModel.postProduct(produto.name, produto.quantity);
      expect(response).to.be.an('object');
    });

    it('o objeto não esta vazio.', async () => {
      const response = await SaleModel.postProduct(produto.name, produto.quantity);
      expect(response).to.be.not.empty;
    });

    it('retorna o objeto com todas as propriedades do produto.', async () => {
      const response = await SaleModel.postProduct(produto.name, produto.quantity);
      expect(response).to.include.all.keys('id', 'name', 'quantity')
    });

    it('retorna o objeto com todas as propriedades do produto.', async () => {
      const response = await SaleModel.postProduct(produto.name, produto.quantity);
      expect(response.name).equal("produto");
      expect(response.quantity).to.be.not.undefined;
    });
  });

});

// put product ????
describe('ModelTest: Edita um produto no BD', () => {
  const expectResult = [{
    id: 1,
    name: 'Martelo de Thor',
    quantity: 15
  }];

  describe('quando obtém sucesso', async () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([expectResult]);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SaleModel.putProduct(1,  'Martelo de Thor', 15);
      expect(response).to.be.an('object');
    });

    it('retorna o objeto com todas as propriedades do produto.', async () => {
      const response = await SaleModel.putProduct(1);
      expect(response).to.include.all.keys('id', 'name', 'quantity')
    });
  });
});

// delete product ????
describe('ModelTest: Deleta um produto no BD', () => {
  const expectResult = [{ affectedRows: 1 }]
   beforeEach(async () => {
     sinon.stub(connection, 'execute').resolves(expectResult);
   });

   afterEach(async () => {
     connection.execute.restore();
   });

   it('quando sucesso', async () => {
     const response = await SaleModel.deleteProduct(1);
     expect(response).to.deep.equal(expectResult);
   });
  });

  describe('ModelTest: Deleta um produto no BD', () => {
   const expectResult = [{ affectedRows: 0 }]
   beforeEach(async () => {
     sinon.stub(connection, 'execute').resolves(expectResult);
   });

   afterEach(async () => {
     connection.execute.restore();
   });

   it('quando falha', async () => {
     const response = await SaleModel.deleteProduct(1);
     expect(response).to.deep.equal(expectResult);
   });

});
