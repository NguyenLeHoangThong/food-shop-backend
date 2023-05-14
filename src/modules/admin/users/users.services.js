import { getConnection } from '../../../utils/connectDatabase.js';

export default class UsersServices {
    static async findAll(data, req, res) {
        try {
            const client = await getConnection();
            if (data.keyword) {
                try {
                    const results = await client('users').select('users.*', 'wards.name as ward', 'districts.name as district', 'provinces.name as province')
                                    .leftJoin('wards', 'wards.id', '=', 'users.ward_id')
                                    .leftJoin('districts', 'districts.id', '=', 'users.district_id')
                                    .leftJoin('provinces', 'provinces.id', '=', 'users.province_id')
                                    .whereRaw(`LOWER(fullname) like N'%${data.keyword.toLowerCase()}%' OR LOWER(email) like N'%${data.keyword.toLowerCase()}%' OR LOWER(firebase_uid) like N'%${data.keyword.toLowerCase()}%'`)

                    return results && results.length ? results.map((it) => ({ ...it, address: [it?.address, it?.ward, it?.district, it?.province].filter((fIt) => !!fIt).join(', ')})) : [];
                } catch (error) {
                    return res.status(500).send(({
                        error: error?.message || error
                    }));
                }
            }
            else {
                try {
                    const results = await client('users').select('users.*', 'wards.name as ward', 'districts.name as district', 'provinces.name as province')
                                    .leftJoin('wards', 'wards.id', '=', 'users.ward_id')
                                    .leftJoin('districts', 'districts.id', '=', 'users.district_id')
                                    .leftJoin('provinces', 'provinces.id', '=', 'users.province_id')

                    return results && results.length ? results.map((it) => ({ ...it, address: [it?.address, it?.ward, it?.district, it?.province].filter((fIt) => !!fIt).join(', ')})) : [];
                } catch (error) {
                    return res.status(500).send(({
                        error: error?.message || error
                    }));
                }
            }
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }
}
