const IncidentModel = require('../models/IncidentModel');
module.exports = {
  async index(req, res){
    const ong_id = req.headers.authorization;
    if (!ong_id) return res.status(401).json({error: 'Not Authorized'})
    const incidents = await IncidentModel.findAllTheOng(ong_id);
    return res.json(incidents);
  }

}