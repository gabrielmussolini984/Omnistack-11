const connection = require('../database/connection');

module.exports = {
  async insertOng(data) {
    try {
      const result = await connection('ongs').insert(data)
      return result;
    } catch (error) {
      return error;
    }
  },
  async findAll(){
    const ongs = await connection('ongs').select('*');
    return ongs;
  },
  async findOne(id){
    if (!id) return;
    const ong = await connection('ongs')
    .where('id', id)
    .select('name')
    .first();
    return ong
  }
}