const IncidentModel = require('../models/IncidentModel');
module.exports = {
  async index(req, res) {
    const {page = 1} = req.query;
    
    const count = await IncidentModel.countAll();
    const incidents = await IncidentModel.findAll(page);
    res.header('X-Total-Count', count['count(*)']);
    return res.json(incidents)
  },
  async create(req, res) {
    const data = req.body;
    data.ong_id = req.headers.authorization;
    const [id] = await IncidentModel.insertIncident(data);
    return res.json({id})
  },
  async delete(req, res) {
    const ong_id = req.headers.authorization;
    const incident = await IncidentModel.findOneAndDelete(req.params.id, ong_id);
    
    if (incident === 'incident not found') return res.status(400).json({error: 'Incident not found'});
    if (incident === 'not authorized') return res.status(401).json({error: 'Operation not permitted'});
    return res.status(204).send();
  }
}