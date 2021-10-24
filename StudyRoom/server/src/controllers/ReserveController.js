const { Reserve } = require('../models')
module.exports = {
    // index with serach Reserve
    async index(req, res) {
        try {
            let reserves = null
            const search = req.query.search
            // console.log('search key: ' + search)
            if (search) {
                reserves = await Reserve.findAll({
                    where: {
                        $or: [
                            'nameLend', 'equipment', 'status'
                        ].map(key => ({
                            [key]: {
                                $like: `%${search}%`,
                            }
                        })),
                    },
                    order: [['updatedAt', 'DESC']]
                })
            } else {
                reserves = await Reserve.findAll({
                    order: [['updatedAt', 'DESC']]
                })
            }
            res.send(reserves)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the reserves'
            })
        }
    },
    // create reserves
    async create(req, res) {
        console.log(JSON.stringify(req.body))
        try {
            const Reserve = await Reserve.create(req.body)
            res.send(Reserve.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create reserve incorrect'
            })
        }
    },
    // edit reserve, suspend, active
    async put(req, res) {
        try {
            await Reserve.update(req.body, {
                where: {
                    id: req.params.reserveId
                }
            })
            res.send(req.body)
        } catch (err) {
           
            req.status(500).send({
                error: 'Update reserve incorrect'
            })
        }
    },
    // delete reserve
    async remove(req, res) {
        try {
            const Reserve = await Reserve.findOne({
                where: {
                    id: req.params.reserveId
                }
            })
            if (!reserve) {
                return res.status(403).send({
                    error: 'The reserve information was incorrect'
                })
            }
            await Reserve.destroy()
            res.send(reserve)
        } catch (err) {
            req.status(500).send({
                error: 'The reserve information was incorrect'
            })
        }
    },
    // get reserve by id
    async show(req, res) {
        try {
            const Reserve = await Reserve.findByPk(req.params.reserveId)
            res.send(reserve)
        } catch (err) {
            req.status(500).send({
                error: 'The reserve information was incorrect'
            })
        }
    }
}