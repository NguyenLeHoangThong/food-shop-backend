import { getConnection } from '../../../utils/connectDatabase.js';

export default class CategoriesServices {
    static async previewProducts(req, res) {
        const numberOfProducts = 6
        try {
            const client = await getConnection();

            const results = await client
                .select(['categories.id', 'categories.name', client.raw(`json_agg(products.*) as products`)])
                .from('categories')
                .innerJoin('products', 'products.category_id', '=', 'categories.id')
                .groupBy('categories.id')
                .then((output) => {
                    return output.map((item) => {
                        item.countProducts = item.products.length
                        item.products = item.products.slice(0, numberOfProducts)
                        return item
                    })
                })

            return results
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }
}
