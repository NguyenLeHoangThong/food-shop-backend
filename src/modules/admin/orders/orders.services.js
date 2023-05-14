import { getConnection } from '../../../utils/connectDatabase.js';

export default class UsersServices {
    static async findAll(data, req, res) {
        const client = await getConnection();
        if (data.keyword) {
            const results = await client
                .select(['orders.*', 'wards.name as ward', 'districts.name as district', 'provinces.name as province', client.raw(`json_agg(order_items.*) as order_items`)])
                .from('orders')
                .innerJoin('order_items', 'orders.id', '=', 'order_items.order_id')
                .leftJoin('wards', 'wards.id', '=', 'orders.ward_id')
                .leftJoin('districts', 'districts.id', '=', 'orders.district_id')
                .leftJoin('provinces', 'provinces.id', '=', 'orders.province_id')
                .groupBy(['orders.id', 'wards.name', 'districts.name', 'provinces.name'])
                .whereRaw(`LOWER(fullname) like N'%${data.keyword.toLowerCase()}%' OR LOWER(email) like N'%${data.keyword.toLowerCase()}%' OR LOWER(id) like N'%${data.keyword.toLowerCase()}%'`)

            return results && results.length ? results.map((it) => ({ ...it, address: [it?.address, it?.ward, it?.district, it?.province].filter((fIt) => !!fIt).join(', ') })) : [];
        }
        else if (data?.filterStatus) {
            const results = await client
                .select(['orders.*', 'wards.name as ward', 'districts.name as district', 'provinces.name as province', client.raw(`json_agg(order_items.*) as order_items`)])
                .from('orders')
                .innerJoin('order_items', 'orders.id', '=', 'order_items.order_id')
                .leftJoin('wards', 'wards.id', '=', 'orders.ward_id')
                .leftJoin('districts', 'districts.id', '=', 'orders.district_id')
                .leftJoin('provinces', 'provinces.id', '=', 'orders.province_id')
                .groupBy(['orders.id', 'wards.name', 'districts.name', 'provinces.name'])
                .where(`status`, '=', data?.filterStatus)

            return results && results.length ? results.map((it) => ({ ...it, address: [it?.address, it?.ward, it?.district, it?.province].filter((fIt) => !!fIt).join(', ') })) : [];
        }
        else {
            const results = await client
                .select(['orders.*', 'wards.name as ward', 'districts.name as district', 'provinces.name as province', client.raw(`json_agg(order_items.*) as order_items`)])
                .from('orders')
                .innerJoin('order_items', 'orders.id', '=', 'order_items.order_id')
                .leftJoin('wards', 'wards.id', '=', 'orders.ward_id')
                .leftJoin('districts', 'districts.id', '=', 'orders.district_id')
                .leftJoin('provinces', 'provinces.id', '=', 'orders.province_id')
                .groupBy(['orders.id', 'wards.name', 'districts.name', 'provinces.name'])

            return results && results.length ? results.map((it) => ({ ...it, address: [it?.address, it?.ward, it?.district, it?.province].filter((fIt) => !!fIt).join(', ') })) : [];
        }
    }

    static async updateStatus(id, data, req, res) {
        const client = await getConnection();

        return await client
            .transaction(async (trx) => {
                const results = await trx('orders')
                    .update("status", data.status)
                    .where('id', '=', id)

                return res.status(200).send({
                    message: "Update successfully"
                })
            })
    }

    static async updateIsPaid(id, data, req, res) {
        const client = await getConnection();

        return await client
            .transaction(async (trx) => {
                const results = await trx('orders')
                    .update("is_paid", data?.is_paid ?? false)
                    .where('id', '=', id)

                return res.status(200).send({
                    message: "Update successfully"
                })
            })
    }
}
