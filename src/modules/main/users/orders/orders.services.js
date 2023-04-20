import { getConnection } from "../../../../utils/connectDatabase.js";
import InfoServices from "../info/info.services.js";



export default class OrdersServices {
	static async findAllFromUid(uid, req, res) {
		try {
			const client = await getConnection();
			const results = await client.select()
				.from('users')
				.where('users.firebase_uid', '=', uid)
				.then(async (users) => {

					return await client.select()
						.from('orders')
						.where('orders.user_id', '=', users[0].id)
						.then(async orders => {
							for (const order of orders) {
								var items = await client
									.select([client.raw(`json_agg(products.*) as product`),
										'order_items.quantity'])
									.from('order_items')
									.innerJoin('products', 'products.id', '=', 'order_items.product_id')
									.where('order_items.order_id', '=', order.id)
									.groupBy(['order_items.product_id', 'order_items.quantity'])
									.then((rows) => {
										rows.forEach(row => {
											row.product = row.product[0]
										})
										return rows
									})
								order.items = items
							}

							return orders
						})

				})

			return results;
		} catch (error) {
			return res.status(500).send(({
				error: error?.message || error
			}));
		}
	}

	static async create(uid, data, req, res) {
		try {
			const client = await getConnection()
			var user_id = await client.select('users.id').from('users').where('users.firebase_uid', uid)
			if (!(user_id && user_id[0])) throw Error('missing id')

			var { items } = data

			delete data.items;

			data.user_id = user_id[0].id

			var order_items = []
			var total = 0
			items.forEach(item => {
				order_items.push({
					product_id: item.product.id,
					quantity: item.quantity,
				})

				total += item.product.unit_price * item.quantity
			})

			return await client
				.transaction(async (trx) => {
					try {
						data.total_price = total
						const result = await trx('orders')
							.insert(data).returning('id')

						const order_id = result[0].id

						for (const order_item of order_items) {
							order_item.order_id = order_id
							await trx('order_items').insert(order_item)
						}

						return res.status(201).send({
							message: "Create successfully"
						})
					}
					catch (e) {
						return res.status(500).send({
							message: e?.message || e
						})
					}
				})


		} catch (error) {
			return res.status(500).send(({
				error: error?.message || error
			}));
		}
	}
}