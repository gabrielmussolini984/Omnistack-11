const OngModel = require('../models/OngModel');
module.exports = {
  async create(req, res) {
    const ong = await OngModel.findOne(req.body.id);
    if (!ong) return res.status(400).json({error: 'No ONG found with this ID'});
    res.json(ong); 
  }
}