import { getConnection } from '../../../utils/connectDatabase.js';

export default class LocationServices {
    static async getById(req, res) {
        try {
            const client = await getConnection();

            var province = await client.select().from('provinces').where('provinces.id', '=', req.params.id)
            if (province[0]) {
                const districts = await client.select([
                    'districts.id',
                    'districts.name',
                    client.raw(`json_agg(json_build_object('id', wards.id, 'name', wards.name)) as wards`)
                ])
                    .from('districts')
                    .where('districts.province_id', '=', province[0].id)
                    .innerJoin('wards', 'wards.district_id', '=', 'districts.id')
                    .groupBy('districts.id')


                province[0].districts = districts
            }
            return res.json(province[0])
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async getAll(req, res) {
        try {
            const client = await getConnection()
            const result = await client.select().from('provinces')
            return res.json(result)
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async getProvincesList(req, res) {
        try {
            const client = await getConnection()
            const result = await client.select().from('provinces')
            return res.json(result)
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async getDistrictsList(req, res) {
        try {
            const client = await getConnection()
            const result = await client.select().from('districts')
            return res.json(result)
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async getWardsList(req, res) {
        try {
            const client = await getConnection()
            const result = await client.select().from('wards')
            return res.json(result)
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }
}