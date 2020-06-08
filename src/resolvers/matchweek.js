export default {
  Query: {
    matchweek: async(_,{id}, {models}) => {
      return await models.Matchweek.findByPk(id)
    },
    season: async(_, __, {models}) => {
      return await models.Matchweek.findAll();
    }
  },

  Matchweek: {
    matches: async(matchweek, __, {models}) => {
      return await models.Match.findAll({
        where: {
          matchweekId: matchweek.id
        }
      })
    }
  }
}