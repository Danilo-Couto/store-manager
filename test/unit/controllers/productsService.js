const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const ProductService = require('../../../services/ProductService')

// get All
describe('ServiceTests - Products: Busca todos os produtos no BD', () => {
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
      sinon.stub(connection, 'execute').resolves([expectResult]);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array de objetos', async () => {
      const response = await ProductService.getAll();
      expect(response).to.be.an('array');
    });

    it('o objeto não esta vazio.', async () => {
      const response = await ProductService.getAll();
      expect(response).to.be.not.empty;
    });

    it('retorna o todas as propriedades de um produto listado no array.', async () => {
      const response = await ProductService.getAll();
      expect(response[0]).to.include.all.keys('id', 'name', 'quantity')
    });

    it('retorna o 3 elementos listados no array.', async () => {
      const response = await ProductService.getAll();
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
      const response = await ProductService.getAll();
      expect(response).to.be.an('array');
    });
  });

});

// get by id
describe('ServiceTests: Busca um produto no BD passando um ID', () => {
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
      const response = await ProductService.putProduct(1);
      expect(response).to.be.an('object');
    });

    it('o objeto não esta vazio.', async () => {
      const response = await ProductService.getById(1);
      expect(response).to.be.not.empty;
    });

    it('retorna o objeto com todas as propriedades do produto.', async () => {
      const response = await ProductService.getById(1);
      expect(response).to.include.all.keys('id', 'name', 'quantity')
    });
  });

  describe.only('quando NÃO É encontrado', async () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves({
        error: { code: 'invalidData', message: 'Product not found' } });
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna null', async () => {
      const response = await ProductService.getById(11);
      console.log(response)
      expect(response).to.be.null; // resposta esperada
    });
  });
});

// post product
describe('ServiceTests: Insere um novo produto no BD', () => {
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
      const response = await ProductService.postProduct(produto.name, produto.quantity);
      expect(response).to.be.an('object');
    });

    it('o objeto não esta vazio.', async () => {
      const response = await ProductService.postProduct(produto.name, produto.quantity);
      expect(response).to.be.not.empty;
    });

    it('retorna o objeto com todas as propriedades do produto.', async () => {
      const response = await ProductService.postProduct(produto.name, produto.quantity);
      expect(response).to.include.all.keys('id', 'name', 'quantity')
    });

    it('retorna o objeto com todas as propriedades do produto.', async () => {
      const response = await ProductService.postProduct(produto.name, produto.quantity);
      expect(response.name).equal("produto");
      expect(response.quantity).to.be.not.undefined;
    });
  });

});

// put product ????
describe('ServiceTests: Edita um produto no BD', () => {
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
      const response = await ProductService.putProduct(1,  'Martelo de Thor', 15);
      expect(response).to.be.an('object');
    });

    it('retorna o objeto com todas as propriedades do produto.', async () => {
      const response = await ProductService.putProduct(1);
      expect(response).to.include.all.keys('id', 'name', 'quantity')
    });
  });
});

// delete product ????
describe('ServiceTests: Deleta um produto no BD', () => {
  const expectResult = [{ affectedRows: 1 }]
   beforeEach(async () => {
     sinon.stub(connection, 'execute').resolves(expectResult);
   });

   afterEach(async () => {
     connection.execute.restore();
   });

   it('quando sucesso', async () => {
     const response = await ProductService.deleteProduct(1);
     expect(response).to.deep.equal(expectResult);
   });
  });

  describe('ServiceTests: Deleta um produto no BD', () => {
   const expectResult = [{ affectedRows: 0 }]
   beforeEach(async () => {
     sinon.stub(connection, 'execute').resolves(expectResult);
   });

   afterEach(async () => {
     connection.execute.restore();
   });

   it('quando falha', async () => {
     const response = await ProductService.deleteProduct(1);
     expect(response).to.deep.equal(expectResult);
   });

});
