const connection = require('./connection');

const getAll = async () => {
    const [product] = await connection.execute(
        'SELECT * FROM StoreManager.products',
    );
    return product;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [result] = await connection.execute(query, [id]);
  if (result.length === 0) return null;

  return result[0];
};

const getByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?';
  const [result] = await connection.execute(query, [name]);

  if (result.length === 0) return null;

  return result[0];
};

const postProduct = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)';

  const [{ insertId }] = await connection.execute(query, [name, quantity]);

  return { id: insertId, name, quantity };
};

const putProduct = async (id, name, quantity) => {
const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ? ';

await connection.execute(query, [name, quantity, id]);

const result = await getById(id);

return result;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  const result = await connection.execute(query, [id]);

  return result;
};

module.exports = {
  getAll,
  getById,
  getByName,
  postProduct,
  putProduct,
  deleteProduct,
};
