const OngModel = require('../models/OngModel');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
  async index(req, res) { 
    const ongs = await OngModel.findAll();
    res.json(ongs);
  },
  async create(req, res) {
    try {
      const data = req.body;
      data.id = generateUniqueId();
      await OngModel.insertOng(data)
      return res.json({id: data.id});
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}