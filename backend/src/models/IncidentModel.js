const connection = require('../database/connection');

module.exports = {
  async insertIncident(data){
    try {
      const result = await connection('incidents').insert(data);
      return result;
    } catch (error) {
      return error;
    }
  },
  async findAll(page){
    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page-1) * 5)
    .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
    return incidents;
  },
  async countAll(){
    const [count] = await connection('incidents')
    .count();
    return count;
  },
  async findOneAndDelete(id, ong_id){
    try {
      const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

      if (!incident) return 'incident not found'
      if (incident.ong_id !== ong_id){
        return 'not authorized';
      }
      await connection('incidents').where('id', id).delete();
      return incident;
    } catch (error) {
      return error;
    }
  },
  async findAllTheOng(ong_id){
    const incidents = await connection('incidents')
    .where('ong_id', ong_id)
    .select('*');
    return incidents;
  }
}