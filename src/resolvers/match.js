export default {
  Query: {
    match: async(_,{id}, {models}) => {
      return await models.Match.findByPk(id)
    },
    matchweek: async(_, __, {models}) => {
      return await models.Match.findAll();
    }
  }
}