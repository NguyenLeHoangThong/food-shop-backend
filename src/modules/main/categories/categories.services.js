import { getConnection } from '../../../utils/connectDatabase.js';

export default class CategoriesServices {
    static async previewProducts(req, res) {
        const numberOfProducts = 6
        try {
            const client = await getConnection();

            const categoryProducts = client
    .raw(`WITH category_products AS (
            SELECT
              c.id AS category_id,
              c.name AS category_name,
              json_agg(
                json_build_object(
                  'product_id', p.id,
                  'product_name', p.name,
                  'unit_price', p.unit_price,
                  'stock', p.stock,
                  'general_description', p.general_description,
                  'note', p.note,
                  'banner', p.banner,
                  'promotion_id', p.promotion_id
                )
              ) AS products
            FROM categories c
            JOIN products p ON c.id = p.category_id
            GROUP BY c.id, c.name
          )
          SELECT
            cp.category_id,
            cp.category_name,
            json_agg(
              json_build_object(
                'id', (product.product->>'product_id'),
                'name', (product.product->>'product_name'),
                'unit_price', (product.product->>'unit_price'),
                'stock', (product.product->>'stock'),
                'general_description', (product.product->>'general_description'),
                'note', (product.product->>'note'),
                'banner', (product.product->>'banner'),
                'sale_percent', COALESCE(promotions.sale_percent, NULL)
              )
            ) AS products_with_promotions
          FROM category_products cp, LATERAL (
            SELECT
              json_array_elements(cp.products) AS product
          ) product 
          LEFT JOIN LATERAL (
            SELECT
              promotions.id AS promotion_id,
              promotions.name AS promotion_name,
              promotions.sale_percent AS sale_percent
            FROM promotions
            WHERE promotions.id = (product.product->>'promotion_id')::int
          ) promotions ON true
          GROUP BY cp.category_id, cp.category_name`);

            const results = await categoryProducts;
            return results.rows.map((result) => ({
                id: result.category_id,
                name: result.category_name,
                products: result.products_with_promotions.slice(0, numberOfProducts),
            }));

        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }
}
