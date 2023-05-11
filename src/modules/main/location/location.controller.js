import LocationValidation from "./location.validation.js";
import LocationServices from "./location.services.js";

export default class LocationController {
    static async getById(req, res) {
        try {
            return await LocationServices.getById(req, res)
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async getProvincesList(req, res) {
        try {
            return await LocationServices.getProvincesList(req, res)
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async getDistrictsList(req, res) {
        try {
            return await LocationServices.getDistrictsList(req, res)
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async getWardsList(req, res) {
        try {
            return await LocationServices.getWardsList(req, res)
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async getAll(req, res) {
        try {
            return await LocationServices.getAll(req, res)
        }
        catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }
}
