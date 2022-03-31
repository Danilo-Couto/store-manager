const connection = require('./connection');

const getAll = async () => {
    const [product] = await connection.execute(
        'SELECT * FROM StoreManager.products',
    );
    return product;
};

const getById = async (saleId) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [result] = await connection.execute(query, [saleId]);

  if (result.length === 0) return null;

  return result[0];
};

module.exports = {
  getAll,
  getById,
};
