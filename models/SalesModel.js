const connection = require('./connection');
const ProductModel = require('./ProductModel');

const getAll = async () => {
  const query = `SELECT sp.sale_id AS saleId,
  s.date 'date',
  sp.product_id 'productId',
  sp.quantity 'quantity'
FROM StoreManager.sales_products AS sp
INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id
ORDER BY saleId AND productId
`;
  const [sale] = await connection.execute(query);
  return sale;
};

const getById = async (saleId) => {
  const query = `
  SELECT
  s.date 'date',
  sp.product_id 'productId',
  sp.quantity 'quantity'
  FROM StoreManager.sales AS s
  INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id
  WHERE sp.sale_id = ?  `;

  const [result] = await connection.execute(query, [saleId]);

  if (result.length === 0) return null;

  return result;
};

// create sale
const postSale = async (soldItems) => {
  const [sale] = await connection.execute('INSERT INTO StoreManager.sales (id) VALUES (null)');

  const querySaleAndProducts = `INSERT INTO StoreManager
    .sales_products (sale_id, product_id, quantity) VALUES (?,?,?)`;

  await Promise.all(soldItems.map(async (item) => {
  await connection.execute(querySaleAndProducts, [sale.insertId, item.productId, item.quantity]);
  await ProductModel.putProductAfterSale('create', item.productId, item.quantity);
  }));

  return { id: sale.insertId, itemsSold: soldItems };
};

// edit sale
const putSale = async (saleId, body) => {
  const { productId, quantity } = body;
  const query = `UPDATE StoreManager
    .sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?`;

  await connection.execute(query, [productId, quantity, saleId]);

  return { saleId, itemUpdated: [{ productId, quantity }] };
  };

const deleteSale = async (saleId) => {
  const productObj = await getById(saleId);

  await Promise.all(productObj.map(async (item) => {
    ProductModel.putProductAfterSale('del', item.productId, item.quantity);
}));

  const query = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';
  const result = await connection.execute(query, [saleId]);
  return result;
};

module.exports = {
  getAll,
  getById,
  postSale,
  putSale,
  deleteSale,
};
