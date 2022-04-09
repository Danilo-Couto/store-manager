const sinon = require('sinon');
const { expect } = require('chai');
const ProductService = require('../../../services/ProductService');
const ProductModel = require('../../../models/ProductModel');

describe('ServiceTest - Products: Busca todos os produtos no BD', () => {
  // get All
  describe('Products: Busca todos os produtos no BD', () => {
    describe('quando é encontrado com sucesso', async () => {
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
      beforeEach(async () => {
        sinon.stub(ProductModel, 'getAll').resolves(expectResult);
      });
      afterEach(async () => {
        ProductModel.getAll.restore();
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

      beforeEach(async () => {
        sinon.stub(ProductModel, 'getAll').resolves(expectResult);
      });
      afterEach(async () => {
        ProductModel.getAll.restore();
      });

      it('o array esta vazio.', async () => {
        const response = await ProductService.getAll();
        expect(response).to.be.empty;
      });
    });
  });

  // get by id
  describe('Busca um produto no BD passando um ID', () => {
    describe('quando é encontrado com sucesso', async () => {
      const expectResult = {
        id: 1,
        name: 'Martelo de Thor',
        quantity: 10
      };

      beforeEach(async () => {
        sinon.stub(ProductModel, 'getById').resolves(expectResult);
      });
      afterEach(async () => {
        ProductModel.getById.restore();
      });

 /*      it('retorna um objeto', async () => {
        const response = await ProductService.putProduct(1);
        expect(response).to.be.an('object');
      }) */;

      it('o objeto não esta vazio.', async () => {
        const response = await ProductService.getById(1);
        expect(response).to.be.not.empty;
      });

      it('retorna o objeto com todas as propriedades do produto.', async () => {
        const response = await ProductService.getById(1);
        expect(response).to.include.all.keys('id', 'name', 'quantity')
      });
    });

    describe('quando NÃO É encontrado', async () => {
      const expectResult = {error: {}
      };

      beforeEach(async () => {
        sinon.stub(ProductModel, 'getById').resolves(false);
      });
      afterEach(async () => {
        ProductModel.getById.restore();
      });

      it('retorna error', async () => {
        const response = await ProductService.getById(11);
        expect(Object.keys(response)).contain("error");
      });
    });
  });

  // post product
  describe('Insere um novo produto no BD', () => {
    const produto = {  name: 'produto_4', quantity: 1000 };

    describe('quando obtém com sucesso', async () => {

      beforeEach(async () => {
        const existingProduct = false;
        const expectResult = { id: 4, name: 'produto_4', quantity: 1000 };

        sinon.stub(ProductModel, 'getByName').resolves(existingProduct);
        sinon.stub(ProductModel, 'postProduct').resolves(expectResult);
      });
      afterEach(async () => {
        ProductModel.getByName.restore();
        ProductModel.postProduct.restore();
      });

      it('retorna um objeto não vazio com as propriedades do novo produto', async () => {
        const response = await ProductService.postProduct(produto.name, produto.quantity);
        expect(response).to.be.an('object');
        expect(response).to.be.not.empty;
        expect(response).to.include.all.keys('id', 'name', 'quantity')
        expect(response.quantity).to.be.not.undefined;
      });
    });

    describe('quando já existe o produto', async () => {
      beforeEach(async () => {
        const existingProduct = true;
        sinon.stub(ProductModel, 'getByName').resolves(existingProduct);
        });
        afterEach(async () => {
          ProductModel.getByName.restore();
        });

      it('retorna erro', async () => {
        const response = await ProductService.postProduct(produto.name, produto.quantity);
        expect(Object.keys(response)).contain("error");
      });
    });
  });

  // put product

  // delete product
  /* describe('Deleta um produto no BD', () => {
    describe('quando tem sucesso', async () => {

      beforeEach(async () => {
        sinon.stub(ProductModel, 'deleteProduct').resolves(true);
      });
        afterEach(async () => {
          ProductModel.deleteProduct.restore();
        });

      it('quando sucesso', async () => {
        const response = await ProductService.deleteProduct(1);
        expect(response).to.be.equal(true);
      });

      it('quando falha por não informar o id', async () => {
      const response = await ProductService.deleteProduct();
      expect(Object.keys(response)).contain("error");
      })

      it('quando falha por não encontrar a venda', async () => {
        const response = await ProductService.deleteProduct(11);
        expect(Object.keys(response)).contain("error");
    });
    });
  }); */
});
