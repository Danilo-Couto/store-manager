const connection = require('./connection');

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

const postSale = async (soldItems) => {
  // console.log(soldItems);

  const querySale = 'INSERT INTO StoreManager.sales (date) VALUES (CURRENT_TIMESTAMP());';
  const [sale] = await connection.execute(querySale);

  const querySaleAndProducts = `INSERT INTO StoreManager
    .sales_products (product_id, quantity) VALUES (?,?)`;

  soldItems.forEach(async (item) => {
  await connection.execute(querySaleAndProducts, [sale.insertId, item.productId, item.quantity]);
  });

  return { id: sale.insertId, itemsSold: soldItems };
};

module.exports = {
  getAll,
  getById,
  postSale,
};
