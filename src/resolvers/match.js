export default {
  Query: {
    match: async(_,{id}, {models}) => {
      return await models.Match.findByPk(id)
    },
    allMatches: async(_, __, {models}) => {
      return await models.Match.findAll();
    }
  },
}